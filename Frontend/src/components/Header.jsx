import React, { useEffect, useState, useCallback } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  IconButton,
  ListItem,
  ListItemText,
  ListItemButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  useMediaQuery,
  Drawer,
  List,
} from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash"; // Import lodash for debounce functionality
import { userActions, adminActions, setSearchTerm } from "../store/index";
import MenuIcon from "@mui/icons-material/Menu";

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for controlling drawer
  const movies = useSelector((state) => state.movies.movies);
  const isMobile = useMediaQuery("(max-width:639px)"); // Check if screen size is less than or equal to 639px

  useEffect(() => {
    switch (location.pathname) {
      case "/movies":
        setValue(0);
        break;

      case "/user-profile":
      case "/admin-profile":
        setValue(1);
        break;

      case "/add":
        setValue(2);
        break;
      default:
        setValue(false);
    }

    setIsErrorPage(location.pathname === "/error");
  }, [location.pathname, setIsErrorPage]);

  const handleMovieSelect = useCallback(
    //if pressed enter or selected movie name from autocomplete section, this functionis called
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
    //whenever tab is changed a new value is set and due to navlink the tab with that corresponding value is highlighted
    setValue(newValue);
  };

  // Toggle drawer state
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const renderTabsORList = (isTab) => {
    const list = [
      <ListItem key="movies" component={NavLink} to="/movies">
        <ListItemButton>
          <ListItemText primary="Movies" />
        </ListItemButton>
      </ListItem>,
    ];

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
          LinkComponent={Link}
          label="Admin"
          disabled={isErrorPage} // Disable the tab if current path is "/error"
        />,
        <Tab
          key="login"
          to="/auth"
          LinkComponent={Link}
          label="Login"
          disabled={isErrorPage} // Disable the tab if current path is "/error"
        />
      );
      list.push(
        <ListItem key="admin" to="/admin" component={Link}>
          <ListItemButton>
            <ListItemText primary="Admin" />
          </ListItemButton>
        </ListItem>,
        <ListItem key="auth" to="/auth" component={Link}>
          <ListItemButton>
            <ListItemText primary="Login" />
          </ListItemButton>
        </ListItem>
      );
    }

    if (isUserLoggedIn) {
      tabs.push(
        <Tab
          key="user-profile"
          LinkComponent={NavLink}
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
      list.push(
        <ListItem key="user-profile" to="/user-profile" component={NavLink}>
          <ListItemButton>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>,
        <ListItem
          key="logout"
          to="/"
          component={Link}
          onClick={() => dispatch(userActions.logout())}
        >
          <ListItemButton>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      );
    }

    if (isAdminLoggedIn) {
      tabs.push(
        <Tab
          key="admin-profile"
          LinkComponent={NavLink}
          to="/admin-profile"
          label="Profile"
          disabled={isErrorPage} // Disable the tab if current path is "/error"
        />,
        <Tab
          key="add-movie"
          LinkComponent={NavLink}
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
      list.push(
        <ListItem key="admin-profile" to="/admin-profile" component={NavLink}>
          <ListItemButton>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>,
        <ListItem key="add-movie" to="/add" component={NavLink}>
          <ListItemButton>
            <ListItemText primary="Add Movie" />
          </ListItemButton>
        </ListItem>,

        <ListItem
          key="admin-logout"
          to="/"
          component={Link}
          onClick={() => dispatch(adminActions.logout())}
        >
          <ListItemButton>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      );
    }

    return isTab ? tabs : list;
  };

  const handleChange = (e) => {
    //when some alphabets or white spaces are entered in the search box this function is called
    let value = e.target.value.trim();
    if (!value && location.pathname !== "/movies") return;
    dispatch(setSearchTerm(value));
    navigate("/movies"); // to load the movies such that it shows items according to current search term component whenever searchterm is updated
    console.log(value);
    console.log(searchTerm);
  };

  const handleKeyUp = (e) => {
    //when enter, backspace key is pressed we need this function to handle that state
    let value = e.target.value.trim();
    if (e.key === "Backspace" && !value) {
      // when search box is cleared with backspace key
      dispatch(setSearchTerm(""));
      if (location.pathname === "/movies") navigate("/movies"); // to load the movies such that it shows items according to current search term component whenever searchterm is updated
    }
    if (e.key === "Enter") {
      handleMovieSelect(e.target.value);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          sx={{
            mr: 2,
            display: { sm: "none" },
            "&:focus": {
              outline: "none",
            },
          }} // Hide the hamburger menu on tablet screens and above
        >
          <MenuIcon />
        </IconButton>
       
          <Link to="/" style={{ color: "white", marginRight:20 }}>
            <MovieCreationIcon />
          </Link>
        
        <Box
          width={{xs:"100%", sm:"300px"}}
          margin="auto"
         
        >
          <Autocomplete
            onChange={(e, val) => handleMovieSelect(val)}
            sx={{
              width:"100%",
              borderRadius: 10,
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
        {isMobile ? (
          <Drawer
            anchor="left" // Start the Drawer from the left side
            open={isDrawerOpen}
            onClose={toggleDrawer}
            sx={{
              "& .MuiDrawer-paper": {
                width: "250px", // Set the width of the drawer
              },
            }}
          >
            <List>
              <ListItem key="image">
                <img
                  src="images/cinema.jpg" // Adjust the path if needed
                  alt="Cinema"
                  style={{ width: "100%" }}
                />
              </ListItem>
              {renderTabsORList(false).map((item) => (
                <ListItem
                  key={item.key}
                  component={NavLink}
                  to={item.props.to}
                  sx={{
                    color: "black",
                    "&:hover": { color: "black", backgroundColor: "#DDDAD9" },
                    "&.active": {
                      background: "black",
                      color: "white",
                      "&:hover": { color: "white" },
                    },
                  }}
                >
                  <ListItemButton>
                    <ListItemText
                      primary={item.props.children.props.children.props.primary}
                      sx={{
                        textTransform: "uppercase",
                        marginLeft: "30px",
                        ".MuiListItemText-primary": {
                          fontWeight: "bold",
                          fontFamily: "Poppins",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        ) : (
          <Box display="flex" >
            <Tabs
              onChange={handleTabChange}
              value={value}
              textColor="inherit"
              TabIndicatorProps={{
                style: {
                  background: "#CB0101", // Change the indicator color to red
                },
              }}
            >
              {renderTabsORList(true)}
            </Tabs>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
