package helpers

import (
	"fmt"
	"log"
	"os"
  "time"
	"github.com/dgrijalva/jwt-go"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)


func HashPassword(password string) (string, error) {
    bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
    return string(bytes), err
}
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}


//called claims to denote the fact that user claims to be whatever is embeded in the token
type customClaims struct {
  Name string 
	jwt.StandardClaims
}

func GenerateToken(name string) (signedToken string,err error){
	EnvLoadErr:=godotenv.Load(".env");
	if EnvLoadErr!=nil{
		panic("ENV File Missing")
	}
	var SECRET_KEY string = os.Getenv("SECRET_KEY")


	claims := customClaims{
		Name: name,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(60 * time.Minute).Unix(),
			Issuer:    "prathamesh",
		},
	}
	token ,err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(SECRET_KEY))
	
	
	if err != nil {
		log.Panic(err)
		return 
	}

	return token, err
}

func ValidateToken(signedToken string)(claims *customClaims, msg string){
	EnvLoadErr:=godotenv.Load(".env");
	if EnvLoadErr!=nil{
		panic("ENV File Missing")
	}

	var SECRET_KEY string = os.Getenv("SECRET_KEY")
	fmt.Print(SECRET_KEY)
	token, err := jwt.ParseWithClaims(
    signedToken,         // 1. The signed JWT token to parse
    &customClaims{},   // 2. An instance of the struct where the claims will be stored
    func(token *jwt.Token) (interface{}, error) {  // 3. A function to providING the secret  for validation
        return []byte(SECRET_KEY), nil  // 4. Key for validating the signature of the token
    },
	)
	
	if err != nil {
		msg=err.Error()
		return
	}
	claims, ok := token.Claims.(*customClaims)
	fmt.Println(claims);
	if !ok{
		msg ="Token is Invalid"
		return
	}
	if claims.ExpiresAt < time.Now().Local().Unix(){
		msg = "token is expired"
		return
	}
	return claims, msg

}