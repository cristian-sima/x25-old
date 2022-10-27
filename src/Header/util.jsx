// @flow

import type { CompanyRoutePropTypes } from "./types";

type OptionsPropTypes = {
  +label: string;

  +options: any;
  +clearValue: any;
  +innerProps: any;
  +hasValue: any;
  +isDisabled: any;
  +selectOption: any;
  +cx: any;
  +isFocused: any;
  +isMulti: any;
  +isSelected: any;
  +selectProps: any;
  +getValue: any;
  +innerRef: any;
  +data: any;
  +children: any;
  +getStyles: any;
  +theme: any;
  +type: any;
  +setValue: any;
};

import React from "react";
import { components } from "react-select";

export const noOptionsMessage = () => "Nu există opțiuni";
export const loadingMessage = () => "Se încarcă...";

export const Option = (props : OptionsPropTypes) => (
  <div className="text-truncate small" title={props.label}>
    <components.Option {...props} />
  </div>
);

export const isSmall = () => window.matchMedia("(max-width: 780px)").matches;

export const wrapperClassname = "search-bar me-md-1 mb-2 md-mb-0 d-block d-md-inline-block";

export const getDefaultCompanyRoute = ({ Modules, ID } : CompanyRoutePropTypes) => {
  const getModule = () => {
    const
      modules = String(Modules),
      parts = modules.split(",");

    if (modules === "") {
      return `${ID}/info`;
    }

    const [first] = parts;

    if (first === "auto") {
      return `auto/${ID}`;
    }

    return `${ID}/${first}/list`;
  };

  return `/company/${getModule()}`;
};
