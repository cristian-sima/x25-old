/* eslint-disable require-unicode-regexp */
/* eslint-disable no-magic-numbers */
/* eslint-disable react/no-unsafe */

type NumericPropTypes = {
  +currency?: boolean;
  +optional?: boolean;
  +size?: number;
  +customClass?: any;
  +input: any;
  +label?: string;
  +meta: {
   error?: string;
   submitting: boolean;
   touched: boolean;
 };
  +tabIndex?: number;
  +placeholder?: string;
  +value?: string;
  +formatValue: (raw: any, optional?: boolean) => string;
  +normalizeValue: (raw: any) => any;
  +onBlur?: () => void;
  +onChange?: (event: any) => void;
  +onRegisterRef?: any;
  +noFormatOnBlur?: bool;
  +decimals?: number;
};

import React from "react";
import classnames from "classnames";

import { floatToLocalComma, clearFloatOnBlur, isFloat, floatToEnglishComma,
} from "./common";

export const NumericInput = (props : NumericPropTypes) => {
  const
    {
      customClass, input, label, currency, tabIndex, onRegisterRef,
      noFormatOnBlur, decimals = 2,
      size, placeholder, meta: { submitting, touched, error },
    } = props,
    rawValue = props.input.value,
    noCurrency = (typeof currency === "undefined" || currency === false),
    valueToShow = floatToLocalComma(rawValue, props.optional),
    updateValue = (valueToStore) => {
      input.onChange(valueToStore);
    },
    handleBlur = (event) => {

      const
        newRawValue = event.target.value,
        isFloatValue = isFloat(floatToEnglishComma(newRawValue));

      let
        newFloatValue = parseFloat(
          floatToEnglishComma(clearFloatOnBlur(newRawValue)),
        ).toFixed(decimals);

      if (!isFloatValue) {
        newFloatValue = input.value;
      }

      const
        oldFloatValue = input.value,
        hasChanged = oldFloatValue !== newFloatValue;

      if (!hasChanged) {
        newFloatValue = input.value;
      }

      if (!noFormatOnBlur) {
        event.target.value = newFloatValue;
      }

      input.onBlur(event);

      if (!noFormatOnBlur && hasChanged) {
        updateValue(floatToEnglishComma(newFloatValue));
      }

    },

    handleChange = ({ target: { value : targetValue } }: any) => {
      updateValue(floatToEnglishComma(targetValue));
    },

    inputComponent = (
      <input
        aria-label={label}
        className={classnames(`form-control ${customClass || ""}`, {
          "is-invalid": touched && error,
        })}
        disabled={submitting}
        id={input.name}
        maxLength={size}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={placeholder || label}
        ref={onRegisterRef}
        tabIndex={tabIndex}
        type="text"
        value={valueToShow}
      />
    );

  if (noCurrency) {
    return (
      inputComponent
    );
  }

  return (
    <div className="input-group">
      {inputComponent}
      <div className="input-group-append">
        <span className="input-group-text">
          {currency}
        </span>
      </div>
    </div>
  );
};
