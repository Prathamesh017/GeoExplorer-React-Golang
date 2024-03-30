package routes;

import(
	"github.com/gin-gonic/gin"
	 controllers "go-backend/controllers"
)

func AuthRoute(request *gin.Engine){
	request.POST("auth/register",controllers.RegisterUser)
	request.POST("auth/login",controllers.LoginUser)
}
