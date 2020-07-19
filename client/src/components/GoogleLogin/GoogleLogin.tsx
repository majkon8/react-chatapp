import React from "react";
import "./GoogleLogin.scss";
import ReactGoogleLogin from "react-google-login";
// redux
import { connect, ConnectedProps } from "react-redux";
import { externalLogin } from "../../redux/actions/userActions";

const mapActionsToProps = { externalLogin };
const connector = connect(null, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function GoogleLogin({ externalLogin }: Props) {
  const responseGoogle = (response: any) => {
    const userData = {
      email: response.profileObj.email,
      username: response.profileObj.name,
    };
    externalLogin(userData);
  };

  return (
    <ReactGoogleLogin
      clientId="394253008834-vbi64sr39onfv5gnolcpjibg5mv4h3gd.apps.googleusercontent.com"
      onSuccess={responseGoogle}
      className="button form-button google-button"
      buttonText=""
      icon={false}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <button
          className="button form-button google-button"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <i className="fab fa-google" aria-hidden="true"></i>
        </button>
      )}
    />
  );
}

export default connector(GoogleLogin);
