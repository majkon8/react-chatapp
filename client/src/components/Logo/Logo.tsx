import React, { useEffect, useState } from "react";
import "./Logo.scss";
import { NavLink } from "react-router-dom";

export default function Logo({ location }: any) {
  const [displayLogo, setDisplayLogo] = useState(false);

  useEffect(() => {
    if (location.pathname === "/main") setDisplayLogo(false);
    else setDisplayLogo(true);
  }, [location]);

  return (
    <>
      {displayLogo && (
        <div className="logo-container">
          <NavLink to="/" className="main-logo">
            <span className="logo-chat">CHAT</span>
            <span className="has-text-primary">APP</span>
          </NavLink>
        </div>
      )}
    </>
  );
}
