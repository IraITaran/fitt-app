import React, { useState, useEffect } from "react";
import "./PageFooter.css";
import TwitterIcon from "../../images/twitter-icon.svg";
import FacebookIcon from "../../images/facebook-icon.svg";
import TelegramIcon from "../../images/telegram-icon.svg";
import RedditIcon from "../../images/reddit-icon.svg";
import FittLogoHeader from "../../images/fitt-logo-header.svg";
import BinanceLogoFooter from "../../images/binance-logo-footer.svg";
//import Confidential from "./Confidential";
import { Link } from "react-router-dom";

export default function PageFooter() {
    const [isDay, setIsDay] = useState(true);

    useEffect(() => {
        // Function to update day/night state based on current time
        const updateDayNightClass = () => {
            const currentTime = new Date();
            const currentHour = currentTime.getHours();

            // Determine whether it's day or night (you can adjust the hours)
            const newIsDay = currentHour >= 6 && currentHour < 18;

            // Update the state with the result
            setIsDay(newIsDay);
        };

        // Call the function immediately when the component mounts
        updateDayNightClass();

        // Set up an interval to check and update the time every minute (you can adjust the interval)
        const intervalId = setInterval(updateDayNightClass, 60000);

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const dayClassName = "day-time";
    const nightClassName = "night-time";

    // Use a conditional class name based on the isDay state
    const className = isDay ? dayClassName : nightClassName;

    return (
        <div className={"PageFooter " + className}>
            <div className="footer-bg"></div>
            <div className="container footer-content-wrapper">
                <div className="row flex-column-reverse justify-content-between flex-md-row">
                    <div className="footer-nav d-flex justify-content-between flex-wrap col col-md-6 col-lg-8">
                        <ul className="about-us">
                            <li className="list-header">О нас</li>
                            <li>
                                <a href="/">О нас</a>
                            </li>
                            <li>
                                <a href="/">Реферальная программа</a>
                            </li>
                            <li>
                                <a href="/">Условия использования</a>
                            </li>
                            <li>
                                {/* <Link to="confidential">Конфиденциальность/</Link> */}
                            </li>
                        </ul>
                        <ul className="support">
                            <li className="list-header">Центр поддержки</li>
                            <li>
                                <Link to="/questions/faq">
                                    Руководство для копи-трейдера
                                </Link>
                            </li>
                            <li>
                                <a href="/">Сигналы</a>
                            </li>
                            <li>
                                <a href="/">Комиссии на платформе</a>
                            </li>
                            <li>
                                <a href="/">FAQ</a>
                            </li>
                        </ul>
                        <ul className="community">
                            <li className="list-header">Сообщество</li>
                            <li>
                                <img
                                    src={TwitterIcon}
                                    alt="twitter-icon"
                                    className="me-2"
                                ></img>
                                <a
                                    href="https://twitter.com/fitt_ink"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Твиттер
                                </a>
                            </li>
                            <li>
                                <img
                                    src={FacebookIcon}
                                    alt="facebook-icon"
                                    className="me-2"
                                ></img>
                                <a
                                    href="https://www.instagram.com/fitt.ink/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Инстаграм
                                </a>
                            </li>
                            <li>
                                <img
                                    src={TelegramIcon}
                                    alt="telegram-icon"
                                    className="me-2"
                                ></img>
                                <a
                                    href="https://t.me/fittink"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Телеграм
                                </a>
                            </li>
                            <li>
                                <img
                                    src={RedditIcon}
                                    alt="reddit-icon"
                                    className="me-2"
                                ></img>
                                <a
                                    href="https://www.reddit.com/user/Fitt_ink"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Реддит
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="fitt-info-container col col-md-6 col-lg-4">
                        <div className="d-flex fitt-info-logo">
                            <img
                                src={FittLogoHeader}
                                alt="fitt"
                                className="fitt-logo"
                            ></img>
                            <div className="ms-4">
                                <p className="binance-powered">Powered by</p>
                                {
                                    <img
                                        src={BinanceLogoFooter}
                                        alt="binance-logo"
                                    ></img>
                                }{" "}
                            </div>
                        </div>
                        <p className="fitt-definition">
                            FItt — это инновационная социальная платформа,
                            предназначенная для передачи ценного торгового опыта
                            от опытных трейдеров к начинающим. Наша цель -
                            создать прочные связи между профессиональными
                            трейдерами и новичками, обеспечивая эффективное
                            сотрудничество и обмен знаниями для достижения
                            оптимальных результатов на криптовалютном рынке.
                            Давайте вместе раскроем весь потенциал успешной
                            торговли и увеличим ваш профит в мире криптовалют!
                        </p>
                    </div>
                </div>
                <hr className="m-0"></hr>
                <p className="copyright">
                    Copyright © 2022 Fitt. Все права защищены.
                </p>
            </div>
        </div>
    );
}
