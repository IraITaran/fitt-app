import React from "react";
import "./About.css";
import AboutHeaderLogo from "../../images/about-header-logo.svg";
import ProsIcon1 from "../../images/pros-icon1.svg";
import ProsIcon2 from "../../images/pros-icon2.svg";
import ProsIcon3 from "../../images/pros-icon3.svg";
import ListFlowIcon from "../../images/list-flow-icon.svg";
import FrequentQuestions from "../TarrifPlans/FrequentQuestions";
import AboutTwitterIcon from "../../images/about-twitter-icon.svg";
import AboutFacebookIcon from "../../images/about-facebook-icon.svg";
import AboutTelegramIcon from "../../images/about-telegram-icon.svg";
import AboutRedditIcon from "../../images/about-reddit-icon.svg";

export default function About() {
  return (
    <div className="About">
      <div className="about-header-container d-flex justify-content-between">
        <div className="main-left">
          <p>
            Fitt — больше, чем <br />
            просто платформа
          </p>
          <span>
            Это социальная платформа для передачи здорового
            <br /> торгового опыта от опытных трейдеров к начинающим
          </span>
        </div>
        <div className="main-right">
          <img src={AboutHeaderLogo} alt="about-header-logo"></img>
        </div>
        <div className="bg-about-main"></div>
      </div>
      <div className="about-main-container">
        <div className="advantages-container">
          <h2>Наши преимущества</h2>
          <div className="d-flex ">
            <div className="advantages-section">
              <img src={ProsIcon1} alt="advantage-icon"></img>
              <p>Проверено</p>
              <p>
                Мы сотрудничаем с ведущими криптобиржами для обеспечения лучшего
                опыта социальной торговли
              </p>
            </div>
            <div className="advantages-section">
              <img src={ProsIcon2} alt="advantage-icon"></img>
              <p>Надежно</p>
              <p>
                Необходимые меры безопасности позволяют обеспечить постоянную
                защиту средств и данных
              </p>
            </div>
            <div className="advantages-section">
              <img src={ProsIcon3} alt="advantage-icon"></img>
              <p>Подробное описание портфеля</p>
              <p>
                Проанализируйте историю сделок лучших трейдеров и следуйте
                лучшим сделкам
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex flow-trading-container">
          <div className="flow-left-section">
            <h2>Станьте фолоу-трейдером</h2>
            <ul>
              <li>
                <img src={ListFlowIcon} alt="list-icon"></img>
                <p>
                  Получайте пасивный доход, следуя стратегиям лучших трейдеров
                </p>
              </li>
              <li>
                <img src={ListFlowIcon} alt="list-icon"></img>Автоматически
                следуйте разнообразным стратегиям всего со $100
              </li>
              <li>
                <img src={ListFlowIcon} alt="list-icon"></img>Сохраняйте
                контроль над активам. Разместите стоп-лосс и остановите
                копирование в любое время
              </li>
              <li>
                <img src={ListFlowIcon} alt="list-icon"></img>Ни о чем не
                беспокойтесь. Все ваши активы на Binance находятся под надежной
                защитой
              </li>
            </ul>
            <button className="yellow-btn">Перейти к списку портфелей</button>
          </div>
          <div className="flow-right-section">
            <div className="bg-flow-fitt"></div>
            <div className="bg-flow-rhombus"></div>
            <ul>
              <li className="grey-item">
                <span>01.</span>Выберите понравившиеся портфели для слежения
              </li>
              <li className="black-item">
                <span>02.</span>Выберите сумму депозита и установите стоп-лосс
              </li>
              <li className="grey-item">
                <span>03.</span>Наблюдайте как лучшие трейдеры ведут вас по
                сделкам
              </li>
            </ul>
          </div>
        </div>
        <FrequentQuestions />
      </div>
      <div className="about-footer text-center">
        <p>Присоединяйтесь и станьте частью нашего сообщества</p>
        <p>Достигайте поставленных результатов профита на рынке криптовалют!</p>
        <ul>
          <li>
            <a href="/">
              <img src={AboutTwitterIcon} alt="twitter-icon"></img>
            </a>
          </li>
          <li>
            <a href="/">
              <img src={AboutFacebookIcon} alt="facebook-icon"></img>
            </a>
          </li>
          <li>
            <a href="/">
              <img src={AboutTelegramIcon} alt="telegram-icon"></img>
            </a>
          </li>
          <li>
            <a href="/">
              <img src={AboutRedditIcon} alt="reddit-icon"></img>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
