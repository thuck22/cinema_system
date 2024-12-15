const express = require("express");
const movieController = require("../controller/movieController");

let router = express.Router();
let initWebRoutes = (app) => {
    router.get("/movie", movieController.handleGetMovies);


    return app.use("/", router);
};
module.exports = initWebRoutes;
