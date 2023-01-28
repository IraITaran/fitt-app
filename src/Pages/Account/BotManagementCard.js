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

export default function BotManagementCard(props) {
  let [modal, setModal] = useState(false);
  let [runOption, setRunOption] = useState(0);

  function showModal() {
    setModal(true);
  }

  function run() {
    BotService.run(props.data.id, runOption)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert(error.response.data);
      });
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
              <p className="bot-option">
                <span>ID:</span> {props.data.userId}
              </p>
            </div>
          </div>
          <p className="bot-option">
            <span>Создан:</span> 2021-09-18 | 19:27:23
          </p>
          <p className="bot-option">
            <span>Запущен:</span> 2021-09-18 | 00:55:07
          </p>
        </div>
        <div className="col">
          <p className="bot-option">
            <span>Статус:</span>{" "}
            {props.data.status === 0
              ? "Новый"
              : props.data.status === 1
              ? "Работает"
              : "Остановлен"}
          </p>
          <p className="bot-option">
            <span>Профит:</span> {props.data.roi}%
          </p>
          <p className="bot-option">
            <span>Общий доход:</span> {props.data.pnl}$
          </p>
          <p className="bot-option">
            <span>Депозит:</span> {props.data.balance} USDT
          </p>
        </div>
      </div>
      <div className="bot-button-container d-flex justify-content-center">
        <div onClick={showModal}>
          <img src={playBotIcon} alt="play-icon" className="play-icon"></img>
        </div>
        <div>
          <img src={stopBotIcon} alt="stop-icon"></img>
        </div>
        <div>
          <img src={editBotIcon} alt="edit-icon"></img>
        </div>
        <div>
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
          <div>
            <label>
              <input
                type="radio"
                name="following-option"
                value={runOption}
                onChange={(e) => setRunOption(e.target.value)}
                defaultChecked
              />
              Копировать только новые позиции
            </label>
            <label>
              <input type="radio" name="following-option" value={1} />
              Копировать позиции с отрицательным PNL-ROI
            </label>
            <label>
              <input type="radio" name="following-option" value={2} />
              Копироват все открытые позиции
            </label>
          </div>
          <div className="text-center">
            <button type="button" className="start-btn mt-4" onClick={run}>
              Запустить
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
