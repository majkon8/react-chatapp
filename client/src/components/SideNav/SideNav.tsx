import React, { useState } from "react";
import "./SideNav.scss";

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <button
      onClick={toggleOpen}
      className={"hamburger hamburger--squeeze" + (isOpen && " is-active")}
      type="button"
    >
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  );
}
