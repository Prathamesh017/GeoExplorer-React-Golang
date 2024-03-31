package controllers

import (
	"context"
	"github.com/gin-gonic/gin"
	database "go-backend/database"
	models "go-backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"time"
)

func GetUser(c *gin.Context) {
	var userId,exists=c.Get("id");
	if !exists {
		// Handle case when id claim is not present in the context
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ID claim not found in context"})
		return
}

	
	var userCollection = database.OpenCollection("users")
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var user models.User
	options := options.FindOne().SetProjection(bson.M{"password": 0})
	var NoUserFoundErr = userCollection.FindOne(ctx, bson.M{"_id": userId}, options).Decode(&user)

	defer cancel()
	if NoUserFoundErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "User Doesn't Exist"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "success", "user": user})
}
func AddLocation(c *gin.Context) {
	
	var userCollection = database.OpenCollection("users")
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	var locations []models.Location

	// var user models.User
	if err := c.BindJSON(&locations); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": err.Error()})
	}



	

 
	userId, exists := c.Get("id")
	if !exists {
			// Handle case when id claim is not present in the context
			c.JSON(http.StatusInternalServerError, gin.H{"error": "ID claim not found in context"})
			return
	}

	

	filter:=bson.M{"_id": userId};
	update := bson.M{
		"$set": bson.M{
			"location": locations,
		},
	}
	


    
	var _, err = userCollection.UpdateOne(ctx, filter, update)
	defer cancel()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Couldn't Update User"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "location added succesfully"})


}
