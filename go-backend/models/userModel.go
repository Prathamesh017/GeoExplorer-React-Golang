package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Coordinate struct {
	Longitude float64 `json:"longitude" bson:"longitude"`
	Latitude  float64 `json:"latitude" bson:"latitude"`
}

type Geometry struct {
	Coordinates interface{} `json:"coordinates,omitempty" bson:"coordinates,omitempty"`
	Type        string         `json:"type" bson:"type"`
}


type Location struct {
	Type       string            `json:"type"  bson:"type"`
	Properties interface{} `json:"properties"  bson:"properties"`
	Geometry   Geometry          `json:"geometry"  bson:"geometry"`
}



type User struct {
	ID   primitive.ObjectID  `bson:"_id"`
	Name string   `json:"name" validate:"required,min=2,max=100"`
	Email string  `json:"email" validate:"required"`
	Password string `json:"password" validate:"required,min=2"`
	Token			string					`json:"token"`
	Location  []Location      `json:"location" bson:"location"`
}
