import React from "react";
import "./App.scss";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/home/home";
import Logo from "./components/Logo/Logo";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import ResetPassword from "./pages/reset-password/resetPassword";

function App() {
  const location = useLocation();

  return (
    <>
      <div className="app-container">
        <Logo />
        <AnimatePresence>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/reset" component={ResetPassword} />
          </Switch>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
