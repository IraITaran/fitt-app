import React, { useState, useEffect } from "react";
import "./AccountWallet.css";
import UnknownIcon from "../../images/unknown-icon.png";
import MoreInfoIcon from "../../images/more-info-icon.svg";
import UserService from "../../Services/user.service";
import AuthService from "../../Services/auth.service";
import QuestionDarkIcon from "../../images/question-dark-icon.svg";
import ModalApprove from "../../Components/Modals/ModalApprove";
import NotFoundIcon from "../../images/not-found-icon.svg";

export default function AccountWallet() {
  let [user, setUser] = useState({});
  let [sessions, setSessions] = useState([]);
  let [positions, setPositions] = useState([]);
  let [approveModal, setApproveModal] = useState(false);
  let [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    let user = AuthService.getCurrentUser();
    if (user) {
      setUser(user.userDetails);
    }
    UserService.sessions().then((response) => {
      setSessions(response.data);
    });

    updatePositions();
  }, []);

  function updatePositions() {
    UserService.positions().then((response) => {
      try {
        var rawJson = response.data.replace(
          new RegExp("CROSSED", "g"),
          '"CROSSED"'
        );
        let parsedPositions = JSON.parse(rawJson);
        setPositions(parsedPositions);
      } catch (error) {
        console.log("Error parsing JSON:", error, response.data);
      }
    });
  }

  function closePosition() {
    UserService.closePosition(currentPosition.symbol).then((response) => {
      if (response.data.success) {
        updatePositions();
      } else {
        alert(response.data.error);
      }
    });

    setApproveModal(false);
  }

  return (
    <>
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
          <table className="user-statistics-table w-100">
            <thead>
              <tr>
                <th>Пара</th>
                <th>Сторона</th>
                <th>
                  Открыт
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
                  Средства
                  <img
                    src={QuestionDarkIcon}
                    alt="question-icon"
                    className="ms-1"
                  />
                </th>
                <th>Цена входа</th>
                <th>Текущая цена</th>
                <th>
                  ROI
                  <img
                    src={QuestionDarkIcon}
                    alt="question-icon"
                    className="ms-1"
                  />
                </th>
                <th>
                  PNL
                  <img
                    src={QuestionDarkIcon}
                    alt="question-icon"
                    className="ms-1"
                  />
                </th>
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.symbol}</td>
                    <td>
                      <span
                        className={
                          item.positionAmt < 0 ? "circled-red" : "circled-green"
                        }
                      >
                        {item.positionAmt < 0 ? "SHORT" : "LONG"}
                      </span>
                    </td>
                    <td>
                      {new Date(item.updateTime).toLocaleDateString()}
                      <br />
                      {new Date(item.updateTime).toLocaleTimeString()}
                    </td>
                    <td>x{item.leverage}</td>
                    <td>
                      {(item.markPrice * Math.abs(item.positionAmt)).toFixed(2)}
                      $
                    </td>
                    <td>
                      {(
                        (item.markPrice * Math.abs(item.positionAmt)) /
                        item.leverage
                      ).toFixed(2)}
                      $
                    </td>
                    <td>
                      {item.entryPrice > 0.01
                        ? item.entryPrice.toFixed(2)
                        : item.entryPrice > 0.00001
                        ? item.entryPrice.toFixed(8)
                        : item.entryPrice.toFixed(4)}
                      $
                    </td>
                    <td>
                      {item.markPrice > 0.01
                        ? item.markPrice.toFixed(4)
                        : item.markPrice > 0.00001
                        ? item.markPrice.toFixed(8)
                        : item.markPrice.toFixed(2)}
                      $
                    </td>
                    <td>
                      <span
                        className={
                          item.unrealizedProfit < 0
                            ? "circled-red"
                            : "circled-green"
                        }
                      >
                        {(
                          item.unrealizedProfit /
                          ((item.markPrice * Math.abs(item.positionAmt)) /
                            item.leverage /
                            100)
                        ).toFixed(2)}
                        %
                      </span>
                    </td>
                    <td>
                      <span
                        className={
                          item.unrealizedProfit < 0
                            ? "circled-red"
                            : "circled-green"
                        }
                      >
                        {item.unrealizedProfit.toFixed(2)}$
                      </span>
                    </td>

                    <td>
                      <button
                        className="statistic-table-btn"
                        onClick={() => {
                          setApproveModal(true);
                          setCurrentPosition(item);
                        }}
                      >
                        Закрыть по рынку
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {positions.length === 0 && (
            <div className="not-found-container">
              <img
                src={NotFoundIcon}
                alt="not-found"
                className="not-found-icon"
              ></img>
              <p>У вас еще нет открытых позиций</p>
            </div>
          )}
        </div>
      </div>
      <ModalApprove
        show={approveModal}
        onHide={() => setApproveModal(false)}
        title="Закрытие позиции"
        bodyText={
          "Вы действительно хотите закрыть позицию " +
          currentPosition?.symbol +
          " ?"
        }
        onSubmit={closePosition}
        submitButtonText="Закрыть"
      />
    </>
  );
}
