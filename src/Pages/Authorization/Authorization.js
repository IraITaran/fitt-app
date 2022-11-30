import React, { useState } from "react";
import axios from "axios";
import "./Authorization.css";
import { Link } from "react-router-dom";

export default function Authorization() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");

  function handleResponse(response) {
    console.log(response);
  }

  const handleValidation = (event) => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    // if (handleValidation()) {
    //   axios
    //     .post("https://fitt.ink/api/user/signin")
    //     .then(handleResponse)
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // }
  };

  return (
    <div className="Authorization">
      <div className="row d-flex justify-content-center">
        <div className="col-md-4 content-container">
          <h4 className="text-center">Войти</h4>
          <form id="loginform" onSubmit={loginSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control form-input"
                id="EmailInput"
                name="EmailInput"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <small id="emailHelp" className="text-danger form-text">
                {emailError}
              </small>
            </div>
            <div className="form-group">
              <label>Пароль</label>
              <input
                type="password"
                className="form-control form-input"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <small id="passworderror" className="text-danger form-text">
                {passwordError}
              </small>
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label">Check me out</label>
            </div>
            <button type="submit" className="btn login-btn w-100">
              Войти
            </button>
          </form>
          <div className="form-bottom d-flex justify-content-between">
            <p>
              Нет аккаунта? <Link to="/registration">Регистрация</Link>
            </p>
            <a href="/">Забыли пароль?</a>
          </div>
        </div>
      </div>
    </div>
  );
}
