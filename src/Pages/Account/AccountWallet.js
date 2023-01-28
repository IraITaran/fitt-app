import React, { useState, useEffect } from "react";
import "./AccountWallet.css";
import UnknownIcon from "../../images/unknown-icon.png";
import MoreInfoIcon from "../../images/more-info-icon.svg";
import UserService from "../../Services/user.service";

export default function AccountWallet() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    UserService.sessions().then((response) => {
      setSessions(response.data);
    });
  }, []);

  return (
    <div className="AccountWallet">
      <div className="user-info-container">
        <div className="d-flex">
          <div>
            <img
              src={UnknownIcon}
              alt="unknown-icon"
              className="user-account-icon"
            ></img>
          </div>
          <div>
            <p className="wallet-username">Anonymous-user-2234</p>
            <div className="d-flex">
              <div className="userId">
                <p>ID пользователя</p>
                <p>586734352</p>
              </div>
              <div className="last-login">
                <p>Время последнего входа</p>
                <p>2021-01-06 18:23:01 (46.34.203.123)</p>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex user-info-footer">
          <div className="estimated-balance">
            <p>
              Ориентировочный баланс
              <img
                src={MoreInfoIcon}
                alt="more-info"
                className="more-info-icon"
              ></img>
            </p>
            <p>19102.18 USD</p>
            <p>1.00001 BTC</p>
          </div>
          <div className="referrals">
            <p>
              Ваши рефералы
              <img
                src={MoreInfoIcon}
                alt="more-info"
                className="more-info-icon"
              ></img>
            </p>
            <p>2</p>
            <p>+0</p>
          </div>
        </div>
        <div className="d-flex wallet-buttons">
          <button type="button" className="yellow-btn">
            Ввод
          </button>
          <button type="button" className="grey-btn">
            Вывод
          </button>
          <button type="button" className="grey-btn">
            Купить криптовалюту
          </button>
        </div>
        <div className="account-bg"></div>
      </div>
      <div className="session-container">
        <h2>Сессии</h2>

        <table>
          <thead>
            <tr className="border-bottom">
              <th>Время</th>
              <th>IP</th>
              <th>OS</th>
              <th>Browser</th>
              <th>Device Type</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(function (session, index) {
              return (
                <tr key="{index}">
                  <td>
                    {new Date(session.createdDate).toLocaleDateString("es-ES") +
                      " " +
                      new Date(session.createdDate).toLocaleTimeString("es-ES")}
                  </td>{" "}
                  <td>{session.data.ip}</td>
                  <td>{session.data.os}</td>
                  <td>{session.data.browser}</td>
                  <td>{session.data.device}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
