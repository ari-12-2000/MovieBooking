import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  deleteBooking,
  getUserBooking,
  getUserDetails,
} from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const UserProfile = () => {
  const [bookings, setBookings] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getUserBooking(), getUserDetails()])
      .then(([bookingsRes, userRes]) => {
        setBookings(bookingsRes.bookings);
        setUser(userRes.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id, index) => {
    deleteBooking(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setBookings(bookings.filter((_, i) => i !== index));
  };

  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} width="100%" height="100%">
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {user && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              width={{ xs: "100%", md: "30%" }}
              padding={3}
            >
              <AccountCircleIcon sx={{ fontSize: "10rem" }} />
              <Typography
                padding={1}
                width={"auto"}
                textAlign={"center"}
                border={"1px solid #ccc"}
                borderRadius={6}
                mt={2}
              >
                Name: {user.name}
              </Typography>
              <Typography
                mt={1}
                padding={1}
                width={"auto"}
                textAlign={"center"}
                border={"1px solid #ccc"}
                borderRadius={6}
              >
                Email: {user.email}
              </Typography>
            </Box>
          )}
          {bookings && (
            <Box
              width={{ xs: "100%", md: "70%" }}
              display="flex"
              flexDirection="column"
              padding={3}
            >
              <Typography
                variant="h3"
                fontFamily="verdana"
                textAlign="center"
                padding={2}
              >
                Bookings
              </Typography>
              <Box
                margin={"auto"}
                display="flex"
                flexDirection="column"
                width="80%"
              >
                <List>
                  {bookings.map((booking, index) => (
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
                        Movie: {booking.movie.title}
                      </ListItemText>
                      <ListItemText
                        sx={{ margin: 1, width: "auto", textAlign: "left" }}
                      >
                        Seat: {booking.seatNumber}
                      </ListItemText>
                      <ListItemText
                        sx={{ margin: 1, width: "auto", textAlign: "left" }}
                      >
                        Date: {new Date(booking.date).toDateString()}
                      </ListItemText>
                      <IconButton
                        onClick={() => handleDelete(booking._id, index)}
                        color="error"
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default UserProfile;
