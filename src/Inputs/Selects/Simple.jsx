// @flow

type SelectMonthPropTypes = {
  +disabled: boolean;
  +input: any;
  +autoFocus?: bool;
  +valueKey?: string;
  +nameKey?: string;
  +isImmutable?: bool;
  +showEmptyOption?: bool;
  +tabIndex?: string;
  +inputClass?: string;
  +id?: string;
  +data: any;
  +meta: {
    touched: boolean;
    error?: any;
    submitting: boolean;
  };
};

import React from "react";
import classnames from "classnames";

const SimpleCustomSelect = ({
  autoFocus,
  isImmutable, showEmptyOption,
  valueKey = "value", nameKey = "name",
  data, meta: { submitting, touched, error }, tabIndex,
  input, id, inputClass } : SelectMonthPropTypes) => {
  const customID = `custom-select-${input.name}${id || ""}`;

  return (
    <select
      {...input}
      autoFocus={autoFocus}
      className={classnames(`custom-select ${inputClass || ""}`, {
        "is-invalid": touched && error,
      })}
      disabled={submitting}
      id={customID}
      tabIndex={tabIndex}>
      {
        showEmptyOption ? (
          <option value="">{"Selectează"}</option>
        ) : null
      }
      {
        isImmutable ? (
          data.map((current) => {
            const
              value = current.get(valueKey),
              name = current.get(nameKey);

            return (
              <option key={value} value={value}>
                { name }
              </option>
            );
          })
        ) : (
          data.map(({ [valueKey] : value, [nameKey] : name }) => (
            <option key={value} value={value}>
              { name }
            </option>
          ))
        )
      }
    </select>
  );
};

export default SimpleCustomSelect;
