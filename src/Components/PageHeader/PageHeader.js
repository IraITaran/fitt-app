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

export default function PageHeader() {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let user = AuthService.getCurrentUser();

    if (user) {
      if (user.userDetails.userRole === "Admin") return;

      UserService.details().then((response) => {
        setUser(response.data);
        AuthService.updateUserInternal(response.data);
      });

      setIsAuthenticated(true);
    }

    AuthService.subscribeOnUpdate(userUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function userUpdate(user) {
    if (user !== null) {
      UserService.details().then((response) => {
        setUser(response.data);
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
          <nav>
            <ul className="d-flex">
              <li>
                <Link to="/">Список портфелей</Link>
              </li>
              <li>
                <a href="/">Торговля</a>
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
            <ul className="d-flex">
              <li>
                <Link to="login">Вход</Link>
              </li>
              <li className="d-flex align-items-baseline highlight">
                <img src={GiftIcon} alt="gift-icon" className="gift-icon"></img>
                <Link to="signup">Регистрация</Link>
              </li>
              <li className="d-flex ">
                {" "}
                <img
                  src={LanguageIcon}
                  alt="language-icon"
                  className="language-icon"
                ></img>
                <span className="selected-lang">Русский</span>
              </li>
            </ul>
          )}
          {isAuthenticated && (
            <>
              <div className="d-flex align-items-center">
                <div>
                  <Link to="/account/wallet">
                    <img
                      src={UserHeaderIcon}
                      alt="user-icon"
                      className="user-header-icon"
                    />
                  </Link>
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
