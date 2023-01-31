import React, { useState } from "react";
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

export default function BotManagementCard(props) {
  let [modal, setModal] = useState(false);
  let [approveModal, setApproveModal] = useState(false);

  let [runOption, setRunOption] = useState(0);
  let [leaderPositions, setLeaderPositions] = useState([]);

  function showModal() {
    if (props.data.status === 1) {
      return;
    }
    LeaderboardService.getLeaderOpenPositions(props.data.leaderKey).then(
      (response) => {
        setLeaderPositions(response.data.data.otherPositionRetList);
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
    BotService.run(props.data.id, runOption)
      .then((response) => {
        setModal(false);
        props.updateList();
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
      .then((response) => {
        props.updateList();
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
            <span>
              {props.data.status === 1
                ? "Запущен:"
                : props.data.status === 2
                ? "Остановлен:"
                : "-"}
            </span>{" "}
            {new Date(props.data.runStopDate).toLocaleDateString() +
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
            <span>Профит:</span> {props.data.roi}%
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
            <span>Общий доход:</span> {props.data.pnl}$
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
        <div>
          <img src={statisticBotIcon} alt="statistic-icon"></img>
        </div>
      </div>
      <Modal className="bot-modal" show={modal} onHide={() => setModal(false)}>
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
                onChange={(e) => setRunOption(e.target.value)}
              />
              Копировать позиции с отрицательным PNL-ROI
            </label>
            <label>
              <input
                type="radio"
                name="following-option"
                value={2}
                onChange={(e) => setRunOption(e.target.value)}
              />
              Копироват все открытые позиции
            </label>
          </div>
          <div className="text-center">
            <h4 className="copy-header">Открытые позиции трейдера</h4>
            <div className="table-container">
              <table className="m-auto w-100">
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
          <div className="text-center">
            <button type="button" className="start-btn mt-4" onClick={run}>
              Запустить
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
          <h4 className="approve-header">Удаление бота</h4>
        </Modal.Header>
        <Modal.Body>
          <h4 className="approve-text">
            Вы действительно хотите удалить бота?
          </h4>
          <button
            type="button"
            className="approve-btn delete mt-4"
            onClick={deleteBot}
          >
            Удалить
          </button>
          <button
            type="button"
            className="approve-btn  mt-4"
            onClick={() => setApproveModal(false)}
          >
            Отмена
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
