import React, { useState, useEffect } from "react";
import "./AccountWallet.css";
import BotService from "../../Services/bot.service";
import BotManagementCard from "./BotManagementCard";
import ModalBotConfiguration from "../../Components/Modals/ModalBotConfiguration";
import "./BotManagement.css";

export default function BotManagement() {
  const [botList, setBotList] = useState([]);
  const [currentBot, setCurrentBot] = useState({});
  let [showFollowModal, setShowFollowModal] = useState(false);

  useEffect(() => {
    updateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateList() {
    BotService.getBots().then((response) => {
      setBotList(
        response.data.sort(
          (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
        )
      );
    });
  }

  function onEdit(bot) {
    setCurrentBot(bot);
    setShowFollowModal(true);
  }

  return (
    <>
      <div className="BotManagement d-flex">
        {botList.map(function (bot, index) {
          return (
            <BotManagementCard
              key={index}
              data={bot}
              updateList={updateList}
              onEdit={() => onEdit(bot)}
            />
          );
        })}
      </div>
      {showFollowModal && (
        <ModalBotConfiguration
          show={showFollowModal}
          data={currentBot}
          onHide={() => setShowFollowModal(false)}
          onUpdate={() => {
            setShowFollowModal(false);
            updateList();
          }}
          isUpdate={true}
        />
      )}
    </>
  );
}
