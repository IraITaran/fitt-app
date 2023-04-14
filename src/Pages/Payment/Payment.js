import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useParams } from "react-router-dom";
import paymentService from "../../Services/payment.service";
import OptionListIcon from "../../images/option-list-icon.svg";
import BitcoinIcon from "../../images/bitcoin-icon.svg";
import ApplePayIcon from "../../images/apple-pay-icon.svg";
import CreditCardIcon from "../../images/credit-card-icon.svg";

export default function Payment() {
  let [invoice, setInvoice] = useState("");
  let [isCardPayment, setIsCardPayment] = useState(false);
  let [isButton, setIsButton] = useState(false);

  let { subscriptionType } = useParams();

  useEffect(() => {
    paymentService.getInvoice().then((response) => {
      setInvoice(response.data);
    });
  }, []);

  return (
    <div className="Payment container-fluid">
      <div className="row">
        <div className="payment-info-container col">
          <h1>Подтверждение и оплата</h1>
          <div className="payment-section">
            <h6>1. Способ оплаты</h6>
            <div className="payment-method-input">
              <label>
                <img src={BitcoinIcon} alt="bitcoin-icon" />
                Криптовалютой
                <input
                  type="radio"
                  name="payment-method"
                  value="Криптовалютой"
                  className="radio"
                  defaultChecked
                  onChange={() => {
                    setIsCardPayment(false);
                    setIsButton(false);
                  }}
                />
              </label>
            </div>
            <div className="payment-method-input">
              <label>
                <img src={CreditCardIcon} alt="credit-card-icon" />
                Кредитной картой
                <input
                  type="radio"
                  name="payment-method"
                  value="Кредитной картой"
                  className="radio"
                  onChange={() => {
                    setIsCardPayment(true);
                    setIsButton(true);
                  }}
                />
              </label>
              <p className="not-available">Недоступно</p>
            </div>
            {isCardPayment && (
              <div className="credit-card-info">
                <label className="credit-number-input">
                  Номер карты*
                  <input type="text" placeholder="1234 1234 1234 1234"></input>
                </label>
                <div className="row">
                  <label className="col">
                    Дата окончания*
                    <input type="text" placeholder="ДД / ГГ"></input>
                  </label>
                  <label className="col">
                    CVC*
                    <input type="text" placeholder="***"></input>
                  </label>
                </div>
              </div>
            )}
            <div className="payment-method-input">
              <label>
                <img src={ApplePayIcon} alt="apple-pay-icon" />
                <span>Apple Pay</span>
                <input
                  type="radio"
                  name="payment-method"
                  value="Apple Pay"
                  className="radio"
                  onChange={() => {
                    setIsCardPayment(false);
                    setIsButton(true);
                  }}
                />
              </label>
              <p className="not-available">Недоступно</p>
            </div>
          </div>
          {isCardPayment && (
            <div className="payment-section">
              <h6>2. Персональная информация</h6>
              <div className="personal-data-input-container">
                <label className="personal-email">
                  Email
                  <input type="text"></input>
                </label>
                <div className="row">
                  <label className="col">
                    Имя
                    <input type="text"></input>
                  </label>
                  <label className="col">
                    Фамилия
                    <input type="text"></input>
                  </label>
                </div>
              </div>
            </div>
          )}
          {isCardPayment && (
            <div className="account-address payment-section">
              <h6>3. Адрес для выставления счета</h6>
              <div className="account-address-input-container">
                <div className="row">
                  <label className="col">
                    Страна
                    <input type="text"></input>
                  </label>
                  <label className="col">
                    Город
                    <input type="text"></input>
                  </label>
                </div>
                <label className="street-input">
                  Улица
                  <input type="text"></input>
                </label>
                <div className="row">
                  <label className="col">
                    Номер дома
                    <input type="text"></input>
                  </label>
                  <label className="col">
                    Почтовый индекс
                    <input type="text"></input>
                  </label>
                </div>
              </div>
            </div>
          )}
          <div className="payment-section">
            <h6>
              {isCardPayment ? "4." : "2."} На какой период вы хотите оплатить
              тариф?
            </h6>
            <div className="payment-period-input">
              <label className="d-flex justify-content-between align-items-center">
                <span className="period">1 месяц</span>
                <div className="input-right-section">
                  <span className="period-price">75$</span>
                  <input
                    type="radio"
                    name="payment-period"
                    value="month-75$"
                    className="radio"
                    defaultChecked
                  />
                </div>
              </label>
            </div>
            <div className="payment-period-input">
              <label className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="period"> 3 месяца</span> <br />
                  <span className="economy">Экономия $25 </span>
                </div>
                <div className="input-right-section">
                  <span className="period-price">210$</span>
                  <input
                    type="radio"
                    name="payment-period"
                    value="3months-210$"
                    className="radio"
                  />
                </div>
              </label>
            </div>
            <div className="payment-period-input">
              <label className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="period">1 год</span>
                  <br />
                  <span className="economy">Экономия $150 </span>
                </div>
                <div className="input-right-section">
                  <span className="period-price">$750</span>
                  <input
                    type="radio"
                    name="payment-period"
                    value="1year-750$"
                    className="radio"
                  />
                </div>
              </label>
            </div>
          </div>
          <label className="payment-agreement">
            <input type="checkbox" />Я прочитал(-а) и принимаю
            <a href="/">
              {" "}
              Соглашение об обслуживании, Заявление о конфиденциальности
            </a>
          </label>
          <div
            className={
              isCardPayment || isButton ? "hidden-form" : "text-center"
            }
          >
            <form action="https://www.coinpayments.net/index.php" method="post">
              <input type="hidden" name="cmd" value="_pay_simple" />
              <input type="hidden" name="reset" value="1" />
              <input
                type="hidden"
                name="merchant"
                value="661a3ac5e8834a8251a81452e027c3b9"
              />
              <input type="hidden" name="item_name" value={subscriptionType} />
              <input
                type="hidden"
                name="item_desc"
                value="Starter Subscription for Fitt platform"
              />
              <input type="hidden" name="currency" value="USDT.BEP20" />
              <input type="hidden" name="amountf" value="10.00000000" />
              <input type="hidden" name="invoice" value={invoice} />

              <input type="hidden" name="want_shipping" value="0" />
              <input
                type="hidden"
                name="success_url"
                value="https://gregarious-crostata-7ee7b5.netlify.app/#"
              />
              <input
                type="hidden"
                name="ipn_url"
                value="https://fitt.ink/api/payment/ipn"
              />
              <input
                type="image"
                src="https://www.coinpayments.net/images/pub/buynow-grey.png"
                alt="Купить используя CoinPayments.net"
              />
            </form>
          </div>
          {isButton && (
            <button className="payment-btn" disabled>
              Подтвердить и оплатить
            </button>
          )}
        </div>
        <div className="selected-tarrif-container col">
          <div className="payment-option-card">
            {subscriptionType === "1" && (
              <p className="option-name">Для начинающих</p>
            )}
            {subscriptionType === "2" && (
              <p className="option-name">Для трейдеров</p>
            )}
            {subscriptionType === "3" && (
              <p className="option-name">Для экспертов</p>
            )}
            <p className="option-period">1 месяц</p>
            <p className="next-payment">Следующий платёж: 30 ноября 2022</p>
            <hr className="m-0" />
            {subscriptionType === "1" && (
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
                  <img src={OptionListIcon} alt="list - icon" />1 бот для
                  сигналов
                </li>
                <li>
                  <img src={OptionListIcon} alt="list - icon" />
                  Уведомления в Telegram
                </li>
              </ul>
            )}
            {subscriptionType === "2" && (
              <ul>
                <li>
                  <img src={OptionListIcon} alt="list - icon" />2 Аккаунта в
                  управлении
                </li>
                <li>
                  <img src={OptionListIcon} alt="list - icon" />
                  До 5000 бюджет
                </li>
                <li>
                  <img src={OptionListIcon} alt="list - icon" />3 бота для
                  сигналов
                </li>
                <li>
                  <img src={OptionListIcon} alt="list - icon" />
                  Уведомления в Telegram
                </li>
              </ul>
            )}
            {subscriptionType === "3" && (
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
                  <img src={OptionListIcon} alt="list - icon" />5 ботов для
                  сигналов
                </li>
                <li>
                  <img src={OptionListIcon} alt="list - icon" />
                  Уведомления в Telegram
                </li>
              </ul>
            )}
            <hr className="m-0" />
            <div className="d-flex justify-content-between align-items-center tarrif-total-price-container">
              <span>Всего:</span>
              {subscriptionType === "1" && <span>$50</span>}
              {subscriptionType === "2" && <span>$100</span>}
              {subscriptionType === "3" && <span>$150</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
