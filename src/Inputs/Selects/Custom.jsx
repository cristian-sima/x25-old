// @flow

type SelectMonthPropTypes = {
  +disabled: boolean;
  +input: any;
  +valueKey?: string;
  +nameKey?: string;
  +label?: string;
  +isImmutable?: bool;
  +showEmptyOption?: bool;
  +tabIndex?: string;
  +left?: string;
  +inputClass?: string;
  +right?: string;
  +id?: string;
  +data: any;
  +meta: {
    touched: boolean;
    error?: any;
    submitting: boolean;
  };
};

import React from "react";

import Simple from "./Simple";

const CustomSelect = (props : SelectMonthPropTypes) => {
  const { input, meta: { touched, error }, left, right, label, id } = props;
  const customID = `custom-select-${input.name}${id || ""}`;

  return (
    <div className="form-group row">
      <label
        className={`${left ? left : "col-md-4 text-md-right"} form-control-label`}
        htmlFor={customID}>
        {label}
      </label>
      <div className={right ? right : "col-md-8"}>
        <Simple {...props} />
        <div className="invalid-feedback">
          {
            touched && error ? <span>
              {error}
            </span> : null
          }
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
