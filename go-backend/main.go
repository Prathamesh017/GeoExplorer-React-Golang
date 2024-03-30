package main

import (
	"fmt"
	"os"
	"github.com/gin-gonic/gin"
	"net/http"
  routes "go-backend/routes"
	database "go-backend/database"

)

func main() {
	var port = os.Getenv("PORT")
	if port == "" {
		port = "9000"
	}
	var router = gin.Default()
  
  //define routes
  routes.AuthRoute(router);
  routes.UserRoute(router);

  
  router.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK,gin.H{"success":"ACCESS"});
	})


  //db  connection 
  database.ConnectDatabase()
  //running server
  var serverMessage = fmt.Sprintf("localhost:%s", port);
	router.Run(serverMessage);


}
