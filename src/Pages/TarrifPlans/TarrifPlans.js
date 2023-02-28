import React from "react";
import "./TarrifPlans.css";
import OptionListIcon from "../../images/option-list-icon.svg";
import OptionListLightIcon from "../../images/list-light-icon.svg";
import FrequentQuestions from "./FrequentQuestions";
import { Link } from "react-router-dom";

export default function TarrifPlans() {
  return (
    <div className="TarrifPlans">
      <div className="bg-image-rhombus"></div>
      <div className="bg-image-3d-rhombus"></div>
      <h1 className="text-center">Тарифные планы</h1>
      <p className="text-center choice">
        Выберите срок и тариф, который будет подходить вам больше всего
      </p>

      <div className="tarrifs-option-container d-flex align-items-center justify-content-center">
        <div className="option-card">
          <p className="option-name">Для начинающих</p>
          <p className="option-price">
            <span>$75</span> / месяц
          </p>
          <hr className="m-0" />
          <ul>
            <li>
              <img src={OptionListIcon} alt="list - icon" />
              До 2х за кем следить
            </li>
            <li>
              <img src={OptionListIcon} alt="list - icon" />
              До 5000 бюджет
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
            <span>$150</span> / месяц
          </p>
          <hr className="m-0" />
          <ul>
            <li>
              <img src={OptionListLightIcon} alt="list - icon" />
              До 4х за кем следить
            </li>
            <li>
              <img src={OptionListLightIcon} alt="list - icon" />
              До 25 000 бюджет
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
            <span>$250</span> / месяц
          </p>
          <hr className="m-0" />
          <ul>
            <li>
              <img src={OptionListIcon} alt="list - icon" />
              Не ограничего за кем следить
            </li>
            <li>
              <img src={OptionListIcon} alt="list - icon" />
              Неограниченный бюджет
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
      <FrequentQuestions />
    </div>
  );
}
