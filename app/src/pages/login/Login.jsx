import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./login.css";

import { UserContext } from "../../context/user/UserContext";
import { ErrorContext } from "../../context/errorContext/ErrorContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { render, user } = useContext(UserContext);
  const { state } = useLocation();

  const { errorTrigger, message } = useContext(ErrorContext);
  const [errorTriggers, setErrorTriggers] = errorTrigger;
  const [errorMassage, setErrorMessage] = message;

  const [userData, setUserData] = user;
  const [rerender, setRerender] = render;

  let navigate = useNavigate();

  const login = async () => {
    fetch("https://first-posts.herokuapp.com/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Error) {
          console.log("error", data.Error);
          setErrorMessage(data.Error);

          setErrorTriggers(true);
        } else {
          localStorage.setItem("auth-token", data);
          setRerender(!rerender);
        }
        navigate(state?.path || "/dashboard");
      })
      .catch((error) => console.log("error", error.response.data));
  };

  useEffect(() => {
    if (userData) {
      if (userData._id) {
        navigate("/");
      }
    }
  }, [userData]);
  return (
    <div className="page__margin">
      <div className="auth__container">
        <span>Login</span>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          required
          className="primary__input auth__input"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          required
          className="primary__input auth__input"
        />
        <button
          type="button"
          className="primary__btn auth__button"
          onClick={() => login()}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
