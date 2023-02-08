import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import SideBarHideIcon from "../../images/sidebar-hide-icon.svg";
import ApiIcon from "../../images/api-icon.svg";
import BellIcon from "../../images/bell-icon.svg";
import PurseIcon from "../../images/purse-icon.svg";
import QuestionIcon from "../../images/question-icon.svg";
import SidebarLockIcon from "../../images/sidebar-lock-icon.svg";
import SidebarGiftIcon from "../../images/sidebar-gift-icon.svg";
import Logout from "../../images/logout-icon.svg";
import AuthService from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  let navigate = useNavigate();

  function logout() {
    AuthService.logout();
    navigate("/");
  }

  return (
    <div className="Sidebar">
      <div className="sidebar-header d-flex">
        <div className="sidebar-user-info">
          <p>vl***gmail.com</p>
          <p>UID:zoh3g19</p>
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
            <Link to="/account/wallet">Кошелёк</Link>
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
            <Link to="/">Реферальная программа</Link>
          </li>
          <li className="sidebar-option">
            <img src={ApiIcon} alt="api-icon"></img>
            <Link to="/account/api-management">Управление API</Link>
          </li>
          <li className="sidebar-option">
            <img src={ApiIcon} alt="bot-icon"></img>
            <Link to="/account/bot-management">Управление ботом</Link>
          </li>
        </ul>
      </nav>
      <div className="logout-section">
        <img src={Logout} alt="logout-icon" onClick={logout}></img>Выйти
      </div>
    </div>
  );
}
