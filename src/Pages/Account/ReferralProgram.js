import React from "react";
import "./ReferralProgram.css";

export default function ReferralProgram() {
  return (
    <div className="ReferralProgram">
      <div className="d-flex referral-header">
        <div className="referral-header-left">
          <p>
            Пригласите друзей. Зарабатывайте криптовалюту <br />
            вместе.
          </p>
          <p>
            Получите до 40% комиссии за каждую сделку на Binance Spot, Futures и
            Pool.
          </p>
        </div>
        <div className="referral-header-right">
          <div className="d-flex">
            <p>Реферальный ID по умолчанию</p>
            <a href="/">Изменить</a>
          </div>
          <div className="d-flex">
            <div>
              <p>Вы получите</p>
              <p>10%</p>
            </div>
            <div>
              <p>Друзья получат</p>
              <p>10%</p>
            </div>
          </div>
          <div className="d-flex">
            <p>Referral ID</p>
            <p>YUPEERTZ</p>
          </div>
          <div className="d-flex">
            <p>Реферальная ссылка</p>
            <a href="/">https://accounts.bi...</a>
          </div>
          <button>Приглашайте друзей</button>
        </div>
      </div>
    </div>
  );
}
