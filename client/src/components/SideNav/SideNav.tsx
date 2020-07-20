import React, { useState, useEffect } from "react";
import "./SideNav.scss";
import { NavLink } from "react-router-dom";

interface IProps {
  isOpen: boolean;
  toggleOpen(): void;
}

export default function SideNav({ isOpen, toggleOpen }: IProps) {
  const [canOpen, setCanOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCanOpen(true);
    }, 800);
  }, []);
  return (
    <div
      className={
        "side-container" +
        (isOpen ? " side-open" : " side-close") +
        (canOpen ? " is-visible" : "")
      }
    >
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
        <a href="home/#about_us" className="has-text-dark nav-item">
          About us
        </a>
        <a href="home/#features" className="has-text-dark nav-item">
          Features
        </a>
        <a href="home/#security" className="has-text-dark nav-item">
          Security
        </a>
        <a href="home/#support" className="has-text-dark nav-item">
          Support
        </a>
        <a href="home/#download" className="has-text-dark nav-item">
          Download
        </a>
      </nav>
      <NavLink to="/login">
        <button className="button is-medium is-primary is-rounded side-nav-login-button">
          Sign in
        </button>
      </NavLink>
    </div>
  );
}
