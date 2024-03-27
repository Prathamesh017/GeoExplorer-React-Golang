package controllers

import (
	"context"
	database "go-backend/database"
	models "go-backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
)

var validate = validator.New()

func SignUp(ctx *gin.Context) {
	var userCollection = database.OpenCollection("users")

	var user models.User
	//copies requestbody to user;
	if err := ctx.BindJSON(&user); err != nil {
		return
	}

	//handle validation
	var validatorErr = validate.Struct(user)
	if validatorErr != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": validatorErr.Error()})
		return
	}

	filter := bson.M{"email":user.Email};
  ExistingUser:= userCollection.FindOne(context.TODO(),filter);
	if ExistingUser != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "User Already Exists"})
		return
	}

	_, err := userCollection.InsertOne(context.TODO(), user)

	if err != nil {
		panic(err)
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "User Added Successfully"})
}
