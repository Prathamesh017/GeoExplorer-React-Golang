# GeoExplorer 
GeoExplorer is a  Full Stack Web application designed to empower users in managing and visualizing geospatial data effortlessly. Combining the power of Go for the backend and React for the frontend, this application offers a seamless experience for handling GeoJSON and KML files, interacting with maps, and storing GEOJSON Data.

# Features
* Secure User Authentication System, Allowing Users to Create Accounts, Log In, and Manage their Profiles. 
* A User-Friendly interface  for Uploading  of GeoJSON and KML files. 
* React Leaflet library  Integrated to render maps, displaying uploaded GeoJSON/KML files with customizable styling.
* Users can interact with an intuitive map view component, equipped with tools for drawing custom shapes such as polygons, circles, and markers.
* Save Functionality is provided for users to save drawn shapes to their accounts, allowing for easy retrieval and access.
* Implemented search feature enables users to find specific locations or addresses on the map. 
* The backend is developed using the Golang and  Gin framework, ensuring efficiency and performance along with streamlined routing and middleware support.

# TECH
`React`  `React-Leaflet` `Tailwind`  `Go`  `Gin` `MongoDB`     

## SETTING UP LOCALLY
Backend Setup
```
   cd go-backend
   go mod download
   setup .env according to .env.example
   go run main.go
```
Frontend Setup
```
   cd react-frontend
   npm install
   setup .env according to .env example
   npm run start
```
For Generating GeoJSON data and This Project's Inspiration
```
https://geojson.io/
```
 

