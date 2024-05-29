const bcrypt = require("bcrypt");
const Admin = require("../models/Admin.js");
const { generateToken } = require("../jwt");
const addAdmin = async (req, res, next) => {
  try {
    const data = req.body;
    const { password } = data;
    //salt generation
    const salt = await bcrypt.genSalt(10);
    //hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    let newAdmin = new Admin({ ...data, password: hashedPassword });
    newAdmin = await newAdmin.save();
    res.status(200).json({ newAdmin });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin || !(await existingAdmin.comparePassword(password)))
      return res.status(401).json({ error: "Invalid email or password" });

    const token = generateToken({ id: existingAdmin._id });
    res.status(200).json({ message: "Authentication complete", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    if (!admins) {
      return console.log("Cannot find Admins");
    }

    res.status(200).json(admins);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAdminById = async (req, res, next) => {
  const id = req.params.id;

  let admin;
  try {
    admin = await Admin.findById(id).populate("addedMovies");
    if (!admin) {
      return console.log("Cannot find Admin");
    }
    console.log(admin.password);
  } catch (err) {
    return console.log(err);
  }

  return res.status(200).json({ admin });
};

module.exports = { addAdmin, adminLogin, getAdmins, getAdminById };
