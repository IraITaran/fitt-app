import React, { useState, useEffect } from 'react';
import './PageHeader.css';
import { Link } from 'react-router-dom';
import GiftIcon from '../../images/gift-icon.svg';
import UserHeaderIcon from '../../images/header-icons/header-account.svg';
import FittLogoHeader from '../../images/fitt-logo-header.svg';
import AuthService from '../../Services/auth.service';
import UserService from '../../Services/user.service';
import DollarIcon from '../../images/dollar-icon.svg';
import LockIcon from '../../images/header-icons/locked-money.svg';
import { useNavigate } from 'react-router-dom';
import ListIcon from '../../images/list-icon.svg';
import TableIcon from '../../images/table-icon.svg';

export default function PageHeader() {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  let [switchToList, setSwitchToList] = useState(false);
  let [currentUserAccount, setCurrentUserAccount] = useState('');
  let [userAccounts, setUserAccounts] = useState([]);
  let [showNav, setShowNav] = useState(false);
  const [isActive, setActive] = useState(false);
  const [activeBurgerMenuState, setActiveBurgerMenuState] = useState('');
  const [activeAccountMenuState, setActiveAccountMenuState] = useState('');

  useEffect(() => {
    loadHeader();

    AuthService.subscribeOnUpdate(userUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadHeader() {
    let user = AuthService.getCurrentUser();

    if (user) {
      if (user.userDetails.userRole === 'Admin') return;

      UserService.details().then((response) => {
        setUser(response.data);
        setUserAccounts(response.data.userExchangeAccounts);
        setCurrentUserAccount(response.data.defaultExchangeAccount);
        AuthService.updateUserInternal(response.data);
      });

      setIsAuthenticated(true);
    }
  }

  useEffect(() => {
    if (!currentUserAccount || currentUserAccount === '') {
      return;
    }
    UserService.changeAccount(currentUserAccount).then((response) => {
      if (response.data.success) {
        loadHeader();
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserAccount]);

  function userUpdate(user) {
    if (user !== null) {
      UserService.details().then((response) => {
        setUser(response.data);
        setUserAccounts(response.data.userExchangeAccounts);
        setCurrentUserAccount(response.data.defaultExchangeAccount);
      });
      setIsAuthenticated(true);
    } else {
      setUser({});
      setIsAuthenticated(false);
      navigate('/login');
    }
  }

  const burgerMenuChangeState = (e) => {
    if(!e.target.classList.contains('is-active')) {
      setActiveBurgerMenuState(' is-active')
      setActiveAccountMenuState('');
    }
    else {
      setActiveBurgerMenuState('');
    }
  };
  const accountMenuChangeState = (e) => {
    if(!e.target.classList.contains('is-active')) {
      setActiveAccountMenuState(' is-active');
      setActiveBurgerMenuState('')
    }
    else {
      setActiveAccountMenuState('')
    }
  };
  const overlayMenuChangeState = (e) => {
    setActiveBurgerMenuState('');
    setActiveAccountMenuState('');
  };

  return (
    <div className='PageHeader'>
      <div className="header-container">
        <div className="container d-flex justify-content-between">


          <div className="header-left d-flex align-items-center">
            <Link to="/" className="logo-link">
              <img src={FittLogoHeader} alt="fitt" className="fitt-logo"></img>
            </Link>
            {switchToList && (
              <div className="list-table-icon" onClick={() => setSwitchToList(false)}>
                <img className="header-list-icon" src={ListIcon} alt="list"></img>
              </div>
            )}
            {!switchToList && (
              <div className="list-table-icon" onClick={() => setSwitchToList(true)}>
                <img src={TableIcon} alt="table"></img>
              </div>
            )}

            <nav className={'nav' + activeBurgerMenuState}>
              <ul className="d-flex p-0 left-nav-list">
                <li>
                  <Link to="/">Список портфелей</Link>
                </li>
                <li>
                  <Link to="/account/wallet">Торговля</Link>
                </li>
                <li>
                  <Link to="about">О нас</Link>
                </li>
                <li>
                  <Link to="tarrifs">Тарифы</Link>
                </li>
                <li>
                  <Link to="questions/faq">Информация</Link>
                </li>
              </ul>
            </nav>
          </div>


          <div className="header-right d-flex justify-content-end align-items-center">
            {!isAuthenticated && (
              <ul className="d-flex header-right-main-list align-items-center">
                <li>
                  <Link to="login" className="signin-btn">
                    <span>Вход</span>
                  </Link>
                </li>
                <li>
                  <Link to="signup" className="signup-btn highlight">
                    <img src={GiftIcon} alt="gift-icon" className="gift-icon"></img>
                    <span>Регистрация</span>
                  </Link>
                </li>
                <li>
                  {' '}
                  <div className="lang-block">
                    {/* <img src={LanguageIcon} alt="language-icon" className="language-icon"></img> */}
                    <span className="selected-lang">RU</span>
                  </div>
                </li>
              </ul>
            )}
            {isAuthenticated && (
              <>
                <div className="d-flex align-items-center header-right-container">
                  {userAccounts.length > 0 && (
                    <div className="drop-container">
                      {' '}
                      <select
                        className="apikey-input"
                        value={currentUserAccount}
                        onChange={(e) => {
                          setCurrentUserAccount(e.target.value);
                        }}
                      >
                        {userAccounts.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                              {'Binance: ' + item.name}
                            </option>
                          );
                        })}
                      </select>
                      <div className="select-value">
                        {userAccounts.map((item) => 'Binance: ' + item.name)}

                      </div>
                    </div>
                  )}
                  <div
                    className="account-dropdown-container"
                  >
                    <div className={"account-btn" + activeAccountMenuState} onClick={accountMenuChangeState}>
                      <img src={UserHeaderIcon} alt="user-icon" className="user-header-icon" />
                      <span>Аккаунт</span>
                    </div>

                    
                      <nav
                        className="nav-dropdown"
                        onClick={overlayMenuChangeState}
                      >
                        <ul className="nav-dropdown-list">
                          <li
                            className={isActive ? 'active' : null}
                            onClick={() => {
                              setShowNav(false);
                              setActive(!isActive);
                            }}
                          >
                            <Link to="/account/wallet" className="trade-icon">Торговля</Link>
                          </li>
                          <li
                            onClick={overlayMenuChangeState}
                          >
                            <Link to="/account/security" className="security-icon">Аккаунт и безопасность</Link>
                          </li>
                          <li
                            onClick={overlayMenuChangeState}
                          >
                            <Link to="/" className="support-icon">Центр поддержки</Link>
                          </li>
                          <li
                            onClick={overlayMenuChangeState}
                          >
                            <Link to="/account/notifications" className="notification-icon">Уведомления</Link>
                          </li>
                          <li
                            onClick={overlayMenuChangeState}
                          >
                            <Link to="/account/referral-program" className="ref-icon">Реферальная программа</Link>
                          </li>
                          <li
                            onClick={overlayMenuChangeState}
                          >
                            <Link to="/account/api-management" className="api-icon">Управление API</Link>
                          </li>
                          <li
                            onClick={overlayMenuChangeState}
                          >
                            <Link to="/account/bot-management" className="bot-icon">Мои боты</Link>
                          </li>
                        </ul>
                      </nav>
                    
                  </div>



                  <div className="header-balance-container">
                    <div className="header-balance-item">
                      <div className="header-balance-title">
                        <img src={DollarIcon} alt="dollar-icon" className="dollar-icon"></img>
                        <span>Баланс:</span>
                      </div>
                      <div className="header-balance-amount">
                        <p>{user?.exchangeBalance?.toFixed(2)} USDT</p>
                      </div>
                    </div>
                    <div className="header-balance-item">
                      <div className="header-balance-title">
                        <img src={LockIcon} alt="lock-icon" className="lock-icon"></img>
                        <span>Используется:</span>
                      </div>
                      <div className="header-balance-amount">
                        <p>{user?.usedBalance?.toFixed(2)} USDT</p>
                      </div>
                    </div>
                  </div>
                  <div className="lang-block">
                    <span className="selected-lang">RU</span>
                  </div>
                </div>
              </>
            )}
            <div className={'burger-block d-lg-none' + activeBurgerMenuState} onClick={burgerMenuChangeState}>
              <div className="burger-btn"></div>
            </div>
          </div>


        </div>
      </div>
      <div className={"header-nav-overlay" + activeBurgerMenuState + activeAccountMenuState} onClick={overlayMenuChangeState}></div>
    </div>
  );
}
