import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { sendAdminAuthRequest } from "../../api-helpers/api-helpers";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminActions, userActions } from "../../store";
import useLoader from "../../hooks/useLoader";

const Admin = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { showLoader, hideLoader, loading } = useLoader();
  const navigate = useNavigate();

  const onResRecieved = (data) => {
    dispatch(adminActions.login());
    dispatch(userActions.logout());
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
    navigate(-1);
    hideLoader();
  };

  const getData = (data) => {
    showLoader();
    sendAdminAuthRequest(data.inputs)
      .then(onResRecieved)
      .catch(() => {
        hideLoader();
        setError("Credentials Not Allowed");
      });
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} error={error} loading={loading}/>
    </div>
  );
};

export default Admin;
