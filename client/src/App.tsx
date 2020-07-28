import React, { lazy, Suspense } from "react";
import "./App.scss";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
// redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED, SET_ACCESS_TOKEN } from "./redux/types";
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

const refreshToken = localStorage.refreshToken;
if (refreshToken) store.dispatch({ type: SET_AUTHENTICATED, payload: true });

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.config && error.response && error.response.status === 401) {
      const response = await axios.get("/users/token", {
        headers: { "x-refresh-token": refreshToken },
      });
      const accessToken = response.data;
      error.config.headers["x-access-token"] = accessToken;
      axios.defaults.headers.common["x-access-token"] = accessToken;
      store.dispatch({ type: SET_ACCESS_TOKEN, payload: accessToken });
      return axios.request(error.config);
    }
    return Promise.reject(error);
  }
);

function App() {
  const location = useLocation();

  return (
    <Provider store={store}>
      <div className="app-container">
        <Logo location={location} />
        <Suspense fallback={<></>}>
          <AnimatePresence>
            <Switch location={location} key={location.pathname}>
              <UnauthRoute exact path="/" component={Home} />
              <AuthRoute path="/main" component={Main} />
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
