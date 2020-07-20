import React, { useRef, useEffect } from "react";
import "./Navbar.scss";
import { gsap } from "gsap";
import { NavLink } from "react-router-dom";

export default function Navbar() {
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
      <NavLink to="/login" className="login">
        <button
          ref={loginButton}
          className="button is-primary is-rounded is-pulled-right navbar-login-button"
        >
          Sign in
        </button>
      </NavLink>
    </div>
  );
}
