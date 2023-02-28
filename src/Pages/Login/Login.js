import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import AuthService from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  let navigate = useNavigate();

  const handleValidation = (event) => {
    let formIsValid = true;

    if (!email.match(/[\w\-_]+@[\w\-_]+\w{2,10}/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!password.length >= 8) {
      formIsValid = false;
      setpasswordError("Length must be min 8 Chracters and Max 22 Chracters");
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    if (handleValidation()) {
      AuthService.login(email, password).then(() => {
        navigate("/");
      });
    }
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
              Нет аккаунта? <Link to="/signup">Регистрация</Link>
            </p>
            <a href="/">Забыли пароль?</a>
          </div>
        </div>
      </div>
    </div>
  );
}
