// @flow

type InputTemplatePropTypes = {
  +autoFocus?: boolean;
  +input: any;
  +label: string;
  +placeholder: string;
  +type: string;
  +inputClass?:string;
  +tabIndex?: string;
  +rows?: string;
  +meta: {
    touched: boolean;
    error?: any;
    submitting: boolean;
  };

  +onRegisterRef?: (callback : (node : any) => void) => void;
};

import React from "react";

export const SimpleTextarea = ({
  input,
  type,
  label,
  onRegisterRef,
  autoFocus,
  inputClass,
  placeholder,
  tabIndex,
  rows,
  meta: { submitting, touched, error },
} : InputTemplatePropTypes) => {
  const
    warningClass = `${touched && error ? " is-invalid" : ""}`,
    customClass = `${inputClass ? ` ${inputClass}` : ""}`,
    classForInput = `form-control ${warningClass}${customClass}`;

  return (
    <textarea
      {...input}
      aria-label={label}
      autoFocus={autoFocus}
      className={classForInput}
      disabled={submitting}
      id={input.name}
      placeholder={placeholder}
      ref={onRegisterRef ? onRegisterRef : null}
      rows={rows}
      tabIndex={tabIndex}
      type={type}
    />
  );
};
