import React from "react";
import "./AdminSidebar.css";
import { Link } from "react-router-dom";
import PurseIcon from "../../images/purse-icon.svg";
import SidebarLockIcon from "../../images/sidebar-lock-icon.svg";
import Logout from "../../images/logout-icon.svg";
import AuthService from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  let navigate = useNavigate();

  function logout() {
    AuthService.logout();
    navigate("/");
  }

  return (
    <div className="Sidebar">
      <nav>
        <ul className="sidebar-list">
          <li className="sidebar-option">
            <img src={PurseIcon} alt="purse-icon"></img>
            <Link to="/admin/users">Users</Link>
          </li>
          <li className="sidebar-option">
            <img src={SidebarLockIcon} alt="lock-icon"></img>
            <Link to="/admin/bots">Bots</Link>
          </li>
          <li className="sidebar-option">
            <img src={SidebarLockIcon} alt="lock-icon"></img>
            <Link to="/admin/leaders">Leaders</Link>
          </li>
          {/* <li className="sidebar-option">
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
            <img src={ApiIcon} alt="bot-icon"></img>
            <Link to="/account/bot-management">Управление ботом</Link>
          </li> */}
        </ul>
      </nav>
      <div className="logout-section" onClick={logout}>
        <img src={Logout} alt="logout-icon"></img>Выйти
      </div>
    </div>
  );
}
