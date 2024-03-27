package routes;

import(
	"github.com/gin-gonic/gin"
	 controllers "go-backend/controllers"
)

func UserRoute(request *gin.Engine){
	request.POST("auth/signUp",controllers.SignUp)

}
