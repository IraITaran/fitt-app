import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import MoreInfoIcon from "../../images/more-info-icon.svg";
import UnknownIcon from "../../images/unknown-icon.png";
import DollarIcon from "../../images/dollar-icon.svg";
import LockIcon from "../../images/lock-icon.svg";
import BotService from "../../Services/bot.service";
import UserService from "../../Services/user.service";
import "./ModalFollowInfo.css";
import { useNavigate } from "react-router-dom";

export default function ModalFollowInfo(props) {
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

  let navigate = useNavigate();

  useEffect(() => {
    UserService.details().then((response) => {
      setExchangeBalance(response.data.exchangeBalance.toFixed(0));
      setUsedBalance(response.data.usedBalance);
      setAvailableBalance(
        Math.floor(response.data.exchangeBalance) - response.data.usedBalance
      );
      setType(0);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let availableBalance = exchangeBalance - usedBalance;
    setAvailableBalance(availableBalance);
    setCoefficientInput((investInput / props.leaderBalance) * riskInput);

    if (props.isUpdate) {
      console.log(props.data);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.leaderBalance]);

  useEffect(() => {
    if (riskInput > 0) {
      setCoefficientInput((investInput / props.leaderBalance) * riskInput);
    } else {
      setCoefficientInput(
        investInput / props.leaderBalance / Math.abs(riskInput)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [riskInput, investInput]);

  function onHide() {
    if (!props.isUpdate) {
      setRiskInput(1);
    }
    props.onHide();
  }

  function submit() {
    if (props.isUpdate) {
      BotService.update(
        props.data.id,
        props.data.leaderKey,
        props.data.leaderName,
        type,
        investInput,
        coefficientInput,
        riskInput,
        positionControl ? positionControlInput : null,
        stopLossControl ? stopLossInput : null,
        stopProfitControl ? stopProfitInput : null
      ).then(() => {
        props.onUpdate();
      });
    } else {
      BotService.create(
        props.data.encryptedUid,
        props.data.nickName,
        type,
        investInput,
        coefficientInput,
        riskInput,
        positionControl ? positionControlInput : null,
        stopLossControl ? stopLossInput : null,
        stopProfitControl ? stopProfitInput : null
      ).then((response) => {
        navigate("/account/bot-management");
      });
    }
  }

  return (
    <div>
      <Modal
        show={props.show}
        onHide={onHide}
        className="modal-follow-container"
      >
        <Modal.Header closeButton>
          <h5>Настройки слежения</h5>
        </Modal.Header>
        <Modal.Body className="ModalFollowInfo">
          <p className="section-header">За кем следим</p>
          <div className="d-flex">
            <div className="modal-follow-left">
              <div className="d-flex leadername-section">
                <img
                  src={
                    props.isUpdate || props.data.userPhotoUrl === ""
                      ? UnknownIcon
                      : props.data.userPhotoUrl
                  }
                  alt="icon"
                  className="leader-icon"
                ></img>
                <div>
                  <h4 className="leader-name">
                    {props.isUpdate
                      ? props.data.leaderName
                      : props.data.nickName}
                  </h4>
                  <p className="leader-type">USD-M</p>
                </div>
              </div>
              <div className="mode-selection">
                <p className="section-header">
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
                </p>

                <div className="mode-inputs">
                  <label>
                    <input
                      type="radio"
                      name="mode"
                      value={0}
                      onChange={(e) => setType(0)}
                      className="radio"
                      checked={type === 0 ? true : false}
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
                  {coefficientInput > 0.00001 && (
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
                  {coefficientInput < 0.00001 && (
                    <p className="warn-labels">Коэффициент слишком низкий!</p>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-follow-right">
              <div className="transaction-control">
                <div className="d-flex justify-content-between">
                  <p className="section-header">Контроль сделки</p>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={positionControl}
                      onChange={() => setPositionControl(!positionControl)}
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
                        onChange={(e) =>
                          setPositionControlInput(e.target.value)
                        }
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
                                  setStopProfitInput(
                                    Number(stopProfitInput) - 1
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
                            value={stopProfitInput + "%"}
                          />
                          <div className="input-group-prepend">
                            <button
                              className="btn btn-outline-primary"
                              type="button"
                              onClick={() => {
                                if (stopProfitInput < 999) {
                                  setStopProfitInput(
                                    Number(stopProfitInput) + 1
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
                      <p className="plus-minus-labels">
                        Макс. стоп лосс сделки
                      </p>
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
          <span className="green-text">
            После сохранения бот не будет запущен автоматически, для запуска
            бота перейдите в личный кабинет на вкладку "Мои боты".
          </span>
          <button
            type="button"
            className="follow-btn w-100 mt-4"
            onClick={submit}
          >
            Сохранить
          </button>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
