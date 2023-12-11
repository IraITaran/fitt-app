import React, { useState } from "react";
import "./PayForm.css";
import OptionListIcon from "../../images/option-list-icon.svg";
import CardIcon from "../../images/card-icon.svg";
import AppleIcon from "../../images/apple-icon.svg";
import BitcoinIcon from "../../images/bitcoin-icon.svg";

const Tab = ({ content }) => {
  return (
    <div>
      <div className="tab-content">{content}</div>
    </div>
  );
};

export default function PayForm(props) {
  const [email, setEmail] = useState("");
  const [emailError, setemailError] = useState("");
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const signupSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="PayForm base-form">
      <div className="container">
        <h4 className="form-title">Подтверждение и оплата</h4>
        <form id="signupform" onSubmit={signupSubmit}>
           <div className="left-form-item">
            <div className="form-field-block">
                <div className="form-sub-title">1. Персональная информация</div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control form-input"
                    id="EmailInput"
                    name="EmailInput"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <small id="emailHelp" className="text-danger form-text">
                    {emailError}
                  </small>
                </div>
                <div className="form-group-row">
                  <div className="form-group">
                    <label>Имя</label>
                    <div className="form-field">
                      <input
                        type="text"
                        className="form-control form-input"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Фамилия</label>
                    <div className="form-field">
                      <input
                        type="text"
                        className="form-control form-input"
                      />
                    </div>
                </div>
                </div>
              </div>

              <div className="form-field-block">
                <div className="form-sub-title">2. Адрес для выставления счета</div>
                <div className="form-group-row">
                  <div className="form-group">
                    <label>Страна</label>
                    <select className="form-select tariff-select">
                      <option></option>
                    </select>
                    </div>
                    <div className="form-group">
                      <label>Город</label>
                      <div className="form-field">
                        <input
                          type="text"
                          className="form-control form-input"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group-row-multiple">
                  <div className="form-group">
                    <label>Улица</label>
                    <input
                          type="text"
                          className="form-control form-input"
                        />
                    </div>
                    <div className="form-group">
                      <label>Номер дома</label>
                      <div className="form-field">
                        <input
                          type="text"
                          className="form-control form-input"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Почтовый индекс</label>
                      <div className="form-field">
                        <input
                          type="text"
                          className="form-control form-input"
                        />
                      </div>
                    </div>
                  </div>
                  
              </div>

                <div className="form-field-block">
                  <div className="form-sub-title">3. Способ оплаты</div>
                
                  <div className="payments-tab">
                    <div onClick={() => handleTabClick('tab1')} className={activeTab === 'tab1' ? 'payment-tab-btn is-active' : 'payment-tab-btn'}>
                      <div className="payment-tab-inner">
                        <img src={CardIcon} alt="list - icon" />
                        <div>Кредитной картой</div>
                      </div>
                      <div className="payment-radio-btn"></div>
                    </div>
                    {activeTab === 'tab1' && (
                      <Tab label="Tab 1" content={
                        <div className="form-field-block">
                            <div className="form-group">
                              <label className="label-required">Номер карты</label>
                              <input
                                type="text"
                                className="form-control form-input"
                                placeholder="1234 1234 1234 1234"
                              />
                            </div>
                            <div className="form-group-row">
                              <div className="form-group">
                                <label className="label-required">Дата окончания</label>
                                <div className="form-field">
                                  <input
                                    type="text"
                                    className="form-control form-input"
                                    placeholder="ДД / ГГ"
                                  />
                                </div>
                              </div>
                              <div className="form-group">
                                <label className="label-required">CVC</label>
                                <div className="form-field">
                                  <input
                                    type="password"
                                    className="form-control form-input"
                                    placeholder="***"
                                  />
                                </div>
                            </div>
                            </div>
                          </div>
                      } />
                    )}
                    <div onClick={() => handleTabClick('tab2')} className={activeTab === 'tab2' ? 'payment-tab-btn is-active' : 'payment-tab-btn'}>
                    <div className="payment-tab-inner">
                        <img src={AppleIcon} alt="list - icon" />
                        <div>Apple Pay</div>
                      </div>
                      <div className="payment-radio-btn"></div>
                    </div>
                    {activeTab === 'tab2' && (
                     <div className="form-field-block">
                     <div className="form-group">
                       <label className="label-required">Номер карты2</label>
                       <input
                         type="text"
                         className="form-control form-input"
                         placeholder="1234 1234 1234 1234"
                       />
                     </div>
                     <div className="form-group-row">
                       <div className="form-group">
                         <label className="label-required">Дата окончания</label>
                         <div className="form-field">
                           <input
                             type="text"
                             className="form-control form-input"
                             placeholder="ДД / ГГ"
                           />
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="label-required">CVC</label>
                         <div className="form-field">
                           <input
                             type="password"
                             className="form-control form-input"
                             placeholder="***"
                           />
                         </div>
                     </div>
                     </div>
                   </div>
                    )}
                    <div onClick={() => handleTabClick('tab3')} className={activeTab === 'tab3' ? 'payment-tab-btn is-active' : 'payment-tab-btn'}>
                    <div className="payment-tab-inner">
                        <img src={BitcoinIcon} alt="list - icon" />
                        <div>Криптовалютой</div>
                      </div>
                      <div className="payment-radio-btn"></div>
                    </div>
                    {activeTab === 'tab3' && (
                      <div className="form-field-block">
                      <div className="form-group">
                        <label className="label-required">Номер карты3</label>
                        <input
                          type="text"
                          className="form-control form-input"
                          placeholder="1234 1234 1234 1234"
                        />
                      </div>
                      <div className="form-group-row">
                        <div className="form-group">
                          <label className="label-required">Дата окончания</label>
                          <div className="form-field">
                            <input
                              type="text"
                              className="form-control form-input"
                              placeholder="ДД / ГГ"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="label-required">CVC</label>
                          <div className="form-field">
                            <input
                              type="password"
                              className="form-control form-input"
                              placeholder="***"
                            />
                          </div>
                      </div>
                      </div>
                    </div>
                    )}
                  </div>                    
                </div>
              </div>
              <div className="right-form-item">
                <div className="form-field-block form-field-tariff">
                  <div className="form-step-header">
                    <div className="title">Для начинающих</div>
                    <div className="description">Ваш тарифный план</div>
                  </div>
                  <div className="count-tariff">1 месяц</div>
                  <div className="form-description">Следующий платёж: 30 ноября 2022</div>
                  <div className="ckeckbox-field">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                      <span className="checkbox-label">Автоматически продлевать</span>
                      </label>
                  </div>
                  <ul>
                    <li>
                      <img src={OptionListIcon} alt="list - icon" />1 Аккаунт в
                      управлении
                    </li>
                    <li>
                      <img src={OptionListIcon} alt="list - icon" />
                      До 1000 бюджет
                    </li>
                    <li>
                      <img src={OptionListIcon} alt="list - icon" />3 бота для сигналов
                    </li>
                    <li>
                      <img src={OptionListIcon} alt="list - icon" />
                      Уведомления в Telegram
                    </li>
                  </ul>
                  <div className="form-step-footer">
                    <div className="title">Всего:</div>
                    <div className="cost-count">$75</div>
                  </div>
                </div>

                <div className="form-field-block">
                  <div className="form-sub-title">4. На какой период вы хотите оплатить тариф?</div>
                  <div className="mode-inputs">
                    <label>
                      <span>1 месяц</span>
                      <div className="radio-wrapper">
                        <span className="cost-count">$75</span>
                        <input type="radio" name="mode" className="radio" value="0" />
                      </div>
                    </label>
                    <label>
                      <div className="radio-info">
                        <span>3 месяц</span>
                        <span className="radio-info-description">Экономия $25</span>
                      </div>
                      <div className="radio-wrapper">
                        <span className="cost-count">$210</span>
                        <input type="radio" name="mode" className="radio" value="1" />
                      </div>
                    </label>
                    <label>
                    <div className="radio-info">
                        <span>1 год</span>
                        <span className="radio-info-description">Экономия $150</span>
                      </div>
                      <div className="radio-wrapper">
                        <span className="cost-count">$750</span>
                        <input type="radio" name="mode" className="radio" value="2" />
                      </div>
                    </label>
                  </div>
                  <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  
                />
                <label className="form-check-label conf-agreement">
                  Я прочитал(-а) и принимаю{" "}
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                  Соглашение об обслуживании, Заявление о конфиденциальности
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="btn pay-btn w-100"
               
              >
                Подтвердить и оплатить
              </button>
                </div>

           </div>
        </form> 
      </div>
    </div>
  );
}
