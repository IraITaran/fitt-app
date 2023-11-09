import React from "react";
import "./About.css";
//import AboutHeaderLogo from "../../images/about-header-logo.svg";
import ProsIcon1 from "../../images/benefits-1.png";
import ProsIcon2 from "../../images/benefits-2.png";
import ProsIcon3 from "../../images/benefits-3.png";
import LtcIcon from "../../images/ltc.svg";
import ListFlowIcon from "../../images/list-flow-icon.svg";
import FrequentQuestions from "../TarrifPlans/FrequentQuestions";

export default function About() {
  return (
    <div className="About">
      <div className="about-main-block">
        <div className="container">
          <div className="about-info">
            <p>
              Fitt — больше, чем
              <br /> просто платформа
            </p>
            <span>
              Это социальная платформа для передачи здорового торгового опыта от
              опытных трейдеров к начинающим
            </span>
          </div>
        </div>
      </div>
      <div className="about-main-container">
        <div className="container">
          <h2>Наши ключевые преимущества</h2>
          <div className="d-grid advantages-main-grid">
            <div className="advantages-section">
              <img src={ProsIcon1} alt="advantage-icon"></img>
              <p>Доказанная эффективность</p>
              <p>
                Мы сотрудничаем с топовыми криптовалютными биржами для
                предоставления наилучшего опыта в социальной торговле
              </p>
            </div>
            <div className="advantages-section">
              <img src={ProsIcon2} alt="advantage-icon"></img>
              <p>Высокая надежность</p>
              <p>
                Мы применяем строгие меры безопасности, чтобы обеспечить
                непрерывную защиту ваших средств и конфиденциальных данных
              </p>
            </div>
            <div className="advantages-section">
              <img src={ProsIcon3} alt="advantage-icon"></img>
              <p>Тщательный анализ портфеля</p>
              <p>
                Изучайте торговую историю лидеров рынка и присоединяйтесь к
                самым успешным сделкам на основе их стратегий ‌
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="d-grid flow-trading-grid">
            <div className="flow-left-section">
              <h2>Становитесь фолловер-трейдером</h2>
              <ul>
                <li>
                  <img src={ListFlowIcon} alt="list-icon"></img>
                  Получайте пассивный доход, следуя проверенным стратегиям
                  топ-трейдеров
                </li>
                <li>
                  <img src={ListFlowIcon} alt="list-icon"></img>
                  Автоматически присоединяйтесь к разнообразным стратегиям с
                  минимальным вложением всего от $100
                </li>
                <li>
                  <img src={ListFlowIcon} alt="list-icon"></img>
                  Сохраняйте контроль над активам. Разместите стоп-лосс и
                  остановите копирование в любое время
                </li>
                <li>
                  <img src={ListFlowIcon} alt="list-icon"></img>
                  Оставайтесь спокойными: ваши активы на Binance находятся под
                  надежной защитой
                </li>
              </ul>
              <button className="yellow-btn">Перейти к списку портфелей</button>
            </div>
            <div className="flow-right-section">
              <div className="bg-flow-fitt"></div>
              <div className="bg-flow-rhombus"></div>
              <ul>
                <li className="grey-item">
                  <span>01.</span>Выберите понравившиеся портфели для слежения
                </li>
                <li className="black-item">
                  <span>02.</span>Выберите сумму депозита и установите стоп-лосс
                </li>
                <li className="grey-item">
                  <span>03.</span>Наблюдайте как лучшие трейдеры ведут вас по
                  сделкам
                </li>
              </ul>
            </div>
          </div>
        </div>
        <FrequentQuestions />
      </div>
      <div className="about-footer text-center">
        <p>Присоединяйтесь и станьте частью нашего сообщества</p>
        <p>Достигайте поставленных результатов профита на рынке криптовалют!</p>
        <ul>
          <li>
            <a href="/">
              <svg
                width="65"
                height="65"
                viewBox="0 0 65 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="&#240;&#159;&#166;&#134; icon &#34;Tether Cryptocurrency&#34;">
                  <g id="Group">
                    <path
                      id="Vector"
                      d="M32.5 65C50.4493 65 65 50.4493 65 32.5C65 14.5507 50.4493 0 32.5 0C14.5507 0 0 14.5507 0 32.5C0 50.4493 14.5507 65 32.5 65Z"
                      fill="#26A17B"
                    />
                    <path
                      id="Vector_2"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M36.4038 35.3136V35.3095C36.1804 35.3258 35.0287 35.3948 32.4591 35.3948C30.4076 35.3948 28.9633 35.3339 28.4555 35.3095V35.3156C20.558 34.9683 14.6633 33.5931 14.6633 31.9478C14.6633 30.3045 20.558 28.9294 28.4555 28.5759V33.9466C28.9715 33.9831 30.4502 34.0705 32.4937 34.0705C34.9454 34.0705 36.1743 33.9689 36.4038 33.9486V28.58C44.2851 28.9314 50.1655 30.3066 50.1655 31.9478C50.1655 33.5931 44.2851 34.9642 36.4038 35.3136ZM36.4038 28.0214V23.2155H47.401V15.8867H17.4583V23.2155H28.4555V28.0194C19.518 28.4297 12.7966 30.2009 12.7966 32.3216C12.7966 34.4422 19.518 36.2114 28.4555 36.6237V52.0247H36.4038V36.6197C45.3271 36.2094 52.0322 34.4402 52.0322 32.3216C52.0322 30.203 45.3271 28.4338 36.4038 28.0214Z"
                      fill="white"
                    />
                  </g>
                </g>
              </svg>
            </a>
          </li>
          <li>
            <a href="/">
              <svg
                width="65"
                height="65"
                viewBox="0 0 65 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="&#240;&#159;&#166;&#134; icon &#34;Binance Coin Cryptocurrency&#34;">
                  <g id="Group">
                    <path
                      id="Vector"
                      d="M32.5 65C50.4493 65 65 50.4493 65 32.5C65 14.5507 50.4493 0 32.5 0C14.5507 0 0 14.5507 0 32.5C0 50.4493 14.5507 65 32.5 65Z"
                      fill="#F3BA2F"
                    />
                    <path
                      id="Vector_2"
                      d="M24.6106 29.2581L32.5 21.3687L40.3934 29.2622L44.9841 24.6716L32.5 12.1875L20.02 24.6675L24.6106 29.2581ZM12.1875 32.5L16.7781 27.9094L21.3687 32.5L16.7781 37.0906L12.1875 32.5ZM24.6106 35.7419L32.5 43.6312L40.3934 35.7378L44.9841 40.3264L32.5 52.8125L20.02 40.3325L20.0139 40.3264L24.6106 35.7419ZM43.6312 32.5L48.2219 27.9094L52.8125 32.5L48.2219 37.0906L43.6312 32.5ZM37.1556 32.4959H37.1597V32.5L32.5 37.1597L27.8464 32.5081L27.8383 32.5L27.8464 32.4939L28.6609 31.6773L29.057 31.2812L32.5 27.8403L37.1577 32.498L37.1556 32.4959Z"
                      fill="white"
                    />
                  </g>
                </g>
              </svg>
            </a>
          </li>
          <li>
            <a href="/">
              <svg
                width="65"
                height="65"
                viewBox="0 0 65 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="&#240;&#159;&#166;&#134; icon &#34;Ethereum Cryptocurrency&#34;">
                  <g id="Group">
                    <path
                      id="Vector"
                      d="M32.5 65C50.4493 65 65 50.4493 65 32.5C65 14.5507 50.4493 0 32.5 0C14.5507 0 0 14.5507 0 32.5C0 50.4493 14.5507 65 32.5 65Z"
                      fill="#627EEA"
                    />
                    <g id="Group_2">
                      <path
                        id="Vector_2"
                        d="M33.5107 8.125V26.1422L48.739 32.9469L33.5107 8.125Z"
                        fill="white"
                        fillOpacity="0.602"
                      />
                      <path
                        id="Vector_3"
                        d="M33.5116 8.125L18.2812 32.9469L33.5116 26.1422V8.125Z"
                        fill="white"
                      />
                      <path
                        id="Vector_4"
                        d="M33.5107 44.6252V56.8675L48.7492 35.7852L33.5107 44.6252Z"
                        fill="white"
                        fillOpacity="0.602"
                      />
                      <path
                        id="Vector_5"
                        d="M33.5116 56.8675V44.6231L18.2812 35.7852L33.5116 56.8675Z"
                        fill="white"
                      />
                      <path
                        id="Vector_6"
                        d="M33.5107 41.7872L48.739 32.9452L33.5107 26.1445V41.7872Z"
                        fill="white"
                        fillOpacity="0.2"
                      />
                      <path
                        id="Vector_7"
                        d="M18.2812 32.9452L33.5116 41.7872V26.1445L18.2812 32.9452Z"
                        fill="white"
                        fillOpacity="0.602"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </a>
          </li>
          <li>
            <a href="/">
              <svg
                width="65"
                height="65"
                viewBox="0 0 65 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32.5 65C50.4493 65 65 50.4493 65 32.5C65 14.5507 50.4493 0 32.5 0C14.5507 0 0 14.5507 0 32.5C0 50.4493 14.5507 65 32.5 65Z"
                  fill="#F7931A"
                />
                <path
                  d="M47.1028 28.4781C47.7407 24.2206 44.4967 21.9314 40.0646 20.4039L41.5027 14.6352L37.9927 13.7617L36.5911 19.3781C35.6689 19.1466 34.7224 18.9312 33.7778 18.7159L35.1896 13.063L31.6796 12.1875L30.2414 17.9542C29.4777 17.7795 28.7261 17.6089 27.9989 17.4261L28.003 17.4078L23.1605 16.1992L22.2261 19.9489C22.2261 19.9489 24.8322 20.5461 24.7774 20.5827C26.1992 20.9381 26.4552 21.8786 26.4125 22.6261L24.7753 29.1972C24.8728 29.2216 24.9988 29.2581 25.141 29.313L24.7692 29.2216L22.4739 38.4272C22.2992 38.8578 21.8585 39.5058 20.8632 39.26C20.8997 39.3108 18.3119 38.6242 18.3119 38.6242L16.5691 42.642L21.1394 43.7816C21.9885 43.9948 22.8213 44.2183 23.6399 44.4275L22.1875 50.2612L25.6955 51.1347L27.1336 45.3659C28.0924 45.6239 29.0227 45.8636 29.9327 46.0911L28.4986 51.8355L32.0086 52.7089L33.461 46.8873C39.4491 48.0208 43.9503 47.5638 45.8455 42.1484C47.373 37.7894 45.7703 35.2727 42.6199 33.6334C44.9152 33.1053 46.6417 31.5961 47.1028 28.4781ZM39.0794 39.7272C37.9967 44.0883 30.6538 41.73 28.2732 41.1389L30.2028 33.41C32.5835 34.0052 40.2149 35.1813 39.0794 39.7272ZM40.1661 28.4152C39.1769 32.3822 33.0669 30.3652 31.0864 29.8716L32.8333 22.8637C34.8138 23.3573 41.198 24.2775 40.1661 28.4152Z"
                  fill="white"
                />
              </svg>
            </a>
          </li>
          <li>
            <a href="/">
              <img src={LtcIcon} width="25" height="25" alt="ltc logo"></img>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
