import axios from "axios";

export const getAllMovies = async () => {
  try {
    const res = await axios.get("/movie");
    const data = await res.data;
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const sendUserAuthRequest = async (data, signup) => {
  try {
    const res = await axios.post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    });

    const resData = await res.data;
    return resData;
  } catch (err) {
    console.log("Error-->" + err);
    throw err;
  }
};

export const sendAdminAuthRequest = async (data) => {
  try {
    const res = await axios.post("/admin/login", {
      email: data.email,
      password: data.password,
    });

    const resData = await res.data;
    return resData;
  } catch (err) {
    console.log("Error-->" + err);
    throw err;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const res = await axios.get(`/movie/${id}`);
    const resData = await res.data;
    return resData;
  } catch (err) {
    console.log("Error-->" + err);
    throw err;
  }
};

export const newBooking = async (data) => {
  try {
    const res = await axios.post("/booking", {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem("userId"),
    });
    
    const resData = await res.data;
    return resData;
  } catch (err) {
    throw Error(err.response.data.error);
  }
};


export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  console.log(id);
  const res = await axios
    .get(`/user/bookings/${id}`)
    .catch((err) => console.log(err));
 
  let resData;
  if(res.status == 200 || res.status == 201)
   resData=await res.data;
  return resData;
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`/booking/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unepxected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`/user/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const addMovie = async (data) => {
  const res = await axios
    .post(
      "/movie",
      {
        title: data.title,
        genre: data.genre,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        fetaured: data.fetaured,
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios
    .get(`/admin/${adminId}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};
