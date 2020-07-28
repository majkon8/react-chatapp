import React from "react";
import { Route, Redirect } from "react-router-dom";
// redux
import { connect } from "react-redux";
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({ user: state.user });
const connector = connect(mapStateToProps, {});

const UnauthRoute = ({ component: Component, user, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) =>
      user.isAuthenticated ? <Redirect to="/main" /> : <Component {...props} />
    }
  />
);

export default connector(UnauthRoute);
