import React, { useState, useEffect } from "react";
import "./AccountWallet.css";
import BotService from "../../Services/bot.service";
import BotManagementCard from "./BotManagementCard";
import "./BotManagement.css";

export default function BotManagement() {
  const [botList, setBotList] = useState([]);

  useEffect(() => {
    BotService.getBots().then((response) => {
      setBotList(response.data);
    });
  }, []);

  return (
    <div className="BotManagement d-flex justify-content-evenly">
      {botList.map(function (bot, index) {
        return (
          <div key={index}>
            <BotManagementCard data={bot} />
          </div>
        );
      })}
    </div>
  );
}
