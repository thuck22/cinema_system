const movieService = require("../services/movieService");

let handleGetMovies = async (req, res) => {
    let movies = await movieService.handleGetMovies();
    //console.log("Get all movies: ", movies);
    return res.status(200).json({
        movies: movies || [],
    });
};

let handleAddMovies = async (req, res) => {
    try {
        // Lấy dữ liệu từ body
        let data = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!data) {
            return res.status(400).json({
                message: "Missing required data"
            });
        }

        // Gọi hàm trong service để thêm phim
        let newMovie = await movieService.handleAddMovie(data);

        // Trả kết quả thành công
        return res.status(201).json({
            message: "Movie added successfully",
            data: newMovie
        });
    } catch (e) {
        console.error("Error adding movie:", e); // Ghi log lỗi để theo dõi
        return res.status(500).json({
            message: "Internal server error",
            error: e.message || "Unknown error" // Trả lỗi rõ ràng hơn
        });
    }
};

let handleUpdateMovie = async (req, res) => {
    const movie = req.body;
    await movieService.handleUpdateMovie(movie);

    return res.status(200).json({
        "Message": "Add successfull"
    })
}
let handleDeleteMovie = async (req, res) => {
    const id = req.params.id;

    await movieService.handleDeleteMovie(id);

    return res.status(200).json({
        message: "Delete succesfully",
        raw: true
    });
}

let handleGetMovieID = async (req, res) => {
    const id = req.params.id;

    let movie = await movieService.handleGetMovieID(id);

    return res.status(200).json({
        movie: movie || [],
        raw: true
    });
}

let handleGetShowTime = async (req, res) => {
    const id = req.params.id;

    let showTime = await movieService.handleGetShowTime(id);

    return res.status(200).json({
        showTime: showTime || [],
        raw: true
    });
}

let handleCreateTicket = async (req, res) => {
    try {
        // Lấy dữ liệu từ body
        let data = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!data) {
            return res.status(400).json({
                message: "Missing required data"
            });
        }

        // Gọi hàm trong service để thêm vé
        let newTicket = await movieService.handleCreateTicket(data);

        // Trả kết quả thành công
        return res.status(201).json({
            message: "Ticket created successfully",
            data: newTicket
        });
    } catch (e) {
        console.error("Error creating ticket:", e); // Ghi log lỗi để theo dõi
        return res.status(500).json({
            message: "Internal server error",
            error: e.message || "Unknown error" // Trả lỗi rõ ràng hơn
        });
    }
}

module.exports = {
    handleGetMovies: handleGetMovies,
    handleAddMovies: handleAddMovies,
    handleUpdateMovie: handleUpdateMovie,
    handleDeleteMovie: handleDeleteMovie,
    handleGetMovieID: handleGetMovieID,
    handleGetShowTime: handleGetShowTime,
    handleCreateTicket: handleCreateTicket,
};
