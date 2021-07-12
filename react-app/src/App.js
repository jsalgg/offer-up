import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import NewItem from "./components/Forms/NewItem";
import Item from "./components/Item";
import ItemAll from "./components/ItemAll";
import EditItem from "./components/Forms/EditItem";
import DeleteItem from "./components/Forms/DeleteItem";
import Chat from "./components/Chat";
import Home from "./components/Home";
import "./index.css";
import "./styles/output.css";

function App() {
  const user = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <Home />
        </ProtectedRoute>
        <Route path="/item/all/" exact={true}>
          <ItemAll />
        </Route>
        <ProtectedRoute path="/item/new" exact={true}>
          <NewItem />
        </ProtectedRoute>
        <Route path="/item/:id" exact={true}>
          <Item />
        </Route>
        <Route path="/item/:id/chat">
          <Chat />
        </Route>
        <Route path="/item/:id/delete" exact={true}>
          <DeleteItem />
        </Route>
        <ProtectedRoute path="/item/:id/edit" exact={true}>
          <EditItem />
        </ProtectedRoute>
        <Route path="*">
          <h1>404, sorry b . ud!</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
