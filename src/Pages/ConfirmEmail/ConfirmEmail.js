import React, { useState } from "react";
import "./ConfirmEmail.css";
import { Link } from "react-router-dom";
import ReactInputVerificationCode from "react-input-verification-code";
import UserService from "../../Services/user.service";

export default function ConfirmEmail() {
  const [verificationCode, setVerificationCode] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  function verifyCode() {
    UserService.confirmEmail(verificationCode).then((response) => {
      if (response.data.success) {
        setIsConfirmed(true);
      } else {
        alert(response.data.error);
      }
    });
  }

  if (!isConfirmed)
    return (
      <div className="ConfirmEmail">
        <h4 className="text-center">
          На вашу почту был отправлен 6-значный код подтверждения.
        </h4>
        <h5 className="text-center mt-3">
          Введите код в поле нижe для подтверждения аккаунта.
        </h5>

        <ReactInputVerificationCode
          onChange={setVerificationCode}
          value={verificationCode}
          length={6}
        />

        <button type="submit" className="submit-code-btn" onClick={verifyCode}>
          Подтвердить
        </button>
      </div>
    );
  else {
    return (
      <div className="ConfirmEmail">
        <h4 className="text-center">
          Вы успешно подтвердили свою учетную запись.
        </h4>
        <div className="text-center">
          {" "}
          <Link to="/">Главная страница</Link>{" "}
          <Link className="text-center" to="/account/wallet">
            Личный кабинет
          </Link>
        </div>
      </div>
    );
  }
}
