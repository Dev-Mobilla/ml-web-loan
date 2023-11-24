import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {isCookiePresent} from "../../utils/CookieChecker";
import "../../styles/topbar.css";

const TopbarComponent = () => {
  const [areCookiesPresent, setAreCookiesPresent] = useState(false);
  const sessionCookieName = process.env.REACT_APP_SESSION_COOKIE_NAME;
  const accountCookieName = process.env.REACT_APP_ACCOUNT_COOKIE_NAME;

  const navigate = useNavigate();

  useEffect(() => {
    const checkCookies = () => {
      const isMLWWSPresent = isCookiePresent(sessionCookieName);
      const isAccountDetailsPresent = isCookiePresent(accountCookieName);
      setAreCookiesPresent(isMLWWSPresent || isAccountDetailsPresent);
    };

    checkCookies();
  }, []);

  const handleLogout = () => {
    const deleteCookies = () => {
      document.cookie = `${sessionCookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.mlhuillier.com`;
      document.cookie = `${accountCookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.mlhuillier.com`;
    };

    deleteCookies();
    window.location.href = "/dashboard";
  };

  return (
    <div className="topbar-group">
        <div className="top-bar" onClick={() => navigate("/dashboard")}>
        </div>
        {areCookiesPresent && (
          <button id="logout-button" onClick={handleLogout}>
            Log out
          </button>
        )}
    </div>
  
  );
};

export default TopbarComponent;
