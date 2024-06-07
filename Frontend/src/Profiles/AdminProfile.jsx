import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAdminById } from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Loader from "../components/Loader";
import useLoader from "../hooks/useLoader";

const AdminProfile = () => {
  const [admin, setAdmin] = useState();
  const {
    loading,
    showLoader,
    hideLoader,
  } = useLoader();

  useEffect(() => {
    showLoader();
    getAdminById()
      .then((res) => {
        console.log(res.admin);
        setAdmin(res.admin);
        hideLoader();
      })
      .catch((err) => {
        console.log(err);
        hideLoader();
      });
  }, []);

  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      padding={3}
      boxSizing={"border-box"}
    >
      {loading ? (
        <Loader/>
      ) : (
        admin && (
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              md={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <AccountCircleIcon sx={{ fontSize: "10rem" }} />
              <Typography
                mt={1}
                padding={1}
                width="100%"
                textAlign="center"
                border="1px solid #ccc"
                borderRadius={6}
              >
                Email: {admin.email}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              {admin.addedMovies.length > 0 && (
                <>
                  <Typography
                    variant="h3"
                    fontFamily="verdana"
                    textAlign="center"
                  >
                    Added Movies
                  </Typography>
                  <Box width="100%">
                    <List>
                      {admin.addedMovies.map((movie, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            bgcolor: "#00d386",
                            color: "white",
                            textAlign: "center",
                            margin: 1,
                          }}
                        >
                          <ListItemText
                            sx={{ margin: 1, width: "auto", textAlign: "left" }}
                          >
                            Movie: {movie.title}
                          </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </>
              )}
            </Grid>
          </Grid>
        )
      )}
    </Box>
  );
};

export default AdminProfile;
