import React from "react";
import "./SideNav.scss";

interface IProps {
  isOpen: boolean;
  toggleOpen(): void;
}

export default function SideNav({ isOpen, toggleOpen }: IProps) {
  return (
    <div className={"side-container" + (isOpen ? " side-open" : " side-close")}>
      <button
        onClick={toggleOpen}
        className={"hamburger hamburger--squeeze" + (isOpen && " is-active")}
        type="button"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
      <nav className="side-nav">
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
      <button className="button is-medium is-primary is-rounded side-nav-login-button">
        Sign in
      </button>
    </div>
  );
}
