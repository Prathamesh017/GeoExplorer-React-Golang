package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
	helpers "go-backend/helpers"
	"net/http"
)

func AuthenticateMiddleware(c *gin.Context) {
	//  fmt.Println(c.Request.Header)
	clientToken := c.Request.Header.Get("token")
	// clientToken := BearerToken[len("Bearer "):]
	fmt.Println(clientToken)

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
	c.Set("_id", claims.Id)

}
