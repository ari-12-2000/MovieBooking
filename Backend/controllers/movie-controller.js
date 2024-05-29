const Admin = require("../models/Admin");
const Movie = require("../models/Movie");
const mongoose = require("mongoose");

const addMovie = async (req, res) => {
  try {
    const { title, genre, releaseDate, posterUrl, featured, actors } = req.body;

    // Validate inputs
    if (
      !title || title.trim() === "" ||
      !genre || genre.trim() === "" ||
      !posterUrl || posterUrl.trim() === "" ||
      !releaseDate || !Date.parse(releaseDate) ||
      !actors || !Array.isArray(actors) || actors.length === 0
    ) {
      return res.status(422).json({ message: "Invalid Inputs" });
    }

    // Find admin user
    const adminUser = await Admin.findById(req.user.id);
  

    // Create new movie
    let movie = new Movie({
      title,
      genre,
      releaseDate: new Date(releaseDate),
      posterUrl,
      featured: !!featured, // Ensure boolean value
      actors,
      admin: req.user.id,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    await movie.save({ session });
    adminUser.addedMovies.push(movie);
    await adminUser.save({ session });
    await session.commitTransaction();

    res.status(201).json({ movie });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMovieById = async (req, res) => {
  const id = req.params.id;

  try {
    const movie = await Movie.findById(id);
    
    res.status(200).json(movie);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cannot find movie" });
  }
};

module.exports = { addMovie, getAllMovies, getMovieById };
