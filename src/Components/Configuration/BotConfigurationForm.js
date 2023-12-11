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

        updateLeaderDetails();
        updateUserDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function updateLeaderDetails() {
        leaderboardService
            .getLeaderInfo(props.leaderId)
            .then((response) => setLeaderInfo(response.data.data));

        leaderboardService
            .getLeaderStatistic(props.leaderId)
            .then((response) => {
                setLeaderBalance(parseFloat(response["avgPnl"]).toFixed(0));
            });
    }

    function updateUserDetails() {
        UserService.details().then((response) => {
            setExchangeBalance(Math.floor(response.data.exchangeBalance));
            //setUsedBalance(response.data.usedBalance);
            // setAvailableBalance(
            //   Math.floor(response.data.exchangeBalance) - response.data.usedBalance
            //);

            setUserAccounts(response.data.userExchangeAccounts);

            if (!props.isUpdate) {
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
            } else {
                let currentUserAccount =
                    response.data.userExchangeAccounts.find(
                        (x) => x.id === props.data.userExchangeAccountId
                    );
                if (currentUserAccount) {
                    setCurrentUserAccount(currentUserAccount.id);
                }
            }
        });
    }

    function updateCoefficient() {
        if (riskInput > 0) {
            setCoefficientInput((investInput / leaderBalance) * riskInput);
        } else {
            setCoefficientInput(
                investInput / leaderBalance / Math.abs(riskInput)
            );
        }
    }

    function updateConfigurationForm() {
        let availableBalance = exchangeBalance - usedBalance;
        setAvailableBalance(availableBalance);
        updateCoefficient();

        if (props.data != null) {
            setType(props.data.type);
            setInvestInput(props.data.balance);
            setRiskInput(props.data.risk);
            setCoefficientInput(props.data.coefficient);
            setPositionControlInput(
                props.data.positionControl ? props.data.positionControl : 80
            );
            setStopProfitInput(
                props.data.stopProfit ? props.data.stopProfit : 30
            );
            setStopLossInput(props.data.stopLoss ? props.data.stopLoss : 30);
            setPositionControl(props.data.positionControl != null);
            setStopLossControl(props.data.stopLoss != null);
            setStopProfitControl(props.data.stopProfit != null);

            if (props.data.type === 2) {
                setOnlyNotify(true);
            }
        } else {
            setType(0);
            setInvestInput(availableBalance);
        }
    }

    function colorDots(dots, quantity) {
        dots.forEach((dot) => {
            dot.style.backgroundColor = "#fff";
            dot.style.borderColor = "#DDE0E5";
            dot.style.outline = "4px solid #fff";
        });

        for (let i = 0; i < quantity; i++) {
            dots[i].style.backgroundColor = "#10B866";
            dots[i].style.borderColor = "#10B866";
            dots[i].style.outline = "2px solid #10B866";
        }
    }

    function changeRangeDotsColor(ballance, value, element) {
        const dotsQuantity = 5;
        let percentOfBalance = value / ballance;
        let dotsToColor = Math.floor(
            percentOfBalance.toFixed(1) * (dotsQuantity - 1) + 1
        );
        let inputDots = element
            .closest(".range-slider-wrapper")
            .querySelectorAll(".range-point");
        colorDots(inputDots, dotsToColor);
    }

    setTimeout(() => {
        changeRangeDotsColor(availableBalance, document.querySelector('#investment_range').value, document.querySelector('#investment_range'));
    }, 0);

 
    function handleRangeChange(e) {
        if (e.target.value >= -10 && e.target.value <= 5) {
            e.target.className = "range-input green-color";
        }

        if (e.target.value > 5 && e.target.value <= 27) {
            e.target.className = "range-input lightgreen-color";
        }

        if (e.target.value > 27 && e.target.value <= 50) {
            e.target.className = "range-input yellow-color";
        }

        if (e.target.value > 50 && e.target.value <= 84) {
            e.target.className ="range-input orange-color";
        }

        if (e.target.value > 84 && e.target.value <= 100) {
            e.target.className = "range-input red-color";
        }
    }

    useEffect(() => {
        if (props.botSaveEvent) {
            let botConfiguration = {
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
            };

            if (props.isUpdate) {
                botConfiguration["id"] = props.data.id;
            }

            props.updateBotConfiguration(botConfiguration);
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
                Math.floor(response.data.exchangeBalance) -
                response.data.usedBalance;
            setAvailableBalance(availableBalance);

            if (!onlyNotify && !props.isUpdate) {
                setInvestInput(availableBalance);
            }

            if (props.isUpdate) {
                if (props.data.balance > availableBalance) {
                    setInvestInput(availableBalance);
                } else {
                    setInvestInput(props.data.balance);
                }
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUserAccount]);

    return (
        <div className="BotConfigurationForm">
            <div
                className={
                    props.isUpdate ? "" : "botconfig-container container"
                }>
                {!props.isUpdate && (
                    <h3 className="BotConfigurationForm-title">
                        Настройка бота
                    </h3>
                )}
                <div className="row">
                    <div className="botconfig-container-left col-md-6">
                        <div className="section-header">За кем следить</div>

                        <div className="d-flex leadername-section flex-wrap align-items-md-centerr">
                            <img
                                src={
                                    props.isUpdate ||
                                    leaderInfo?.userPhotoUrl === ""
                                        ? UnknownIcon
                                        : leaderInfo?.userPhotoUrl
                                }
                                alt="icon"
                                className="leader-icon"></img>
                            <div>
                                <h4 className="leader-name">
                                    {props.isUpdate
                                        ? props.data.leaderName
                                        : leaderInfo?.nickName}
                                </h4>
                                <p className="leader-type">USD-M</p>
                            </div>

                            <a
                                gref="#"
                                className="leader-name-btn d-flex justify-content-center align-items-center">
                                Открыть профиль
                            </a>
                        </div>

                        <div className="account-choice">
                            <div className="section-header">
                                Выбор аккаунта:
                            </div>
                            <label className="w-100 account-choice-select">
                                <select
                                    className="w-100 apikey-input"
                                    value={currentUserAccount}
                                    onChange={(e) => {
                                        setCurrentUserAccount(e.target.value);
                                    }}>
                                    <option
                                        value="0"
                                        defaultValue
                                        disabled
                                        hidden>
                                        Доступна только нотификация
                                    </option>
                                    {userAccounts.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.id}
                                                disabled={item.isBusy}>
                                                {"Binance: " + item.name}{" "}
                                                {item.isBusy
                                                    ? "[используется]"
                                                    : ""}
                                            </option>
                                        );
                                    })}
                                </select>
                            </label>
                        </div>
                        <div className="mode-selection">
                            <div className="section-header">
                                Выбор режима
                                <div className="tooltip2">
                                    <img
                                        src={MoreInfoIcon}
                                        alt="more-info"
                                        className="more-info-icon"></img>
                                    <span className="tooltiptext">
                                        Бот может работать в разных режимах:{" "}
                                        <br />
                                        <br />- Копировать
                                        (открывать/увеличивать/уменьшать/закрывать)
                                        позиции трейдера; <br />
                                        <br />- Только открывать позиции
                                        трейдера, далее вам необходимо следить
                                        за позициями самостоятельно; <br />
                                        <br />- Только уведомлять о позициях
                                        трейдера в одном из каналов уведомлений.
                                    </span>
                                </div>
                            </div>

                            <div className="mode-inputs d-flex flex-column">
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
                                        onChange={(e) => {
                                            setType(2);
                                            setPositionControl(false);
                                        }}
                                        className="radio"
                                        checked={type === 2 ? true : false}
                                    />
                                    Только сигналы (long/short)
                                </label>
                            </div>
                        </div>

                        <div className="account-state">
                            <div className="section-header">
                                Состояние счёта
                                <div className="tooltip2">
                                    <img
                                        src={MoreInfoIcon}
                                        alt="more-info"
                                        className="more-info-icon"></img>
                                    <span className="tooltiptext">
                                        Баланс = Сумма средств доступная на
                                        вашем Futures кошельке.
                                        <br />
                                        <br />
                                        Используется = Сумма средств
                                        зарезервированная другими ботами.
                                    </span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center account-state-row">
                                <p className="account-indicator">
                                    <img
                                        src={DollarIcon}
                                        alt="dollar-icon"
                                        className="indicator-icon"></img>
                                    Баланс
                                </p>
                                <div>
                                    <p className="account-amounts">
                                        ≈ {exchangeBalance} $
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center account-state-row">
                                <p className="account-indicator">
                                    <img
                                        src={LockIcon}
                                        alt="lock-icon"
                                        className="indicator-icon"></img>
                                    Используется
                                </p>
                                <div>
                                    <p className="account-amounts">
                                        ≈ {usedBalance} $
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="investment">
                            <div className="section-header">
                                Сумма инвестиции
                                <div className="tooltip2">
                                    <img
                                        src={MoreInfoIcon}
                                        alt="more-info"
                                        className="more-info-icon"></img>
                                    <span className="tooltiptext">
                                        Выберите сумму средств которой бот будет
                                        оперировать. Бот не сможет открыть
                                        позиций больше чем указаная сумма.
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div className="range-slider grad">
                                    <span
                                        id="output"
                                        className="range-value d-flex justify-content-center align-items-center">
                                        {isNaN(
                                            Math.round(
                                                investInput /
                                                    (exchangeBalance / 100)
                                            )
                                        )
                                            ? "0"
                                            : Math.round(
                                                  investInput /
                                                      (exchangeBalance / 100)
                                              )}
                                        %
                                    </span>
                                    <div className="range-slider-wrapper">
                                        <div className="range-slider-points d-flex justify-content-between align-items-center">
                                            <div className="range-point"></div>
                                            <div className="range-point"></div>
                                            <div className="range-point"></div>
                                            <div className="range-point"></div>
                                            <div className="range-point"></div>
                                        </div>
                                        <input
                                            id="investment_range"
                                            className="range-inputs"
                                            onChange={(e) => {
                                                setInvestInput(e.target.value);
                                                changeRangeDotsColor(
                                                    availableBalance,
                                                    e.target.value,
                                                    e.target
                                                );
                                            }}
                                            type="range"
                                            min="0"
                                            value={investInput}
                                            max={availableBalance}
                                            step="1"
                                            list="balance-option-list"
                                            disabled={onlyNotify || type === 2}
                                        />
                                    </div>

                                    <datalist id="balance-option-list">
                                        <option>0</option>
                                        <option>{availableBalance / 4}</option>
                                        <option>
                                            {(availableBalance / 4) * 2}
                                        </option>
                                        <option>
                                            {(availableBalance / 4) * 3}
                                        </option>
                                        <option>{availableBalance}</option>
                                    </datalist>
                                </div>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <button
                                            className="btn btn-outline-primary"
                                            type="button"
                                            disabled={onlyNotify || type === 2}
                                            onClick={() => {
                                                if (
                                                    investInput <=
                                                    availableBalance
                                                ) {
                                                    setInvestInput(
                                                        Number(investInput) - 1
                                                    );
                                                }
                                            }}>
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
                                            disabled={onlyNotify || type === 2}
                                            onClick={() => {
                                                if (
                                                    investInput <
                                                    availableBalance
                                                ) {
                                                    setInvestInput(
                                                        Number(investInput) + 1
                                                    );
                                                }
                                            }}>
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="botconfig-container-right col-md-6">
                        <div className="risk">
                            <div className="section-header">Риск</div>
                            <div className="range-slider grad">
                                <span className="range-value d-flex justify-content-center align-items-center" id="output">{riskInput}</span>
                                <div className="range-slider-wrapper">
                                    <div className="range-slider-points d-flex justify-content-between align-items-center">
                                        <div className="range-point"></div>
                                        <div className="range-point"></div>
                                        <div className="range-point"></div>
                                        <div className="range-point"></div>
                                        <div className="range-point"></div>
                                    </div>
                                     
                                    <input
                                        className="range-inputs"
                                        onChange={(e) => {
                                            setRiskInput(e.target.value);
                                            handleRangeChange(e);
                                        }}
                                        type="range"
                                        min="-10"
                                        value={riskInput}
                                        max="100"
                                        step="1"
                                        list="risk-option-list"
                                        disabled={onlyNotify || type === 2}
                                    />
                                    <div className="range-points-description">
                                        <div className="description-item">Минимальный</div>
                                        <div className="description-item">Нормальный</div>
                                        <div className="description-item">Средний</div>
                                        <div className="description-item">Опасный</div>
                                        <div className="description-item">Опасный</div>
                                    </div>
                                </div>

                                <datalist id="risk-option-list">
                                    <option>-10</option>
                                    <option>0</option>
                                    <option>33</option>
                                    <option>66</option>
                                    <option>100</option>
                                </datalist>
                               
                            </div>
                            <div className="risk-ratio d-flex justify-content-between align-items-center">
                                <p className="labels">Коэффициент риска</p>
                                <div>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <button
                                                className="btn btn-outline-primary"
                                                type="button"
                                                disabled={
                                                    onlyNotify || type === 2
                                                }
                                                onClick={() => {
                                                    if (riskInput === 1) {
                                                        setRiskInput(-2);
                                                        return;
                                                    }
                                                    if (riskInput > -10) {
                                                        setRiskInput(
                                                            Number(riskInput) -
                                                                1
                                                        );
                                                    }
                                                }}>
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
                                                disabled={
                                                    onlyNotify || type === 2
                                                }
                                                onClick={() => {
                                                    if (riskInput === -2) {
                                                        setRiskInput(1);
                                                        return;
                                                    }
                                                    if (riskInput < 100) {
                                                        setRiskInput(
                                                            Number(riskInput) +
                                                                1
                                                        );
                                                    }
                                                }}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="risk-cooeficient-container d-flex justify-content-between align-items-center">
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
                                {coefficientInput < 0.0001 &&
                                    (!onlyNotify || type !== 2) && (
                                        <p className="warn-labels">
                                            Коэффициент слишком низкий!
                                        </p>
                                    )}
                            </div>
                        </div>
                        <div className="transaction-control">
                            <div className="d-flex justify-content-between">
                                <div className="section-header">
                                    Контроль сделки
                                    <div className="tooltip2">
                                        <img
                                            src={MoreInfoIcon}
                                            alt="more-info"
                                            className="more-info-icon"></img>
                                        <span className="tooltiptext">
                                            Контроль сделки конфигурирует, на
                                            какой процент от основной суммы
                                            инвестиции бот сможет открывать
                                            позиции. Контроль нужен для того,
                                            чтобы бот не смог открыть позиции на
                                            всю сумму и, при малейшем
                                            отрицательном PNL, портфель
                                            ликвидируется. Вы так же можете сами
                                            контролировать сумму, доступную на
                                            вашем аккаунте и устанавливать
                                            бюджет бота в размере, меньшем, чем
                                            сумма на вашем аккаунте. В таком
                                            случае контроль сделки может быть
                                            установлен на 100%.
                                            <br />
                                            <br />
                                            По умолчанию, бот устанавливает
                                            контроль сделки на 80%.
                                            <br />
                                            <br />
                                            Пример: Контроль сделки - 80%, сумма
                                            - 100$. Бот будет копировать позиции
                                            только на 80$.
                                        </span>
                                    </div>
                                </div>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={positionControl}
                                        onChange={() =>
                                            setPositionControl(!positionControl)
                                        }
                                        disabled={onlyNotify || type === 2}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            {positionControl && (
                                <>
                                    <div className="range-slider grad">
                                        <span
                                            id="output"
                                            className="range-value d-flex justify-content-center align-items-center">
                                            {positionControlInput}%
                                        </span>
                                        

                                        <div className="range-slider-wrapper">
                                            <div className="range-slider-points d-flex justify-content-between align-items-center">
                                                <div className="range-point"></div>
                                                <div className="range-point"></div>
                                                <div className="range-point"></div>
                                                <div className="range-point"></div>
                                                <div className="range-point"></div>
                                            </div>
                                            <input
                                                className="range-inputs"
                                                onChange={(e) => {
                                                    setPositionControlInput(
                                                        e.target.value
                                                    )
                                                    changeRangeDotsColor(
                                                        100,
                                                        e.target.value,
                                                        e.target
                                                    );
                                                }}
                                                type="range"
                                                min="0"
                                                value={positionControlInput}
                                                max="100"
                                                step="1"
                                                list="position-option-list"
                                                disabled={onlyNotify || type === 2}
                                            />
                                        </div>
                                       
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
                                                        disabled={
                                                            onlyNotify ||
                                                            type === 2
                                                        }
                                                        onClick={() => {
                                                            if (
                                                                positionControlInput <
                                                                100
                                                            ) {
                                                                setPositionControlInput(
                                                                    Number(
                                                                        positionControlInput
                                                                    ) - 1
                                                                );
                                                            }
                                                        }}>
                                                        -
                                                    </button>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    readOnly
                                                    disabled
                                                    value={
                                                        positionControlInput +
                                                        "%"
                                                    }
                                                />
                                                <div className="input-group-prepend">
                                                    <button
                                                        className="btn btn-outline-primary"
                                                        type="button"
                                                        disabled={
                                                            onlyNotify ||
                                                            type === 2
                                                        }
                                                        onClick={() => {
                                                            if (
                                                                positionControlInput <
                                                                100
                                                            ) {
                                                                setPositionControlInput(
                                                                    Number(
                                                                        positionControlInput
                                                                    ) + 1
                                                                );
                                                            }
                                                        }}>
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
                                <div className="section-header">
                                    Стоп профит{" "}
                                    <span
                                        style={{
                                            color: "grey",
                                            fontSize: "14px",
                                        }}>
                                        (недоступно)
                                    </span>
                                </div>
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
                                        <span
                                            id="output"
                                            className="range-value">
                                            {stopProfitInput}%
                                        </span>
                                        <input
                                            className="range-inputs"
                                            onChange={(e) =>
                                                setStopProfitInput(
                                                    e.target.value
                                                )
                                            }
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
                                                            if (
                                                                stopProfitInput <
                                                                999
                                                            ) {
                                                                setStopProfitInput(
                                                                    Number(
                                                                        stopProfitInput
                                                                    ) - 1
                                                                );
                                                            }
                                                        }}>
                                                        -
                                                    </button>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    readOnly
                                                    disabled
                                                    value={
                                                        stopProfitInput + "%"
                                                    }
                                                />
                                                <div className="input-group-prepend">
                                                    <button
                                                        className="btn btn-outline-primary"
                                                        type="button"
                                                        onClick={() => {
                                                            if (
                                                                stopProfitInput <
                                                                999
                                                            ) {
                                                                setStopProfitInput(
                                                                    Number(
                                                                        stopProfitInput
                                                                    ) + 1
                                                                );
                                                            }
                                                        }}>
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
                                <div className="section-header">
                                    Стоп лосс{" "}
                                    <span
                                        style={{
                                            color: "grey",
                                            fontSize: "14px",
                                        }}>
                                        (недоступно)
                                    </span>
                                </div>
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
                                        <span
                                            id="output"
                                            className="range-value">
                                            {stopLossInput}%
                                        </span>
                                        <input
                                            className="range-inputs"
                                            onChange={(e) =>
                                                setStopLossInput(e.target.value)
                                            }
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
                                                            if (
                                                                stopLossInput <
                                                                100
                                                            ) {
                                                                setStopLossInput(
                                                                    Number(
                                                                        stopLossInput
                                                                    ) - 1
                                                                );
                                                            }
                                                        }}>
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
                                                            if (
                                                                stopLossInput <
                                                                100
                                                            ) {
                                                                setStopLossInput(
                                                                    Number(
                                                                        stopLossInput
                                                                    ) + 1
                                                                );
                                                            }
                                                        }}>
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