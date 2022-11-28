import React from "react";
import BinanceLogoHeader from "../../images/binance-logo-header.svg";
import HeaderMainLogo from "../../images/header-main-logo.svg";
import "./LeaderBoardBanner.css";

export default function LeaderBoardBanner() {
  return (
    <div className="main-container d-flex">
      <div className="main-left">
        <p>
          <span>Копируйте сделки</span> в один клик с FITT
        </p>
        <span className="binance-powered">Powered by</span>
        <img
          src={BinanceLogoHeader}
          alt="binance-logo"
          className="binance-logo"
        ></img>
      </div>
      <div className="main-right">
        <img src={HeaderMainLogo} alt="main-logo"></img>
      </div>
      <div className="bg-binance"></div>
    </div>
  );
}
