import React, { useRef, useEffect } from "react";
import "./Navbar.scss";
import { gsap } from "gsap";
import { NavLink } from "react-router-dom";

interface IProps {
  isOpen: boolean;
  toggleOpen(): void;
}

export default function Navbar({ isOpen, toggleOpen }: IProps) {
  let nav = useRef<HTMLDivElement>(null);
  let loginButton = useRef(null);

  useEffect(() => {
    const navElements = nav!.current!.children;
    const timeline = gsap.timeline({
      defaults: { ease: "Power3.inOut" },
      delay: 0.5,
    });
    const from = { y: -100 };
    const to = { opacity: 1, y: 0, duration: 0.1 };
    timeline
      .fromTo(loginButton.current, from, to)
      .fromTo(navElements[4], from, to)
      .fromTo(navElements[3], from, to)
      .fromTo(navElements[2], from, to)
      .fromTo(navElements[1], from, to)
      .fromTo(navElements[0], from, to);
  }, []);

  return (
    <div className="navBar">
      <nav ref={nav} className="main-nav">
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
      <NavLink to="/login" className="login">
        <button
          ref={loginButton}
          className="button is-primary is-rounded is-pulled-right navbar-login-button"
        >
          Sign in
        </button>
      </NavLink>
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
