const express = require("express");
const router = express.Router();
const {
  addMovie,
  getAllMovies,
  getMovieById,
} = require("../controllers/movie-controller.js");
const { jwtAuthMiddleware } = require("../jwt");

router.post("/", jwtAuthMiddleware, addMovie);
router.get("/", getAllMovies);
router.get("/:id", getMovieById);

module.exports = router;
