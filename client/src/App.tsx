import React, { lazy, Suspense } from "react";
import "./App.scss";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// redux
import { Provider } from "react-redux";
import store from "./redux/store";
// pages and components
import Main from "./pages/main/main";
import Home from "./pages/home/home";
import Logo from "./components/Logo/Logo";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import ResetPassword from "./pages/resetPassword/resetPassword";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import UnauthRoute from "./components/UnauthRoute/UnauthRoute";
const Terms = lazy(() => import("./pages/terms/terms"));
const PageNotFound = lazy(() => import("./pages/pageNotFound/pageNotFound"));
const ConfirmAccount = lazy(() =>
  import("./pages/confirmAccount/confirmAccount")
);

function App() {
  const location = useLocation();

  return (
    <Provider store={store}>
      <div className="app-container">
        <Logo />
        <Suspense fallback={<></>}>
          <AnimatePresence>
            <Switch location={location} key={location.pathname}>
              <AuthRoute exact path="/" component={Main} />
              <UnauthRoute path="/home" component={Home} />
              <UnauthRoute path="/login" component={Login} />
              <UnauthRoute path="/register" component={Register} />
              <UnauthRoute path="/reset/:token" component={ResetPassword} />
              <UnauthRoute path="/confirm/:token" component={ConfirmAccount} />
              <Route path="/terms" component={Terms} />
              <Route component={PageNotFound} />
            </Switch>
          </AnimatePresence>
        </Suspense>
      </div>
    </Provider>
  );
}

export default App;
