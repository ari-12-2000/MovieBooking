import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MovieItem from "./MovieItem";
import { useDispatch, useSelector } from "react-redux";
import { setKeyValue, fetchMovies } from "../../store";

const Movies = () => {
  const navigate = useNavigate();
  const searchTerm = useSelector((state) => state.movies.searchTerm);
  const key = useSelector((state) => state.movies.key);
  const value = useSelector((state) => state.movies.value);
  const movies = useSelector((state) => state.movies.movies);
  const status = useSelector((state) => state.movies.status);
  const dispatch = useDispatch();

  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [boxHeight, setBoxHeight] = useState(window.innerHeight);

  const handleFilterData = (attkey, attvalue) => {
    dispatch(setKeyValue({ key: attkey, value: attvalue }));
  };


  useEffect(() => {
    
    let filtered = movies;

    if (searchTerm) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (key && value) {
      filtered = filtered.filter((movie) => movie[key] === value);
    }

    setFilteredMovies(filtered);
  }, [movies, searchTerm, key, value]);

  useEffect(() => {
    if (status === "failed") {
      navigate("/error");
    }
  }, [status, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const newHeight = Math.max(window.innerHeight, window.innerHeight + window.scrollY);
      setBoxHeight(newHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (status === "loading") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200%"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding={6}
        sx={{ backgroundColor: "black", width: "20%", height: `${boxHeight}px` }}
      >
        <Button
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            color: "white",
            border: "none",
            backgroundColor: "inherit",
            textTransform: "none",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: "inherit",
            },
          }}
        >
          <Typography>Genre</Typography>
        </Button>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "black",
            color: "white",
          }}
        >
          {["Action", "Comedy", "Drama"].map((genre, index) => (
            <Box
              key={index}
              sx={{
                marginTop: 2,
                color: "white",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              <input
                style={{ marginLeft: "8px" }}
                type="checkbox"
                id={`genre-${index}`}
                name={`genre-${index}`}
                value={genre}
                checked={value === genre}
                onChange={(e) =>
                  handleFilterData("genre", e.target.checked ? genre : "")
                }
              />
              <label style={{ marginLeft: "8px" }} htmlFor={`genre-${index}`}>
                {genre}
              </label>
            </Box>
          ))}
        </Box>
      </Box>
      <Box marginTop={1} width="80%">
        <Typography
          margin="auto"
          variant="h4"
          padding={2}
          sx={{
            width: "40%",
            bgcolor: "#900C3F",
            color: "white",
            textAlign: "center",
          }}
        >
          All Movies
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap={2}
          padding={2}
        >
          {filteredMovies &&
            filteredMovies.map((movie, index) => (
              <MovieItem
                key={index}
                id={movie._id}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                title={movie.title}
                genre={movie.genre}
              />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Movies;
