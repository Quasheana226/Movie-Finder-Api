// Dependencies
// It reads our .env file and loads the values into process .env so that process.envPOrt 

require('dotenv').config();

//import frame work express framqork
const express = require('express');

//import the movie routet this file defines all the /search and /movies/id route 
const movieRoutes = require("./src/routes/movieRoutes");

const app = express();


const PORT = process.env.PORT || 3001;


// MIDDLEWARE


app.use(express.json());

//ROUTES

app.use("/api", movieRoutes);


// PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
