import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { useDispatch } from "react-redux";
import { sendUserAuthRequest } from "../../api-helpers/api-helpers"; //The correct syntax to move up one directory level is "../"
import { adminActions, userActions } from "../../store";
import { useNavigate } from "react-router-dom";
//move to current directory= './'
const Auth = () => {
  const [error, setError] = useState("");
  const [loading, setLoading]=useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    dispatch(adminActions.logout());
    dispatch(userActions.login());

    localStorage.setItem("userId", data.id);
    console.log(data.id);
    navigate("/");
    setLoading(false);
  };
  const getData = (data) => {
    setLoading(true);
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch((err) =>
       { setLoading(false);
        setError("Invalid Input or inputs already used")}
      );
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} error={error} setLoading={setLoading} loading={loading}/>
    </div>
  );
};

export default Auth;
