// @flow

import type { Dispatch } from "src\\types";

type OptionsContainerPropTypes = {
  +accountName: string;
  +showLogoutProblem: () => void;
};

type OptionsContainerStateTypes = {
  open: boolean;
  readyToLogout: boolean;
};

import React, { Component } from "react";
import { ButtonDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { connect } from "react-redux";

import LogoutButton from "./LogoutButton";

import { notifyError } from "../actions";

import { logOut as logoutRequest } from "./request";

const
  mapDispatchToProps = (dispatch : Dispatch) => ({
    showLogoutProblem () {
      dispatch(notifyError("Am pierdut conexiunea cu server-ul"));
    },
  });

class OptionsContainer extends Component<OptionsContainerPropTypes, OptionsContainerStateTypes> {

  props: OptionsContainerPropTypes;

  state: OptionsContainerStateTypes;

  toggle: () => void;
  logoutAccount: () => void;

  constructor () {
    super();

    this.toggle = () => this.setState((prevState) => ({
      open: !prevState.open,
    }));

    this.logoutAccount = () => {
      const that = this;

      this.setState({
        readyToLogout: false,
      }, () => {
        logoutRequest().
          then(() => {
            const delay = 800;

            setTimeout(() => {
              document.location.href = "/";
            }, delay);
          }).
          catch(() => {
            that.setState({
              readyToLogout: true,
            });
            that.props.showLogoutProblem();
          });
      });
    };

    this.state = {
      open          : false,
      readyToLogout : true,
    };
  }

  shouldComponentUpdate (
    nextProps : OptionsContainerPropTypes,
    nextState: OptionsContainerStateTypes,
  ) {
    return (
      this.props.accountName !== nextProps.accountName ||

      this.state.readyToLogout !== nextState.readyToLogout ||
      this.state.open !== nextState.open
    );
  }

  render () {
    const { accountName } = this.props;

    const { open, readyToLogout } = this.state;

    return (
      <div className="btn-group">
        <ButtonDropdown isOpen={open} toggle={this.toggle}>
          <DropdownToggle caret>
            {"Opțiuni"}
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-left">
            <h6 className="dropdown-header">{accountName}</h6>
            <a className="dropdown-item" href="/settings/termeni-si-conditii/all" target="_blank">
              {"Termeni & condiții"}
            </a>
            <a
              className="dropdown-item"
              href="/settings/politica-de-confidentialitate/all" target="_blank">
              {"Politica de confidențialitate"}
            </a>

            <div className="dropdown-divider" />
            <LogoutButton
              logoutAccount={this.logoutAccount}
              readyToLogout={readyToLogout}
            />
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}

export default connect(null,
  mapDispatchToProps)(OptionsContainer);
