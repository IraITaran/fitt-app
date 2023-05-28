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
  let [period, setPeriod] = useState(1);
  let [nextPayment, setNextPayment] = useState("");
  let [subscriptionPrice, setSubscriptionPrice] = useState(null);
  let [checked, setChecked] = useState(false);
  let { subscriptionType } = useParams();

  useEffect(() => {
    paymentService.getInvoice().then((response) => {
      setInvoice(response.data);
    });

    let starterPrices = {};
    starterPrices["1"] = 50;
    starterPrices["3"] = 100;
    starterPrices["12"] = 400;

    let traderPrices = {};
    traderPrices["1"] = 100;
    traderPrices["3"] = 200;
    traderPrices["12"] = 500;

    let proPrices ={};
    proPrices["1"] = 150;
    proPrices["3"] = 300;
    proPrices["12"] = 600;

    let subPrices ={};

    subPrices["1"] = starterPrices;
    subPrices["2"] = traderPrices;
    subPrices["3"] = proPrices;
    setSubscriptionPrice(subPrices);
  }, []);

  useEffect(() => {

    let date = new Date();
    let newDate = "";
    var options = {
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "numeric"
  };

     if(period === 1)
     {
       newDate = (new Date(date.setMonth(date.getMonth()+1))).toLocaleDateString('ru-RU',options)
     
     } else if(period === 2)
     {
      newDate = (new Date(date.setMonth(date.getMonth()+3))).toLocaleDateString('ru-RU',options)
     } else if(period === 3)
     {
      newDate = (new Date(date.setMonth(date.getMonth()+12))).toLocaleDateString('ru-RU',options)
     }

     setNextPayment(newDate)
  }, [period]);

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
                  <span className="period-price">{subscriptionPrice ? subscriptionPrice[subscriptionType.toString()]["1"] : ""}$</span>
                  <input
                    type="radio"
                    name="payment-period"
                    value={1}
                    onChange={(e) => setPeriod(1)}
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
                  <span className="period-price">{subscriptionPrice ? subscriptionPrice[subscriptionType.toString()]["3"]:""}$</span>
                  <input
                    type="radio"
                    name="payment-period"
                    value={3}
                    onChange={(e) => setPeriod(3)}
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
                  <span className="period-price">{subscriptionPrice ? subscriptionPrice[subscriptionType.toString()]["12"]: ""}$</span>
                  <input
                    type="radio"
                    name="payment-period"
                    value={12}
                    onChange={(e) => setPeriod(12)}
                    className="radio"
                  />
                </div>
              </label>
            </div>
          </div>
          <label className="payment-agreement">
            <input type="checkbox" 
             checked={checked}
             onChange={() => setChecked(!checked)}
            />Я прочитал(-а) и принимаю
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
            <form action="https://www.coinpayments.net/index.php" method="post" >
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
              <input type="hidden" name="amountf" value={subscriptionPrice ? subscriptionPrice[subscriptionType.toString()][period.toString()]: ""} />
              <input type="hidden" name="invoice" value={invoice} />
              <input type="hidden" name="period" value={period} />
              
              <input type="hidden" name="want_shipping" value="0" />
              <input 
                type="hidden"
                name="success_url"
                value="https://gregarious-crostata-7ee7b5.netlify.app/#"
              />
              <input 
                type="hidden"
                name="ipn_url"
                value="https://fitt.mom/api/payment/ipn"
              />
              <input disabled = {!checked}
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
            {period === "1" && (
              <p className="option-period">1 месяц</p>
            )}
            {period === "3" && (
              <p className="option-name">3 месяца</p>
            )}
            {period === "12" && (
              <p className="option-name">1 год</p>
            )}
            
            <p className="next-payment">Следующий платёж: {nextPayment}</p>
            <hr className="m-0" />
            {subscriptionType === "1" && (
              <ul>
                <li>
                  <img src={OptionListIcon} alt="list - icon" />
                  1 Аккаунт в
                  управлении
                </li>
                <li>
                  <img src={OptionListIcon} alt="list - icon" />
                  До 1000 бюджет
                </li>
                <li>
                  <img src={OptionListIcon} alt="list - icon" />3 бот для
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
                  <img src={OptionListIcon} alt="list - icon" />10 бота для
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
                  <img src={OptionListIcon} alt="list - icon" />20 ботов для
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
              {subscriptionPrice && <span>$ {subscriptionPrice[subscriptionType.toString()][period.toString()]}</span>}
           

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
