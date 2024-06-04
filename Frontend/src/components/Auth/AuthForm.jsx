import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "react-router-dom";
const labelStyle = { mt: 1, mb: 1 };

const AuthForm = ({ onSubmit, isAdmin, error, setLoading, loading }) => {
  const isMobile = useMediaQuery("(max-width:639px)");
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    onSubmit({ inputs, signup: isAdmin ? false : isSignup });
  };
  return (
    <Dialog 
      fullScreen={isMobile}
      sx={{
        ".MuiDialog-paper": {
          borderRadius: { sm: "20px" },
        },
      }}
      open={true}
    >
      <IconButton sx={{ ml: "auto", padding: 2 }} LinkComponent={Link} to="/">
        <CloseRoundedIcon />
      </IconButton>

      <Typography variant="h4" textAlign={"center"}>
        {isAdmin ? "Admin" : "User"} {isSignup ? " Signup" : " Login"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection="column"
          margin="auto"
          alignContent={"center"}
          sx={{ padding: { xs: 3, sm: 6 } ,width:{  sm: 400 }}}
          
        >
          {!isAdmin && isSignup && (
            <>
              <FormLabel sx={labelStyle}>Name</FormLabel>
              <TextField
                value={inputs.name}
                onChange={handleChange}
                margin="normal"
                variant="standard"
                type={"text"}
                name="name"
              />
            </>
          )}
          <FormLabel sx={labelStyle}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"email"}
            name="email"
          />
          <FormLabel sx={labelStyle}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"password"}
            name="password"
          />
          <Button
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
            type="submit"
            fullWidth
            variant="contained"
          >
            {isSignup ? "Signup" : "Login"}
          </Button>
          {!isAdmin && (
            <Button
              onClick={() => setIsSignup(!isSignup)}
              sx={{ mt: 2, borderRadius: 10 }}
              fullWidth
            >
              Switch To {isSignup ? "Login" : "Signup"}
            </Button>
          )}
          {error && (
            <Typography variant="h6" textAlign={"center"} color="error">
              {error}
            </Typography>
          )}

          {loading && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              width="100%"
              marginTop={2}
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;
