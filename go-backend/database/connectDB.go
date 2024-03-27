package database

import (
	"context"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)


var DBclient *mongo.Client;
func ConnectDatabase() {
  err:=godotenv.Load(".env");
	if err!=nil{
		panic("ENV File Missing")
	}

	var MongoUrl = os.Getenv("MONGO_URL")
	if  MongoUrl  == "" {
		panic("Missing Mongo Url")
	}
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI( MongoUrl ))

	if err != nil {
		fmt.Print("Error in Connection to DB")
	}
	if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
		fmt.Print("Error in Connection to DB")
	}
	fmt.Print("Connection to DB Successfully")
	DBclient=client;

}
func OpenCollection(collectionName string) *mongo.Collection {
	collection :=DBclient.Database("test").Collection(collectionName);
	return collection;
}
