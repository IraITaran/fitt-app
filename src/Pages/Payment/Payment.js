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
          <div className="payment-method payment-section">
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
                />
              </label>
            </div>
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
            <div className="payment-method-input">
              <label>
                <img src={ApplePayIcon} alt="apple-pay-icon" />
                Apple Pay
                <input
                  type="radio"
                  name="payment-method"
                  value="Apple Pay"
                  className="radio"
                />
              </label>
            </div>
          </div>
          <div className="personal-data payment-section">
            <h6>2. Персональная информация</h6>
            <label>
              Email
              <input></input>
            </label>
            <label>
              Имя
              <input></input>
            </label>
            <label>
              Фамилия
              <input></input>
            </label>
          </div>
          <div className="account-address payment-section">
            <h6>3. Адрес для выставления счета</h6>
            <label>
              Страна
              <input></input>
            </label>
            <label>
              Город
              <input></input>
            </label>
            <label>
              Улица
              <input></input>
            </label>
            <label>
              Номер дома
              <input></input>
            </label>
            <label>
              Почтовый индекс
              <input></input>
            </label>
          </div>
          <div className="payment-period payment-section">
            <h6>4. На какой период вы хотите оплатить тариф?</h6>
            <label>
              <input
                type="radio"
                name="payment-period"
                value="month-75$"
                defaultChecked
              />
              1 месяц 75$
            </label>
            <label>
              <input type="radio" name="payment-period" value="3months-210$" />3
              месяца
              <br />
              Экономия $25 210$
            </label>
            <label>
              <input type="radio" name="payment-period" value="1year-750$" />1
              год
              <br />
              Экономия $150 $750
            </label>
          </div>
          <input type="checkbox" />
          <label>
            Я прочитал(-а) и принимаю
            <a href="/">
              Соглашение об обслуживании, Заявление о конфиденциальности
            </a>
          </label>

          <div>
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
        </div>
        <div className="selected-tarrif-container col">
          <div className="payment-option-card">
            <p className="option-name">Для начинающих</p>
            <p className="option-period">1 месяц</p>
            <p className="next-payment">Следующий платёж: 30 ноября 2022</p>
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
            </ul>
            <hr className="m-0" />
            <div className="d-flex">
              <span>Всего:</span>
              <span>$75</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
