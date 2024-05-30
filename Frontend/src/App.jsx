import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { adminActions, fetchMovies, userActions } from "./store";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const adminId = localStorage.getItem("adminId");

    if (userId) {
      dispatch(userActions.login());
    } else if (adminId) {
      dispatch(adminActions.login());
    }

    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
