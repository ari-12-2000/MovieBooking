const Bookings = require("../models/Bookings");
const User = require("../models/User");
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    console.log("data fetched");
    res.status(200).json(users); //res.status(200).json(users), you are sending the users array as the JSON response directly.  Wrapping users in curly braces would create a new JSON object with users as a property, which is not necessary in this case since you want to send the array directly.
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const signup = async (req, res, next) => {
  try {

  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" ||
    !email &&
    email.trim() === "" ||
    !password &&
    password.trim() === ""
  ) {
    return res.status(500).json({ message: "Invalid Inputs" });
  }
    const data = req.body;
    let newUser = new User(data);
    newUser = await newUser.save();
    if(!newUser)
      return res.status(500).json({ message: "Unexpected Error Occured" });
    res.status(200).json({ id: newUser._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body;

    let response = await User.findById(userId);

    if (!response) {
      return res.status(404).json({ message: "User not found" });
    } // Update user data
    response.set(updatedUserData);

    // Save the updated user, which will trigger middleware
    response = await response.save();
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const response = await User.findByIdAndDelete(userId);
    if (!response) {
      return res.status(404).json({ message: "Person not found" });
    }
    console.log("data deleted");
    res.status(200).json({ message: "Person deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email && email.trim() === "" || !password && password.trim() === "") {
    return res.status(500).json({ message: "Invalid Inputs" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(500).json({ message: "Invalid email or password" });
      //user.password will give the original password in database
    }

    res
      .status(200)
      .json({ message: "Logged in successfully", id: user._id });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBookingsOfUser = async (req, res) => {
  try {
    const id = req.params.id;
    let bookings = await Bookings.find({ user: id })
      .populate("movie")
      .populate("user");
    if (!bookings)
      return res.status(404).json({ message: "No bookings found for the user" });
    res.status(200).json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  signup,
  updateUser,
  deleteUser,
  login,
  getBookingsOfUser,
  getUserById,
};
