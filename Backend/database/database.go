package database

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

type User struct {
	ID       uint   `gorm:"primaryKey"`
	Name     string `gorm:"size:100"`
	Email    string `gorm:"unique;not null"`
	Password string `gorm:"not null"`
}

func ConnectDatabase() {
	dsn := "host=localhost user=postgres password=mysecretpassword dbname=registration port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info), // Enable SQL logging
	})
	if err != nil {
		panic("Failed to connect to database: " + err.Error())
	}

	// AutoMigrate to create the table
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic("Failed to migrate database: " + err.Error())
	}

	DB = db
	fmt.Println("Database connected successfully!")
}
