import React, { useState, useEffect } from "react";
import "./ApiManagement.css";
import NotFoundIcon from "../../images/not-found-icon.svg";
import userService from "../../Services/user.service";
import stopBotIcon from "../../images/stopbot-icon.svg";
import editBotIcon from "../../images/editbot-icon.svg";
import deleteBotIcon from "../../images/deletebot-icon.svg";

export default function ApiManagement() {
  let [key, setKey] = useState("");
  let [secret, setSecret] = useState("");

  useEffect(() => {
    userService.getApiKeys().then((response) => {
      setKey(response.data?.key);
      setSecret(response.data?.secret);
    });
  }, []);

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
          <li>На каждом аккаунте может быть создан только один API ключ.</li>
          <li>
            Не раскрывайте никому свой ключ API, секретный ключ (HMAC) или
            приватный ключ (RSA) во избежание потери активов. Вы должны
            относиться к своему ключу API, секретному ключу (HMAC) или
            приватному ключу (RSA) так же, как и к своим паролям.
          </li>
          <li>
            Для повышения безопасности и корректной работе учетной записи
            необходимо разрешать доступ к доверенным IP-адресам. Вам необходимо
            указать IP адрес нашего сервера: 13.229.50.26
          </li>
          <li>
            При генерации ключа необходимо выбрать управление Фьючерсным
            аккаунтом. Не выбирайте доступ к снятию денежных средств, для
            коректной работы бота эти права не нужны.
          </li>
        </ol>
        <div className="account-bg"></div>
        {key !== "" && (
          <>
            <div className="apikey-container">
              <div className="apikey-container-header d-flex">
                <div className="d-flex">
                  <p className="apikey-hmac">HMAC</p>
                  <p className="apikey-name">Name</p>
                </div>
                <div className="apikey-button-container d-flex justify-content-center">
                  <div>
                    <img src={stopBotIcon} alt="stop-icon"></img>
                  </div>
                  <div>
                    <img src={editBotIcon} alt="edit-icon"></img>
                  </div>
                  <div>
                    <img src={deleteBotIcon} alt="delete-icon"></img>
                  </div>
                </div>
              </div>
              <div className="apikey-container-main"></div>
              <div className="apikey-section">
                <p>API Key</p>
                <p className="apikey-value">
                  {key} <span>Copy</span>
                </p>
              </div>
              <div className="secret-key-section">
                <p>Secret Key</p>
                <p className="secret-key-value">{secret}</p>
              </div>
            </div>
            <div className="apikey-container">
              <div className="apikey-container-header d-flex">
                <div className="d-flex">
                  <p className="apikey-rca">RSA</p>
                  <p className="apikey-name">Name</p>
                </div>
                <div className="apikey-button-container d-flex justify-content-center">
                  <div>
                    <img src={stopBotIcon} alt="stop-icon"></img>
                  </div>
                  <div>
                    <img src={editBotIcon} alt="edit-icon"></img>
                  </div>
                  <div>
                    <img src={deleteBotIcon} alt="delete-icon"></img>
                  </div>
                </div>
              </div>
              <div className="apikey-container-main"></div>
              <div className="apikey-section">
                <p>API Key</p>
                <p className="apikey-value">
                  {key} <span>Copy</span>
                </p>
              </div>
              <div className="secret-key-section">
                <p>Secret Key</p>
                <p className="secret-key-value">{secret}</p>
              </div>
            </div>
          </>
        )}
        {key === "" && (
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
        )}
      </div>
    </div>
  );
}
