import React from "react";
import "./Footer.scss";
// Icons
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

export default function Footer() {
  return (
    <footer className="my-footer">
      <a href="/" className="logo">
        <span className="has-text-white">CHAT</span>
        <span className="has-text-primary">APP</span>
      </a>
      <span className="socials">
        <a href="https://www.facebook.com/">
          <FacebookIcon />
        </a>
        <a href="https://www.github.com/majkon8/chatapp">
          <GitHubIcon />
        </a>
        <a href="https://www.twitter.com/">
          <TwitterIcon />
        </a>
      </span>
      <span className="copyrights">
        Copyright ® All rights reserved ChatApp
      </span>
    </footer>
  );
}
