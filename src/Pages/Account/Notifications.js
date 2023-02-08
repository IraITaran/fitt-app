import React, { useState } from "react";
import userService from "../../Services/user.service";

export default function Notifications() {
  let [code, setCode] = useState("");

  function generateCode() {
    userService.requestTelegramCode().then((response) => {
      setCode(response.data);
    });
  }

  return (
    <div>
      <h4 style={{ marginBottom: 50 }}>
        Привяжите свой телеграм аккаунт к нашему Телеграмм боту, для того, чтоб
        получать моментальные уведомления о действиях бота.
      </h4>

      <h5>- Сгенерируйте код нажав кнопку ниже;</h5>
      <h5>- Зайдите на наш телеграм бот (@artmax_bot);</h5>
      <h5>
        - Нажмите '/start' и выберите 'Связать аккаунт', если меню с выбором не
        появилось автоматически, выберите его справа от строки ввода;
      </h5>
      <h5>- Введите сгенерированный код и нажмите отправить.</h5>
      <button onClick={generateCode} style={{ marginTop: 50 }}>
        Сгенерировать код
      </button>
      <h4 style={{ marginTop: 50 }}>{code}</h4>
    </div>
  );
}
