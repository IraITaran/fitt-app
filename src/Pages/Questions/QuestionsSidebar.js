import React from "react";
import { Link } from "react-router-dom";
import "./QuestionsSidebar.css";

export default function QuestionsSidebar() {
  return (
    <div className="QuestionsSidebar">
      <div className="question-sidebar-header">
        <p>База знаний</p>
      </div>
      <hr className="m-0" />
      <nav>
        <ul className="question-sidebar-list">
          <li className="sidebar-option">
            <Link to="/questions/faq">FAQ</Link>
          </li>
          <li className="sidebar-option">
            <Link to="/questions/fitt-meaning">Что такое FITT</Link>
          </li>
          <li className="sidebar-option">
            <Link to="/questions/copytrader-guide">
              Руководство для копи-трейдера
            </Link>
          </li>
          <li className="sidebar-option">
            <Link to="/questions/signal-guide">Руководство по сигналам</Link>
          </li>
          <li className="sidebar-option">
            <Link to="/questions/comission">Комиссии на платформе</Link>
          </li>
          <li className="sidebar-option">
            <Link to="/questions/referral">Реферальная программа</Link>
          </li>
          <li className="sidebar-option">
            <Link to="/questions/conditions">Условия использования</Link>
          </li>
          <li className="sidebar-option">
            <Link to="/questions/confidentiality">Конфиденциальность</Link>
          </li>
          <li className="sidebar-option">
            <Link to="/questions/transaction-history">История транзакции</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
