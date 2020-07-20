import React, { useEffect, useState } from "react";
import "./Logo.scss";
import { NavLink } from "react-router-dom";

export default function Logo({ location }: any) {
  const [displayLogo, setDisplayLogo] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") setDisplayLogo(false);
    else setDisplayLogo(true);
  }, [location]);

  return (
    <>
      {displayLogo && (
        <div className="logo-container">
          <NavLink to="/home" className="main-logo">
            <span className="logo-chat">CHAT</span>
            <span className="has-text-primary">APP</span>
          </NavLink>
        </div>
      )}
    </>
  );
}
