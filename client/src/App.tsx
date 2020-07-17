import React, { lazy, Suspense } from "react";
import "./App.scss";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// redux
import { Provider } from "react-redux";
import store from "./redux/store";
// pages and components
import Home from "./pages/home/home";
import Logo from "./components/Logo/Logo";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import ResetPassword from "./pages/reset-password/resetPassword";
const Terms = lazy(() => import("./pages/terms/terms"));
const PageNotFound = lazy(() => import("./pages/page-not-found/pageNotFound"));

function App() {
  const location = useLocation();

  return (
    <Provider store={store}>
      <div className="app-container">
        <Logo />
        <Suspense fallback={<></>}>
          <AnimatePresence>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/reset" component={ResetPassword} />
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
