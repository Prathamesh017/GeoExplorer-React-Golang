package middleware

import (
	helpers "go-backend/helpers"
	"github.com/gin-gonic/gin"
	"net/http"
)

func AuthenticateMiddleware(c *gin.Context) {

	BearerToken := c.GetHeader("Authorization")
	clientToken := BearerToken[len("Bearer "):]



	if clientToken == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "No Authorization header provided"})

	}

	claims, err := helpers.ValidateToken(clientToken)
	if err != "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		c.Abort()
		return
	}
	c.Set("name", claims.Name)
	c.Set("id", claims.Id)

}
