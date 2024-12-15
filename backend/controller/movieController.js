const movieService = require("../services/movieService");

let handleGetMovies = async (req, res) => {
    let movies = await movieService.handleGetMovies();
    //console.log("Get all movies: ", movies);
    return res.status(200).json({
        movies: movies || [],
    });
};
module.exports = {
    handleGetMovies: handleGetMovies,
};
