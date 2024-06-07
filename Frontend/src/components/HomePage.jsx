import { Box, Button,Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import { useEffect } from "react";
import MovieItem from "./Movies/MovieItem";
import Loader from "./Loader";

const HomePage = () => {
  const movies = useSelector((state) => state.movies.movies);
  const status = useSelector((state) => state.movies.status);
  const navigate = useNavigate();
  const isError = status === "failed";
  
  const renderMovies = () => (
    <Box
      padding={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      
    >
      <Box width="auto" height="80vh" >
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

      <Box display="flex" flexWrap="wrap" justifyContent={"center"} width="80%" gap={4} > 
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

  return status === "loading" ? <Loader/> : renderMovies();
};

export default HomePage;
