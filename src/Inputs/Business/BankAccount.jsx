// @flow

type BankNamePropTypes = {
  +input: any;
  +meta: {
    submitting: boolean;
    touched: boolean;
    error: ?string;
  };
};

import React from "react";
import classnames from "classnames";

const BankAccount = ({
  input,
  meta: {
    error,
    submitting,
    touched,
  },
} : BankNamePropTypes) => (
  <div className={classnames("input-group", { "is-invalid": touched && error })}>
    <div className="input-group-prepend">
      <span className="input-group-text">{"Contul"}</span>
    </div>
    <input
      {...input}
      aria-label="Contul bancar"
      className={classnames("form-control", { "is-invalid": touched && error })}
      disabled={submitting}
      id={input.name}
      name={input.name}
      placeholder="ex. RO14 CECE GR02 01RO N026 9171"
    />
  </div>
);

export default BankAccount;
