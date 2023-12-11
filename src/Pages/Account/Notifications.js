import React, { useState } from "react";
import userService from "../../Services/user.service";
import "./Notifications.css";

export default function Notifications() {
    let [code, setCode] = useState("");

    function generateCode() {
        userService.requestTelegramCode().then((response) => {
            setCode(response.data);
        });
    }

    return (
        <div className="Notifications">
            <div className="container">
                <h1>Привяжите свой телеграмм аккаунт</h1>
                <p>
                    Привяжите свой телеграм аккаунт к нашему Телеграмм боту для
                    того, чтобы получать моментальные уведомления о действиях
                    бота
                </p>
                <ol>
                    <li>Сгенерируйте код нажав кнопку ниже</li>
                    <li> Зайдите на наш телеграм бот (@fitt_app_bot)</li>
                    <li>
                        Нажмите '/start' и выберите 'Связать аккаунт', если меню
                        с выбором не появилось автоматически, выберите его
                        справа от строки ввода
                    </li>
                    <li>Введите сгенерированный код и нажмите отправить</li>
                </ol>
                <button
                    onClick={generateCode}
                    className="yellow-btn">
                    Сгенерировать код
                </button>
                <h4 style={{ marginTop: 50 }}>{code}</h4>
            </div>
        </div>
    );
}
