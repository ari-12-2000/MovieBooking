import React, { useEffect, useState } from "react";
import {
  Button,
  FormLabel,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";

const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newBooking({ ...inputs, movie: movie._id })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid Input or inputs already used");
      });
  };

  return (
    <Box padding={2}>
    <Typography color="error">THIS PAGE IS NOT FOR ADMIN USERS </Typography>
      {movie && (
        <>
          <Typography
            padding={3}
            fontFamily="fantasy"
            variant="h4"
            textAlign="center"
          >
            Book Tickets For Movie: {movie.title}
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Paper elevation={3}>
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "70vh",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <Box padding={2}>
                  <Typography>{movie.genre}</Typography>
                  <Typography fontWeight="bold" marginTop={1}>
                    Starring:
                    {movie.actors.map((actor, index) => (
                      <span key={index}> {actor} </span>
                    ))}
                  </Typography>
                  <Typography fontWeight="bold" marginTop={1}>
                    Release Date: {new Date(movie.releaseDate).toDateString()}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <form onSubmit={handleSubmit}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    padding={3}
                  >
                    <FormLabel>Seat Number</FormLabel>
                    <TextField
                      name="seatNumber"
                      value={inputs.seatNumber}
                      onChange={handleChange}
                      type="number"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                    <FormLabel>Booking Date</FormLabel>
                    <TextField
                      name="date"
                      type="date"
                      margin="normal"
                      variant="outlined"
                      value={inputs.date}
                      onChange={handleChange}
                      fullWidth
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                    >
                      Book Now
                    </Button>
                  </Box>
                  {error && (
                    <Typography
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      color="red"
                    >
                      {error}
                    </Typography>
                  )}
                </form>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Booking;
