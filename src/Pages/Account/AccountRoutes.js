import React from "react";
import { Routes, Route } from "react-router-dom";
import AccountWallet from "./AccountWallet";
import AccountSecurity from "./AccountSecurity";
import HelpCenter from "./HelpCenter";
import Notifications from "./Notifications";
import ReferralProgram from "./ReferralProgram";
import ApiManagement from "./ApiManagement";
import BotManagement from "./BotManagement";
import Sidebar from "./Sidebar";
import "./AccountRoutes.css";

export default function AccountRoutes() {
  return (
    <div className="d-flex account-container">
      <Sidebar />
      <Routes>
        <Route>
          <Route path="wallet" element={<AccountWallet />}></Route>
          <Route path="security" element={<AccountSecurity />}></Route>
          <Route path="help-center" element={<HelpCenter />}></Route>
          <Route path="notifications" element={<Notifications />}></Route>
          <Route path="referral-program" element={<ReferralProgram />}></Route>
          <Route path="api-management" element={<ApiManagement />}></Route>
          <Route path="bot-management" element={<BotManagement />}></Route>
        </Route>
      </Routes>
    </div>
  );
}
