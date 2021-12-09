import React, { useState, useContext } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";

import { ErrorContext } from "../../context/errorContext/ErrorContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirmation, setPassConfirmation] = useState("");

  const { errorTrigger, message } = useContext(ErrorContext);
  const [errorTriggers, setErrorTriggers] = errorTrigger;
  const [errorMassage, setErrorMessage] = message;

  let navigate = useNavigate();

  const createAcc = () => {
    if (passConfirmation !== password) {
      setErrorTriggers(true);
      return setErrorMessage(`password confirmation is not correct`);
    } else {
      fetch(`https://first-posts.herokuapp.com/api/user/register`, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
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
            console.log(data);
            navigate(`/login`);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="page__margin">
      <div className="auth__container">
        <span>Register</span>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
          required
          className="primary__input auth__input"
        />
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
        <label htmlFor="password">confirmation:</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(event) => setPassConfirmation(event.target.value)}
          required
          className="primary__input auth__input"
        />
        <button
          type="button"
          className="primary__btn auth__button"
          onClick={() => createAcc()}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
