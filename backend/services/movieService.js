const db = require("../models/index");
const { Sequelize } = require("sequelize");

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
const handleAddMovie = async (movieData) => {
    console.log(movieData)
    const { movieId, movieName, duration, trailer, poster, premiereDay, movieLabel } = movieData;

    try {
        // Ensure you're using the correct sequelize instance and querying it properly
        const result = await db.sequelize.query(
            `EXEC AddMovie :movieId, :movieName, :duration, :trailer,:poster, :premiereDay, :movieLabel`,
            {
                replacements: {
                    movieId: null,
                    movieName: movieName,
                    duration: duration,
                    trailer: trailer,
                    poster: poster,
                    premiereDay: premiereDay,
                    movieLabel: movieLabel
                },
                type: Sequelize.QueryTypes.RAW // Use Sequelize.QueryTypes.RAW here
            }
        );

        console.log("Stored procedure executed successfully:", result);
        return result; // You may return result if you need it for further use
    } catch (error) {
        console.error("Error while executing stored procedure:", error.message);
        throw error; // Rethrow the error after logging it
    }
};
let handleUpdateMovie = (movieData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Log movieData để kiểm tra dữ liệu truyền vào
            console.log(movieData);

            // Sử dụng Sequelize để gọi stored procedure UpdateMovie
            const results = await db.sequelize.query(
                `EXEC UpdateMovie :movieId, :movieName, :duration, :trailer, :poster, :premiereDay, :movieLabel`,
                {
                    replacements: {
                        movieId: movieData.movieId,
                        movieName: movieData.movieName,
                        duration: movieData.duration,
                        trailer: movieData.trailer,
                        poster: movieData.poster,
                        premiereDay: movieData.premiereDay,
                        movieLabel: movieData.movieLabel
                    },
                    type: db.sequelize.QueryTypes.RAW // Dùng RAW để gọi stored procedure
                }
            );

            // Kiểm tra kết quả trả về từ stored procedure
            if (results && results.length > 0) {
                console.log('Movie updated successfully.');
                resolve('Movie updated successfully.');
            } else {
                console.log('No movie found with the given ID.');
                resolve('No movie found with the given ID.');
            }
        } catch (error) {
            console.error('Error occurred while updating the movie:', error);
            reject(error); // Trả về lỗi nếu có sự cố
        }
    });
};


let handleGetMovieID = (movieId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let movie = await db.Movie.findOne({
                where: { movieId: movieId },
                raw: true
            });
            resolve(movie);
        } catch (error) {
            reject(error);
        }
    });
}
const handleDeleteMovie = async (movieId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!movieId || typeof movieId !== 'string') {
                throw new Error('movieId is required and must be a string.');
            }

            // Thực hiện gọi procedure DeleteMovie
            const result = await db.sequelize.query(
                `EXEC DeleteMovie :movieId`,
                {
                    replacements: {
                        movieId: movieId,
                    },
                    type: db.Sequelize.QueryTypes.RAW // Sử dụng đúng kiểu RAW
                }
            );

            console.log("Procedure executed successfully:", result);

            resolve(result);
        } catch (error) {
            console.error("Error while executing stored procedure:", error.message);
            reject(error); // Đẩy lỗi ra ngoài để xử lý bên ngoài hàm
        }
    });
};

let handleGetShowTime = (movieId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let showTime = await db.Showtime.findOne({
                where: { movieId: movieId },
                raw: true
            });
            resolve(showTime);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    handleGetMovies: handleGetMovies,
    handleAddMovie: handleAddMovie,
    handleUpdateMovie: handleUpdateMovie,
    handleGetMovieID: handleGetMovieID,
    handleGetShowTime: handleGetShowTime,
    handleDeleteMovie: handleDeleteMovie,
};