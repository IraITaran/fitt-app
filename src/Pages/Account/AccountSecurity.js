import React, { useState, useEffect } from "react";
import UnknownIcon from "../../images/unknown-icon.png";
import DoneIcon from "../../images/done-icon.svg";
import CloseIcon from "../../images/close-icon.svg";
import CameraIcon from "../../images/camera-icon.svg";
import "./AccountSecurity.css";
import UserService from "../../Services/user.service";

export default function AccountSecurity() {
    let [sessions, setSessions] = useState([]);
    let [displaySessions, setDisplaySessions] = useState(false);

    useEffect(() => {
        UserService.sessions().then((response) => {
            setSessions(response.data);
        });
    }, []);
    return (
        <div className="AccountSecurity">
            <div className="user-info-container d-flex flex-column align-items-stretch">
                <div className="container">
                    <div className="d-flex flex-column flex-lg-row flex-wrap">
                        <div className="security-info-data d-flex">
                            <div className="security-image">
                                <img
                                    src={UnknownIcon}
                                    alt="unknown-icon"
                                    className="user-account-icon"
                                ></img>
                                <div className="security-image-icon-small">
                                    <img
                                        src={CameraIcon}
                                        alt="camera icon"
                                    ></img>
                                </div>
                            </div>

                            <div className="security-name-data d-flex flex-lg-row align-items-lg-center flex-column">
                                <div className="security-username">
                                    <p>Ваше имя</p>
                                    <p>Иван Петрович</p>
                                </div>
                                <div className="security-nickname">
                                    <p>Ваш никнейм</p>
                                    <p>Anonymous-user-2234</p>
                                </div>
                            </div>
                        </div>

                        <div className="d-none d-lg-flex align-items-center security-credentials">
                            <div className="security-password">
                                <p>Ваш пароль</p>
                                <p>**********</p>
                            </div>
                            <div className="security-phone">
                                <p>Номер телефона</p>
                                <p>+380634455465</p>
                            </div>
                            <div className="security-email">
                                <p>Ваш E-mail</p>
                                <p>gmailgmail@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column flex-md-row security-buttons">
                        <button
                            type="button"
                            className="yellow-btn security-edit-btn"
                        >
                            Редактировать информацию
                        </button>
                        <button
                            type="button"
                            className="grey-btn security-check-btn"
                        >
                            Пройти проверку KYC
                        </button>
                    </div>
                    <div className="security-footer">
                        <h4>Безопасность:</h4>
                        <div className="d-flex flex-column flex-lg-row flex-lg-wrap security-options-container">
                            <div className="d-flex align-items-center">
                                <img src={DoneIcon} alt="done-icon"></img>
                                <p>
                                    Двухфакторная
                                    <br /> аутентификация (2FA)
                                </p>
                            </div>
                            <div className="d-flex align-items-center">
                                <img src={DoneIcon} alt="done-icon"></img>
                                <p>
                                    Подтверждение
                                    <br /> личности
                                </p>
                            </div>
                            <div className="d-flex align-items-center">
                                <img src={CloseIcon} alt="close-icon"></img>
                                <p>
                                    Антифишинговый
                                    <br /> код
                                </p>
                            </div>
                            <div className="d-flex align-items-center">
                                <img src={CloseIcon} alt="close-icon"></img>
                                <p>
                                    Белый список для
                                    <br /> вывода средств
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="account-bg"></div>
                </div>
            </div>
            <div className="security-main-container">
                <div className="container">
                    <div className="two-factor-auth">
                        <h2>Двухфакторная аутентификация (2FA)</h2>

                        <div className="d-flex flex-column flex-lg-row align-items-lg-center security-section">
                            <div className="security-section-block security-section-text">
                                <p className="security-subheader">
                                    Биометрическая аутентификация/Ключ
                                    безопасности
                                </p>
                                <p className="security-description">
                                    Защитите свой аккаунт и вывод средств с
                                    помощью ключа безопасности, например,
                                    Yubikey.
                                </p>
                            </div>
                            <div className="security-section-block">
                                <p className="auth-validation">
                                    <img src={DoneIcon} alt="done-icon"></img>
                                    Включено
                                </p>
                            </div>

                            <div className="security-section-block security-section-buttons d-flex justify-content-lg-end">
                                <button type="button" className="manage-btn">
                                    Управлять
                                </button>
                            </div>
                        </div>

                        <div className="d-flex flex-column flex-lg-row align-items-lg-center security-section">
                            <div className="security-section-block security-section-text">
                                <p className="security-subheader">
                                    Google Authenticator (рекомендуется)
                                </p>
                                <p className="security-description">
                                    Защитите свой аккаунт и транзакции.
                                </p>
                            </div>
                            <div className="security-section-block">
                                <p className="auth-validation">
                                    <img src={DoneIcon} alt="done-icon"></img>
                                    Включено
                                </p>
                            </div>
                            <div className="security-section-block security-section-buttons d-flex justify-content-lg-end">
                                <button
                                    type="button"
                                    className="change-btn flex-grow-1"
                                >
                                    Изменить
                                </button>
                                <button
                                    type="button"
                                    className="delete-btn flex-grow-1"
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>

                        <div className="d-flex flex-column flex-lg-row align-items-lg-center security-section">
                            <div className="security-section-block security-section-text">
                                <p className="security-subheader">
                                    Верификация по номеру телефона
                                </p>
                                <p className="security-description">
                                    Защитите свой аккаунт и транзакции.
                                </p>
                            </div>
                            <div className="security-section-block">
                                <p className="auth-validation">
                                    <img src={DoneIcon} alt="done-icon"></img>
                                    63******7
                                </p>
                            </div>
                            <div className="security-section-block security-section-buttons d-flex justify-content-lg-end">
                                <button
                                    type="button"
                                    className="change-btn flex-grow-1"
                                >
                                    Изменить
                                </button>
                                <button
                                    type="button"
                                    className="delete-btn flex-grow-1"
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>

                        <div className="d-flex flex-column flex-lg-row align-items-lg-center security-section">
                            <div className="security-section-block security-section-text">
                                <p className="security-subheader">
                                    Подтверждение по email
                                </p>
                                <p className="security-description">
                                    Защитите свой аккаунт и транзакции.
                                </p>
                            </div>
                            <div className="security-section-block">
                                <p className="auth-validation">
                                    <img src={DoneIcon} alt="done-icon"></img>
                                    gma***@gmail.com
                                </p>
                            </div>
                            <div className="security-section-block security-section-buttons d-flex justify-content-lg-end">
                                <button
                                    type="button"
                                    className="change-btn flex-grow-1"
                                >
                                    Изменить
                                </button>
                                <button
                                    type="button"
                                    className="delete-btn flex-grow-1"
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="devices-activity">
                        <h2>Устройства и активность</h2>

                        <div className="security-section d-flex flex-column flex-lg-row align-items-lg-center">
                            <div className="security-section-block security-section-text">
                                <p className="security-subheader">
                                    Управление устройствами
                                </p>
                                <p className="security-description">
                                    Управление устройствами, которым разрешен
                                    доступ к вашему аккаунту
                                </p>
                            </div>
                            <div className="security-section-block">
                                <p className="auth-validation">
                                    <img src={DoneIcon} alt="done-icon"></img>
                                    Включено
                                </p>
                            </div>
                            <div className="security-section-block security-section-buttons d-flex justify-content-lg-end">
                                <button type="button" className="manage-btn">
                                    Управлять
                                </button>
                            </div>
                        </div>

                        <div className="security-section d-flex flex-column flex-lg-row align-items-lg-center">
                            <div className="security-section-block security-section-text">
                                <p className="security-subheader">
                                    Активность аккаунта
                                </p>
                                <p className="security-description m-0">
                                    История распределений: 2023-01-06 18:54:01
                                    <br /> Подозрительная активность аккаунта?
                                    <a href="/" className="turnoff-acc">
                                        Отключить аккаунт
                                    </a>
                                </p>
                                <p className="security-description"></p>
                            </div>
                            <div className="security-section-block">
                                <p className="auth-validation">
                                    <img src={DoneIcon} alt="done-icon"></img>
                                    Включено
                                </p>
                            </div>
                            <div className="security-section-block"></div>
                            <div className="security-section-block security-section-buttons d-flex justify-content-lg-end">
                                <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={() => {
                                        setDisplaySessions(!displaySessions);
                                    }}
                                >
                                    Больше
                                </button>
                            </div>
                        </div>

                        {displaySessions && (
                            <div className="session-container">
                                <h2>Сессии</h2>

                                <table>
                                    <thead>
                                        <tr className="border-bottom">
                                            <th>Время</th>
                                            <th>IP</th>
                                            <th>OS</th>
                                            <th>Browser</th>
                                            <th>Device Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sessions.map(function (
                                            session,
                                            index
                                        ) {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        {new Date(
                                                            session.createdDate
                                                        ).toLocaleDateString(
                                                            "es-ES"
                                                        ) +
                                                            " " +
                                                            new Date(
                                                                session.createdDate
                                                            ).toLocaleTimeString(
                                                                "es-ES"
                                                            )}
                                                    </td>
                                                    <td>{session.data.ip}</td>
                                                    <td>{session.data.os}</td>
                                                    <td>
                                                        {session.data.browser}
                                                    </td>
                                                    <td>
                                                        {session.data.device}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
