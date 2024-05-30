import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { sendAdminAuthRequest } from "../../api-helpers/api-helpers";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminActions, userActions } from "../../store";


const Admin = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading]=useState(false);
  const navigate = useNavigate();

  const onResRecieved = (data) => {
    dispatch(adminActions.login());
    dispatch(userActions.logout());
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
    navigate("/");
    setLoading(false);
  };

  const getData = (data) => {
    sendAdminAuthRequest(data.inputs)
      .then(onResRecieved)
      .catch((err) => { setLoading(false);
        setError("Invalid Input or inputs already used")});
      
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} error={error} setLoading={setLoading} loading={loading}/>
    </div>
  );
};

export default Admin;
