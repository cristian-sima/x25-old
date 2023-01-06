
type NumericPropTypes = {
  +optional?: boolean;
  +size?: number;
  +customClass?: any;
  +divClass?: any;
  +input: any;
  +label?: string;
  +meta: {
   error?: string;
   submitting: boolean;
   touched: boolean;
 };
  +placeholder?: string;
  +value?: string;
  +autoFocus?: boolean;
  +type: string;
  +inputClass?: string;
  +left?: string;
  +tabIndex?: number;
  +right?: string;
  +formatValue: (raw: any, optional?: boolean) => string;
  +normalizeValue: (raw: string | null) => any;
  +onBlur?: () => void;
  +onChange?: (event: any) => void;
  +onRegisterRef?: any;
};

import React from "react";
import classnames from "classnames";
import { formatZeroValue } from "../utility";


import { getFloatValueToStore, clearFloatOnBlur, isFloat, floatToEnglishComma } from "./common";

export const
  NumericTemplate = (props : NumericPropTypes) => {
    const
      {
        input, right, tabIndex, divClass, label,
        onRegisterRef,
        meta: { submitting, touched, error }, formatValue = formatZeroValue,
        type, autoFocus, inputClass, placeholder, left, size,
      } = props,

      [value, setValue] = React.useState(props.input.value),

      valueToShow = formatValue(value, props.optional),

      updateValue = (targetValue: any) => {
        setValue(targetValue);

        let valueToStore = targetValue;

        if (isFloat(floatToEnglishComma(targetValue))) {
          valueToStore = getFloatValueToStore(targetValue);
        }

        input.onChange(valueToStore);
      },

      handleBlur = (event: any) => {
        const
          newValue = clearFloatOnBlur(value),
          hasChanged = value !== newValue;

        if (hasChanged) {
          updateValue(newValue);
        }

        input.onBlur(event);
      },

      handleChange = ({ target: { value : targetValue } }: any) => {
        updateValue(targetValue);
      },
      warningClass = `${touched && error ? " is-invalid" : ""}`,
      customClass = `${inputClass ? ` ${inputClass}` : ""}`,
      classForInput = `form-control ${warningClass}${customClass}`,
      classForDiv = `form-group row ${divClass ? divClass : ""}`;


    React.useEffect(() => {
      if (isFloat(input.value) || input.value === "") {
        updateValue(input.value);
      }
    }, [input.value]);

    return (
      <div className={classnames(classForDiv, {
        "is-invalid": touched && error,
      })}>
        <label
          className={`${left ? left : "col-md-4 text-md-right"} form-control-label`}
          htmlFor={input.name}>
          {label}
        </label>
        <div className={right ? right : "col-md-8"}>
          <input
            aria-label={label}
            autoFocus={autoFocus}
            className={classForInput}
            disabled={submitting}
            id={input.name}
            maxLength={size}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={placeholder}
            ref={onRegisterRef}
            tabIndex={tabIndex}
            type={type}
            value={valueToShow}
          />
          <div className="invalid-feedback">
            {touched && error ? (
              <span>
                {error}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

