import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({ title, releaseDate, posterUrl, id, genre }) => {
 
  return (
    <Card
      sx={{
        marginTop: 2,
        padding:1,
        borderRadius: 5,
        "&:hover": { boxShadow: "10px 10px 20px #ccc" },
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
       
      }}
    >
      <img
        src={posterUrl}
        alt={title}
       height="100%"
       width="100%"
       object-fit="cover"
        
      />
      <CardContent >
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {genre}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          to={`/booking/${id}`}
        
          size="small"
          variant="contained"
          fullWidth
         
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
