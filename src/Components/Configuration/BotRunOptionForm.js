import React, { useEffect, useState } from "react";
import "./BotRunOptionForm.css";
import BotService from "../../Services/bot.service";
import authService from "../../Services/auth.service";
import LeaderboardService from "../../Services/leaderboard.service";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function BotManagementCard(props) {
  let [runOption, setRunOption] = useState(0);
  let [disableRun, setDisableRun] = useState(false);
  let [leaderPositions, setLeaderPositions] = useState([]);
  let [negativePNLChoiceAmount, setNegativePNLChoiceAmount] = useState(0);
  let [allPositionChoiceAmount, setAllPositionChoiceAmount] = useState(0);
  let [availableBalance, setAvailableBalance] = useState(0);
  let [approveModal, setApproveModal] = useState(false);
  let [onlyNotify, setOnlyNotify] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    let userDetails = authService.getCurrentUser().userDetails;
    let userAvailableBalance =
      userDetails.exchangeBalance - userDetails.usedBalance;
    setAvailableBalance(userAvailableBalance);
    LeaderboardService.getLeaderOpenPositions(props.leaderId).then(
      (response) => {
        let positions = response.data.data.otherPositionRetList;
        setLeaderPositions(positions);
        let filteredList = positions.filter((x) => x.pnl < 0);
        let totalNegativeAmount = 0;
        filteredList.forEach((item) => {
          totalNegativeAmount +=
            (item.markPrice * Math.abs(item.amount) * props.data.coefficient) /
            item.leverage;
        });
        setNegativePNLChoiceAmount(totalNegativeAmount.toFixed(0));

        let totalAmount = 0;
        positions.forEach((item) => {
          totalAmount +=
            (item.markPrice * Math.abs(item.amount) * props.data.coefficient) /
            item.leverage;
        });
        setAllPositionChoiceAmount(totalAmount.toFixed(0));
      }
    );

    if (props.data.type === 2) {
      setOnlyNotify(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function save() {
    BotService.save(props.data, runOption)
      .then((response) => {
        authService.updateUserDetails();
        navigate("/account/bot-management");
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  function saveAndRun() {
    var user = authService.getCurrentUser();

    if (user.userDetails.subscription === 0) {
      setApproveModal(true);
      return;
    }

    BotService.saveAndRun(props.data, runOption)
      .then((response) => {
        authService.updateUserDetails();
        navigate("/account/bot-management");
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  return (
    <div className="BotRunOptionForm">
      <div className="bot-option-container">
        <h4 className="copy-header text-center mb-5">Настройки копирования</h4>

        {!onlyNotify && (
          <div className="radio-buttons-wrapper">
            <label>
              <input
                type="radio"
                name="following-option"
                value={0}
                onChange={(e) => {
                  setRunOption(e.target.value);
                  setDisableRun(false);
                }}
                defaultChecked
                disabled={onlyNotify}
              />
              Копировать только новые позиции
            </label>
            <label>
              <input
                type="radio"
                name="following-option"
                value={1}
                onChange={(e) => {
                  setRunOption(e.target.value);
                  setDisableRun(availableBalance < negativePNLChoiceAmount);
                }}
                disabled={onlyNotify}
              />
              Копировать позиции с отрицательным PNL-ROI{" "}
              <span
                className={
                  availableBalance > negativePNLChoiceAmount ? "green" : "red"
                }
              >
                (общая сумма с учетом коефициента: {negativePNLChoiceAmount}$)
              </span>
            </label>
            <label>
              <input
                type="radio"
                name="following-option"
                value={2}
                onChange={(e) => {
                  setRunOption(e.target.value);
                  setDisableRun(availableBalance < allPositionChoiceAmount);
                }}
                disabled={onlyNotify}
              />
              Копировать все открытые позиции{" "}
              <span
                className={
                  availableBalance > allPositionChoiceAmount ? "green" : "red"
                }
              >
                (общая сумма с учетом коефициента: {allPositionChoiceAmount}$)
              </span>
            </label>
          </div>
        )}
        { availableBalance < allPositionChoiceAmount && 
          <span class = "red">Если сумма под контролем бота меньше чем открытые позиции трейдера, рекомендуем уменьшить коэфициент вернувшись на предыдущий пункт конфигурации</span>
        }
        <div className="text-center">
          <h5 className="mb-4">Открытые позиции трейдера</h5>
          <div className="table-container">
            <table className="m-auto w-100">
              <thead>
                <tr className="border-bottom">
                  <th>Пара</th>
                  <th>Short/Buy</th>
                  <th>Amount</th>
                  <th>Цена входа</th>
                  <th>ROI</th>
                  <th>Общий PnL</th>
                  <th>Плечо</th>
                </tr>
              </thead>
              <tbody>
                {leaderPositions?.map(function (item, index) {
                  return (
                    <tr className="border-bottom" key={index}>
                      <td>{item.symbol}</td>
                      <td
                        className={`direction ${
                          item.amount > 0 ? "green" : "red"
                        }`}
                      >
                        {item.amount > 0 ? "BUY" : "SHORT"}
                      </td>
                      <td>{item.amount.toFixed(2)}</td>
                      <td>{item.entryPrice.toFixed(5)}$</td>
                      <td className={`roi ${item.pnl < 0 ? "red" : "green"}`}>
                        {(item.roe * 100).toFixed(2)}%
                      </td>
                      <td className={`pnl ${item.pnl < 0 ? "red" : ""}`}>
                        {item.pnl > 0 ? "+" : ""}
                        {item.pnl.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}
                        $
                      </td>
                      <td>x{item.leverage}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {disableRun && (
          <div className="insufient-funds-warning">
            Текущие позиции трейдера превыщают Ваш доступный баланс с учетом
            коэффициента. Пересмотрите коэффициент или пополните баланс на
            Futures кошельке.
          </div>
        )}
        <div className="bot-options-button-container d-flex">
          <button type="button" className="save-btn mt-4 " onClick={save}>
            Сохранить
          </button>
          <button
            type="button"
            className="start-btn mt-4 "
            onClick={saveAndRun}
            disabled={disableRun}
          >
            Запустить
          </button>
        </div>
      </div>
      <Modal
        className="approve-modal"
        show={approveModal}
        onHide={() => setApproveModal(false)}
      >
        <Modal.Header closeButton>
          <h4 className="approve-header">Оплата Подписки</h4>
        </Modal.Header>
        <Modal.Body>
          <h4 className="approve-text">
            У Вас нет активной подписки. Вы можете сохранить настройки бота и
            запустить его после оплаты.
          </h4>
          <button
            type="button"
            className="green approve-btn mt-4"
            onClick={() => {
              navigate("/tarrifs");
              setApproveModal(false);
            }}
          >
            Выбрать подписку
          </button>
          <button
            type="button"
            className="approve-btn mt-4"
            onClick={() => setApproveModal(false)}
          >
            Отмена
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
