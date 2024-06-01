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
        margin: 2,
        width: "auto",
        height: "auto",
        borderRadius: 5,
        padding: 2,
        "&:hover": { boxShadow: "10px 10px 20px #ccc" },
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img
        src={posterUrl}
        alt={title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
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
          sx={{ margin: "auto" }}
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
