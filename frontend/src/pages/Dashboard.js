import React from "react";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>Dashboard</h1>
      <h2>Welcome, {user ? user.email : "User"}!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
