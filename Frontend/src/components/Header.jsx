import React, { useEffect, useState, useCallback } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash"; // Import lodash for debounce functionality
import { userActions, adminActions, setSearchTerm } from "../store/index";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);
  const [isErrorPage, setIsErrorPage] = useState(
    location.pathname === "/error"
  );

  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const searchTerm = useSelector((state) => state.movies.searchTerm);
  

  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies.movies);

  useEffect(() => {
    switch (location.pathname) {
      case "/movies":
        setValue(0);
        break;
      case "/admin":
      case "/user-profile":
      case "/admin-profile":
        setValue(1);

        break;
      case "/auth":
      case "/add":
        setValue(2);

        break;
      default:
        setValue(false);
    }
  

    setIsErrorPage(location.pathname === "/error");
  }, [location.pathname, setIsErrorPage]);

  const handleMovieSelect = useCallback(
    _.debounce((val) => {
      console.log(val);
      dispatch(setSearchTerm(val));
      if (val && val.trim() !== "") {
        const movie = movies.find(
          (mov) => mov.title.toLowerCase() === val.toLowerCase()
        );

        if (isUserLoggedIn) {
          if (movie) navigate(`/booking/${movie._id}`);
          else navigate("/error");
        } else {
          navigate("/auth");
        }
      }
    }, 300),
    [movies, isUserLoggedIn, navigate]
  );

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabs = () => {
    const tabs = [
      <Tab
        key="movies"
        to="/movies"
        LinkComponent={NavLink}
        label="Movies"
        disabled={isErrorPage} // Disable the tab if current path is "/error"
      />,
    ];

    if (!isAdminLoggedIn && !isUserLoggedIn) {
      tabs.push(
        <Tab
          key="admin"
          to="/admin"
          LinkComponent={NavLink}
          label="Admin"
          disabled={isErrorPage} // Disable the tab if current path is "/error"
        />,
        <Tab
          key="login"
          to="/auth"
          LinkComponent={NavLink}
          label="Login"
          disabled={isErrorPage} // Disable the tab if current path is "/error"
        />
      );
    }

    if (isUserLoggedIn) {
      tabs.push(
        <Tab
          key="user-profile"
          LinkComponent={Link}
          to="/user-profile"
          label="Profile"
          disabled={isErrorPage} // Disable the tab if current path is "/error"
        />,
        <Tab
          key="logout"
          onClick={() => dispatch(userActions.logout())}
          LinkComponent={Link}
          to="/"
          label="Logout"
          disabled={isErrorPage} // Disable the tab if current path is "/error"
        />
      );
    }

    if (isAdminLoggedIn) {
      tabs.push(
        <Tab
          key="admin-profile"
          LinkComponent={Link}
          to="/admin-profile"
          label="Profile"
          disabled={isErrorPage} // Disable the tab if current path is "/error"
        />,
        <Tab
          key="add-movie"
          LinkComponent={Link}
          to="/add"
          label="Add Movie"
          disabled={isErrorPage} // Disable the tab if current path is "/error"
        />,
        <Tab
          key="admin-logout"
          onClick={() => dispatch(adminActions.logout())}
          LinkComponent={Link}
          to="/"
          label="Logout"
          disabled={isErrorPage} // Disable the tab if current path is "/error"
        />
      );
    }

    return tabs;
  };

  const handleChange = (e) => {
    let value = e.target.value.trim();
    if (!value && location.pathname!=="/movies") return;
    dispatch(setSearchTerm(value));
    navigate("/movies");
    console.log(value);
    console.log(searchTerm);
  };

  const handleKeyUp = (e) => {
  let value=e.target.value.trim();
    if (e.key === "Backspace" && !value) {
     
      dispatch(setSearchTerm(""));
    if(location.pathname==="/movies")  
      navigate("/movies");
    }
    if (e.key === "Enter") {
      handleMovieSelect(e.target.value);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width="20%">
          <Link to="/" style={{ color: "white" }}>
            <MovieCreationIcon />
          </Link>
        </Box>
        <Box width="50%" marginRight="auto" marginLeft="auto" >
          <Autocomplete
            onChange={(e, val) => handleMovieSelect(val)}
            sx={{
              borderRadius: 10,
              width: "40%",
              margin: "auto",
              pointerEvents: isErrorPage ? "none" : "auto", // Disable the search box if current path is "/error"
            }}
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{
                  borderRadius: 2,
                  input: { color: "white" },
                  bgcolor: "#2b2d42",
                  padding: "6px",
                }}
                variant="standard"
                placeholder="Search Across Multiple Movies"
                {...params}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                disabled={isErrorPage} // Disable the search box if current path is "/error"
              />
            )}
            disabled={isErrorPage}
            
          />
        </Box>
        <Box display="flex">
          <Tabs
            onChange={handleTabChange}
            value={value}
            textColor="inherit"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#CB0101", // Change the indicator color to red
              },
            }}
          >
            {renderTabs()}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
