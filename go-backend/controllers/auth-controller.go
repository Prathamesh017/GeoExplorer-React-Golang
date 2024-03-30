package controllers

import (
	"context"
	"fmt"
	database "go-backend/database"
	helpers "go-backend/helpers"
	models "go-backend/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var validate = validator.New()

func RegisterUser(c *gin.Context) {
	var userCollection = database.OpenCollection("users")
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var user models.User
	//copies requestbody to user;
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": err.Error()})
	}

	//handle validation
	var validatorErr = validate.Struct(user)
	if validatorErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": validatorErr.Error()})
	}

	filter := bson.M{"email": user.Email}

	count, userCheckErr := userCollection.CountDocuments(ctx, filter)
	defer cancel()

	if userCheckErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": userCheckErr.Error()})
		return
	}
	if count > 0 {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "User Already Exists"})
		return
	}

	var hashPassword, err = helpers.HashPassword(user.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Error In Password"})
		return
	}
	user.Password = hashPassword
	user.ID = primitive.NewObjectID()
	var _, insertErr = userCollection.InsertOne(ctx, user)

	if insertErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": insertErr.Error()})
		return
	}

	token, _ := helpers.GenerateToken(user.Name)

	user.Token = token
	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "User Registered"})
}
func LoginUser(c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var userCollection = database.OpenCollection("users")

	var user models.User
	var foundUser models.User

	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

	}
	defer cancel()
	err := userCollection.FindOne(ctx, bson.M{"email": user.Email}).Decode(&foundUser)
	defer cancel()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "user not found"})
		return
	}
	passwordIsValid := helpers.CheckPasswordHash(user.Password, foundUser.Password)
	if !passwordIsValid {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Incorrec Password"})
		return
	}
	fmt.Println(foundUser.Name);
	token, _ := helpers.GenerateToken(foundUser.Name)
	foundUser.Token = token

	c.JSON(http.StatusOK, foundUser)
}
