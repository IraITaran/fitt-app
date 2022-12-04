import React, { useState, useEffect } from "react";
import "./PageHeader.css";
import { Link } from "react-router-dom";
import GiftIcon from "../../images/gift-icon.svg";
import LanguageIcon from "../../images/language-icon.svg";
import FittLogoHeader from "../../images/fitt-logo-header.svg";
import AuthService from "../../Services/auth.service";

export default function PageHeader() {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let user = AuthService.getCurrentUser();
    if (user) {
      setUser(user.userDetails);
      setIsAuthenticated(true);
    }

    AuthService.subscribeOnUpdate(userUpdate);
  }, []);

  function userUpdate(user) {
    if (user !== null) {
      setUser(user.userDetails);
      setIsAuthenticated(true);
    } else {
      setUser({});
      setIsAuthenticated(false);
    }
  }

  function logout() {
    AuthService.logout();
  }

  return (
    <div className="PageHeader">
      <div className="header-container d-flex">
        <div className="header-left d-flex">
          <img src={FittLogoHeader} alt="fitt" className="fitt-logo"></img>
          <nav>
            <ul className="d-flex">
              <li>
                <Link to="/">Список портфелей</Link>
              </li>
              <li>
                <a href="/">Торговля</a>
              </li>
              <li>
                <Link to="about">Информация</Link>
              </li>
              <li>
                <Link to="tarrifs">Бонус</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header-right d-flex">
          {!isAuthenticated && (
            <ul className="d-flex">
              <li>
                <Link to="authorization">Вход</Link>
              </li>
              <li className="d-flex align-items-baseline highlight">
                <img src={GiftIcon} alt="gift-icon" className="gift-icon"></img>
                <Link to="registration">Регистрация</Link>
              </li>
              <li className="d-flex ">
                {" "}
                <img
                  src={LanguageIcon}
                  alt="language-icon"
                  className="language-icon"
                ></img>
                Русский
              </li>
            </ul>
          )}
          {isAuthenticated && (
            <>
              <div>{user.email}</div>
              <button onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
