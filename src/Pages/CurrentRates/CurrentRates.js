import React, { useState } from "react";
import "./CurrentRates.css";

export default function CurrentRates(props) {
  const [activeTab, setActiveTab] = useState('open_order');
  const handleTabClick = (activeTab) => setActiveTab(activeTab);

  const tabs = [
    { id: 1, label: 'open_order', content: 'Открытые ордера' },
    { id: 2, label: 'history_order', content: 'История ордеров' },
    { id: 3, label: 'history_transaction', content: 'История сделок' },
    { id: 4, label: 'facilities', content: 'Средства' },
  ];

  return (
     
        <div className="current-rates-container container">
          <div className="current-rates-tabs">
            <div className="current-rates-inner">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => handleTabClick(tab.label)}
                className={tab.label === activeTab ? 'tab-item is-active' : 'tab-item'}
                data-tab={tab.label}
              >
                {tab.content}
              </div>
            ))}
            </div>
          </div>
          <div className="table-wrapper">
            <table className="current-rates-table w-100">
                <thead>
                  <tr>
                      <th>Дата</th>
                      <th>Пара</th>
                      <th>Тип</th>
                      <th>Сторона</th>
                      <th>Цена</th>
                      <th>Количество</th>
                      <th>Заполнено</th>
                      <th>Всего</th>
                  </tr>
                </thead>
                {activeTab === 'open_order' && (
                  <tbody>
                    <tr>
                        <td>01-07 19:00:53</td>
                        <td>BTC/USDT</td>
                        <td className="table-weight-bold">Лимит</td>
                        <td className="table-color-red">Short</td>
                        <td className="table-color-gray">1.7000</td>
                        <td className="table-color-gray">5</td>
                        <td className="table-color-gray">0.00%</td>
                        <td className="table-color-green">+23415 USDT</td>
                    </tr>
                    <tr>
                        <td>01-07 19:00:53</td>
                        <td>BTC/USDT</td>
                        <td className="table-weight-bold">Лимит</td>
                        <td className="table-color-red">Short</td>
                        <td className="table-color-gray">1.7000</td>
                        <td className="table-color-gray">5</td>
                        <td className="table-color-gray">0.00%</td>
                        <td className="table-color-green">+23415 USDT</td>
                    </tr>
                    <tr>
                        <td>01-07 19:00:53</td>
                        <td>BTC/USDT</td>
                        <td className="table-weight-bold">Лимит</td>
                        <td className="table-color-red">Short</td>
                        <td className="table-color-gray">1.7000</td>
                        <td className="table-color-gray">5</td>
                        <td className="table-color-gray">0.00%</td>
                        <td className="table-color-green">+23415 USDT</td>
                    </tr>
                    <tr>
                        <td>01-07 19:00:53</td>
                        <td>BTC/USDT</td>
                        <td className="table-weight-bold">Лимит</td>
                        <td className="table-color-red">Short</td>
                        <td className="table-color-gray">1.7000</td>
                        <td className="table-color-gray">5</td>
                        <td className="table-color-gray">0.00%</td>
                        <td className="table-color-green">+23415 USDT</td>
                    </tr>
                  </tbody>
                )}

                {activeTab === 'history_order' && (
                  <tbody>
                    <tr>
                        <td>01-07 19:00:53</td>
                        <td>BTC/USDT</td>
                        <td className="table-weight-bold">Лимит</td>
                        <td className="table-color-red">Short</td>
                        <td className="table-color-gray">1.7000</td>
                        <td className="table-color-gray">5</td>
                        <td className="table-color-gray">0.00%</td>
                        <td className="table-color-green">+23415 USDT</td>
                    </tr>
                    <tr>
                        <td>01-07 19:00:53</td>
                        <td>BTC/USDT</td>
                        <td className="table-weight-bold">Лимит</td>
                        <td className="table-color-red">Short</td>
                        <td className="table-color-gray">1.7000</td>
                        <td className="table-color-gray">5</td>
                        <td className="table-color-gray">0.00%</td>
                        <td className="table-color-green">+23415 USDT</td>
                    </tr>
                    <tr>
                        <td>01-07 19:00:53</td>
                        <td>BTC/USDT</td>
                        <td className="table-weight-bold">Лимит</td>
                        <td className="table-color-red">Short</td>
                        <td className="table-color-gray">1.7000</td>
                        <td className="table-color-gray">5</td>
                        <td className="table-color-gray">0.00%</td>
                        <td className="table-color-green">+33415 USDT</td>
                    </tr>
                  </tbody>
                )}

                {activeTab === 'history_transaction' && (
                  <tbody>
                    <tr>
                        <td>01-07 19:00:53</td>
                        <td>BTC/USDT</td>
                        <td className="table-weight-bold">Лимит</td>
                        <td className="table-color-red">Short</td>
                        <td className="table-color-gray">1.7000</td>
                        <td className="table-color-gray">5</td>
                        <td className="table-color-gray">0.00%</td>
                        <td className="table-color-green">+23415 USDT</td>
                    </tr>
                    <tr>
                        <td>01-07 19:00:53</td>
                        <td>BTC/USDT</td>
                        <td className="table-weight-bold">Лимит</td>
                        <td className="table-color-red">Short</td>
                        <td className="table-color-gray">1.7000</td>
                        <td className="table-color-gray">5</td>
                        <td className="table-color-gray">0.00%</td>
                        <td className="table-color-green">+23415 USDT</td>
                    </tr>
                    <tr>
                        <td>01-07 19:00:53</td>
                        <td>BTC/USDT</td>
                        <td className="table-weight-bold">Лимит</td>
                        <td className="table-color-red">Short</td>
                        <td className="table-color-gray">1.7000</td>
                        <td className="table-color-gray">5</td>
                        <td className="table-color-gray">0.00%</td>
                        <td className="table-color-green">+23415 USDT</td>
                    </tr>
                    <tr>
                        <td>01-07 19:00:53</td>
                        <td>BTC/USDT</td>
                        <td className="table-weight-bold">Лимит</td>
                        <td className="table-color-red">Short</td>
                        <td className="table-color-gray">1.7000</td>
                        <td className="table-color-gray">5</td>
                        <td className="table-color-gray">0.00%</td>
                        <td className="table-color-green">+43415 USDT</td>
                    </tr>
                  </tbody>
                )}

                {activeTab === 'facilities' && (
                  <tbody>
                    <tr>
                        <td>01-07 19:00:53</td>
                        <td>BTC/USDT</td>
                        <td className="table-weight-bold">Лимит</td>
                        <td className="table-color-red">Short</td>
                        <td className="table-color-gray">1.7000</td>
                        <td className="table-color-gray">5</td>
                        <td className="table-color-gray">0.00%</td>
                        <td className="table-color-green">+53415 USDT</td>
                    </tr>
                    <tr>
                        <td>01-07 19:00:53</td>
                        <td>BTC/USDT</td>
                        <td className="table-weight-bold">Лимит</td>
                        <td className="table-color-red">Short</td>
                        <td className="table-color-gray">1.7000</td>
                        <td className="table-color-gray">5</td>
                        <td className="table-color-gray">0.00%</td>
                        <td className="table-color-green">+23415 USDT</td>
                    </tr>
                  </tbody>
                )}
            </table>
          </div>
        </div>
      
  );
}
