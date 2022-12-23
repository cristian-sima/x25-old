/* eslint-disable require-unicode-regexp */
/* eslint-disable no-magic-numbers */
/* eslint-disable react/no-unsafe */

type NumericPropTypes = {
  +currency?: boolean;
  +optional?: boolean;
  +size?: number;
  +inputClass?: any;
  +customClass?: any;
  +divClass?: any;
  +input: any;
  +label?: string;
  +tabIndex?: number;
  +placeholder?: string;
  +left?: string;
  +right?: string;
  +value?: string;
  +formatValue: (raw: any, optional?: boolean) => string;
  +normalizeValue: (raw: any) => any;
  +onBlur?: () => void;
  +onChange?: (event: any) => void;
  +onRegisterRef?: any;
  +noFormatOnBlur?: bool;
  +decimals?: number;
  +meta: {
    error?: string;
    submitting: boolean;
    touched: boolean;
  };
};

import React from "react";
import classnames from "classnames";

import { floatToLocalComma, clearFloatOnBlur, isFloat, floatToEnglishComma,
} from "./common";

export const NumericInput = (props : NumericPropTypes) => {
  const
    {
      input, label, tabIndex, onRegisterRef,
      noFormatOnBlur, decimals = 2,
      size, placeholder, meta: { submitting, touched, error },
    } = props,
    rawValue = props.input.value,
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
    warningClass = `${touched && error ? " is-invalid" : ""}`,
    customClass = `${props.inputClass ? ` ${props.inputClass}` : ""}`,
    classForDiv = `form-group row ${props.divClass ? props.divClass : ""}`,
    classForInput = `form-control ${warningClass}${customClass}`,
    inputComponent = (
      <input
        aria-label={label}
        className={classnames(classForInput, {
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

  return (
    <div className={classnames(classForDiv, {
      "is-invalid": touched && error,
    })}>
      <label
        className={`${props.left ? props.left : "col-md-4 text-md-right"} form-control-label`}
        htmlFor={input.name}>
        {label}
      </label>
      <div className={props.right ? props.right : "col-md-8"}>
        {
          inputComponent
        }
        <div className="invalid-feedback">
          {touched && error ? <span>
            {error}
          </span> : null}
        </div>
      </div>
    </div>
  );
};

