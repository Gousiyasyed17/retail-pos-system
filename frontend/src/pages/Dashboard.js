import React, { useState } from "react";
import ProductManagement from "./ProductManagement";

function Dashboard({ onLogout }) {
  const [activePage, setActivePage] = useState("dashboard");

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Retail POS</h2>

        <button onClick={() => setActivePage("dashboard")}>Dashboard</button>
        <button onClick={() => setActivePage("products")}>Product Management</button>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>

      <div className="main-content">
        {activePage === "dashboard" && (
          <div>
            <h1>Welcome to Dashboard</h1>
            <p>Hello, {user?.email}</p>
            <p>This is your Retail POS & Inventory System dashboard.</p>
            <p>You have completed Product Management module here.</p>
          </div>
        )}

        {activePage === "products" && <ProductManagement />}
      </div>
    </div>
  );
}

export default Dashboard;
