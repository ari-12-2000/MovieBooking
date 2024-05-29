import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { useDispatch } from "react-redux";
import { sendUserAuthRequest } from "../../api-helpers/api-helpers"; //The correct syntax to move up one directory level is "../"
import { userActions } from "../../store";
import { useNavigate } from "react-router-dom";
//move to current directory= './'
const Auth = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    
    dispatch(userActions.login());

    localStorage.setItem("userId", data.id);
    console.log(data.id);
    navigate("/");
  };
  const getData = (data) => {
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch((err) =>
        data.signup
          ? setError("Invalid credentials or credentials already in use")
          : setError("Invalid credentials")
      );
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} error={error} />
    </div>
  );
};

export default Auth;
