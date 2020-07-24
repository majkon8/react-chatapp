import React from "react";
import { Route, Redirect } from "react-router-dom";
// redux
import { connect } from "react-redux";
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({ user: state.user });
const connector = connect(mapStateToProps, {});

const AuthRoute = ({ component: Component, user }: any) => (
  <Route
    render={() =>
      !user.isAuthenticated ? (
        <Redirect to={{ pathname: "/login" }} />
      ) : (
        <Component />
      )
    }
  />
);

export default connector(AuthRoute);
