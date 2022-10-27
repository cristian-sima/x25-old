// @flow

type InputTemplatePropTypes = {
  +autoFocus?: boolean;
  +input: any;
  +label: string;
  +placeholder: string;
  +type: string;
  +inputClass?:string;
  +tabIndex?: string;
  +meta: {
    touched: boolean;
    error?: any;
    submitting: boolean;
  };
  +left?: string;
  +right?: string;

  +onRegisterRef?: (callback : (node : any) => void) => void;
};

import React from "react";
import classnames from "classnames";

import { SimpleTextarea } from "./SimpleTextarea";

export const TextareaTemplate = (props : InputTemplatePropTypes) => {
  const {
    input,
    label,
    left,
    right,
    meta: { touched, error },
  } = props;

  return (
    <div className={classnames("form-group row", { "is-invalid": touched && error })}>
      <label
        className={`${left ? left : "col-md-4"} text-md-right form-control-label`}
        htmlFor={input.name}>
        {label}
      </label>
      <div className={right ? right : "col-md-8"}>
        <SimpleTextarea {...props} />
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
