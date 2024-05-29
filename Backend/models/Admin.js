const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },

  password: { type: String, minLength: 6 },
  addedMovies: [
    {
      type: mongoose.Types.ObjectId,
      ref:"Movie"
    },
  ],
});

adminSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    //use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

module.exports = mongoose.model("Admin", adminSchema);
