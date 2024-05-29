const Bookings = require("../models/Bookings");
const Movie = require("../models/Movie");
const User = require("../models/User");
const mongoose=require('mongoose')
const newBooking = async (req, res) => {
  try {
    const data = req.body;
    const { date, movie, user } = data;
    let booking = new Bookings({
      ...data,
      date: new Date(`${date}`),
    });

    let existingMovie = await Movie.findById(movie);
    let existingUser = await User.findById(user);

    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);
    await existingUser.save({ session });
    await existingMovie.save({ session });
    await booking.save({ session });
    session.commitTransaction();

    res.status(200).json({ booking });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to book" });
  }
};

const getBookingById= async(req,res)=>{
  try{
     const id=req.params.id;
     const booking= await Bookings.findById(id);
     res.status(200).json({booking})
  }catch(err){
    console.log(err);
    res.status(500).json({ error: "Unable to book" });
  }
}

const deleteBooking = async(req,res)=>{
  try{
  const id=req.params.id;
  let booking= await Bookings.findByIdAndDelete(id).populate("user movie");
  const session= await mongoose.startSession()
  session.startTransaction()
  await booking.user.bookings.pull(booking)
  await booking.movie.bookings.pull(booking)
  await booking.movie.save({session})
  await booking.user.save({session})
  session.commitTransaction()
  
  if (!booking) {
    return res.status(500).json({ message: "Unable to Delete" });
  }


  res.status(200).json({ message:"Successfully deleted" });
  }catch(err){
    console.log(err);
    res.status(500).json({ error: "Unable to delete" });
  }
}
module.exports = {newBooking, getBookingById, deleteBooking};
