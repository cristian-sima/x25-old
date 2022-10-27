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

const BankNameField = ({
  input,
  meta: {
    error,
    submitting,
    touched,
  },
} : BankNamePropTypes) => (
  <div className={classnames("input-group", { "is-invalid": touched && error })}>
    <div className="input-group-prepend">
      <span className="input-group-text">{"Denumire sau BIC"}</span>
    </div>
    <input
      {...input}
      aria-label="Denumire bancă"
      className={classnames("form-control", { "is-invalid": touched && error })}
      disabled={submitting}
      id={input.name}
      name={input.name}
      placeholder="ex. Banca Transilvania"
      type="text"
    />
  </div>
);

export default BankNameField;
