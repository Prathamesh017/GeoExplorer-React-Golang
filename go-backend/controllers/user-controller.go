package controllers

import (
	"context"
	"fmt"
	database "go-backend/database"
	models "go-backend/models"
	"net/http"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/bson"
)

func GetUser(c *gin.Context) {
	userId := c.Param("id")
	var userCollection = database.OpenCollection("users")
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var user models.User
	objID, err := primitive.ObjectIDFromHex(userId)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid user ID format"})
  }
	options := options.FindOne().SetProjection(bson.M{"password": 0})
	var NoUserFoundErr= userCollection.FindOne(ctx, bson.M{"_id":objID},options).Decode(&user)
	
	defer cancel()
	if NoUserFoundErr != nil{
	fmt.Println(err);
		c.JSON(http.StatusBadRequest,gin.H{"status": "error","message": "User Doesn't Exist"})
		return
	}
	c.JSON(http.StatusOK,gin.H{"status":"success","user":user})
}
