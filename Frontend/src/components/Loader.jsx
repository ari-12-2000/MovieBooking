import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loader = () => 
  <Box
    display="flex"
    justifyContent="center"
    marginTop={2}
    width="100%"
  >
    <CircularProgress />
  </Box>


export default Loader;
