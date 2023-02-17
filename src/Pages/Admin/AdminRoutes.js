import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminUsers from "./AdminUsers";

import AdminSidebar from "./AdminSidebar";
import "./AdminRoutes.css";

export default function AdminRoutes() {
  return (
    <div className="d-flex account-container">
      <AdminSidebar />
      <Routes>
        <Route>
          <Route path="users" element={<AdminUsers />}></Route>
          <Route path="leaders" element={<AdminUsers />}></Route>
        </Route>
      </Routes>
    </div>
  );
}
