/* eslint-disable react/no-unsafe */

// type DateInputPropTypes = {
//     readonly customClass?: any;
//     readonly input: any;
//     readonly meta: {
//       error?: string;
//       submitting: boolean;
//       touched: boolean;
//     };
//     readonly placeholder?: string;
//     readonly value?: string;
//     readonly tabIndex?: string;
//     readonly currency?: boolean;
//     readonly formatValue: (raw: string) => string;
//     readonly normalizeValue: (raw: string) => any;
//     readonly onBlur?: () => void;
//     readonly onChange?: (event: any) => void;
//     readonly onRegisterRef?: (callback: (node: any) => void) => void;
//   }
import React from "react";
import classnames from "classnames";

import { formatDate, normalizeDate, words } from "../utility";
import { isValidDate } from "../utility/validation";

const
  addZeroIfNeeded = (raw : string) => {

    const
      nrOfElements = 3,
      canAddZero = (
        (typeof raw === "string") &&
        (raw.split(".").length === nrOfElements)
      );

    if (!canAddZero) {
      return raw;
    }

    const
      perform = (value : string) => (
        value.length === 1 ? `0${value}` : value
      ),
      parts = raw.split("."),
      part1 = perform(parts[0]),
      part2 = perform(parts[1]),
      [, , part3] = parts,

      newValue = [
        part1,
        part2,
        part3,
      ].join(".");


    if (isValidDate(newValue)) {
      return newValue;
    }

    return raw;
  },
  normalizeRawDate = (raw: string): string => {
    if (isValidDate(raw)) {
      return normalizeDate(raw);
    }

    return "";
  },

  formatRawDate = (raw: string): string => {
    if (typeof raw !== "undefined") {
      return formatDate(raw);
    }

    return "";
  };

// eslint-disable-next-line no-undef
export const DateInput = (props : DateInputPropTypes) => {
  const

    { customClass, input, onRegisterRef, tabIndex, placeholder,
      meta: { submitting, touched, error } } = props,

    [
      value,
      setValue,
    ] = React.useState(input.value),

    valueToShow = formatRawDate(value),

    updateValue = (targetValue : string) => {

      const normalizedValue = normalizeRawDate(addZeroIfNeeded(targetValue));

      setValue(targetValue);
      props.input.onChange(normalizedValue);

    },

    handleBlur = ({ target: { value : targetValue } }: any) => {
      const
        newValue = addZeroIfNeeded(targetValue),
        hasChanged = targetValue !== newValue;

      if (hasChanged) {
        updateValue(newValue);
      }
    },

    handleChange = ({ target: { value : targetValue } }: any) => {
      updateValue(targetValue);
    };

  React.useEffect(() => {
    if (isValidDate(input.value) || input.value === "") {
      updateValue(input.value);
    }
  }, [input.value]);

  return (
    <input
      {...input}
      className={classnames(`form-control ${customClass || ""}`, {
        "is-invalid": touched && error,
      })}
      disabled={submitting}
      id={input.name}
      onBlur={handleBlur}
      onChange={handleChange}
      placeholder={placeholder || words.DateFormat}
      ref={onRegisterRef}
      tabIndex={tabIndex}
      type="text"
      value={valueToShow}
    />
  );
};

