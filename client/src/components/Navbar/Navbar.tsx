import React, { Component } from "react";
import "./Navbar.scss";
import SideNav from "../SideNav/SideNav";

export default class Navbar extends Component {
  render() {
    return (
      <div className="navBar">
        <a href="/" className="logo">
          <span className="logo-chat">CHAT</span>
          <span className="has-text-primary">APP</span>
        </a>
        <nav>
          <a href="/" className="has-text-dark nav-item">
            Features
          </a>
          <a href="/" className="has-text-dark nav-item">
            About us
          </a>
          <a href="/" className="has-text-dark nav-item">
            Security
          </a>
          <a href="/" className="has-text-dark nav-item">
            Support
          </a>
        </nav>
        <button className="button is-primary is-rounded is-pulled-right login-button">
          Sign in
        </button>
        <SideNav />
      </div>
    );
  }
}
