const express = require("express");
const router = express.Router();

const {newBooking, getBookingById, deleteBooking} = require("../controllers/bookings-controller.js");

router.get("/:id", getBookingById)
router.post("/", newBooking);
router.delete("/:id",deleteBooking)

module.exports = router;
