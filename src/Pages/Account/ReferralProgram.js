import React, { useEffect, useState } from "react";
import "./ReferralProgram.css";
import ReferralInfoIcon from "../../images/referral-info-icon.svg";
import ClipIcon from "../../images/clip-icon.svg";
import MoreInfoIcon from "../../images/more-info-icon.svg";
import referralService from "../../Services/referral.service";
import UnknownIcon from "../../images/unknown-icon.png";

export default function ReferralProgram() {
  let [referrals, setReferrals] = useState([]);
  useEffect(() => {
    referralService.getAll().then((response) => {
      setReferrals(response.data);
    });
  }, []);

  return (
    <div className="ReferralProgram">
      <div className="d-flex justify-content-between referral-header-container">
        <div className="referral-header-left">
          <p>
            Пригласите друзей. <br />
            Зарабатывайте
            <br /> криптовалюту
            <br /> вместе.
          </p>
          <p>
            Получите до 40% комиссии за каждую
            <br /> сделку на Binance Spot, Futures и Pool.
          </p>
        </div>
        <div className="referral-header-right">
          <div className="d-flex justify-content-between">
            <p className="m-0">Реферальный ID по умолчанию</p>
            <a href="/">Изменить</a>
          </div>
          <div className="referral-benefit-section text-center">
            <p className="m-0">Вы получите</p>
            <p className="m-0">10%</p>
          </div>
          <hr className="m-0" />
          <div className="d-flex justify-content-between referral-id-section">
            <p className="m-0">Referral ID</p>
            <p className="m-0">
              YUPEERTZ
              <img
                src={ReferralInfoIcon}
                alt="referral-info-icon"
                className="referral-info-icon"
              ></img>
            </p>
          </div>
          <div className="d-flex justify-content-between referral-link-section">
            <p className="m-0">Реферальная ссылка</p>
            <a href="/">
              https://accounts.bi...
              <img
                src={ReferralInfoIcon}
                alt="referral-info-icon"
                className="referral-info-icon"
              ></img>
            </a>
          </div>
          <button className="yellow-btn w-100">
            <img src={ClipIcon} alt="clip-info" className="clip-icon"></img>
            Приглашайте друзей
          </button>
        </div>
      </div>
      <div className="referral-bg"></div>
      <div className="referral-main-container">
        <h2>Панель инструментов</h2>
        <ul className="d-flex toolbar-list">
          <li>Все</li>
          <li>Вчера</li>
          <li>На этой недели</li>
          <li>В этом месяце</li>
        </ul>
        <hr className="m-0" />
        <div className="d-flex flex-wrap toolbar-info-container">
          <div className="toolbar-info-section">
            <p>
              Ваш заработок
              <img
                src={MoreInfoIcon}
                alt="more-info"
                className="more-info-icon"
              ></img>
            </p>
            <p>0.00000513 USDT</p>
            <p>+0 USDT</p>
          </div>
          <div className="toolbar-info-section">
            <p>
              Друзья, которые начали торговать
              <img
                src={MoreInfoIcon}
                alt="more-info"
                className="more-info-icon"
              ></img>
            </p>
            <p>2</p>
            <p>+0</p>
          </div>
          <div className="toolbar-info-section">
            <p>
              Друзья
              <img
                src={MoreInfoIcon}
                alt="more-info"
                className="more-info-icon"
              ></img>
            </p>
            <p>4</p>
            <p>+0</p>
          </div>
          <div className="mt-5 toolbar-info-section">
            <p>
              Бонус лучшему рефералу
              <img
                src={MoreInfoIcon}
                alt="more-info"
                className="more-info-icon"
              ></img>
            </p>
            <p>5.9790228 USDT</p>
            <p>ID 42522222</p>
          </div>
        </div>
        <p className="attention-paragraph">
          * Данные обновляются по часовому поясу UTC+0. Время обработки данных —
          с 6:00 по 8:00 (МСК) каждый день. В течение этого периода расчет
          данных за новый день производится на основе значений активов за
          предыдущий день. После обработки все данные будут отображаться
          корректно.
          <br /> Обратите внимание: из-за сложности финансовых данных возможны
          задержки в их обработке и представлении. Отображаемые выше данные
          носят исключительно справочный характер.
          <br /> Приносим извинения за возможные неудобства.
        </p>
        <div className="referral-table-container">
          <h2>Рефералы</h2>
          <ul className="d-flex">
            <li>Все аккаунты</li>
          </ul>
          <hr className="m-0" />
          <table className="w-100 referral-table">
            <thead>
              <tr>
                <th>Общая информация</th>
                <th>User ID друга</th>
                <th className="text-end">
                  Заработано реферальных бонусов (BTC)
                </th>
                <th className="text-end">Торговля началась</th>
                <th className="text-end">Дата</th>
              </tr>
            </thead>
            {referrals.map(function (item, index) {
              return (
                <tbody>
                  <tr key={index}>
                    <td className="d-flex">
                      <img
                        src={UnknownIcon}
                        alt="icon"
                        className="leader-icon me-3"
                      ></img>
                      <div>
                        <p className="leader-name">BTC Never Give Up</p>
                        <p className="leader-type m-0">USDⓈ-M</p>
                      </div>
                    </td>
                    <td className="text-end">{item.userId}</td>
                    <td className="text-end">{item.bonus}$</td>
                    <td className="text-end">
                      {item.isDeposited ? "Да" : "Нет"}
                    </td>
                    <td className="text-end">{item.createdDate}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
      <div className="text-center referral-footer">
        <p>Пригласите друзей. Зарабатывайте криптовалюту вместе.</p>

        <button className="yellow-btn referral-btn">
          <img src={ClipIcon} alt="clip-info" className="clip-icon"></img>
          Пригласить друзей
        </button>
      </div>
    </div>
  );
}
