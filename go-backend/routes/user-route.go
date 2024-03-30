package routes;

import(
	"github.com/gin-gonic/gin"
	 controllers "go-backend/controllers"
	 middleware "go-backend/middleware"
)

func UserRoute(request *gin.Engine){
	request.Use(middleware.AuthenticateMiddleware)
	request.GET("user/:id",controllers.GetUser)
	
}
