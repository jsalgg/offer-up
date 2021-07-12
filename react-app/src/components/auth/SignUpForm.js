import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [location, setLocation] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [joinedDate, setJoinedDate] = useState(Date.now());
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(
        signUp(name, email, password, location, profileImage, joinedDate)
      );
    }
    history.push("/");
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };
  const updateLocation = (e) => {
    setLocation(e.target.value);
  };
  const updateProfileImage = (e) => {
    setProfileImage(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={onSignUp}
    >
      <div>
        <label className="block text-green-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="name"
          onChange={updateName}
          value={name}
        ></input>
      </div>
      <div>
        <label className="block text-green-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label className="block text-green-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label className="block text-green-700 text-sm font-bold mb-2">
          Repeat Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div>
        <label className="block text-green-700 text-sm font-bold mb-2">
          Location
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="location"
          onChange={updateLocation}
          value={location}
          required={true}
        ></input>
      </div>
      <div>
        <label className="block text-green-700 text-sm font-bold mb-2">
          Profile Image
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="profileImage"
          onChange={updateProfileImage}
          value={profileImage}
        ></input>
      </div>
      <button
        className="m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
