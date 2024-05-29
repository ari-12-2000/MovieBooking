const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  signup,
  updateUser,
  deleteUser,
  login,
  getBookingsOfUser,
  getUserById,
} = require("../controllers/user-controller.js");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/bookings/:id", getBookingsOfUser);
router.post("/signup", signup);
router.post("/login", login);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
module.exports = router;
