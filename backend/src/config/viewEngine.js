import express from "express";
let configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views"); // all HTML rendered file will be found in the path src/views
};
module.exports = configViewEngine;
