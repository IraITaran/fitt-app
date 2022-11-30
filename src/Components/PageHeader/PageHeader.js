import React from "react";
import "./PageHeader.css";
import { Link } from "react-router-dom";
import GiftIcon from "../../images/gift-icon.svg";
import LanguageIcon from "../../images/language-icon.svg";
import FittLogoHeader from "../../images/fitt-logo-header.svg";

export default function PageHeader() {
  return (
    <div className="PageHeader">
      <div className="header-container d-flex">
        <div className="header-left d-flex">
          <img src={FittLogoHeader} alt="fitt" className="fitt-logo"></img>
          <nav>
            <ul className="d-flex">
              <li>
                <Link to="/">Список портфелей</Link>
              </li>
              <li>
                <a href="/">Торговля</a>
              </li>
              <li>
                <Link to="about">Информация</Link>
              </li>
              <li>
                <Link to="tarrifs">Бонус</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header-right d-flex">
          <ul className="d-flex">
            <li>
              <Link to="authorization">Вход</Link>
            </li>
            <li className="d-flex align-items-baseline highlight">
              <img src={GiftIcon} alt="gift-icon" className="gift-icon"></img>
              <Link to="registration">Регистрация</Link>
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
    </div>
  );
}
