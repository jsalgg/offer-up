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
      <button
        className="m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Demo Login
      </button>
    </form>
  );
};

export default DemoLogin;
