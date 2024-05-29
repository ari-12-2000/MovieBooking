const express = require("express");
require("dotenv").config();
const db = require("./db");
const app = express();
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const movieRoutes = require("./routes/movieRoutes");
const bookingsRoutes = require("./routes/bookingsRoutes");
const PORT = process.env.PORT || 5000;
app.use(express.json()); // Ensure that your Express application has middleware set up to parse incoming JSON data. You can use express.json() middleware to automatically parse JSON requests.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Auth-Token, Origin, Authorization"
  );
  next();
});
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/movie", movieRoutes);
app.use("/booking", bookingsRoutes);


app.listen(PORT, () => {
  console.log("Server is running");
});
