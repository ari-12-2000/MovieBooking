import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { useDispatch } from "react-redux";
import { sendUserAuthRequest } from "../../api-helpers/api-helpers"; //The correct syntax to move up one directory level is "../"
import { adminActions, userActions } from "../../store";
import { useNavigate } from "react-router-dom";
import useLoader from "../../hooks/useLoader";
//move to current directory= './'
const Auth = () => {
  const [error, setError] = useState("");
  const { showLoader, hideLoader, loading } = useLoader();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    dispatch(adminActions.logout());
    dispatch(userActions.login());

    localStorage.setItem("userId", data.id);
    console.log(data.id);
    navigate("/");
    hideLoader();
  };
  const getData = (data) => {
    showLoader();
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch((err) =>
       { hideLoader();
        setError("Invalid Input or inputs already used")}
      );
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} error={error} loading={loading}/>
    </div>
  );
};

export default Auth;
