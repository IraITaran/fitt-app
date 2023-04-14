import React, { useState, useEffect } from "react";
import "./AccountWallet.css";
import UnknownIcon from "../../images/unknown-icon.png";
import MoreInfoIcon from "../../images/more-info-icon.svg";
import UserService from "../../Services/user.service";
import AuthService from "../../Services/auth.service";
import QuestionDarkIcon from "../../images/question-dark-icon.svg";

export default function AccountWallet() {
  let [user, setUser] = useState({});
  let [sessions, setSessions] = useState([]);

  useEffect(() => {
    let user = AuthService.getCurrentUser();
    if (user) {
      setUser(user.userDetails);
    }
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
            <p className="wallet-username">{user?.email}</p>
            <div className="d-flex">
              <div className="userId">
                <p>ID пользователя</p>
                <p>{user?.id}</p>
              </div>
              <div className="last-login">
                <p>Время последнего входа</p>
                <p>
                  {new Date(sessions[0]?.createdDate).toLocaleDateString(
                    "es-ES"
                  ) +
                    " " +
                    new Date(sessions[0]?.createdDate).toLocaleTimeString(
                      "es-ES"
                    )}{" "}
                  ({sessions[0]?.data.ip})
                </p>
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
            <p>{user?.exchangeBalance?.toFixed(2)} USD</p>
            <p></p>
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
      <div className="user-statistics-container">
        <table className="user-statistics-table">
          <thead>
            <tr>
              <th>Тикер</th>
              <th>Сторона</th>
              <th>
                В сделке
                <img
                  src={QuestionDarkIcon}
                  alt="question-icon"
                  className="ms-1"
                />
              </th>
              <th>
                Вход
                <img
                  src={QuestionDarkIcon}
                  alt="question-icon"
                  className="ms-1"
                />
              </th>
              <th>
                Плечо
                <img
                  src={QuestionDarkIcon}
                  alt="question-icon"
                  className="ms-1"
                />
              </th>
              <th>Маржа $</th>
              <th>
                Вход
                <img
                  src={QuestionDarkIcon}
                  alt="question-icon"
                  className="ms-1"
                />
              </th>
              <th>
                Выход
                <img
                  src={QuestionDarkIcon}
                  alt="question-icon"
                  className="ms-1"
                />
              </th>
              <th>
                Выход
                <img
                  src={QuestionDarkIcon}
                  alt="question-icon"
                  className="ms-1"
                />
              </th>
              <th>
                ROI
                <img
                  src={QuestionDarkIcon}
                  alt="question-icon"
                  className="ms-1"
                />
              </th>
              <th>Доход $</th>
              <th>
                PNL
                <img
                  src={QuestionDarkIcon}
                  alt="question-icon"
                  className="ms-1"
                />
              </th>
              <th>Объем</th>
              <th>
                Макс. Объем
                <img
                  src={QuestionDarkIcon}
                  alt="question-icon"
                  className="ms-1"
                />
              </th>
              <th className="text-center">Действие</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BTCUSDT</td>
              <td>LONG</td>
              <td>8c</td>
              <td>вт 11 апр 23 22:18:17</td>
              <td>x25</td>
              <td>$100,000.00</td>
              <td>$333,000.00</td>
              <td>вт 11 апр 23 22:19:16</td>
              <td>$999,000.00</td>
              <td>81,01%</td>
              <td>-81,03%</td>
              <td>-$30.000</td>
              <td>$999.00</td>
              <td>$1.076,00</td>
              <td>
                <button className="statistic-table-btn">
                  Закрыть по рынку
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
