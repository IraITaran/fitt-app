import React from "react";
import UnknownIcon from "../../images/unknown-icon.png";
import DoneIcon from "../../images/done-icon.svg";
import CloseIcon from "../../images/close-icon.svg";
import "./AccountSecurity.css";

export default function AccountSecurity() {
  return (
    <div className="AccountSecurity">
      <div className="user-info-container">
        <div className="d-flex align-items-center">
          <div>
            <img
              src={UnknownIcon}
              alt="unknown-icon"
              className="user-account-icon"
            ></img>
          </div>
          <div className="security-username">
            <p>Ваше имя</p>
            <p>Иван Петрович</p>
          </div>
          <div className="security-nickname">
            <p>Ваш никнейм</p>
            <p>Anonymous-user-2234</p>
          </div>
          <div className="security-password">
            <p>Ваш пароль</p>
            <p>**********</p>
          </div>
          <div className="security-phone">
            <p>Номер телефона</p>
            <p>+380634455465</p>
          </div>
          <div className="security-email">
            <p>Ваш E-mail</p>
            <p>gmailgmail@gmail.com</p>
          </div>
        </div>
        <div className="d-flex security-buttons">
          <button type="button" className="yellow-btn">
            Редактировать информацию
          </button>
          <button type="button" className="grey-btn">
            Пройти проверку KYC
          </button>
        </div>
        <div className="security-footer">
          <h4>Безопасность:</h4>
          <div className="d-flex security-options-container">
            <div className="d-flex">
              <img src={DoneIcon} alt="done-icon"></img>
              <p>
                Двухфакторная
                <br /> аутентификация (2FA)
              </p>
            </div>
            <div className="d-flex">
              <img src={DoneIcon} alt="done-icon"></img>
              <p>
                Подтверждение
                <br /> личности
              </p>
            </div>
            <div className="d-flex">
              <img src={CloseIcon} alt="close-icon"></img>
              <p>
                Антифишинговый
                <br /> код
              </p>
            </div>
            <div className="d-flex">
              <img src={CloseIcon} alt="close-icon"></img>
              <p>
                Белый список для
                <br /> вывода средств
              </p>
            </div>
          </div>
        </div>
        <div className="account-bg"></div>
      </div>
      <div className="security-main-container">
        <div className="two-factor-auth">
          <h2>Двухфакторная аутентификация (2FA)</h2>
          <div className="row security-section">
            <div className="col-5">
              <p className="security-subheader">
                Биометрическая аутентификация/Ключ безопасности
              </p>
              <p className="security-description">
                Защитите свой аккаунт и вывод средств с помощью ключа
                безопасности, например, Yubikey.
              </p>
            </div>
            <div className="col-3 p-0">
              <p className="auth-validation">
                <img src={DoneIcon} alt="done-icon"></img>
                Включено
              </p>
            </div>
            <div className="col-2 p-0"></div>
            <div className="col-2 p-0">
              <button type="button" className="manage-btn">
                Управлять
              </button>
            </div>
          </div>
          <div className="row security-section">
            <div className="col-5">
              <p className="security-subheader">
                Google Authenticator (рекомендуется)
              </p>
              <p className="security-description">
                Защитите свой аккаунт и транзакции.
              </p>
            </div>
            <div className="col-3 p-0">
              <p className="auth-validation">
                <img src={DoneIcon} alt="done-icon"></img>
                Включено
              </p>
            </div>
            <div className="col-2 p-0 text-center">
              <button type="button" className="change-btn">
                Изменить
              </button>
            </div>
            <div className="col-2 p-0">
              <button type="button" className="delete-btn">
                Удалить
              </button>
            </div>
          </div>
          <div className="row security-section">
            <div className="col-5">
              <p className="security-subheader">
                Верификация по номеру телефона
              </p>
              <p className="security-description">
                Защитите свой аккаунт и транзакции.
              </p>
            </div>
            <div className="col-3 p-0">
              <p className="auth-validation">
                <img src={DoneIcon} alt="done-icon"></img>
                63******7
              </p>
            </div>
            <div className="col-2 p-0 text-center">
              <button type="button" className="change-btn">
                Изменить
              </button>
            </div>
            <div className="col-2 p-0">
              <button type="button" className="delete-btn">
                Удалить
              </button>
            </div>
          </div>
          <div className="row security-section">
            <div className="col-5">
              <p className="security-subheader">Подтверждение по email</p>
              <p className="security-description">
                Защитите свой аккаунт и транзакции.
              </p>
            </div>
            <div className="col-3 p-0">
              <p className="auth-validation">
                <img src={DoneIcon} alt="done-icon"></img>
                gma***@gmail.com
              </p>
            </div>
            <div className="col-2 p-0 text-center">
              <button type="button" className="change-btn">
                Изменить
              </button>
            </div>
            <div className="col-2 p-0">
              <button type="button" className="delete-btn">
                Удалить
              </button>
            </div>
          </div>
        </div>
        <div className="devices-activity">
          <h2>Устройства и активность</h2>
          <div className="row security-section">
            <div className="col-5">
              <p className="security-subheader">Управление устройствами</p>
              <p className="security-description">
                Управление устройствами, которым разрешен доступ к вашему
                аккаунту
              </p>
            </div>
            <div className="col-3 p-0">
              <p className="auth-validation">
                <img src={DoneIcon} alt="done-icon"></img>
                Включено
              </p>
            </div>
            <div className="col-2 p-0"></div>
            <div className="col-2 p-0">
              <button type="button" className="manage-btn">
                Управлять
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-5">
              <p className="security-subheader">Активность аккаунта</p>
              <p className="security-description m-0">
                История распределений: 2023-01-06 18:54:01
                <br /> Подозрительная активность аккаунта?
                <a href="/" className="turnoff-acc">
                  Отключить аккаунт
                </a>
              </p>
              <p className="security-description"></p>
            </div>
            <div className="col-3 p-0">
              <p className="auth-validation">
                <img src={DoneIcon} alt="done-icon"></img>
                Включено
              </p>
            </div>
            <div className="col-2 p-0 text-center"></div>
            <div className="col-2 p-0">
              <button type="button" className="delete-btn">
                Больше
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
