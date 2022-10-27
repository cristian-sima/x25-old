// @flow

import type { State } from "src\\types";

import React, { Component } from "react";

import Select from "react-select";
import { withRouter } from "react-router-dom";

import { getDefaultCompanyRoute, noOptionsMessage, Option, wrapperClassname, isSmall } from "./util";

import { connect } from "react-redux";

import { selectors } from "../Account/reducer";

const
  mapStateToProps = (state : State) => ({
    companies: selectors.getCurrentAccountCompanies(state),
  });

type ClientSelectCompanyPropTypes = {
  +companies: any;
  +history: any;
  +toggleNavbar: () => void;
}

type ClientSelectCompanyState = {
  inputValue: string,
};

class ClientSelectCompany extends Component<ClientSelectCompanyPropTypes, ClientSelectCompanyState> {
  props: ClientSelectCompanyPropTypes;
  state : ClientSelectCompanyState;

  handleChange: (options : any) => any;
  handleInputChange: (newValue: string) => string;

  constructor (props) {
    super(props);

    this.state = { inputValue: "" };

    this.handleChange = (options : any) => {
      if (isSmall()) {
        this.props.toggleNavbar();
      }

      this.props.history.push(getDefaultCompanyRoute(options));
    };

    this.handleInputChange = (newValue: string) => {
      const inputValue = newValue.replace(/\W/gu, "");

      this.setState({ inputValue });
      return inputValue;
    };
  }

  render () {
    const { companies } = this.props;

    const options = companies.reduce((accumulator, currentValue) => {
      accumulator.push({
        ...currentValue.toJS(),
        value : currentValue.get("ID"),
        label : currentValue.get("Name"),
      });

      return accumulator;
    }, []);

    if (companies.size > 1) {
      return (
        <div className={wrapperClassname} >
          <Select
            components={{ Option }}
            noOptionsMessage={noOptionsMessage}
            onChange={this.handleChange}
            options={options}
            placeholder="Selectează firmă"
          />
        </div>
      );
    }

    return null;
  }
}

export default withRouter(connect(mapStateToProps)(ClientSelectCompany));
