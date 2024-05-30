import { Box, Grid, List, ListItem, ListItemText, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAdminById } from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AdminProfile = () => {
  const [admin, setAdmin] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminById()
      .then((res) => {
        console.log(res.admin);
        setAdmin(res.admin);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center" padding={3}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      ) : (
        admin && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} display="flex" flexDirection="column" alignItems="center">
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
            <Grid item xs={12} md={8} display="flex" flexDirection="column" alignItems="center">
              {admin.addedMovies.length > 0 && (
                <>
                  <Typography variant="h3" fontFamily="verdana" textAlign="center" padding={2}>
                    Added Movies
                  </Typography>
                  <Box width="100%" display="flex" justifyContent="center">
                    <List sx={{ width: "80%" }}>
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
                          <ListItemText sx={{ margin: 1, width: "auto", textAlign: "left" }}>
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
