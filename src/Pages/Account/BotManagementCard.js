import React, { useState, useEffect } from "react";
import "./BotManagementCard.css";
import UnknownIcon from "../../images/unknown-icon.png";
import playBotIcon from "../../images/playbot-icon.svg";
import stopBotIcon from "../../images/stopbot-icon.svg";
import editBotIcon from "../../images/editbot-icon.svg";
import deleteBotIcon from "../../images/deletebot-icon.svg";
import statisticBotIcon from "../../images/statisticbot-icon.svg";
import Modal from "react-bootstrap/Modal";
import BotService from "../../Services/bot.service";
import LeaderboardService from "../../Services/leaderboard.service";
import { useNavigate } from "react-router-dom";
import authService from "../../Services/auth.service";
import ModalApprove from "../../Components/Modals/ModalApprove";

export default function BotManagementCard(props) {
  let [modal, setModal] = useState(false);
  let [approveModal, setApproveModal] = useState(false);
  let [subscriptionModal, setSubscriptionModal] = useState(false);

  let [runOption, setRunOption] = useState(0);
  let [leaderPositions, setLeaderPositions] = useState([]);
  let [negativePNLChoiceAmount, setNegativePNLChoiceAmount] = useState(0);
  let [allPositionChoiceAmount, setAllPositionChoiceAmount] = useState(0);
  let [availableBalance, setAvailableBalance] = useState(0);
  let [disableRun, setDisableRun] = useState(false);
  let navigate = useNavigate();
  let [account, setAccount] = useState(null);

  useEffect(() => {
    getAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getAccount() {
    let userAccounts =
      authService.getCurrentUser().userDetails.userExchangeAccounts;

    let botUserAccount = userAccounts.find(
      (item) => item.id === props.data.userExchangeAccountId
    );

    if (props.data.type !== 2) {
      let exchangeName =
        botUserAccount.exchange === 1 ? "Binance: " : "Not Binance: ";
      setAccount(exchangeName + botUserAccount.name);
    }
  }

  function showModal() {
    if (props.data.status === 1) {
      return;
    }

    let userDetails = authService.getCurrentUser().userDetails;
    let userAvailableBalance =
      userDetails.exchangeBalance - userDetails.usedBalance;
    setAvailableBalance(userAvailableBalance);

    LeaderboardService.getLeaderOpenPositions(props.data.leaderKey).then(
      (response) => {
        let positions =
          response.data.data.otherPositionRetList === null
            ? []
            : response.data.data.otherPositionRetList;
        setLeaderPositions(positions);

        let filteredList = positions.filter((x) => x.pnl < 0);
        let totalNegativeAmount = 0;

        filteredList.forEach((item) => {
          totalNegativeAmount +=
            (item.markPrice * Math.abs(item.amount) * props.data.coefficient) /
            item.leverage;
        });

        setNegativePNLChoiceAmount(totalNegativeAmount.toFixed(0));

        let totalAmount = 0;
        positions.forEach((item) => {
          totalAmount +=
            (item.markPrice * Math.abs(item.amount) * props.data.coefficient) /
            item.leverage;
        });

        setAllPositionChoiceAmount(totalAmount.toFixed(0));
      }
    );
    setModal(true);
  }

  function deleteBot() {
    BotService.delete(props.data.id)
      .then(() => {
        setApproveModal(false);
        props.updateList();
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  function run() {
    var user = authService.getCurrentUser();

    if (user.userDetails.subscription === 0) {
      setSubscriptionModal(true);
      return;
    }

    BotService.run(props.data.id, runOption)
      .then((response) => {
        setModal(false);
        props.updateList();

        authService.updateUserDetails();
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  function stop() {
    if (props.data.status !== 1) {
      return;
    }
    BotService.stop(props.data.id)
      .then(() => {
        props.updateList();
        authService.updateUserDetails();
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  function edit() {
    if (props.data.status === 1) {
      alert("Остановите бот чтобы отредактировать конфигурацию.");
      return;
    }
    props.onEdit();
  }

  return (
    <div className="BotManagementCard">
      <div className="row">
        <div className="mb-4">
          {props.data.type === 0 && <span className="bot-type">Copy</span>}
          {props.data.type === 1 && <span className="bot-type">Open</span>}
          {props.data.type === 2 && <span className="bot-type">Notify</span>}
          {account && <span className="account-type">{account}</span>}
        </div>
        <div className="col">
          <div className="d-flex">
            <img
              src={UnknownIcon}
              alt="unknown-icon"
              className="user-account-icon"
            ></img>
            <div>
              <p className="bot-option">
                <span>Ник:</span> {props.data.leaderName}
              </p>
            </div>
          </div>
          <p className="bot-option">
            <span>Создан:</span>{" "}
            {new Date(props.data.createdDate).toLocaleDateString() +
              " | " +
              new Date(props.data.createdDate).toLocaleTimeString("es-ES")}
          </p>
          <p className="bot-option">
            <span>{props.data.status === 2 ? "Остановлен:" : "Запущен:"}</span>{" "}
            {props.data.status === 0
              ? "-"
              : new Date(props.data.runStopDate).toLocaleDateString() +
                " | " +
                new Date(props.data.runStopDate).toLocaleTimeString("es-ES")}
          </p>
        </div>
        <div className="col">
          <p
            className={
              props.data.status === 1
                ? "bot-option green"
                : props.data.status === 2
                ? "bot-option red"
                : "bot-option"
            }
          >
            <span>Статус:</span>{" "}
            {props.data.status === 0
              ? "Новый"
              : props.data.status === 1
              ? "Работает"
              : "Остановлен"}
          </p>
          <p
            className={
              props.data.roi > 0
                ? "bot-option green"
                : props.data.roi < 0
                ? "bot-option red"
                : "bot-option"
            }
          >
            <span>Профит:</span> {props.data.roi.toFixed(0)}%
          </p>
          <p
            className={
              props.data.pnl > 0
                ? "bot-option green"
                : props.data.pnl < 0
                ? "bot-option red"
                : "bot-option"
            }
          >
            <span>Общий доход:</span> {props.data.pnl.toFixed(0)}$
          </p>
          <p className="bot-option">
            <span>Депозит:</span> {props.data.balance} USDT
          </p>
        </div>
      </div>
      <div className="bot-button-container d-flex justify-content-center">
        <div
          onClick={showModal}
          className={props.data.status === 1 ? "disabled" : ""}
        >
          <img src={playBotIcon} alt="play-icon" className="play-icon"></img>
        </div>
        <div
          onClick={stop}
          className={props.data.status !== 1 ? "disabled" : ""}
        >
          <img src={stopBotIcon} alt="stop-icon"></img>
        </div>
        <div onClick={edit}>
          <img src={editBotIcon} alt="edit-icon"></img>
        </div>
        <div
          onClick={() => {
            if (props.data.status === 1) return;
            setApproveModal(true);
          }}
          className={props.data.status === 1 ? "disabled" : ""}
        >
          <img src={deleteBotIcon} alt="delete-icon"></img>
        </div>
        <div onClick={() => navigate("/leader/" + props.data.leaderKey)}>
          <img src={statisticBotIcon} alt="statistic-icon"></img>
        </div>
      </div>
      <Modal
        show={modal}
        onHide={() => setModal(false)}
        className="run-bot-modal"
      >
        <Modal.Header closeButton>
          <h4 className="copy-header">Настройки копирования</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="radio-buttons-wrapper">
            <label>
              <input
                type="radio"
                name="following-option"
                value={0}
                onChange={(e) => setRunOption(e.target.value)}
                defaultChecked
              />
              Копировать только новые позиции
            </label>
            <label>
              <input
                type="radio"
                name="following-option"
                value={1}
                onChange={(e) => {
                  setRunOption(e.target.value);
                  setDisableRun(availableBalance < negativePNLChoiceAmount);
                }}
              />
              Копировать позиции с отрицательным PNL-ROI{" "}
              <span
                className={
                  availableBalance > negativePNLChoiceAmount ? "green" : "red"
                }
              >
                (общая сумма с учетом коефициента: {negativePNLChoiceAmount}$)
              </span>
            </label>
            <label>
              <input
                type="radio"
                name="following-option"
                value={2}
                onChange={(e) => {
                  setRunOption(e.target.value);
                  setDisableRun(availableBalance < allPositionChoiceAmount);
                }}
              />
              Копироват все открытые позиции{" "}
              <span
                className={
                  availableBalance > allPositionChoiceAmount ? "green" : "red"
                }
              >
                (общая сумма с учетом коефициента: {allPositionChoiceAmount}$)
              </span>
            </label>
          </div>
          <div className="text-center">
            <h5>Открытые позиции трейдера</h5>
            <div className="table-container">
              <table className="m-auto">
                <thead>
                  <tr className="border-bottom">
                    <th>Пара</th>
                    <th>Short/Buy</th>
                    <th>Amount</th>
                    <th>Цена входа</th>
                    <th>ROI</th>
                    <th>Общий PnL</th>
                    <th>Плечо</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderPositions?.map(function (item, index) {
                    return (
                      <tr className="border-bottom" key={index}>
                        <td>{item.symbol}</td>
                        <td
                          className={`direction ${
                            item.amount > 0 ? "green" : "red"
                          }`}
                        >
                          {item.amount > 0 ? "BUY" : "SHORT"}
                        </td>
                        <td>{item.amount.toFixed(2)}</td>
                        <td>{item.entryPrice.toFixed(5)}$</td>
                        <td className={`roi ${item.pnl < 0 ? "red" : "green"}`}>
                          {(item.roe * 100).toFixed(2)}%
                        </td>
                        <td className={`pnl ${item.pnl < 0 ? "red" : ""}`}>
                          {item.pnl > 0 ? "+" : ""}
                          {item.pnl.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                          $
                        </td>
                        <td>x{item.leverage}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {disableRun && (
            <div className="insufient-funds-warning">
              Текущие позиции трейдера превыщают Ваш доступный баланс с учетом
              коэффициента. Пересмотрите коэффициент или пополните баланс на
              Futures кошельке.
            </div>
          )}
          <div className="text-center">
            <button
              type="button"
              className="start-btn mt-4"
              onClick={run}
              disabled={disableRun}
            >
              Запустить
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <ModalApprove
        show={approveModal}
        onHide={() => setApproveModal(false)}
        title="Удаление бота"
        bodyText="Вы действительно хотите удалить бота?"
        onSubmit={deleteBot}
        submitButtonText="Удалить"
      />

      <ModalApprove
        show={subscriptionModal}
        onHide={() => setSubscriptionModal(false)}
        title="Оплата Подписки"
        bodyText="У Вас нет активной подписки. Вы сможете запустить бота после оплаты
            подписки."
        onSubmit={() => {
          navigate("/tarrifs");
          setSubscriptionModal(false);
        }}
        submitButtonText="Выбрать подписку"
      />
    </div>
  );
}
