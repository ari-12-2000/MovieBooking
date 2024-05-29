import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { sendAdminAuthRequest } from "../../api-helpers/api-helpers";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminActions } from "../../store";


const Admin = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onResRecieved = (data) => {
    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
    navigate("/");
  };

  const getData = (data) => {
    sendAdminAuthRequest(data.inputs)
      .then(onResRecieved)
      .catch(() => setError("Invaild credentials"));
      console.log("Error",error)
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} error={error} />
    </div>
  );
};

export default Admin;
