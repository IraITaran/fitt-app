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
          <p>Fitt — это не просто платформа, это ваш ключ к успеху</p>
          <span>
            Откройте для себя FItt — уникальную социальную платформу, <br />
            созданную для трансформации торгового опыта, где опытные
            <br /> трейдеры помогут начинающим мастерить искусство успешной
            торговли. <br />
            Присоединяйтесь к нашему дружественному сообществу и обогатите
            <br /> свои знания, получая ценные советы и стратегии от
            профессионалов. <br />
            Вместе с FItt вы станете частью революции в мире криптовалютной
            торговли, <br />
            где знания и опыт становятся двигателем вашего успеха и финансового
            благополучия.
          </span>
        </div>
        <div className="main-right">
          <img src={AboutHeaderLogo} alt="about-header-logo"></img>
        </div>
        <div className="bg-about-main"></div>
      </div>
      <div className="about-main-container">
        <div className="advantages-container">
          <h2>Наши ключевые преимущества</h2>
          <div className="d-flex ">
            <div className="advantages-section">
              <img src={ProsIcon1} alt="advantage-icon"></img>
              <p>Доказанная эффективность</p>
              <p>
                Мы сотрудничаем с топовыми криптовалютными биржами для
                предоставления наилучшего опыта в социальной торговле
              </p>
            </div>
            <div className="advantages-section">
              <img src={ProsIcon2} alt="advantage-icon"></img>
              <p>Высокая надежность</p>
              <p>
                Мы применяем строгие меры безопасности, чтобы обеспечить
                непрерывную защиту ваших средств и конфиденциальных данных
              </p>
            </div>
            <div className="advantages-section">
              <img src={ProsIcon3} alt="advantage-icon"></img>
              <p>Тщательный анализ портфеля</p>
              <p>
                Изучайте торговую историю лидеров рынка и присоединяйтесь к
                самым успешным сделкам на основе их стратегий ‌
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex flow-trading-container">
          <div className="flow-left-section">
            <h2>Становитесь фолловер-трейдером</h2>
            <ul>
              <li>
                <img src={ListFlowIcon} alt="list-icon"></img>
                Получайте пассивный доход, следуя проверенным стратегиям
                топ-трейдеров
              </li>
              <li>
                <img src={ListFlowIcon} alt="list-icon"></img>Автоматически
                присоединяйтесь к разнообразным стратегиям с минимальным
                вложением всего от $100
              </li>
              <li>
                <img src={ListFlowIcon} alt="list-icon"></img>Сохраняйте
                контроль над активам. Разместите стоп-лосс и остановите
                копирование в любое время
              </li>
              <li>
                <img src={ListFlowIcon} alt="list-icon"></img>Оставайтесь
                спокойными: ваши активы на Binance находятся под надежной
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
