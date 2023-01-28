import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import MoreInfoIcon from "../../images/more-info-icon.svg";
import UnknownIcon from "../../images/unknown-icon.png";
import DollarIcon from "../../images/dollar-icon.svg";
import LockIcon from "../../images/lock-icon.svg";
import BotService from "../../Services/bot.service";
import "./ModalFollowInfo.css";
import { useNavigate } from "react-router-dom";

export default function ModalFollowInfo(props) {
  let [investInput, setInvestInput] = useState(1);
  let [riskInput, setRiskInput] = useState(1);
  let [coefficientInput, setCoefficientInput] = useState(0.0);
  let [positionControlInput, setPositionControlInput] = useState(10);
  let [stopProfitInput, setStopProfitInput] = useState(10);
  let [stopLossInput, setStopLossInput] = useState(10);

  let [positionControl, setPositionControl] = useState(false);
  let [stopLossControl, setStopLossControl] = useState(false);
  let [stopProfitControl, setStopProfitControl] = useState(false);

  let [exchangeBalance, setExchangeBalance] = useState(10000);
  let [availableBalance, setAvailableBalance] = useState(10000);
  let [usedBalance, setUsedBalance] = useState(5000);

  let navigate = useNavigate();

  useEffect(() => {
    setExchangeBalance(10000);
    setUsedBalance(5000);
    // UserService.details().then((response) => {
    //   setExchangeBalance(response.data.exchangeBalance);
    //   setUsedBalance(response.data.usedBalance);
    // });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // UserService.details().then((response) => {
    //   setExchangeBalance(response.data.exchangeBalance);
    //   setUsedBalance(response.data.usedBalance);
    // });

    let availableBalance = exchangeBalance - usedBalance;
    setAvailableBalance(availableBalance);
    setInvestInput(availableBalance);
    setCoefficientInput((investInput / props.leaderBalance) * riskInput);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.leaderBalance]);

  useEffect(() => {
    setCoefficientInput((investInput / props.leaderBalance) * riskInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [riskInput, investInput]);

  function onHide() {
    setRiskInput(1);
    props.onHide();
  }

  function submit() {
    BotService.create(
      props.data.encryptedUid,
      props.data.nickName,
      investInput,
      coefficientInput,
      riskInput,
      positionControl ? positionControlInput : null,
      stopLossControl ? stopLossInput : null,
      stopProfitControl ? stopProfitInput : null
    ).then((response) => {
      navigate("/account");
    });
  }

  return (
    <div>
      <Modal show={props.show} onHide={onHide}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="ModalFollowInfo">
          <p className="section-header">За кем следим</p>
          <div className="d-flex leadername-section">
            <img
              src={
                props.data.userPhotoUrl === ""
                  ? UnknownIcon
                  : props.data.userPhotoUrl
              }
              alt="icon"
              className="leader-icon"
            ></img>
            <div>
              <h4 className="leader-name">{props.data.nickName}</h4>
              <p className="leader-type">USD-M</p>
            </div>
          </div>
          <div className="mode-selection">
            <p className="section-header">
              Выбор режима
              <img
                src={MoreInfoIcon}
                alt="more-info"
                className="more-info-icon"
              ></img>
            </p>

            <div className="mode-inputs">
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="1-to-1"
                  defaultChecked
                  className="radio"
                />
                Копирование трейдера 1 в 1
              </label>
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="trade-entry-only"
                  className="radio"
                />
                Только вход в сделку (long/short)
              </label>
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="signal-only"
                  className="radio"
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
                      if (investInput < availableBalance) {
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
                list="steplist"
              />
              <datalist id="steplist">
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
                min="1"
                value={riskInput}
                max="100"
                step="1"
                list="steplist"
              />
              <datalist id="steplist">
                <option>0</option>
                <option>25</option>
                <option>50</option>
                <option>75</option>
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
                        if (riskInput > 1) {
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
                      {coefficientInput.toFixed(4)}
                    </span>
                  </div>
                </>
              )}
              {coefficientInput < 0.0001 && (
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
                    list="steplist"
                  />
                  <datalist id="steplist">
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
              <p className="section-header">Стоп профит</p>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={stopProfitControl}
                  onChange={() => setStopProfitControl(!stopProfitControl)}
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
                    list="steplist"
                  />
                  <datalist id="steplist">
                    <option>0</option>
                    <option>25</option>
                    <option>50</option>
                    <option>75</option>
                    <option>100</option>
                  </datalist>
                </div>
                <div className="max-stop-profit d-flex justify-content-between align-items-center">
                  <p className="plus-minus-labels">Макс. стоп профит сделки</p>
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
              <p className="section-header">Стоп лосс</p>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={stopLossControl}
                  onChange={() => setStopLossControl(!stopLossControl)}
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
                    list="steplist"
                  />
                  <datalist id="steplist">
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
          <button
            type="button"
            className="follow-btn w-100 mt-4"
            onClick={submit}
          >
            Следить
          </button>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
