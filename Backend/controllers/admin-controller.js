const bcrypt = require("bcrypt");
const Admin = require("../models/Admin.js");
const { generateToken } = require("../jwt");
const addAdmin = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
     name.trim() ||
    !email ||
    !email.trim() ||
    !password ||
    !password.trim() 
   
  ) {
    return res.status(500).json({ message: "Invalid Inputs" });
  }

  try {
    const data = req.body;
    const { password } = data;
    //salt generation
    const salt = await bcrypt.genSalt(10);
    //hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    let admin = new Admin({ ...data, password: hashedPassword });
    admin = await admin.save();
    if(!admin)
      res.status(500).json({ message: "Unable to store Admin" });
    res.status(200).json({ admin });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin && !existingAdmin.trim() || !(await existingAdmin.comparePassword(password)))
      return res.status(500).json({ message: "Invalid email or password" });

    const token = generateToken({ id: existingAdmin._id });
    res.status(200).json({ message: "Authentication complete", token, id: existingAdmin._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    if (!admins) {
      return res.status(500).json({ message: "Cannot find admins" });
    }

    res.status(200).json(admins);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAdminById = async (req, res, next) => {
  const id = req.params.id;

  let admin;
  try {
    admin = await Admin.findById(id).populate("addedMovies");
    if (!admin) {
      return res.status(500).json({ message: "Cannot find admin" });
    }
    
  } catch (err) {
    return res.status(500).json({ message: "Cannot find admin" });
  }

  return res.status(200).json({ admin });
};

module.exports = { addAdmin, adminLogin, getAdmins, getAdminById };
