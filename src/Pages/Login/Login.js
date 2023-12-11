import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import AuthService from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  let navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('email');
  const handleTabClick = (activeTab) => setActiveTab(activeTab);

  const { onToggleFormLink } = props;

  const tabs = [
    { id: 1, label: 'email', content: 'Электронная почта' },
    { id: 2, label: 'phone', content: 'Номер телефона' },
  ];

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
            setpasswordError(
                "Length must be min 8 Chracters and Max 22 Chracters"
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
            AuthService.login(email, password).then(() => {
                navigate("/");
            });
        }
    };

  return (
    <div className="Authorization base-form">
      <div className="container">
          <h4 className="text-center">Войти</h4>
          <div className="authorization-tab-block">
            <div className="authorization-tab-inner">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => handleTabClick(tab.label)}
              className={tab.label === activeTab ? 'authorization-tab-item is-active' : 'authorization-tab-item'}
              data-tab={tab.label}
            >
              {tab.content}
            </div>
          ))}
            </div>
          </div>
          {activeTab === 'email' && (
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
              <div className="form-field">
                <input
                type="password"
                className="form-control form-input"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <div className="password-icon"></div>
              </div>
              <small id="passworderror" className="text-danger form-text">
                {passwordError}
              </small>
            </div>
            <button type="submit" className="btn login-btn w-100">
              Войти
            </button>
            </form>
          )}
          {activeTab === 'phone' && (
             <form id="loginform" onSubmit={loginSubmit}>
              <div className="field-row">
              <label>Номер телефона</label>
                <div className="form-group form-group-country">
                <select className="form-control form-select">
                      <option data-country="AT" value="43">(+38)</option>
                      <option data-country="AT" value="43">(+43)</option>
                </select>
               
              </div>
              <div className="form-group form-group-phone">
                <input
                type="tel"
                className="form-control form-input"
                id="PhoneInput"
                name="PhoneInput"
                aria-describedby="phoneHelp"
                placeholder="Enter phone"
                onChange={(event) => setEmail(event.target.value)}
              />
                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
              </div>
              </div>
             
             <div className="form-group">
               <label>Пароль</label>
               <div className="form-field">
                <input
                type="password"
                className="form-control form-input"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <div className="password-icon"></div>
              </div>
               <small id="passworderror" className="text-danger form-text">
                 {passwordError}
               </small>
             </div>
             <button type="submit" className="btn login-btn w-100">
               Войти
             </button>
             </form>
          )}
         
          <div className="form-bottom d-flex justify-content-between">
            <p>
              Нет аккаунта? <Link to="/signup">Регистрация</Link>
              <span className="modal-toggle-link" onClick={onToggleFormLink}>Регистрация</span>
            </p>
            <a href="/">Забыли пароль?</a>
          </div>
        </div>
    </div>
  );
}
