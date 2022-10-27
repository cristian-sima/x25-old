// @flow

import type { CompanyRoutePropTypes } from "./types";

import React, { Component } from "react";
import agent from "superagent";
import { withRouter } from "react-router-dom";

import AsyncSelect from "react-select/async";

import { withPromiseCallback } from "../utility";
import { loadingMessage,
  getDefaultCompanyRoute, noOptionsMessage, Option, wrapperClassname, isSmall } from "./util";

type AdminSelectCompanyPropTypes = {
  +companies: any;
  +history: any;
  +toggleNavbar: () => void;
}

type AdminSelectCompanyState = {
  inputValue: string,
};

const loadOptions = (search, callback) => {
  const reject = ({
    args: {
      // eslint-disable-next-line
      error,
    },
    // eslint-disable-next-line
  }) => {};

  const prepare = ({ Suggestions }) => callback(
    Suggestions.reduce((accumulator, currentValue) => {
      accumulator.push({
        ...currentValue,
        value : currentValue.ID,
        label : currentValue.Name,
      });
      return accumulator;
    }, []),
  );

  agent.
    get("/api/account/get-companies").
    type("form").
    set("Accept", "application/json").
    query({ search }).
    // eslint-disable-next-line
    end(withPromiseCallback(prepare, reject));
};

class AdminSelectCompany extends Component<AdminSelectCompanyPropTypes, AdminSelectCompanyState> {
  props: AdminSelectCompanyPropTypes;
  state : AdminSelectCompanyState;

  handleChange: (options: CompanyRoutePropTypes) => void;
  handleInputChange: (newValue : string) => string;

  constructor (props) {
    super(props);

    this.state = { inputValue: "" };

    this.handleChange = (options : CompanyRoutePropTypes) => {
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
    return (
      <div
        className={wrapperClassname} >
        <AsyncSelect
          cacheOptions
          components={{ Option }}
          loadingMessage={loadingMessage}
          loadOptions={loadOptions}
          noOptionsMessage={noOptionsMessage}
          onChange={this.handleChange}
          onInputChange={this.handleInputChange}
          placeholder="Selectează firmă"
        />
      </div>
    );
  }
}

export default withRouter(AdminSelectCompany);
