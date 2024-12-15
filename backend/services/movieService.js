const db = require("../models/index")

let handleGetMovies = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let movies = await db.Movie.findAll({ raw: true });
            //console.log("Get all movies: ", movies);
            resolve(movies);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    handleGetMovies: handleGetMovies,
};