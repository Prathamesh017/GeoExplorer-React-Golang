package models

import "go.mongodb.org/mongo-driver/bson/primitive"


type User struct {
	ID   primitive.ObjectID  `bson:"_id"`
	Name string   `json:"name" validate:"required,min=2,max=100"`
	Email string  `json:"email" validate:"required"`
	Password string `json:"password" validate:"required,min=2"`
}
