import React from "react";
import "./TransactionHistory.css";

export default function TransactionHistory() {
  return (
    <div className="TransactionHistory question-routes-container">
      <h1>История транзакций</h1>
      <p>
        В разделе "Торговля" вы найдете полную статистику по вашим транзакциям.
        Перейти к разделу:
        <a href="/" className="transaction-link">
          [Ссылка]
        </a>
        <br />
        Здесь предоставляется информация о всех ваших транзакциях, включая
        открытые и закрытые сделки. Вы сможете увидеть следующие данные:
      </p>
      <ul className="inner-descrip-list">
        <li>Размер прибыли по каждой сделке</li>
        <li>Дата совершения сделки</li>
        <li>Время, затраченное на сделку</li>
        <li>Возврат на инвестиции (ROI) для каждой сделки</li>
        <li>Чистая прибыль/убыток (PNL) по сделкам</li>
      </ul>
      <p>
        Этот раздел позволяет вам максимально точно отслеживать свою торговую
        деятельность и анализировать полученные результаты для дальнейшего
        улучшения стратегий и повышения эффективности торговли.
      </p>
    </div>
  );
}
