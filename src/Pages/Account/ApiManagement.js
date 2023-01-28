import React from "react";
import "./ApiManagement.css";
import NotFoundIcon from "../../images/not-found-icon.svg";

export default function ApiManagement() {
  return (
    <div className="ApiManagement">
      <div className="api-info-container">
        <div className="d-flex api-info-header">
          <h1>Управление API</h1>
          <div className="d-flex">
            <button type="button" className="yellow-btn">
              Добавить API
            </button>
            <button type="button" className="grey-btn">
              Создать API налоговой отчености
            </button>
            <button type="button" className="grey-btn">
              Удалить все API
            </button>
          </div>
        </div>
        <ol className="api-info-list">
          <li>На каждом аккаунте может быть создано до 30 ключей API.</li>
          <li>
            Не раскрывайте никому свой ключ API, секретный ключ (HMAC) или
            приватный ключ (RSA) во избежание потери активов. Вы должны
            относиться к своему ключу API, секретному ключу (HMAC) или
            приватному ключу (RSA) так же, как и к своим паролям.
          </li>
          <li>
            Для повышения безопасности учетной записи рекомендуется разрешать
            доступ только к доверенным IP-адресам.
          </li>
          <li>Вы не сможете создать ключ API, если не прошли проверку KYC.</li>
        </ol>
        <div className="account-bg"></div>
      </div>
      <div className="api-main-container">
        <div className="not-found-container">
          <img
            src={NotFoundIcon}
            alt="not-found"
            className="not-found-icon"
          ></img>
          <p>
            Для ваших субаккаунтов
            <br /> еще не создано ключей API.
          </p>
        </div>
      </div>
    </div>
  );
}
