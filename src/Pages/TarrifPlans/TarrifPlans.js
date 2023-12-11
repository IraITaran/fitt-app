import React from "react";
import "./TarrifPlans.css";
import OptionListIcon from "../../images/option-list-icon.svg";
import OptionListLightIcon from "../../images/list-light-icon.svg";
import FrequentQuestions from "./FrequentQuestions";
import { Link } from "react-router-dom";

export default function TarrifPlans({isFrequentQuestions}) {
  return (
    <div className="TarrifPlans">
      <div className="container">
      <div className="tariff-plans-inner">
        <div className="bg-image-rhombus"></div>
        <div className="bg-image-3d-rhombus"></div>
        <h1 className="text-center">Тарифные планы</h1>
        <p className="text-center choice">
          Выберите срок и тариф, который будет подходить вам больше всего
        </p>
        <select className="form-select tariff-select">
          <option>1 месяц</option>
          <option>2 месяца</option>
          <option>3 месяца</option>
        </select>
        <div className="tarrifs-option-container d-flex align-items-center justify-content-center">
          <div className="option-card">
            <p className="option-name">Для начинающих</p>
            <p className="option-price">
              <span>$50</span> / месяц
            </p>
            <hr className="m-0" />
            <ul>
              <li>
                <img src={OptionListIcon} alt="list - icon" />1 Аккаунт в
                управлении
              </li>
              <li>
                <img src={OptionListIcon} alt="list - icon" />
                До 1000 бюджет
              </li>
              <li>
                <img src={OptionListIcon} alt="list - icon" />3 бота для сигналов
              </li>
              <li>
                <img src={OptionListIcon} alt="list - icon" />
                Уведомления в Telegram
              </li>
              <Link to="/payment/1">
                <button type="button" className="tarrif-btn">
                  Выбрать тариф
                </button>
              </Link>
            </ul>
          </div>
          <div className="option-dark-card">
            <div className="d-flex justify-content-between">
              <p className="option-name">Для трейдеров</p>
              <p className="popular">Популярный</p>
            </div>
            <p className="option-price">
              <span>$100</span> / месяц
            </p>
            <hr className="m-0" />
            <ul>
              <li>
                <img src={OptionListLightIcon} alt="list - icon" />2 Аккаунта в
                управлении
              </li>
              <li>
                <img src={OptionListLightIcon} alt="list - icon" />
                До 5000 бюджет на аккаунт
              </li>
              <li>
                <img src={OptionListLightIcon} alt="list - icon" />
                10 бота для сигналов
              </li>
              <li>
                <img src={OptionListLightIcon} alt="list - icon" />
                Уведомления в Telegram
              </li>
              <Link to="/payment/2">
                <button type="button" className="tarrif-btn">
                  Выбрать тариф
                </button>
              </Link>
            </ul>
          </div>
          <div className="option-card">
            <p className="option-name">Для экспертов</p>
            <p className="option-price">
              <span>$150</span> / месяц
            </p>
            <hr className="m-0" />
            <ul>
              <li>
                <img src={OptionListIcon} alt="list - icon" />2 Аккаунта в
                управлении
              </li>
              <li>
                <img src={OptionListIcon} alt="list - icon" />
                Неограниченный бюджет
              </li>
              <li>
                <img src={OptionListIcon} alt="list - icon" />
                20 ботов для сигналов
              </li>
              <li>
                <img src={OptionListIcon} alt="list - icon" />
                Уведомления в Telegram
              </li>

              <Link to="/payment/3">
                <button type="button" className="tarrif-btn">
                  Выбрать тариф
                </button>
              </Link>
            </ul>
          </div>
        </div>
      </div>
      {isFrequentQuestions && <FrequentQuestions />}
      {/* {isFrequentQuestions ? (
         <FrequentQuestions />
        ) : ('')} */}
     
    </div>
    </div>
  );
}
