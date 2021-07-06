import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../store/session";

const DemoLogin = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("demo@aa.io");
  const [password, setPassword] = useState("password");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onLogin}>
      <button type="submit">Demo Login</button>
    </form>
  );
};

export default DemoLogin;
