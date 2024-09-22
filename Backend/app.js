const express = require("express");
require("dotenv").config();
const db = require("./db");
const app = express();
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const movieRoutes = require("./routes/movieRoutes");
const bookingsRoutes = require("./routes/bookingsRoutes");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
// Use cors middleware
app.use(cors());
app.use(express.json()); // Ensure that your Express application has middleware set up to parse incoming JSON data. You can use express.json() middleware to automatically parse JSON requests.
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/movie", movieRoutes);
app.use("/booking", bookingsRoutes);


app.listen(PORT, () => {
  console.log("Server is running");
});
