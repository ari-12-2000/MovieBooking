import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MovieItem from "./Movies/MovieItem";

const HomePage = () => {
  const movies = useSelector((state) => state.movies.movies);
  const status = useSelector((state) => state.movies.status);
  const searchTerm = useSelector((state) => state.movies.searchTerm);
  const navigate = useNavigate();
  
  const isLoading = status === "loading";
  const isError = status === "failed";

  const renderLoader = () => (
    <Box
      padding={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  );

  const renderMovies = () => (
    <Box
      padding={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box width="80%" height="66vh">
        <img
          src="https://i.ytimg.com/vi/bweRG6WueuM/maxresdefault.jpg"
          alt="Brahmastra"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <Typography variant="h4" textAlign="center" margin={4}>
        Latest Releases
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={2}
        width="80%"
      >
        {movies &&
          movies.slice(0, 4).map((movie, index) => (
            <MovieItem
              id={movie._id}
              title={movie.title}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              genre={movie.genre}
              key={index}
            />
          ))}
      </Box>

      <Button
        component={Link}
        to="/movies"
        variant="outlined"
        sx={{ marginTop: 4 }}
      >
        View All Movies
      </Button>
    </Box>
  );


  useEffect(() => {
    if (isError) {
      navigate("/error");
    }
  }, [isError, navigate]);

  return isLoading ? renderLoader() : renderMovies();
};

export default HomePage;
