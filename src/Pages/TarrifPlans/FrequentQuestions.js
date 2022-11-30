import React, { useState } from "react";
import "./FrequentQuestions.css";
import QuestionMoreIcon from "../../images/question-more-icon.svg";

export default function FrequentQuestions() {
  let [answer1, setAnswer1] = useState(false);
  let [answer2, setAnswer2] = useState(false);
  let [answer3, setAnswer3] = useState(false);
  let [answer4, setAnswer4] = useState(false);
  let [answer5, setAnswer5] = useState(false);
  let [answer6, setAnswer6] = useState(false);

  return (
    <div className="questions-container">
      <p className="text-center">Часто задаваемые вопросы</p>
      <ul>
        <li>
          <div className="d-flex" onClick={() => setAnswer1(!answer1)}>
            Как работает Fitt?{" "}
            <img src={QuestionMoreIcon} alt="question-more-icon" />
          </div>
          {answer1 && (
            <p className="answer-article">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          )}
        </li>
        <li>
          <div className="d-flex" onClick={() => setAnswer2(!answer2)}>
            Какие риски связаны с Fitt?{" "}
            <img src={QuestionMoreIcon} alt="question-more-icon" />
          </div>
          {answer2 && (
            <p className="answer-article">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          )}
        </li>
        <li>
          <div className="d-flex" onClick={() => setAnswer3(!answer3)}>
            Как стать ведущим трейдером?{" "}
            <img src={QuestionMoreIcon} alt="question-more-icon" />
          </div>
          {answer3 && (
            <p className="answer-article">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          )}
        </li>
        <li>
          <div className="d-flex" onClick={() => setAnswer4(!answer4)}>
            Преимущества Fitt{" "}
            <img src={QuestionMoreIcon} alt="question-more-icon" />
          </div>
          {answer4 && (
            <p className="answer-article">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          )}
        </li>
        <li>
          <div className="d-flex" onClick={() => setAnswer5(!answer5)}>
            Какая комиссия за транзакции предусмотрена с Fitt?
            <img src={QuestionMoreIcon} alt="question-more-icon" />
          </div>
          {answer5 && (
            <p className="answer-article">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          )}
        </li>
        <li>
          <div className="d-flex" onClick={() => setAnswer6(!answer6)}>
            Гарантирует ли копирование сделок прибыль?{" "}
            <img src={QuestionMoreIcon} alt="question-more-icon" />
          </div>
          {answer6 && (
            <p className="answer-article">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          )}
        </li>
      </ul>
      <button type="button" className="all-question-btn">
        Смотреть все вопросы
      </button>
    </div>
  );
}
