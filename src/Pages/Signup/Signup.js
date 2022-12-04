import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

export default function Signup() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");

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
    if (handleValidation()) {
      //   axios
      //     .post("https://fitt.ink/api/user/signin")
      //     .then(handleResponse)
      //     .catch(function (error) {
      //       console.log(error);
      //     });

      return true;
    }

    return false;
  };

  return (
    <div className="Registration">
      <div className="row d-flex justify-content-center">
        <div className="col-md-4 content-container">
          <h4 className="text-center">Создайте личный аккаунт</h4>
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
              <label className="form-check-label conf-agreement">
                Я прочитал(-а) и принимаю{" "}
                <a href="/">
                  Соглашение об обслуживании, Заявление о конфиденциальности
                </a>
              </label>
            </div>
            <button type="submit" className="btn login-btn w-100">
              Создать персональный аккаунт
            </button>
          </form>
          <div className="form-bottom text-center">
            <p>
              Уже зарегистрированы? <Link to="/authorization">Войти</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
