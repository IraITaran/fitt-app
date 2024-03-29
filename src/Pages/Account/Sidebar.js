import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import SideBarHideIcon from "../../images/sidebar-hide-icon.svg";
import ApiIcon from "../../images/api-icon.svg";
import BellIcon from "../../images/bell-icon.svg";
import PurseIcon from "../../images/purse-icon.svg";
import QuestionIcon from "../../images/question-icon.svg";
import SidebarLockIcon from "../../images/sidebar-lock-icon.svg";
import SidebarGiftIcon from "../../images/sidebar-gift-icon.svg";
import BotIcon from "../../images/bot-icon.svg";
import Logout from "../../images/logout-icon.svg";
import AuthService from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  let [user, setUser] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    let user = AuthService.getCurrentUser();
    if (user) {
      setUser(user.userDetails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logout() {
    AuthService.logout();
    navigate("/");
  }

  return (
    <div className="Sidebar">
      <div className="sidebar-header d-flex">
        <div className="sidebar-user-info">
          <p>{user.email}</p>
          <p>UID: {user.id}</p>
        </div>
        <div className="sidebar-icon d-flex justify-content-center align-items-center">
          <img
            src={SideBarHideIcon}
            className="sidebar-hide-icon"
            alt="sidebar-hide-icon"
          ></img>
        </div>
      </div>
      <nav>
        <ul className="sidebar-list">
          <li className="sidebar-option">
            <img src={PurseIcon} alt="purse-icon"></img>
            <Link to="/account/wallet">Торговля</Link>
          </li>
          <li className="sidebar-option">
            <img src={SidebarLockIcon} alt="lock-icon"></img>
            <Link to="/account/security">Аккаунт и безопасность</Link>
          </li>
          <li className="sidebar-option">
            <img src={QuestionIcon} alt="question-icon"></img>
            <Link to="/">Центр поддержки</Link>
          </li>
          <li className="sidebar-option">
            <img src={BellIcon} alt="bell-icon"></img>
            <Link to="/account/notifications">Уведомления</Link>
          </li>
          <li className="sidebar-option">
            <img src={SidebarGiftIcon} alt="gift-icon"></img>
            <Link to="/account/referral-program">Реферальная программа</Link>
          </li>
          <li className="sidebar-option">
            <img src={ApiIcon} alt="api-icon"></img>
            <Link to="/account/api-management">Управление API</Link>
          </li>
          <li className="sidebar-option">
            <img src={BotIcon} alt="bot-icon"></img>
            <Link to="/account/bot-management">Мои боты</Link>
          </li>
        </ul>
      </nav>
      <div className="logout-section" onClick={logout}>
        <img src={Logout} alt="logout-icon"></img>Выйти
      </div>
    </div>
  );
}
