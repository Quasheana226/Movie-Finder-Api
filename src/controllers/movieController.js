// axios is our http clietn for making request to omdb api 

const axios = require('axios');

//The base url 

const OMDB_BASE_URL = 'http://www.omdbapi.com/';

// response.data is the parsed json body from omdb api
// sucessful response
// SEARCH MOVIES
const searchMovies = async (req, res) => {
  const { title } = req.query;

  // input validation
  if (!title) {
    return res.status(400).json({
      error: 'Missing required query parameter: title',
      example: '/api/search?title=batman'
    });
  }

  try {
    const response = await axios.get(OMDB_BASE_URL, {
      params: {
        apikey: process.env.OMDB_API_KEY,
        s: title,
        type: 'movie'
      }
    });

    // response.data is the parsed json body from omdb api
    const omdbData = response.data;

    if (omdbData.Response === 'False') {
      return res.status(404).json({
        error: omdbData.Error || 'No movies found matching the title'
      });
    }

    // successful response
    res.status(200).json({
      totalResults: omdbData.totalResults,
      results: omdbData.Search
    });
  } catch (error) {
    // Error handling for network/axios failures
    console.error('Error calling OMDB search:', error.message);
    res.status(500).json({
      error: 'Failed to fetch movie data from external API'
    });
  }
};



const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(OMDB_BASE_URL, {
      params: {
        apikey: process.env.OMDB_API_KEY, // from .env
        i: id,                             // "i" = OMDB's ID lookup parameter
        plot: 'full'                       // get the full plot, not just a short summary
      }
    });

    const omdbData = response.data;

    // Again, OMDB returns Response: "False" for invalid IDs
    // instead of using an HTTP error code
    if (omdbData.Response === 'False') {
      return res.status(404).json({
        error: omdbData.Error || 'Movie not found'
      });
    }

    res.status(200).json(omdbData);

  } catch (error) {
    // Handle any network/axios failures
    console.error('Error calling OMDB by ID:', error.message);
    res.status(500).json({
      error: 'Failed to fetch movie details from external API'
    });
  }
};


// Export both functions so the router can use them
module.exports = { searchMovies, getMovieById };


