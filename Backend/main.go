package main

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"net/smtp"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"sync"
	"time"

	"regexp"

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
	FullName        string `json:"full_name" bson:"full_name"`
	Age             int    `json:"age" bson:"age"`
	Address         string `json:"address" bson:"address"`
	Phone           string `json:"phone" bson:"phone"`
	FatherName      string `json:"father_name" bson:"father_name"`
	MotherName      string `json:"mother_name" bson:"mother_name"`
	ParentContact   string `json:"parent_contact" bson:"parent_contact"`
	SchoolName      string `json:"school_name" bson:"school_name"`
	Grade           string `json:"grade" bson:"grade"`
	AdmissionNo     string `json:"admission_no" bson:"admission_no"`
	PhotoPath       string `json:"photo_path" bson:"photo_path"`
	CertificatePath string `json:"certificate_path" bson:"certificate_path"`
}

// User structure
type User struct {
	Username string `json:"username" bson:"username"`
	Email    string `json:"email" bson:"email"`
	Password string `json:"password" bson:"password"`
	OTP      string `json:"otp,omitempty" bson:"otp,omitempty"`
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

	if err1 != nil || err2 != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Photo and certificate are required"})
		return
	}

	// Define file paths
	photoPath := filepath.Join(userFolder, "photo.jpg")
	certPath := filepath.Join(userFolder, "certificate.pdf")

	// Save the files

	if err := c.SaveUploadedFile(photo, photoPath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save photo"})
		return
	}

	if err := c.SaveUploadedFile(certificate, certPath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save certificate"})
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
	}
	_, err := detailsCollection.InsertOne(ctx, userDetails)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save user details"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User details added successfully!", "folder": userFolder})
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

	// Find user by email instead of username
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

	c.JSON(http.StatusOK, gin.H{"message": "Login successful!"})
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

func main() {
	router := gin.Default()
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	})

	// Routes
	router.POST("/register", Register)
	router.POST("/login", Login)
	router.POST("/request-otp1", RequestOTP1)
	router.POST("/verify-otp1", VerifyOTP1)
	router.POST("/add-details", AddUserDetails)

	fmt.Println("Server running on port 8000")
	router.Run(":8000")
}
