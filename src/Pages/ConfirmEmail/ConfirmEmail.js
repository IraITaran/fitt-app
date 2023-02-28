import React, { useEffect, useState } from "react";
import "./ConfirmEmail.css";
import { Link } from "react-router-dom";
import ReactInputVerificationCode from "react-input-verification-code";
import UserService from "../../Services/user.service";
import userService from "../../Services/user.service";
import authService from "../../Services/auth.service";

export default function ConfirmEmail(props) {
  let [verificationCode, setVerificationCode] = useState("");
  let [isConfirmed, setIsConfirmed] = useState(false);
  let [isSent, setIsSent] = useState(false);
  let [isButtonDisabled, setIsButtonDisabled] = useState(false);
  let [isTimerActive, setIsTimerActive] = useState(false);
  let [seconds, setSeconds] = useState(0);

  const VERIFICATION_TIMEOUT_SEC = 180;
  const VERIFICATION_TIMEOUT_MS = 180000;

  useEffect(() => {
    if (props.nextEnabled) {
      props.nextEnabled(isConfirmed);
    }

    let timerDeadline = localStorage.getItem("email-verification-timeout");

    if (timerDeadline !== null) {
      let difference = +new Date(timerDeadline) - +new Date();

      if (difference < 0) {
        localStorage.removeItem("email-verification-timeout");
        return;
      }

      setIsButtonDisabled(true);
      setSeconds((difference / 1000).toFixed(0));
      setIsTimerActive(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timer = null;

    if (isTimerActive) {
      timer = setTimeout(() => {
        if (seconds === 1) {
          setIsTimerActive(false);
          setIsButtonDisabled(false);
          localStorage.removeItem("email-verification-timeout");
        }
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimerActive, seconds]);

  function sendVerificationCode() {
    userService
      .sendEmailVerificationCode()
      .then((response) => {
        setIsSent(true);
        setIsButtonDisabled(true);
        setSeconds(VERIFICATION_TIMEOUT_SEC);
        setIsTimerActive(true);

        localStorage.setItem(
          "email-verification-timeout",
          new Date(new Date().getTime() + VERIFICATION_TIMEOUT_MS)
        );
      })
      .catch((error) => {
        alert(error.response?.data);
      });
  }

  function verifyCode(value) {
    setVerificationCode(value);

    if (value.replace("·", "").length === 6) {
      UserService.confirmEmail(value).then((response) => {
        if (response.data.success) {
          setIsConfirmed(true);

          authService.updateUserDetails();
          if (props.nextEnabled) {
            props.nextEnabled(true);
          }
        } else {
          alert(response.data.error);
        }
      });
    }
  }

  if (!isConfirmed)
    return (
      <div className="ConfirmEmail">
        <h4 className="text-center">
          На вашу почту {isSent ? "отправлен" : "будет отправлен"} 6-значный код
          подтверждения.
        </h4>
        <h5 className="text-center mt-3">
          Введите код в поле нижe для подтверждения аккаунта.
        </h5>

        <ReactInputVerificationCode
          onChange={verifyCode}
          value={verificationCode}
          length={6}
        />
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="submit-code-btn"
            disabled={isButtonDisabled}
            onClick={sendVerificationCode}
          >
            {isButtonDisabled
              ? "Повторно через " + seconds.toString() + " ceк"
              : "Отправить код"}
          </button>
        </div>
      </div>
    );
  else {
    return (
      <div className="ConfirmEmail">
        <h4 className="text-center">
          Вы успешно подтвердили свою учетную запись.
        </h4>
        {!props.nextEnabled && (
          <div className="text-center">
            {" "}
            <Link to="/">Главная страница</Link>{" "}
            <Link className="text-center" to="/account/wallet">
              Личный кабинет
            </Link>
          </div>
        )}
        {props.nextEnabled && (
          <div className="text-center">
            Чтобы продолжить настройку бота нажмите на кнопку "Вперед".
          </div>
        )}
      </div>
    );
  }
}
