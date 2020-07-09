import React from "react";
import "./Navbar.scss";

interface IProps {
  isOpen: boolean;
  toggleOpen(): void;
}

export default function Navbar({ isOpen, toggleOpen }: IProps) {
  return (
    <div className="navBar">
      <a href="/" className="logo">
        <span className="logo-chat">CHAT</span>
        <span className="has-text-primary">APP</span>
      </a>
      <nav className="main-nav">
        <a href="#about_us" className="has-text-dark nav-item">
          About us
        </a>
        <a href="#features" className="has-text-dark nav-item">
          Features
        </a>
        <a href="#security" className="has-text-dark nav-item">
          Security
        </a>
        <a href="#support" className="has-text-dark nav-item">
          Support
        </a>
        <a href="#download" className="has-text-dark nav-item">
          Download
        </a>
      </nav>
      <button className="button is-primary is-rounded is-pulled-right navbar-login-button">
        Sign in
      </button>
      <button
        onClick={toggleOpen}
        className={"hamburger hamburger--squeeze" + (isOpen && " is-active")}
        type="button"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
    </div>
  );
}
