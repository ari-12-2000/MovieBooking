const Admin = require("../models/Admin");
const Movie = require("../models/Movie");
const mongoose = require("mongoose");

const addMovie = async (req, res) => {
  try {
    const {
      title,
      genre,
      releaseDate,
      posterUrl,
      featured,
      actors,
    } = req.body;
    if (
      !title &&
      title.trim() === "" &&
      !genre &&
      genre.trim() == "" &&
      !posterUrl &&
      posterUrl.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid Inputs" });
    }
    let newMovie = new Movie({
      title,
      genre,
      posterUrl,
      featured,
      actors,
      admin: req.user.id,
      releaseDate: new Date(`${releaseDate}`),
    });

    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(req.user.id);
    session.startTransaction();
    await newMovie.save({ session });
    adminUser.addedMovies.push(newMovie);
    await adminUser.save({ session });
    await session.commitTransaction();
    res.status(200).json({
      newMovie,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMovieById = async (req, res) => {
  const id = req.params.id;

  try {
    const movie = await Movie.findById(id);
    
    res.status(200).json(movie);
    if (!movie) {
      return res.status(404).json({ message: "Invalid Movie ID" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addMovie, getAllMovies, getMovieById };
