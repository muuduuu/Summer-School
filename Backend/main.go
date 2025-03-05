package main

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"net/smtp"
	"net/url"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"sync"
	"time"

	"regexp"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
)

// Function to sanitize email for folder name
func sanitizeEmail(email string) string {
	// Convert to lowercase
	email = strings.ToLower(email)

	// Replace '@' with '_at_', '.' with '_dot_'
	email = strings.ReplaceAll(email, "@", "_at_")
	email = strings.ReplaceAll(email, ".", "_dot_")

	// Remove any other special characters (except underscores)
	re := regexp.MustCompile(`[^a-zA-Z0-9_]+`)
	email = re.ReplaceAllString(email, "_")

	return email
}

type UserDetails struct {
	Email           string `json:"email" bson:"email"`
	FullName        string `json:"full_name,omitempty" bson:"full_name,omitempty"`
	Age             int    `json:"age,omitempty" bson:"age,omitempty"`
	Address         string `json:"address,omitempty" bson:"address,omitempty"`
	Phone           string `json:"phone,omitempty" bson:"phone,omitempty"`
	FatherName      string `json:"father_name,omitempty" bson:"father_name,omitempty"`
	MotherName      string `json:"mother_name,omitempty" bson:"mother_name,omitempty"`
	ParentContact   string `json:"parent_contact,omitempty" bson:"parent_contact,omitempty"`
	SchoolName      string `json:"school_name,omitempty" bson:"school_name,omitempty"`
	Grade           string `json:"grade,omitempty" bson:"grade,omitempty"`
	AdmissionNo     string `json:"admission_no,omitempty" bson:"admission_no,omitempty"`
	PhotoPath       string `json:"photo_path,omitempty" bson:"photo_path,omitempty"`
	CertificatePath string `json:"certificate_path,omitempty" bson:"certificate_path,omitempty"`
	PaymentPath     string `json:"payment_path,omitempty" bson:"payment_path,omitempty"`
	PaymentStatus   string `json:"payment_status" bson:"payment_status"`
}

// User structure
type User struct {
	Username string `json:"username" bson:"username"`
	Email    string `json:"email" bson:"email"`
	Password string `json:"password" bson:"password"`
	OTP      string `json:"otp,omitempty" bson:"otp,omitempty"`
	Role     string `json:"role" bson:"role"`
	LoggedIn string `json:"LoggedIn" bson:"loggedIn"`
}

var otpStorage = make(map[string]string)
var otpMutex sync.Mutex

// MongoDB collection
var userCollection *mongo.Collection
var detailsCollection *mongo.Collection

// Initialize MongoDB connection
func init() {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatalf("MongoDB Connection Error: %v", err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatalf("MongoDB Ping Error: %v", err)
	}

	fmt.Println("Connected to MongoDB!")
	userCollection = client.Database("User2").Collection("users")
	detailsCollection = client.Database("User2").Collection("details")
	// Ensure base upload directory exists
	os.MkdirAll("uploads", os.ModePerm)
}

// Function to hash passwords
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// Function to compare passwords
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func AddUserDetails(c *gin.Context) {
	// Manually extract form-data (since ShouldBind doesn't support files)
	email := c.PostForm("email")
	fullName := c.PostForm("full_name")
	age := c.PostForm("age")
	address := c.PostForm("address")
	phone := c.PostForm("phone")
	fatherName := c.PostForm("father_name")
	motherName := c.PostForm("mother_name")
	parentContact := c.PostForm("parent_contact")
	schoolName := c.PostForm("school_name")
	grade := c.PostForm("grade")
	admissionNo := c.PostForm("admission_no")

	if email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email is required"})
		return
	}

	// Convert email to folder-friendly format (replace @ and .)
	emailFolder := sanitizeEmail(email)
	userFolder := filepath.Join("uploads", emailFolder)

	if err := os.MkdirAll(userFolder, os.ModePerm); err != nil {
		log.Printf("Error creating user directory: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user folder", "details": err.Error()})
		return
	}

	// Handle file uploads
	photo, err1 := c.FormFile("photo")
	certificate, err2 := c.FormFile("certificate")
	payment, err3 := c.FormFile("payment")

	if err1 != nil || err2 != nil || err3 != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Photo and certificate are required"})
		return
	}

	// Define file paths
	photoPath := filepath.Join(userFolder, "photo.jpg")
	certPath := filepath.Join(userFolder, "certificate.pdf")
	paymentPath := filepath.Join(userFolder, "payment.jpg")

	// Save the files

	if err := c.SaveUploadedFile(photo, photoPath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save photo"})
		return
	}

	if err := c.SaveUploadedFile(certificate, certPath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save certificate"})
		return
	}
	if err := c.SaveUploadedFile(payment, paymentPath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save payment"})
		return
	}

	// Save details to MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	userDetails := bson.M{
		"email":            email,
		"full_name":        fullName,
		"age":              age,
		"address":          address,
		"phone":            phone,
		"father_name":      fatherName,
		"mother_name":      motherName,
		"parent_contact":   parentContact,
		"school_name":      schoolName,
		"grade":            grade,
		"admission_no":     admissionNo,
		"photo_path":       photoPath,
		"certificate_path": certPath,
		"payment_path":     paymentPath,
		"payment_status":   "Pending",
	}
	_, err := detailsCollection.InsertOne(ctx, userDetails)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save user details"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User details added successfully!", "folder": userFolder})
}

func UpdateUserDetails(c *gin.Context) {
	email := c.PostForm("email")
	if email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email is required"})
		return
	}

	// Extract other fields (except email, photo, and certificate)
	updateData := bson.M{}
	if fullName := c.PostForm("full_name"); fullName != "" {
		updateData["full_name"] = fullName
	}
	if age := c.PostForm("age"); age != "" {
		updateData["age"], _ = strconv.Atoi(age)
	}
	if address := c.PostForm("address"); address != "" {
		updateData["address"] = address
	}
	if phone := c.PostForm("phone"); phone != "" {
		updateData["phone"] = phone
	}
	if fatherName := c.PostForm("father_name"); fatherName != "" {
		updateData["father_name"] = fatherName
	}
	if motherName := c.PostForm("mother_name"); motherName != "" {
		updateData["mother_name"] = motherName
	}
	if parentContact := c.PostForm("parent_contact"); parentContact != "" {
		updateData["parent_contact"] = parentContact
	}
	if schoolName := c.PostForm("school_name"); schoolName != "" {
		updateData["school_name"] = schoolName
	}
	if grade := c.PostForm("grade"); grade != "" {
		updateData["grade"] = grade
	}
	if admissionNo := c.PostForm("admission_no"); admissionNo != "" {
		updateData["admission_no"] = admissionNo
	}

	if len(updateData) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No fields to update"})
		return
	}

	// Update in MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"email": email}
	update := bson.M{"$set": updateData}

	_, err := detailsCollection.UpdateOne(ctx, filter, update)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user details"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User details updated successfully"})
}

func GetUserDetails(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	email := c.Param("email")          // Get email from URL parameter
	_, err := url.QueryUnescape(email) // Decode %40 to @
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email format"})
		return
	}

	if email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email is required"})
		return
	}

	// Find user by email (case-insensitive)
	var userDetails bson.M
	filter := bson.M{"email": bson.M{"$regex": "^" + email + "$", "$options": "i"}}
	err = detailsCollection.FindOne(ctx, filter).Decode(&userDetails)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "User details not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user details", "details": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"details": userDetails})
}

func VerifyPayment(c *gin.Context) {
	email := c.Param("email")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"email": email}
	update := bson.M{"$set": bson.M{"payment_status": "Verified"}}

	result, err := detailsCollection.UpdateOne(ctx, filter, update)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update payment status"})
		return
	}

	if result.ModifiedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found or already verified"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Payment status updated to Verified"})
}

// Register User
func Register(c *gin.Context) {
	var input User
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// Check if user already exists
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var existingUser User
	err := userCollection.FindOne(ctx, bson.M{"username": input.Username}).Decode(&existingUser)
	if err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Username already exists"})
		return
	}

	// Hash the password before storing
	hashedPassword, err := HashPassword(input.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	// Save user to MongoDB
	newUser := User{
		Username: input.Username,
		Email:    input.Email,
		Password: hashedPassword,
		Role:     "student",
		LoggedIn: "False",
	}
	_, err = userCollection.InsertOne(ctx, newUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User registered successfully!"})
}


func Login(c *gin.Context) {
	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	var user User
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Find user by email
	err := userCollection.FindOne(ctx, bson.M{"email": input.Email}).Decode(&user)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Check password
	if !CheckPasswordHash(input.Password, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	c.SetCookie("session", input.Email, 7*24*3600, "/", "localhost", false, false)

	// Update login status
	_, err = userCollection.UpdateOne(ctx, bson.M{"email": input.Email}, bson.M{"$set": bson.M{"loggedIn": "true"}})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update login status"})
		return
	}

	// Send JSON response only once
	c.JSON(http.StatusOK, gin.H{"message": "Login successful!"})
}

func Logout(c *gin.Context) {
	email, err := GetEmailFromSession(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Mark user as logged out
	userCollection.UpdateOne(ctx, bson.M{"email": email}, bson.M{"$set": bson.M{"loggedIn": "false"}})

	// Remove session cookie
	c.SetCookie("session", "", -1, "/", "", false, true)

	c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}

func GetEmailFromSession(c *gin.Context) (string, error) {
	email, err := c.Cookie("session")
	if err != nil {
		return "", err
	}
	return email, nil
}

func CheckLoginStatus(c *gin.Context) {
	email, err := GetEmailFromSession(c)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"loggedIn": false})
		return
	}

	var user User
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err = userCollection.FindOne(ctx, bson.M{"email": email}).Decode(&user)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"loggedIn": false})
		return
	}

	c.JSON(http.StatusOK, gin.H{"loggedIn": user.LoggedIn})
}

func getusername(c *gin.Context) {
	email, err := GetEmailFromSession(c)
	if err != nil || email == "" { // Check if email is empty
		c.JSON(http.StatusOK, gin.H{"username": "nil", "status": false})
		return
	}

	var user User
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err = userCollection.FindOne(ctx, bson.M{"email": email}).Decode(&user)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"username": "nil", "status": false})
		return
	}

	c.JSON(http.StatusOK, gin.H{"username": user.Username, "status": true})
}

// Generate OTP
func GenerateOTP() string {
	return strconv.Itoa(100000 + rand.Intn(900000))
}

// Send OTP via email
func SendOTP(email, otp string) error {
	from := "webpage.krctc.project@gmail.com"
	password := "umzy cqxf odzr qeyj"

	to := []string{email}
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"
	message := []byte("Subject: Your OTP Code\n\nYour OTP is: " + otp)

	auth := smtp.PlainAuth("", from, password, smtpHost)
	return smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)
}

func RequestOTP1(c *gin.Context) {
	var input struct {
		Email string `json:"email"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	otp := GenerateOTP()

	// Store OTP temporarily in memory
	otpMutex.Lock()
	otpStorage[input.Email] = otp
	otpMutex.Unlock()
	// Send OTP via email
	if err := SendOTP(input.Email, otp); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send OTP"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "OTP sent successfully!"})
}
func GetAllStudents(c *gin.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Find all students
	cursor, err := detailsCollection.Find(ctx, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch students", "details": err.Error()})
		return
	}
	defer cursor.Close(ctx)

	var students []bson.M // Use bson.M instead of UserDetails struct
	if err := cursor.All(ctx, &students); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode students", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, students)
}

// Verify OTP
func VerifyOTP1(c *gin.Context) {
	var input struct {
		Email string `json:"email"`
		OTP   string `json:"otp"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	otpMutex.Lock()
	storedOTP, exists := otpStorage[input.Email]
	otpMutex.Unlock()

	if !exists || storedOTP != input.OTP {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid OTP"})
		return
	}

	// OTP Verified Successfully - Remove it from storage
	otpMutex.Lock()
	delete(otpStorage, input.Email)
	otpMutex.Unlock()

	c.JSON(http.StatusOK, gin.H{"message": "OTP verified successfully!"})
}

func userm(c *gin.Context) {
	email, err := GetEmailFromSession(c)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"loggedIn": false, "em": email})
		return
	}

	c.JSON(http.StatusOK, gin.H{"loggedIn": email})

}

func CheckUserRole(c *gin.Context) {
	var input struct {
		Email string `json:"email"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	var user User
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err := userCollection.FindOne(ctx, bson.M{"email": input.Email}).Decode(&user)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"role": user.Role})
}

func main() {
	router := gin.Default()
	// router.Use(func(c *gin.Context) {
	// 	c.Writer.Header().Set("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
	// 	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	// 	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	// 	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

	// 	if c.Request.Method == "OPTIONS" {
	// 		c.AbortWithStatus(http.StatusNoContent)
	// 		return
	// 	}

	// 	c.Next()
	// })
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://127.0.0.1:5500"}, // Allow frontend origin
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// Routes
	router.POST("/register", Register)
	router.POST("/login", Login)
	router.POST("/request-otp1", RequestOTP1)
	router.POST("/verify-otp1", VerifyOTP1)
	router.POST("/add-details", AddUserDetails)
	router.POST("/check-role", CheckUserRole)
	router.PUT("/verify-payment/:email", VerifyPayment)
	router.POST("/updateuser/:email", UpdateUserDetails)
	router.GET("/students", GetAllStudents)
	router.GET("/userdetails/:email", GetUserDetails)
	router.POST("/logout", Logout)
	router.GET("/status", CheckLoginStatus)
	router.GET("/userm", userm)
	router.GET("/username", getusername)

	fmt.Println("Server running on port 8000")
	router.Run(":8000")
}
