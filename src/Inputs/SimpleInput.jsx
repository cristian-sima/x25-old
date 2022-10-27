// @flow

export type SimpleInputPropTypes = {
  +customClass?: any;
  +input: any;
  +tabIndex?: string;
  +label?: string;
  +meta: {
    submitting: boolean;
    touched: boolean;
    error?: string;
  };
  +placeholder?: string;
};

import React from "react";
import classnames from "classnames";

export const SimpleInput = ({
  customClass,
  input,
  label,
  tabIndex,
  meta: { submitting, touched, error },
  placeholder,
}: SimpleInputPropTypes) => (
  <input
    {...input}
    aria-label={label}
    autoComplete={input.name}
    className={classnames(`form-control ${customClass || ""}`, {
      "is-invalid": touched && error,
    })}
    disabled={submitting}
    id={input.name}
    placeholder={placeholder || label}
    tabIndex={tabIndex}
    type="text"
  />
);
