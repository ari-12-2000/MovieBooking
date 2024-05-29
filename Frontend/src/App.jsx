import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { adminActions, fetchMovies, userActions } from "./store";

function App() {
  const dispatch = useDispatch();
  let searchTerm = "",
    attribute = "",
    attributeValue = "";

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
