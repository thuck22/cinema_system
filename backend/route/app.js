const express = require("express");
const movieController = require("../controller/movieController");

let router = express.Router();
let initWebRoutes = (app) => {
    router.get("/movie", movieController.handleGetMovies);
    router.get("/movie/:id", movieController.handleGetMovieID);
    router.post("/create-movie", movieController.handleAddMovies);
    router.put("/update-movie", movieController.handleUpdateMovie);
    router.delete("/delete-movie/:id", movieController.handleDeleteMovie);

    router.get("/showTime/:id", movieController.handleGetShowTime);


    return app.use("/", router);
};
module.exports = initWebRoutes;
