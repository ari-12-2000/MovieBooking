const mongoose = require("mongoose");
const mongoURL = `mongodb+srv://arikum12000:${process.env.MONGODB_PASSWORD}@cluster0.xcek0zz.mongodb.net/`
mongoose.connect(mongoURL)

//Mongoose maintains a default connection object representing the mongoDB connection
const db = mongoose.connection;

//define event listeners for database connection

db.on("connected", () => {
  console.log("Connected to mongoDB Server");
});

db.on("error", (err) => {
  console.error("MongoDB connection error", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

//Export the database connection
module.exports=db;
