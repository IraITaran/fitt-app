import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import AuthService from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";
import SignUpConsent from "./SignUpConsent";
import Modal from "react-bootstrap/Modal";

export default function Signup() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [serviceAgreement, setServiceAgreement] = useState(false);
  const [passwordError, setpasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [emailError, setemailError] = useState("");
  let navigate = useNavigate();
  let [consentModal, setConsentModal] = useState(false);

  function handleCheckboxChange(e) {
    setServiceAgreement(e.target.checked);
  }

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

    if (
      !password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,22}$/
      )
    ) {
      formIsValid = false;
      setpasswordError(
        "At least one letter, one number and one special character and length must be min 8 Chracters and Max 22 Chracters"
      );

      return false;
    } else if (passwordConfirm !== password) {
      formIsValid = false;
      setPasswordConfirmError("Passwords do not match");
      return false;
    } else if (!serviceAgreement) {
      formIsValid = false;
      return false;
    } else {
      setpasswordError("");
      setPasswordConfirmError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const signupSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      AuthService.signup(email, password).then((response) => {
        if(!response.data.success)
        {
          alert(response.data.error);
        } else {
        navigate("/confirm-email");
        }
      });
    }
  };

  return (
    <div className="Registration">
      <div className="row d-flex justify-content-center">
        <div className="col-md-4 content-container">
          <h4 className="text-center">Создайте личный аккаунт</h4>
          <form id="signupform" onSubmit={signupSubmit}>
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
            <div className="form-group">
              <label>Подтверждение пароля</label>
              <input
                type="password"
                className="form-control form-input"
                id="exampleInputPassword"
                placeholder="Password"
                onChange={(event) => setPasswordConfirm(event.target.value)}
              />
              <small
                id="passwordconfirmerror"
                className="text-danger form-text"
              >
                {passwordConfirmError}
              </small>
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label conf-agreement">
                Я прочитал(-а) и принимаю{" "}
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    setConsentModal(true);
                  }}
                >
                  Соглашение об обслуживании, Заявление о конфиденциальности
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="btn login-btn w-100"
              disabled={!serviceAgreement}
            >
              Создать персональный аккаунт
            </button>
          </form>
          <div className="form-bottom text-center">
            <p>
              Уже зарегистрированы? <Link to="/login">Войти</Link>
            </p>
          </div>
        </div>
      </div>
      <Modal
        className="consent-modal"
        show={consentModal}
        onHide={() => setConsentModal(false)}
      >
        <Modal.Header closeButton>
          <h4 className="approve-header">
            Соглашение об обслуживании, Заявление о конфиденциальности
          </h4>
        </Modal.Header>
        <Modal.Body>
          <SignUpConsent />
          <button
            type="button"
            className="approve-btn w-100 mt-2"
            onClick={() => setConsentModal(false)}
          >
            Закрыть
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
