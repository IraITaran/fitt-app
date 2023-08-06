import React, { useEffect, useState } from "react";
import "./ReferralProgram.css";
import ReferralInfoIcon from "../../images/referral-info-icon.svg";
import ClipIcon from "../../images/clip-icon.svg";
import MoreInfoIcon from "../../images/more-info-icon.svg";
import referralService from "../../Services/referral.service";
import UnknownIcon from "../../images/unknown-icon.png";
import userService from "../../Services/user.service";
import Modal from "react-bootstrap/Modal";
import authService from "../../Services/auth.service";

export default function ReferralProgram() {
  let [referrals, setReferrals] = useState([]);
  let [bonusData, setBonusData] = useState({});
  let [loading, setLoading] = useState(true);
  let [currentBonusPeriod, setCurrentBonusPeriod] = useState("all");
  let [referralIdModal, setReferralIdModal] = useState(false);
  let [newReferralId, setNewReferralId] = useState();
  let [refferalId, setReferralId] = useState("");

  const handleValidation = (event) => {
    let formIsValid = true;

    if (!newReferralId.match(/^[A-Za-z\d]{5,10}$/)) {
      formIsValid = false;
      alert(
        "Ref code need to contains only Latin characters and numbers and have length from 5 to 10 symbols"
      );

      return false;
    }

    return formIsValid;
  };

  useEffect(() => {
    changeBonusPeriod("all");

    updateReferralCode();

    referralService.getAll().then((response) => {
      setReferrals(response.data);
    });
  }, []);

  function updateReferralCode() {
    let user = authService.getCurrentUser();
    if (user) {
      setReferralId(user.userDetails.referralCode);
    }
  }

  function changeReferralCode() {
    if (handleValidation()) {
      referralService.changeRefId(newReferralId).then((response) => {
        if (response.data.success) {
          authService.updateUserDetails();
          setTimeout(() => {
            updateReferralCode();
          }, 1000);
        } else {
          alert(response.data.error);
        }
      });
    }
  }

  function changeBonusPeriod(period) {
    let from = new Date();
    let to = new Date();

    setCurrentBonusPeriod(period);

    switch (period) {
      case "day":
        from.setDate(from.getDate() - 1);
        break;
      case "week":
        from.setDate(from.getDate() - 7);
        break;
      case "month":
        from.setDate(from.getDate() - 30);
        break;
      default:
        from = null;
        to = null;
        setCurrentBonusPeriod("all");
        break;
    }

    setLoading(true);
    userService.getReferralBonus(from, to).then((response) => {
      setBonusData(response.data);
      setLoading(false);
    });
  }

  function copyKey(newId) {
    navigator.clipboard.writeText(newId);
  }

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
            Получите до 20% комиссии за каждого
            <br /> приведенного пользователя с активной подпиской.
          </p>
        </div>
        <div className="referral-header-right">
          <div className="d-flex justify-content-between">
            <p className="m-0">Реферальный ID по умолчанию</p>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setReferralIdModal(true);
              }}
            >
              Изменить
            </a>
          </div>
          <Modal
            show={referralIdModal}
            onHide={() => setReferralIdModal(false)}
          >
            <Modal.Body className="apikeyModal">
              <h4 className="apikey-header">Изменение Referral ID</h4>
              <div className="apikey-inputs-container">
                <label className="w-100">
                  Новый Referral ID
                  <input
                    type="text"
                    className="w-100 apikey-input"
                    maxLength="10"
                    minLength="5"
                    onChange={(e) => setNewReferralId(e.target.value)}
                  ></input>
                </label>
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="save-btn mt-4"
                  onClick={() => {
                    changeReferralCode();
                    setReferralIdModal(false);
                  }}
                >
                  Сохранить новый ID
                </button>
              </div>
            </Modal.Body>
          </Modal>
          <div className="referral-benefit-section text-center">
            <p className="m-0">Вы получите</p>
            <p className="m-0">20%</p>
          </div>
          <hr className="m-0" />
          <div className="d-flex justify-content-between referral-id-section">
            <p className="m-0">Referral ID</p>
            <p className="m-0">
              {refferalId}
              <img
                src={ReferralInfoIcon}
                alt="referral-info-icon"
                className="referral-info-icon"
                onClick={() => {
                  copyKey(newReferralId);
                }}
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
          <li
            onClick={() => {
              changeBonusPeriod("all");
            }}
            className={currentBonusPeriod === "all" ? "yellow" : "grey"}
          >
            Все
          </li>
          <li
            onClick={() => {
              changeBonusPeriod("day");
            }}
            className={currentBonusPeriod === "day" ? "yellow" : "grey"}
          >
            За сутки
          </li>
          <li
            onClick={() => {
              changeBonusPeriod("week");
            }}
            className={currentBonusPeriod === "week" ? "yellow" : "grey"}
          >
            За неделю
          </li>
          <li
            onClick={() => {
              changeBonusPeriod("month");
            }}
            className={currentBonusPeriod === "month" ? "yellow" : "grey"}
          >
            За месяц
          </li>
        </ul>
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
            <p>{loading ? "-" : bonusData.amount} USDT</p>
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
            <p>{loading ? "-" : bonusData.depositedReferralsCount}</p>
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

            <p>{loading ? "-" : bonusData.referralsCount}</p>
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
            <p>1000 USDT</p>
            <p>ID 42522222</p>
          </div>
        </div>
        <p className="attention-paragraph">
          * Данные обновляются по часовому поясу UTC+0. Время обработки данных
          занимает около 5 мин. После обработки все данные будут отображаться
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
            <tbody>
              {referrals.map(function (item, index) {
                return (
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
                );
              })}
            </tbody>
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
