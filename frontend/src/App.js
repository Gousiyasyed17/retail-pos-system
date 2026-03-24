import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem("loggedInUser", username);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedIn(false);
  };

  return (
    <div className="App">
      {loggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
