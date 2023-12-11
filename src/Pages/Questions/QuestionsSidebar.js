import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink instead of Link
import './QuestionsSidebar.css';

export default function QuestionsSidebar() {
  return (
    <div className="QuestionsSidebar">
      <div className="question-sidebar-header">
        <p>База знаний</p>
      </div>

      <nav>
        <ul className="question-sidebar-list">
          <li className="sidebar-option">
            <NavLink to="/questions/faq">FAQ</NavLink>
          </li>
          <li className="sidebar-option">
            <NavLink to="/questions/fitt-meaning">Что такое FITT</NavLink>
          </li>
          <li className="sidebar-option">
            <NavLink to="/questions/copytrader-guide">Руководство для копи-трейдера</NavLink>
          </li>
          <li className="sidebar-option">
            <NavLink to="/questions/signal-guide">Руководство по сигналам</NavLink>
          </li>
          <li className="sidebar-option">
            <NavLink to="/questions/comission">Комиссии на платформе</NavLink>
          </li>
          <li className="sidebar-option">
            <NavLink to="/questions/referral">Реферальная программа</NavLink>
          </li>
          <li className="sidebar-option">
            <NavLink to="/questions/conditions">Условия использования</NavLink>
          </li>
          <li className="sidebar-option">
            <NavLink to="/questions/confidentiality">Конфиденциальность</NavLink>
          </li>
          <li className="sidebar-option">
            <NavLink to="/questions/transaction-history">История транзакции</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
