import React, { useEffect, useState } from "react";
import MoreInfoIcon from "../../images/more-info-icon.svg";
import UnknownIcon from "../../images/unknown-icon.png";
import DollarIcon from "../../images/dollar-icon.svg";
import LockIcon from "../../images/lock-icon.svg";

import UserService from "../../Services/user.service";
import "./BotConfigurationForm.css";

import leaderboardService from "../../Services/leaderboard.service";

export default function BotConfigurationForm(props) {
  let [leaderInfo, setLeaderInfo] = useState({});
  let [leaderBalance, setLeaderBalance] = useState(0.0);
  let [investInput, setInvestInput] = useState(1);
  let [type, setType] = useState(1);
  let [riskInput, setRiskInput] = useState(1);
  let [coefficientInput, setCoefficientInput] = useState(0.0);
  let [positionControlInput, setPositionControlInput] = useState(80);
  let [stopProfitInput, setStopProfitInput] = useState(10);
  let [stopLossInput, setStopLossInput] = useState(10);

  let [positionControl, setPositionControl] = useState(false);
  let [stopLossControl, setStopLossControl] = useState(false);
  let [stopProfitControl, setStopProfitControl] = useState(false);

  let [exchangeBalance, setExchangeBalance] = useState(0);
  let [availableBalance, setAvailableBalance] = useState(0);
  let [usedBalance, setUsedBalance] = useState(0);

  let [currentUserAccount, setCurrentUserAccount] = useState("");
  let [userAccounts, setUserAccounts] = useState([]);

  let [onlyNotify, setOnlyNotify] = useState(false);

  useEffect(() => {
    props.nextEnabled(true);
    leaderboardService
      .getLeaderInfo(props.leaderId)
      .then((response) => setLeaderInfo(response.data.data));

    leaderboardService.getLeaderStatistic(props.leaderId).then((response) => {
      setLeaderBalance(parseFloat(response["avgPnl"]).toFixed(0));
    });

    updateUserDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateUserDetails() {
    UserService.details().then((response) => {
      setExchangeBalance(Math.floor(response.data.exchangeBalance));
      setUsedBalance(response.data.usedBalance);
      setAvailableBalance(
        Math.floor(response.data.exchangeBalance) - response.data.usedBalance
      );
      setType(0);

      setUserAccounts(response.data.userExchangeAccounts);

      let freeUserAccount = response.data.userExchangeAccounts.find(
        (x) => !x.isBusy
      );
      if (freeUserAccount) {
        setCurrentUserAccount(freeUserAccount.id);
      } else {
        setOnlyNotify(true);
        setType(2);
        setCurrentUserAccount("0");
        props.nextEnabled(true);
      }
    });
  }

  function updateCoefficient() {
    if (riskInput > 0) {
      setCoefficientInput((investInput / leaderBalance) * riskInput);
    } else {
      setCoefficientInput(investInput / leaderBalance / Math.abs(riskInput));
    }
  }

  function updateFinance() {
    let availableBalance = exchangeBalance - usedBalance;
    setAvailableBalance(availableBalance);
    updateCoefficient();

    if (props.data != null) {
      setType(props.data.type);
      setInvestInput(props.data.balance);
      setRiskInput(props.data.risk);
      setCoefficientInput(props.data.coefficient);
      setPositionControlInput(
        props.data.positionControl ? props.data.positionControl : 10
      );
      setStopProfitInput(props.data.stopProfit ? props.data.stopProfit : 30);
      setStopLossInput(props.data.stopLoss ? props.data.stopLoss : 30);
      setPositionControl(props.data.positionControl != null);
      setStopLossControl(props.data.stopLoss != null);
      setStopProfitControl(props.data.stopProfit != null);
    } else {
      setInvestInput(availableBalance);
    }
  }
  useEffect(() => {
    if (leaderBalance === 0) {
      return;
    }
    updateFinance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaderBalance]);

  useEffect(() => {
    if (props.botSaveEvent) {
      props.updateBotConfiguration({
        leaderId: props.leaderId,
        nickName: leaderInfo.nickName,
        type,
        balance: investInput,
        coefficient: coefficientInput,
        risk: riskInput,
        userExchangeAccountId:
          type === 2 ? userAccounts[0].id : currentUserAccount,
        positionControl: positionControl ? positionControlInput : null,
        stopLoss: stopLossControl ? stopLossInput : null,
        stopProfit: stopProfitControl ? stopProfitInput : null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.botSaveEvent]);

  useEffect(() => {
    if (coefficientInput < 0.0001) {
      props.nextEnabled(false);
    } else {
      props.nextEnabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coefficientInput]);

  useEffect(() => {
    updateCoefficient();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [riskInput, investInput]);

  useEffect(() => {
    if (currentUserAccount.length < 2) return;

    UserService.detailsByAccount(currentUserAccount).then((response) => {
      setExchangeBalance(Math.floor(response.data.exchangeBalance));
      setUsedBalance(response.data.usedBalance);
      let availableBalance =
        Math.floor(response.data.exchangeBalance) - response.data.usedBalance;
      setAvailableBalance(availableBalance);
      setInvestInput(availableBalance);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserAccount]);

  return (
    <div className="BotConfigurationForm">
      <div className="botconfig-container">
        <p className="section-header">За кем следим</p>
        <div className="d-flex">
          <div className="modal-follow-left">
            <div className="d-flex leadername-section">
              <img
                src={
                  props.isUpdate || leaderInfo?.userPhotoUrl === ""
                    ? UnknownIcon
                    : leaderInfo?.userPhotoUrl
                }
                alt="icon"
                className="leader-icon"
              ></img>
              <div>
                <h4 className="leader-name">
                  {props.isUpdate
                    ? props.data.leaderName
                    : leaderInfo?.nickName}
                </h4>
                <p className="leader-type">USD-M</p>
              </div>
            </div>
            <div className="mode-selection">
              <div className="section-header">
                Выбор режима
                <div className="tooltip2">
                  <img
                    src={MoreInfoIcon}
                    alt="more-info"
                    className="more-info-icon"
                  ></img>
                  <span className="tooltiptext">
                    Выбор режима влияет процесс уведомления
                  </span>
                </div>
              </div>

              <div className="mode-inputs">
                <label>
                  <input
                    type="radio"
                    name="mode"
                    value={0}
                    onChange={(e) => setType(0)}
                    className="radio"
                    checked={type === 0 ? true : false}
                    disabled={onlyNotify}
                  />
                  Копирование трейдера 1 в 1
                </label>
                <label>
                  <input
                    type="radio"
                    name="mode"
                    value={1}
                    onChange={(e) => setType(1)}
                    checked={type === 1 ? true : false}
                    className="radio"
                    disabled={onlyNotify}
                  />
                  Только вход в сделку (long/short)
                </label>
                <label>
                  <input
                    type="radio"
                    name="mode"
                    value={2}
                    onChange={(e) => setType(2)}
                    className="radio"
                    checked={type === 2 ? true : false}
                  />
                  Только сигналы (long/short)
                </label>
              </div>
            </div>
            <div className="account-choice">
              <div className="section-header">Выбор аккаунта:</div>
              <label className="w-100">
                <select
                  className="w-100 apikey-input"
                  value={currentUserAccount}
                  onChange={(e) => {
                    setCurrentUserAccount(e.target.value);
                  }}
                >
                  <option value="0" defaultValue disabled hidden>
                    Доступна только нотификация
                  </option>
                  {userAccounts.map((item, index) => {
                    return (
                      <option
                        key={index}
                        value={item.id}
                        disabled={item.isBusy}
                      >
                        {"Binance: " + item.name}{" "}
                        {item.isBusy ? "[используется]" : ""}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
            <div className="account-state">
              <p className="section-header">
                Состояние счёта
                <img
                  src={MoreInfoIcon}
                  alt="more-info"
                  className="more-info-icon"
                ></img>
              </p>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="account-indicator">
                  <img
                    src={DollarIcon}
                    alt="dollar-icon"
                    className="indicator-icon"
                  ></img>
                  Баланс
                </p>
                <div>
                  <p className="account-amounts">≈ {exchangeBalance} $</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="account-indicator">
                  <img
                    src={LockIcon}
                    alt="lock-icon"
                    className="indicator-icon"
                  ></img>
                  Используется
                </p>
                <div>
                  <p className="account-amounts">≈ {usedBalance} $</p>
                </div>
              </div>
            </div>
            <div className="investment">
              <p className="section-header">
                Сумма инвестиции
                <img
                  src={MoreInfoIcon}
                  alt="more-info"
                  className="more-info-icon"
                ></img>
              </p>
              <div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-outline-primary"
                      type="button"
                      disabled={onlyNotify}
                      onClick={() => {
                        if (investInput <= availableBalance) {
                          setInvestInput(Number(investInput) - 1);
                        }
                      }}
                    >
                      -
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    disabled
                    value={investInput + "$"}
                  />
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-outline-primary"
                      type="button"
                      disabled={onlyNotify}
                      onClick={() => {
                        if (investInput < availableBalance) {
                          setInvestInput(Number(investInput) + 1);
                        }
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="range-slider grad">
                <span id="output" className="range-value">
                  {Math.round(investInput / (exchangeBalance / 100))}%
                </span>
                <input
                  className="range-inputs"
                  onChange={(e) => setInvestInput(e.target.value)}
                  type="range"
                  min="0"
                  value={investInput}
                  max={availableBalance}
                  step="1"
                  list="balance-option-list"
                  disabled={onlyNotify}
                />
                <datalist id="balance-option-list">
                  <option>0</option>
                  <option>{availableBalance / 4}</option>
                  <option>{(availableBalance / 4) * 2}</option>
                  <option>{(availableBalance / 4) * 3}</option>
                  <option>{availableBalance}</option>
                </datalist>
              </div>
            </div>
          </div>
          <div className="modal-follow-right">
            <div className="risk">
              <p className="section-header">Риск</p>
              <div className="range-slider grad">
                <input
                  className="range-inputs"
                  onChange={(e) => {
                    setRiskInput(e.target.value);
                  }}
                  type="range"
                  min="-10"
                  value={riskInput}
                  max="100"
                  step="1"
                  list="risk-option-list"
                  disabled={onlyNotify}
                />
                <datalist id="risk-option-list">
                  <option>-10</option>
                  <option>0</option>
                  <option>33</option>
                  <option>66</option>
                  <option>100</option>
                </datalist>
                <span id="output">{riskInput}</span>
              </div>
              <div className="risk-ratio d-flex justify-content-between align-items-center">
                <p className="labels">Коэффициент риска</p>
                <div>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <button
                        className="btn btn-outline-primary"
                        type="button"
                        disabled={onlyNotify}
                        onClick={() => {
                          if (riskInput === 1) {
                            setRiskInput(-2);
                            return;
                          }
                          if (riskInput > -10) {
                            setRiskInput(Number(riskInput) - 1);
                          }
                        }}
                      >
                        -
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      disabled
                      value={riskInput}
                    />
                    <div className="input-group-prepend">
                      <button
                        className="btn btn-outline-primary"
                        type="button"
                        disabled={onlyNotify}
                        onClick={() => {
                          if (riskInput === -2) {
                            setRiskInput(1);
                            return;
                          }
                          if (riskInput < 100) {
                            setRiskInput(Number(riskInput) + 1);
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="risk-ratio d-flex justify-content-between align-items-center">
                {coefficientInput > 0.0001 && (
                  <>
                    <p className="labels">Коэффициент: </p>
                    <div>
                      {" "}
                      <span className="account-amounts">
                        {coefficientInput.toFixed(5)}
                      </span>
                    </div>
                  </>
                )}
                {coefficientInput < 0.0001 && !onlyNotify && (
                  <p className="warn-labels">Коэффициент слишком низкий!</p>
                )}
              </div>
            </div>
            <div className="transaction-control">
              <div className="d-flex justify-content-between">
                <p className="section-header">Контроль сделки</p>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={positionControl}
                    onChange={() => setPositionControl(!positionControl)}
                    disabled={onlyNotify}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              {positionControl && (
                <>
                  <div className="range-slider grad">
                    <span id="output" className="range-value">
                      {positionControlInput}%
                    </span>
                    <input
                      className="range-inputs"
                      onChange={(e) => setPositionControlInput(e.target.value)}
                      type="range"
                      min="0"
                      value={positionControlInput}
                      max="100"
                      step="1"
                      list="position-option-list"
                    />
                    <datalist id="position-option-list">
                      <option>0</option>
                      <option>25</option>
                      <option>50</option>
                      <option>75</option>
                      <option>100</option>
                    </datalist>
                  </div>

                  <div className="max-deal d-flex justify-content-between align-items-center">
                    <p className="plus-minus-labels">
                      Максимальный размер сделки
                    </p>
                    <div>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={() => {
                              if (positionControlInput < 100) {
                                setPositionControlInput(
                                  Number(positionControlInput) - 1
                                );
                              }
                            }}
                          >
                            -
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          readOnly
                          disabled
                          value={positionControlInput + "%"}
                        />
                        <div className="input-group-prepend">
                          <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={() => {
                              if (positionControlInput < 100) {
                                setPositionControlInput(
                                  Number(positionControlInput) + 1
                                );
                              }
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="stop-profit">
              <div className="d-flex justify-content-between">
                <p className="section-header">
                  Стоп профит{" "}
                  <span style={{ color: "grey", fontSize: "14px" }}>
                    (недоступно)
                  </span>
                </p>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={stopProfitControl}
                    readOnly
                    //  onChange={() => setStopProfitControl(!stopProfitControl)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              {stopProfitControl && (
                <>
                  <div className="range-slider grad">
                    <span id="output" className="range-value">
                      {stopProfitInput}%
                    </span>
                    <input
                      className="range-inputs"
                      onChange={(e) => setStopProfitInput(e.target.value)}
                      type="range"
                      min="0"
                      value={stopProfitInput}
                      max="999"
                      step="1"
                      list="stopprofit-option-list"
                    />
                    <datalist id="stopprofit-option-list">
                      <option>0</option>
                      <option>250</option>
                      <option>500</option>
                      <option>750</option>
                      <option>999</option>
                    </datalist>
                  </div>
                  <div className="max-stop-profit d-flex justify-content-between align-items-center">
                    <p className="plus-minus-labels">
                      Макс. стоп профит сделки
                    </p>
                    <div>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={() => {
                              if (stopProfitInput < 999) {
                                setStopProfitInput(Number(stopProfitInput) - 1);
                              }
                            }}
                          >
                            -
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          readOnly
                          disabled
                          value={stopProfitInput + "%"}
                        />
                        <div className="input-group-prepend">
                          <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={() => {
                              if (stopProfitInput < 999) {
                                setStopProfitInput(Number(stopProfitInput) + 1);
                              }
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="stop-loss">
              <div className="d-flex justify-content-between">
                <p className="section-header">
                  Стоп лосс{" "}
                  <span style={{ color: "grey", fontSize: "14px" }}>
                    (недоступно)
                  </span>
                </p>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={stopLossControl}
                    readOnly
                    // onChange={() => setStopLossControl(!stopLossControl)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              {stopLossControl && (
                <>
                  <div className="range-slider grad">
                    <span id="output" className="range-value">
                      {stopLossInput}%
                    </span>
                    <input
                      className="range-inputs"
                      onChange={(e) => setStopLossInput(e.target.value)}
                      type="range"
                      min="0"
                      value={stopLossInput}
                      max="100"
                      step="1"
                      list="stoploss-option-list"
                    />
                    <datalist id="stoploss-option-list">
                      <option>0</option>
                      <option>25</option>
                      <option>50</option>
                      <option>75</option>
                      <option>100</option>
                    </datalist>
                  </div>
                  <div className="max-stop-loss d-flex justify-content-between align-items-center">
                    <p className="plus-minus-labels">Макс. стоп лосс сделки</p>
                    <div>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={() => {
                              if (stopLossInput < 100) {
                                setStopLossInput(Number(stopLossInput) - 1);
                              }
                            }}
                          >
                            -
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          disabled
                          readOnly
                          value={stopLossInput + "%"}
                        />
                        <div className="input-group-prepend">
                          <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={() => {
                              if (stopLossInput < 100) {
                                setStopLossInput(Number(stopLossInput) + 1);
                              }
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
