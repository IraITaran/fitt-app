import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import BotService from "../../Services/bot.service";
import BotConfigurationForm from "../../Components/Configuration/BotConfigurationForm";
import "./ModalBotConfiguration.css";

export default function ModalBotConfiguration(props) {
  let [saveButtonEnabled, setSaveButtonEnabled] = useState(true);
  let [botSaveEvent, setBotSaveEvent] = useState(false);

  function onHide() {
    props.onHide();
  }

  function submit(botConfiguration) {
    BotService.update(
      botConfiguration.id,
      botConfiguration.leaderId,
      botConfiguration.nickName,
      botConfiguration.type,
      botConfiguration.balance,
      botConfiguration.coefficient,
      botConfiguration.risk,
      botConfiguration.positionControl,
      botConfiguration.stopLoss,
      botConfiguration.stopProfit,
      botConfiguration.userExchangeAccountId
    ).then(() => {
      props.onUpdate();
    });
  }

  return (
    <div>
      <Modal
        show={props.show}
        onHide={onHide}
        className="modal-follow-container"
      >
        <Modal.Header closeButton>
          <h5>Конфигурация слежения</h5>
        </Modal.Header>
        <Modal.Body>
          <BotConfigurationForm
            leaderId={props.data.leaderKey}
            data={props.data}
            botSaveEvent={botSaveEvent}
            nextEnabled={setSaveButtonEnabled}
            updateBotConfiguration={submit}
            isUpdate={true}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="save-btn w-100"
            onClick={() => setBotSaveEvent(true)}
            disabled={!saveButtonEnabled}
          >
            Сохранить
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
