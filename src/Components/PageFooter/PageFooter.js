import React from "react";
import "./PageFooter.css";
import TwitterIcon from "../../images/twitter-icon.png";
import FacebookIcon from "../../images/facebook-icon.png";
import TelegramIcon from "../../images/telegram-icon.png";
import RedditIcon from "../../images/reddit-icon.png";
import FittLogoFooter from "../../images/fitt-logo-footer.svg";
import BinanceLogoFooter from "../../images/binance-logo-footer.svg";

export default function PageFooter() {
  return (
    <div className="PageFooter">
      <div className="d-flex">
        <div className="footer-nav d-flex">
          <ul className="about-us">
            <li className="list-header">О нас</li>
            <li>
              <a href="/">О нас</a>
            </li>
            <li>
              <a href="/">Объявление</a>
            </li>
            <li>
              <a href="/">Условия использования</a>
            </li>
            <li>
              <a href="/">Конфиденциальность</a>
            </li>
          </ul>
          <ul className="support">
            <li className="list-header">Центр поддержки</li>
            <li>
              <a href="/">Руководство для копи-трейдера</a>
            </li>
            <li>
              <a href="/">Руководство для лид-трейдера</a>
            </li>
            <li>
              <a href="/">Стать лид-трейдером</a>
            </li>
            <li>
              <a href="/">Центр поддержки</a>
            </li>
          </ul>
          <ul className="community">
            <li className="list-header">Сообщество</li>
            <li>
              <img src={TwitterIcon} alt="twitter-icon" className="me-2"></img>
              <a href="/">Твиттер</a>
            </li>
            <li>
              <img
                src={FacebookIcon}
                alt="facebook-icon"
                className="me-2"
              ></img>
              <a href="/">Фейсбук</a>
            </li>
            <li>
              <img
                src={TelegramIcon}
                alt="telegram-icon"
                className="me-2"
              ></img>
              <a href="/">Телеграм</a>
            </li>
            <li>
              <img src={RedditIcon} alt="reddit-icon" className="me-2"></img>
              <a href="/">Реддит</a>
            </li>
          </ul>
        </div>
        <div className="fitt-info-container">
          <div className="d-flex">
            <img src={FittLogoFooter} alt="fitt" className="fitt-logo"></img>
            <div className="ms-4">
              <p className="binance-powered">Powered by</p>
              {<img src={BinanceLogoFooter} alt="binance-logo"></img>}{" "}
            </div>
          </div>
          <p className="fitt-definition">
            Fitt — это социальная платформа для передачи здорового торгового
            опыта от опытных трейдеров к начинающим. Создайте крепкую связь
            между профессиональным трейдером и новичком для достижение
            поставленных результатов профита на рынке криптовалют.
          </p>
        </div>
      </div>
      <hr className="m-0"></hr>
      <p className="copyright">Copyright © 2022 Fitt. Все права защищены.</p>
    </div>
  );
}
