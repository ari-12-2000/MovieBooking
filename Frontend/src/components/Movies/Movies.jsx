import React, { useEffect, useState } from "react";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MovieItem from "./MovieItem";
import { useDispatch, useSelector } from "react-redux";
import { setKeyValue } from "../../store";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Movies = () => {
  const navigate = useNavigate();
  const searchTerm = useSelector((state) => state.movies.searchTerm);
  const key = useSelector((state) => state.movies.key);
  const value = useSelector((state) => state.movies.value);
  const movies = useSelector((state) => state.movies.movies);
  const status = useSelector((state) => state.movies.status);
  const dispatch = useDispatch();
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

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

  const handleToggleFilter = () => {
    setIsFilterVisible((prev) => !prev);
  };

  if (status === "loading") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex">
      <Box
        sx={{
          backgroundColor: "black",
          width: { xs: isFilterVisible ? "max(40%,200px)" : "0", md: "20%" },
          overflow: "hidden",
          transition: "width 0.3s",
          display: "flex",
          zIndex: { xs: isFilterVisible && 2 },
          position: "fixed",
          height: "100vh",
          
        }}
        justifyContent={"center"}
      >
        <IconButton
          onClick={handleToggleFilter}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            color: "white",
            display: { xs: isFilterVisible && "block", md: "none" },
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <CloseRoundedIcon />
        </IconButton>

        <Box marginTop={6}>
          <Typography color="white">Genre</Typography>
          {["Action", "Comedy", "Drama"].map((genre, index) => (
            <Box
              key={index}
              sx={{
                marginTop: 2,
                color: "white",
                "&:hover": {
                  backgroundColor: "#333",
                },
                cursor: "pointer",
              }}
            >
              <input
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
      <Box marginTop={1} sx={{ width: { md: "80%" }, marginLeft: "auto" }}>
        <Typography
          margin="auto"
          variant="h4"
          padding={2}
          sx={{
            width: { xs: "90%", md: "40%" },
            bgcolor: "#900C3F",
            color: "white",
            textAlign: "center",
          }}
        >
          All Movies
        </Typography>
        <Box
          border="1px solid black"
          borderRadius={1}
          padding={0.2}
          marginLeft={2}
          marginTop={2.5}
          sx={{
            display: { xs: "inline-block", md: "none" },
            cursor: "pointer",
          }}
          onClick={handleToggleFilter}
        >
          <HiAdjustmentsHorizontal style={{ fontSize: "2rem" }} />
        </Box>
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
