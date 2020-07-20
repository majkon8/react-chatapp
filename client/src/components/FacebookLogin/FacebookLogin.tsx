import React from "react";
import "./FacebookLogin.scss";
import ReactFacebookLogin from "react-facebook-login";
// redux
import { connect, ConnectedProps } from "react-redux";
import { externalLogin } from "../../redux/actions/userActions";

const mapActionsToProps = { externalLogin };
const connector = connect(null, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function FacebookLogin({ externalLogin }: Props) {
  const responseFacebook = (response: any) => {
    const userData = { email: response.email, username: response.name };
    externalLogin(userData);
  };

  return (
    <ReactFacebookLogin
      appId="563972124299753"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      cssClass="button form-button facebook-button"
      icon="fab fa-facebook-f"
      textButton=""
      disableMobileRedirect={true}
    />
  );
}

export default connector(FacebookLogin);
