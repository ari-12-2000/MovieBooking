const express = require("express");
const {
  addAdmin,
  adminLogin,
  getAdmins,
  getAdminById,
} = require("../controllers/admin-controller.js");
const router = express.Router();

router.get("/:id", getAdminById);
router.get("/", getAdmins);
router.post("/signup", addAdmin);
router.post("/login", adminLogin);

module.exports = router;
