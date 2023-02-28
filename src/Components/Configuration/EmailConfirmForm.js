import React, { useEffect, useState } from "react";
import AuthService from "../../Services/auth.service";
import UserService from "../../Services/user.service";
import "./EmailConfirmForm.css";

export default function EmailConfirmForm(props) {
  let [exchangeChoice, setExchangeChoice] = useState("Binance");
  let [apiKey, setApiKey] = useState("");
  let [apiSecret, setApiSecret] = useState("");
  let [showError, setShowError] = useState(false);

  useEffect(() => {
    props.nextEnabled(true);
  }, []);

  function updateApiKey() {
    UserService.updateApiKey(apiKey, apiSecret).then((response) => {
      if (response.data.isSuccess) {
        AuthService.updateUserDetails();
        props.nextEnabled(true);
      } else {
        setShowError(true);
      }
    });
  }

  return (
    <div className="ApiKeyForm">
      <div className="apikey-container">
        <h4 className="apikey-header">Добавить новый API-ключ</h4>
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
            API-ключ
            <input
              type="text"
              className="w-100 apikey-input"
              onChange={(e) => setApiKey(e.target.value)}
            ></input>
          </label>
          <label className="w-100">
            Секрет
            <input
              type="text"
              className="w-100 apikey-input"
              onChange={(e) => setApiSecret(e.target.value)}
            ></input>
          </label>
        </div>

        <p className={`apikey-description ${showError ? "red" : ""}`}>
          При генерации API ключа необходимо разрешить доступ к USDT Futures, а
          также добавить IP-адрес <b>13.229.50.26</b> в список разрешенных
          IP-адресов. <br />
          <a href="/">Подробнее...</a>
        </p>
        <div className="text-center">
          <button
            type="button"
            className="save-btn mt-4"
            onClick={updateApiKey}
          >
            Сохранить новый ключ
          </button>
        </div>
      </div>
    </div>
  );
}
