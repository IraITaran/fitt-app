import React, { useState, useEffect } from "react";
import "./PageHeader.css";
import { Link } from "react-router-dom";
import GiftIcon from "../../images/gift-icon.svg";
import UserHeaderIcon from "../../images/user-header-icon.svg";
import LanguageIcon from "../../images/language-icon.svg";
import FittLogoHeader from "../../images/fitt-logo-header.svg";
import AuthService from "../../Services/auth.service";
import UserService from "../../Services/user.service";
import DollarIcon from "../../images/dollar-icon.svg";
import LockIcon from "../../images/lock-icon.svg";
import { useNavigate } from "react-router-dom";
import ListIcon from "../../images/list-icon.svg";
import TableIcon from "../../images/table-icon.svg";

export default function PageHeader() {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  let [switchToList, setSwitchToList] = useState(false);
  let [currentUserAccount, setCurrentUserAccount] = useState("");
  let [userAccounts, setUserAccounts] = useState([]);
  let [showNav, setShowNav] = useState(false);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    loadHeader();

    AuthService.subscribeOnUpdate(userUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadHeader() {
    let user = AuthService.getCurrentUser();

    if (user) {
      if (user.userDetails.userRole === "Admin") return;

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
    if (!currentUserAccount || currentUserAccount === "") {
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
      navigate("/login");
    }
  }

  return (
    <div className="PageHeader">
      <div className="header-container d-flex">
        <div className="header-left d-flex">
          <Link to="/">
            <img src={FittLogoHeader} alt="fitt" className="fitt-logo"></img>
          </Link>
          {switchToList && (
            <div
              className="list-table-icon"
              onClick={() => setSwitchToList(false)}
            >
              <img className="header-list-icon" src={ListIcon} alt="list"></img>
            </div>
          )}
          {!switchToList && (
            <div
              className="list-table-icon"
              onClick={() => setSwitchToList(true)}
            >
              <img src={TableIcon} alt="table"></img>
            </div>
          )}

          <nav>
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
            </ul>
          </nav>
        </div>
        <div className="header-right d-flex">
          {!isAuthenticated && (
            <ul className="d-flex header-right-main-list">
              <li className="d-flex ">
                {" "}
                <img
                  src={LanguageIcon}
                  alt="language-icon"
                  className="language-icon"
                ></img>
                <span className="selected-lang">Русский</span>
              </li>
              <li>
                <Link to="login">Вход</Link>
              </li>
              <li className="d-flex align-items-baseline highlight">
                <img src={GiftIcon} alt="gift-icon" className="gift-icon"></img>
                <Link to="signup">Регистрация</Link>
              </li>
            </ul>
          )}
          {isAuthenticated && (
            <>
              <div className="d-flex align-items-center header-right-container">
                {userAccounts.length > 0 && (
                  <div className="drop-container">
                    {" "}
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
                            {"Binance: " + item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
                <div className="account-dropdown-container">
                  <Link to="/account/wallet">
                    <img
                      src={UserHeaderIcon}
                      alt="user-icon"
                      className="user-header-icon"
                      onClick={(e) => {
                        setShowNav(true);
                        e.preventDefault();
                      }}
                    />
                  </Link>

                  {showNav && (
                    <nav className="nav-dropdown">
                      <ul className="nav-dropdown-list">
                        <li
                          className={isActive ? "active" : null}
                          onClick={() => {
                            setShowNav(false);
                            setActive(!isActive);
                          }}
                        >
                          <Link to="/account/wallet">Торговля</Link>
                        </li>
                        <li
                          onClick={() => {
                            setShowNav(false);
                          }}
                        >
                          <Link to="/account/security">
                            Аккаунт и безопасность
                          </Link>
                        </li>
                        <li
                          onClick={() => {
                            setShowNav(false);
                          }}
                        >
                          <Link to="/">Центр поддержки</Link>
                        </li>
                        <li
                          onClick={() => {
                            setShowNav(false);
                          }}
                        >
                          <Link to="/account/notifications">Уведомления</Link>
                        </li>
                        <li
                          onClick={() => {
                            setShowNav(false);
                          }}
                        >
                          <Link to="/account/referral-program">
                            Реферальная программа
                          </Link>
                        </li>
                        <li
                          onClick={() => {
                            setShowNav(false);
                          }}
                        >
                          <Link to="/account/api-management">
                            Управление API
                          </Link>
                        </li>
                        <li
                          onClick={() => {
                            setShowNav(false);
                          }}
                        >
                          <Link to="/account/bot-management">Мои боты</Link>
                        </li>
                      </ul>
                    </nav>
                  )}
                </div>
                <div>
                  <img
                    src={LanguageIcon}
                    alt="language-icon"
                    className="language-icon"
                  ></img>
                  <span className="selected-lang">Русский</span>
                </div>
                <div className="d-flex header-balance-container">
                  <div className="header-balance-subtitle">
                    <p>
                      <img
                        src={DollarIcon}
                        alt="dollar-icon"
                        className="dollar-icon"
                      ></img>
                      Баланс:
                    </p>
                    <p>
                      <img
                        src={LockIcon}
                        alt="lock-icon"
                        className="lock-icon"
                      ></img>
                      Используется:
                    </p>
                  </div>
                  <div className="header-balance-amount">
                    <p>{user?.exchangeBalance?.toFixed(2)} USDT</p>
                    <p>{user?.usedBalance?.toFixed(2)} USDT</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
