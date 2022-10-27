// @flow
/* eslint-disable no-duplicate-imports */

import type { SimpleInputPropTypes } from "../SimpleInput";

import React from "react";
import { SimpleInput } from "../SimpleInput";

const EmailInput = (props : SimpleInputPropTypes) => (
  <div className="input-group">
    <div className="input-group-prepend">
      <span className="input-group-text">
        <i className="fa fa-envelope-o" />
      </span>
    </div>
    <SimpleInput
      {...props}
      placeholder="ex. design@gmail.ro"
    />
  </div>
);

export default EmailInput;
