import React from "react";
import "./login.scss";
import Logo from "../../components/Logo/Logo";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function Login() {
  return (
    <div className="login-page-container">
      <Logo />
      <LoginForm />
    </div>
  );
}
