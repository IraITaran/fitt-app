import React, { useState, useEffect } from "react";
import "./ApiManagement.css";
import NotFoundIcon from "../../images/not-found-icon.svg";
import userService from "../../Services/user.service";
import deleteBotIcon from "../../images/deletebot-icon.svg";
import Modal from "react-bootstrap/Modal";
import AuthService from "../../Services/auth.service";
import UserService from "../../Services/user.service";

export default function ApiManagement() {
  let [apiKey, setApiKey] = useState("");
  let [apiSecret, setApiSecret] = useState("");
  let [name, setName] = useState("");
  let [accounts, setAccounts] = useState([]);
  let [apiKeyModal, setApiKeyModal] = useState(false);
  let [approveModal, setApproveModal] = useState(false);
  let [subscriptionRestrictionModal, setSubscriptionRestrictionModal] =
    useState(false);
  let [exchangeChoice, setExchangeChoice] = useState("Binance");
  let [currentAccount, setCurrentAccount] = useState({});
  let [currentCopied, setCurrentCopied] = useState(-1);
  let [isSaved, setIsSaved] = useState(false);
  let [showError, setShowError] = useState(false);
  let [allowedAccounts, setAllowedAccounts] = useState(1);

  useEffect(() => {
    updateAccountList();
    setShowError(false);
    setIsSaved(false);
    let user = AuthService.getCurrentUser();

    if (user.userDetails.subscription > 1) {
      setAllowedAccounts(2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateAccountList() {
    userService.getApiKeys().then((response) => {
      setAccounts(response.data);
    });
  }

  function createApiKey() {
    UserService.updateApiKey(name, apiKey, apiSecret, 1).then((response) => {
      if (response.data.success) {
        AuthService.updateUserDetails();
        setApiKeyModal(false);
        updateAccountList();
        setShowError(false);
        setIsSaved(true);
      } else {
        setShowError(true);
      }
    });
  }

  function deleteApiKey() {
    UserService.deleteApiKey(currentAccount.id).then((response) => {
      AuthService.updateUserDetails();
      setApproveModal(false);
      updateAccountList();
    });
  }

  function copyKey(key, index) {
    navigator.clipboard.writeText(key);
    setCurrentCopied(index);
  }

  return (
    <>
      <div className="ApiManagement">
        <div className="api-info-container">
          <div className="d-flex api-info-header">
            <h1>Управление API</h1>
            <div className="d-flex">
              <button
                type="button"
                className="yellow-btn"
                onClick={() => {
                  if (allowedAccounts === accounts.length)
                    setSubscriptionRestrictionModal(true);
                  else setApiKeyModal(true);
                }}
              >
                Добавить API
              </button>
              <button type="button" className="grey-btn">
                Создать API налоговой отчености
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
              необходимо разрешать доступ к доверенным IP-адресам. Вам
              необходимо указать IP адрес нашего сервера: 139.99.121.36
            </li>
            <li>
              При генерации ключа необходимо выбрать управление Фьючерсным
              аккаунтом. Не выбирайте доступ к снятию денежных средств, для
              коректной работы бота эти права не нужны.
            </li>
          </ol>
          <div className="account-bg"></div>
          {accounts.map((item, index) => {
            return (
              <div className="apikey-container" key={index}>
                <div className="apikey-container-header d-flex">
                  <div className="d-flex">
                    <p className="apikey-hmac">Binance</p>
                    <p className="apikey-name">{item.name}</p>
                  </div>
                  <div className="apikey-button-container d-flex justify-content-center">
                    <div
                      onClick={() => {
                        console.log(item);
                        setApproveModal(true);
                        setCurrentAccount(item);
                      }}
                    >
                      <img src={deleteBotIcon} alt="delete-icon"></img>
                    </div>
                  </div>
                </div>
                <div className="apikey-container-main"></div>
                <div className="apikey-section">
                  <p>API Key</p>
                  <p className="apikey-value">
                    {item.key}
                    <span
                      className={currentCopied === index ? "copy-grey" : ""}
                      onClick={() => {
                        copyKey(item.key, index);
                      }}
                    >
                      {currentCopied === index ? "Copied" : "Copy"}
                    </span>
                  </p>
                </div>
                <div className="secret-key-section">
                  <p>Secret Key</p>
                  <p className="secret-key-value">{item.secret}</p>
                </div>
              </div>
            );
          })}
          {accounts.length === 0 && (
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
      <Modal show={apiKeyModal} onHide={() => setApiKeyModal(false)}>
        <Modal.Header closeButton>
          <h4 className="approve-header">Добавить новый API-ключ</h4>
        </Modal.Header>
        <Modal.Body className="apikeyModal">
          <div className="apikey-inputs-container">
            <label className="w-100">
              Биржа
              <select
                className="w-100 apikey-input"
                value={exchangeChoice}
                onChange={(e) => {
                  setExchangeChoice(e.target.value);
                }}
              >
                <option value="binance">Binance</option>
              </select>
            </label>
            <label className="w-100">
              Название
              <input
                type="text"
                maxLength="10"
                className="w-100 apikey-input"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </label>
            <label className="w-100">
              API-ключ
              <input
                type="text"
                maxLength="100"
                className="w-100 apikey-input"
                onChange={(e) => setApiKey(e.target.value)}
              ></input>
            </label>
            <label className="w-100">
              Секрет
              <input
                type="text"
                maxLength="100"
                className="w-100 apikey-input"
                onChange={(e) => setApiSecret(e.target.value)}
              ></input>
            </label>
          </div>
          {!isSaved && (
            <p className={`apikey-description ${showError ? "red" : ""}`}>
              При генерации API ключа необходимо разрешить доступ к USDT
              Futures, а также добавить IP-адрес <b>13.229.50.26</b> в список
              разрешенных IP-адресов. <br />
              <a href="/">Подробнее...</a>
            </p>
          )}
          {isSaved && (
            <p className="apikey-description green">
              <b>API ключи успешно сохранены</b> <br />
              Нажмите кнопку "Вперед" для настройки бота.
            </p>
          )}
          <div className="text-center">
            <button
              type="button"
              className="save-btn mt-4"
              onClick={createApiKey}
            >
              Сохранить новый ключ
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        className="approve-modal"
        show={approveModal}
        onHide={() => setApproveModal(false)}
      >
        <Modal.Header closeButton>
          <h4 className="approve-header">Удаление API ключа</h4>
        </Modal.Header>
        <Modal.Body>
          <h4 className="approve-text">
            Вы действительно хотите удалить ключ?
          </h4>
          <button
            type="button"
            className="approve-btn delete mt-4"
            onClick={deleteApiKey}
          >
            Удалить
          </button>
          <button
            type="button"
            className="approve-btn mt-4"
            onClick={() => setApproveModal(false)}
          >
            Отмена
          </button>
        </Modal.Body>
      </Modal>

      <Modal
        className="approve-modal"
        show={subscriptionRestrictionModal}
        onHide={() => setSubscriptionRestrictionModal(false)}
      >
        <Modal.Header closeButton>
          <h4 className="approve-header">Ограничения подписки</h4>
        </Modal.Header>
        <Modal.Body>
          <h4 className="approve-text">
            Активная подписка не позволяет Вам иметь больше {""}
            {allowedAccounts === 1 ? "1 активного аккаунта" : ""}
            {allowedAccounts === 2 ? "2 активных аккаунтов" : ""}.
          </h4>
          <button
            type="button"
            className="approve-btn ok-btn w-100"
            onClick={() => setSubscriptionRestrictionModal(false)}
          >
            OK
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
