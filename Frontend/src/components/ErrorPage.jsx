import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ErrorPage = ({ message }) => {
  return (
    <Box padding={2} display="flex" flexDirection="column" alignItems="center">
      <img
        src="images/error.jpg" // Placeholder image URL
        alt="Error"
        style={{ marginBottom: 20 }}
      />
      <Typography variant="h4" textAlign="center" margin={4}>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" textAlign="center" marginBottom={2}>
        {message}
      </Typography>
      <Typography variant="body1" textAlign="center">
        <Link to="/">Go back to home page</Link>
      </Typography>
    </Box>
  );
};

export default ErrorPage;
