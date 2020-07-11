import React from "react";
import "./Logo.scss";
import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <div className="logo-container">
      <NavLink to="/" className="main-logo">
        <span className="logo-chat">CHAT</span>
        <span className="has-text-primary">APP</span>
      </NavLink>
    </div>
  );
}
