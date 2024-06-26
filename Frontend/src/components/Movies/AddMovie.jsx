import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { addMovie } from "../../api-helpers/api-helpers";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../../store";
import { useDispatch } from "react-redux";
import useLoader from "../../hooks/useLoader";
import Loader from "../Loader";

const labelProps = {
  mt: 1,
  mb: 1,
};
const AddMovie = () => {
  const [error, setError] = useState('')
  const {
    loading,
    showLoader,
    hideLoader,
  }=useLoader();
  const [inputs, setInputs] = useState({
    title: "",
    genre: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    showLoader();
    addMovie({ ...inputs, actors })
      .then((res) => {
        dispatch(fetchMovies());
        navigate("/");
        hideLoader();
      })
      .catch((err) =>{hideLoader(); setError("Invalid Input or inputs already used")});
  };
  return (
  
      <form onSubmit={handleSubmit} >
        <Box
          width={{xs:"100%", sm:"max(50%, 600px)"}}
          padding={5}
          margin="auto"
          display={"flex"}
          flexDirection="column"
          boxShadow={"10px 10px 20px #ccc"}
          sx={{ boxSizing: 'border-box' }} 
          
        >
          <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
            Add New Movie
          </Typography>
          <FormLabel sx={labelProps}>Title</FormLabel>
          <TextField
            value={inputs.title}
            onChange={handleChange}
            name="title"
            variant="standard"
            margin="normal"
            
          />
          <FormLabel sx={labelProps}>Genre</FormLabel>
          <TextField
            value={inputs.genre}
            onChange={handleChange}
            name="genre"
            variant="standard"
            margin="normal"
            width="70%"
          />
          <FormLabel sx={labelProps}>Poster URL</FormLabel>
          <TextField
            value={inputs.posterUrl}
            onChange={handleChange}
            name="posterUrl"
            variant="standard"
            margin="normal"
            width="70%"
          />
          <FormLabel sx={labelProps}>Release Date</FormLabel>
          <TextField
            type={"date"}
            value={inputs.releaseDate}
            onChange={handleChange}
            name="releaseDate"
            variant="standard"
            margin="normal"
            width="70%"
          />
          <FormLabel sx={labelProps}>Actor</FormLabel>
          <Box display={"flex"}>
            <TextField
              value={actor}
              name="actor"
              onChange={(e) => setActor(e.target.value)}
              variant="standard"
              margin="normal"
              width="70%"
            />
            <Button
              onClick={() => {
                setActors([...actors, actor]);
                setActor("");
              }}
            >
              Add
            </Button>
          </Box>
          <FormLabel sx={labelProps}>Featured</FormLabel>
          <Checkbox
            name="fetaured"
            checked={inputs.featured}
            onClick={(e) =>
              setInputs((prevSate) => ({
                ...prevSate,
                featured: e.target.checked,
              }))
            }
            sx={{ mr: "auto" }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "30%",
              minWidth:"200px",
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
            }}
          >
            Add New Movie
          </Button>
          {error && (
            <Typography variant="h6" textAlign={"center"} color="error">
              {error}
            </Typography>
          )}

          {loading && (
       <Loader/>
      )}
        </Box>
    
         
        
      </form>
    
  );
};

export default AddMovie;
