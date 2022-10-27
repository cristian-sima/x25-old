// @flow

type LogoutButtonPropTypes = {
  +readyToLogout: boolean;
  +logoutAccount: () => void;
}

import React from "react";

import { LoadingMessage } from "../Messages";

const LogoutButton = ({ readyToLogout, logoutAccount } : LogoutButtonPropTypes) => (
  <button
    className="dropdown-item"
    disabled={!readyToLogout}
    id="login-button"
    onClick={logoutAccount}
    type="button">
    {
      readyToLogout ? (
        <span>
          <i className="fa fa-sign-out" />
          {" Deconectează-mă"}
        </span>
      ) : (
        <span>
          <LoadingMessage message="Așteaptă..." sm />
        </span>
      )
    }
  </button>
);

export default LogoutButton;
