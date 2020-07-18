import React, { useState, useEffect } from "react";
// redux
import { connect, ConnectedProps } from "react-redux";
import { confirmAccount } from "../../redux/actions/userActions";
import { Redirect } from "react-router-dom";

const mapActionsToProps = { confirmAccount };
const connector = connect(null, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & { match: any };

function ConfirmAccount({ confirmAccount, match }: Props) {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    async function fetchApi() {
      await confirmAccount(match.params.token);
      setRedirect(true);
    }
    fetchApi();
  }, []);
  return <>{redirect && <Redirect to="/login" />}</>;
}

export default connector(ConfirmAccount);
