//Movie routes

const express = require('express');

//new router instance 

const router = express.Router();

//import the controller functions that will handle the logic for each route
const { searchMovies, getMovieById } = require('../controllers/movieController');

// Define the routes and associate them with the controller functions
router.get('/search', searchMovies); // Route for searching movies by title
router.get('/movies/:id', getMovieById); // Route for getting movie details by ID

// Export the router to be used in server.js
module.exports = router;