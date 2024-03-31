package main

import (
	"fmt"
	"os"
	"github.com/gin-gonic/gin"
	"net/http"
  routes "go-backend/routes"
	"github.com/gin-contrib/cors"
	database "go-backend/database"

)

func main() {
	var port = os.Getenv("PORT")
	if port == "" {
		port = "9000"
	}
	var router = gin.Default()
  
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET" ,"POST", "PUT", "PATCH", "DELETE","OPTIONS"},
		AllowHeaders: []string{"Content-Type,","Authorization","Access-Control-Allow-Origin, Access-Control-Allow-Headers"},
}))
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
