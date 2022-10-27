// @flow

type LabelTemplatePropTypes = {
  +input: any;
  +label: string;
  +tabIndex?: string;
  +offset?: string;
  +meta: {
    submitting : boolean;
    touched: boolean;
    error?: any;
  };
};

import React from "react";

export const LabelTemplate = (
  { input, tabIndex, label, offset, meta: { submitting, touched, error } }: LabelTemplatePropTypes,
) => (
  <div className="container">
    <div className="form-group row mb-1">
      <div className={`${offset || ""} col custom-control custom-checkbox`}>
        <input
          {...input}
          aria-label={label}
          className="custom-control-input"
          disabled={submitting}
          id={input.name}
          tabIndex={tabIndex}
          type="checkbox"
        />
        <label className="custom-control-label" htmlFor={input.name}>
          {label}
        </label>
        <div className="invalid-feedback">
          {
            touched && error ? <span>
              {error}
            </span> : null
          }
        </div>
      </div>
    </div>
  </div>
);
