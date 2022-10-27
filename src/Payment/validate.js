// @flow

import {
  extractErrorsFromCheckers,
} from "../utility";

const validateTrue = (value : string) => {
  const
    notValid = (
      typeof value !== "boolean" ||
      value !== true
    );

  return {
    notValid,
    error: "Trebuie să fii de acord",
  };
};

const
  checkers = {
    AcceptPolicy: validateTrue,
  };

export const validate = extractErrorsFromCheckers(checkers);
