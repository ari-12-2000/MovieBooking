import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  AppBar,
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
import CloseIcon from "@mui/icons-material/Close";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions, adminActions, setSearchTerm } from "../store/index";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [fieldEmpty, setFieldEmpty] = useState(location.pathname === "/");
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

      case "/admin":
      case "/login":  
        setValue(3);
        break;  
      default:
        setValue(-1);
    }
    if (!fieldEmpty)
      //if field is already empty then you should not handle fieldEmpty state (close icon in the searchbar depends on fieldEmpty state).
      setFieldEmpty(location.pathname !== "/movies");

    setIsErrorPage(location.pathname === "/error");
  }, [location.pathname, setIsErrorPage]);

  useEffect(() => {
    if (fieldEmpty) {
      setInputValue("");
      dispatch(setSearchTerm("")); //match with input value to remove array search filter
    }
  }, [fieldEmpty]);

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
        <ListItem key="login" to="/auth" component={Link}>
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
          LinkComponent={NavLink}
          to={location.pathname}
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
        <ListItem key="logout" onClick={() => dispatch(userActions.logout())}
        component={NavLink}
        to={location.pathname}>
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
          LinkComponent={NavLink}
          to={location.pathname}
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
          onClick={() => dispatch(adminActions.logout())}
          component={NavLink}
          to={location.pathname}
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
    setInputValue(e.target.value);
    //when some alphabets or white spaces are entered in the search box this function is called
    let value = e.target.value.trim();
    //if current value is blank and last searchTerm blank return
    if (!value && !searchTerm) {
      // if a case arise input value you made empty through backspace but previous searchterm was not blank and array is filtered based on that, so control should not return and match searchterm with current blank input value through dispatch method (make search filter blank).
      setFieldEmpty(true);
      return;
    }
    setFieldEmpty(false);
    dispatch(setSearchTerm(value)); //matching searchTerm with current value to filter array correctly
    if (location.pathname !== "/movies") navigate("/movies");
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

        <Link to="/" style={{ color: "white", marginRight: 20 }}>
          <MovieCreationIcon />
        </Link>

        <Box
          display="flex"
          border="1px solid grey"
          borderRadius="5px"
          paddingInline="5px"
          width={{ xs: "100%", sm: "350px" }}
          margin="auto"
          gap="10px"
          alignItems={"center"}
          color={"grey"}
        >
          <SearchIcon />
          <TextField
            sx={{
              borderRadius: 2,
              input: { color: "white" },
              bgcolor: "#2b2d42",
              padding: "6px",
              width: "100%",
            }}
            variant="standard"
            placeholder="Search Across Multiple Movies"
            onChange={handleChange} // Material-UI's TextField component's onChange prop behaves like the native input event rather than the change event. This                                                   means it triggers on every keystroke or change.
            disabled={isErrorPage}
            value={inputValue}
          />
          <button
            onClick={() => setFieldEmpty(true)}
            type="button"
            style={{
              backgroundColor: "#2b2d42",
              padding: "5px",
              color: "grey",
              fontSize: "x-small",
            }}
            className={fieldEmpty ? "hidden" : "display"}
          >
            <CloseIcon />
          </button>
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
          <Box display="flex">
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
