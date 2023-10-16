import React, { useState } from "react";
import "./FrequentQuestions.css";

import Answer1 from "./Answers/Answer1";
import Answer2 from "./Answers/Answer2";
import Answer3 from "./Answers/Answer3";
import Answer4 from "./Answers/Answer4";
import Answer5 from "./Answers/Answer5";
import Answer6 from "./Answers/Answer6";

export default function FrequentQuestions() {
    //articles data loop
    const [items, setItems] = useState([
        //question-1
        {
            id: 1,
            title: "Что такое Fitt?",
            content: <Answer1 />,
            active: false,
        },
        //question-2
        {
            id: 2,
            title: "Как работает Fitt?",
            content: <Answer2 />,
            active: false,
        },
        //question-3
        {
            id: 3,
            title: "Какие риски связаны с Fitt?",
            content: <Answer3 />,
            active: false,
        },
        {
            id: 4,
            title: "Преимущества Fitt",
            content: <Answer4 />,
            active: false,
        },
        {
            id: 5,
            title: "Комиссии на платформе Fitt",
            content: <Answer5 />,
            active: false,
        },
        {
            id: 6,
            title: "Гарантирует ли копирование сделок прибыль?",
            content: <Answer6 />,
            active: false,
        },
    ]);

    const toggleItemClass = (itemId) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, active: !item.active } : item
            )
        );
    };

    return (
        <div className="questions-container">
            <div className="container">
                <h5 className="question-title">Часто задаваемые вопросы</h5>
                <ul className="questions-list row align-items-start justify-content-md-between">
                    {items.map((item) => (
                        <li
                            key={item.id}
                            className={`col-xs-1 col-md-6 questions-item ${
                                item.active ? "active" : ""
                            }`}
                            onClick={() => toggleItemClass(item.id)}
                        >
                            <div className="d-flex align-items-center">
                                {item.title}
                                <div className="question-icon"></div>
                            </div>
                            <div className="answer-article">{item.content}</div>
                        </li>
                    ))}
                </ul>
                <button type="button" className="all-question-btn">
                    Смотреть все вопросы
                </button>
            </div>
        </div>
    );
}
