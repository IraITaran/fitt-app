import React from "react";
import FittLogoHeader from "../../images/fitt-logo-header.svg";
import "./PageHeader.css";
import GiftIcon from "../../images/gift-icon.svg";
import LanguageIcon from "../../images/language-icon.svg";
import BinanceLogoHeader from "../../images/binance-logo-header.svg";
import HeaderMainLogo from "../../images/header-main-logo.svg";

export default function PageHeader() {
  return (
    <div className="PageHeader">
      <div className="header-container d-flex">
        <div className="header-left d-flex">
          <img src={FittLogoHeader} alt="fitt" className="fitt-logo"></img>
          <nav>
            <ul className="d-flex">
              <li>
                <a href="/">Список портфелей</a>
              </li>
              <li>
                <a href="/">Торговля</a>
              </li>
              <li>
                <a href="/">Информация</a>
              </li>
              <li>
                <a href="/">Бонус</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header-right d-flex">
          <ul className="d-flex">
            <li>
              <a href="/">Вход</a>
            </li>
            <li className="d-flex align-items-baseline highlight">
              <img src={GiftIcon} alt="gift-icon" className="gift-icon"></img>
              <a href="/">Регистрация</a>
            </li>
            <li className="d-flex ">
              {" "}
              <img
                src={LanguageIcon}
                alt="language-icon"
                className="language-icon"
              ></img>
              Русский
            </li>
          </ul>
        </div>
      </div>
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
    </div>
  );
}
