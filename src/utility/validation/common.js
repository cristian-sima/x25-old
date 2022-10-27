// @flow

type ValidatorResult = {
  notValid: bool;
  error: null | string;
}

type ValidateStringOptions = {
  what?:string;
  min?: number;
  max?: number;
  optional?: bool;
};

type ValidateFloatOptions = {
  min?: number;
  max?: number;
  optional?: bool;
  integer?: bool;
};

type AllOptions = ValidateFloatOptions | ValidateStringOptions;

type Field = {
  field: string;
  options: AllOptions;
}

type Fields = Array<Field>;
type Validator = (value? : string) => ValidatorResult;
type Checker = (options : any) => Validator;
type ValidateFields = (fields : Fields, checker : Checker) => any;

import {
  isValidBankAccount,
  isValidCIF,
  isValidCNP,
  isValidDateStamp,
  isValidEmail,
} from "./validate";

const errMessageSelectField = "Selectează câmpul";

const
  limitTense = 19,
  getNumberTense = (value : number) => value > limitTense ? `${value} de` : String(value);

export const validateHumanNid = (optional : ?bool = false) => (value : string) => {
  const
    notValid = (
      optional && (
        typeof value !== "undefined" &&
          value !== "" &&
          !isValidCNP(value)
      )
    ) || (
      !optional && (
        typeof value === "undefined" ||
          !isValidCNP(value)
      )
    ),
    error = notValid ? "Trebuie un CNP valid" : null;

  return {
    notValid,
    error,
  };
};

export const validateCif = (value : string) => {
  const
    notValid = typeof value === "undefined" || !isValidCIF(value),
    error = notValid ? "Trebuie un cod valid de identificare fiscală" : null;

  return {
    notValid,
    error,
  };
};

export const validateBankAccount = (value : string) => {
  const
    notValid = (
      typeof value !== "undefined" &&
      value !== "" &&
      !isValidBankAccount(value)
    ),
    error = notValid ? "Trebuie furnizat un IBAN valid" : null;

  return {
    notValid,
    error,
  };
};

export const validateEmail = ({ optional } : { optional : boolean }) => (value : string) => {
  const
    notValid = (
      optional && (
        typeof value !== "undefined" &&
        value !== "" &&
        !isValidEmail(value)
      )
    ) || (
      !optional && (
        typeof value === "undefined" ||
        !isValidEmail(value)
      )
    ),
    error = notValid ? "Trebuie o adresă validă de e-mail" : null;

  return {
    notValid,
    error,
  };
};


export const validateOptionalDate = (value : string) => {
  const
    notValid = !(
      typeof value === "undefined" || value === "" || value === null || (
        isValidDateStamp(value)
      )
    ),
    error = notValid ? "Trebuie o dată validă (ZZ.LL.ANUL)" : null;

  return {
    notValid,
    error,
  };
};

export const validateDate = (value : string) => {
  const
    notValid = !(
      (typeof value !== "undefined") && isValidDateStamp(value)
    ),
    error = notValid ? "Trebuie o dată validă (ZZ.LL.ANUL)" : null;

  return {
    notValid,
    error,
  };
};

const isInt = (value) => (
  !isNaN(value) &&
   parseInt(Number(value),
     10) === value && !isNaN(parseInt(value,
    10))
);

const validateNumberRange = ({ min, max, value, integer }) => {
  if (typeof value !== "number") {
    return false;
  }

  const
    numeric = Number(value),
    hasMin = typeof min === "number",
    hasMax = typeof max === "number";

  return (
    (typeof value !== "undefined") &&
      (value !== "") &&
      !isNaN(value) &&
      (!integer || (integer && isInt(value))) &&
      (!hasMin || (typeof min === "number" && numeric >= min)) &&
      (!hasMax || (typeof max === "number" && numeric <= max))
  );
};

const getNumberRangeError = ({ min, max, integer }) => {

  const
    minTense = typeof min === "number" ? getNumberTense(min) : "",
    maxTense = typeof max === "number" ? getNumberTense(max) : "",
    range = (
      (typeof min === "number" && typeof max === "number") ? ` între ${minTense} și ${maxTense}` : (
        typeof max === "number" ? ` până în ${maxTense}` : (
          typeof min === "number" ? ` mai mare ca ${minTense}` : ""
        )
      )
    );

  return `Trebuie un număr ${integer ? "întreg" : "cu virgulă"} ${range}`;
};

export const validateFloat : Checker = (props) => (value) => {
  const { min, max, optional, integer } = props;

  const
    whenOptional = optional && !(
      typeof value === "undefined" || value === null || (
        validateNumberRange({
          min,
          max,
          value,
          integer,
        })
      )
    ),
    whenRequired = !optional && !(
      (typeof value !== "undefined" && value !== null) && validateNumberRange({
        min,
        max,
        value,
        integer,
      })
    ),
    notValid = whenOptional || whenRequired,
    error = notValid ? getNumberRangeError({
      min,
      max,
      integer,
    }) : "";

  return {
    notValid,
    error,
  };
};

const getStringTense = ({ min, max, what }) => {
  const
    maxTense = max ? getNumberTense(max) : "",
    minTense = min ? getNumberTense(min) : "",
    isBetween = (typeof max === "number" && typeof min === "number"),
    rangeError = isBetween ? `între ${minTense} și ${maxTense}` : (
      typeof max === "number" ? `până în ${maxTense}` : (
        typeof min === "number" ? `cel puțin ${minTense}` : ""
      )
    );

  return `${what} are ${rangeError} caractere`;
};

const validateStringRange = ({ min, max, value }) => {
  if (typeof value !== "string") {
    return false;
  }

  const
    length = typeof value === "undefined" ? 0 : value.length,
    hasMin = typeof min === "number",
    hasMax = typeof max === "number";

  return (
    (!hasMin || (typeof min === "number" && length >= min)) &&
    (!hasMax || (typeof max === "number" && length <= max))
  );
};


export const validateString : Checker = (props) => (value) => {
  const { what = "Câmpul", min, max, optional } = props;
  const
    whenOptional = optional && !(
      typeof value === "undefined" || value === null || (
        validateStringRange({
          min,
          max,
          value,
        })
      )
    ),
    whenRequired = !optional && !(
      (typeof value !== "undefined" && value !== null) && validateStringRange({
        min,
        max,
        value,
      })
    ),
    notValid = whenOptional || whenRequired,
    error = notValid ? getStringTense({
      min,
      max,
      what,
    }) : "";

  return {
    notValid,
    error,
  };
};

export const validateSelect = (message? : string) => (value : string) => {
  const
    notValid = (
      (typeof value === "undefined") || value === null || value === ""
    ),
    error = notValid ? (typeof message === "undefined" ? errMessageSelectField : message) : null;

  return {
    notValid,
    error,
  };
};

export const validateID = (message? : string) => (value : string) => {
  const
    notValid = !(
      typeof value === "number" && !isNaN(value)
    ),
    error = notValid ? (typeof message === "undefined" ? errMessageSelectField : message) : null;

  return {
    notValid,
    error,
  };
};

export const validateCaptchaSolution = (value : string) => {
  const
    pattern = /^\d{6}$/u,
    notValid = (
      typeof value !== "undefined" &&
      !pattern.test(value)
    ),
    error = notValid ? "Codul are exact șase cifre" : null;

  return {
    notValid,
    error,
  };
};

export const validateResetToken = (value : string) => {
  const
    tokenSize = 64,
    notValid = (
      typeof value === "undefined" ||
      String(value).length !== tokenSize
    ),
    error = notValid ? "Codul nu este valid" : null;

  return {
    notValid,
    error,
  };
};

export const validateHumanName = validateString({
  min : 3,
  max : 40,
});

export const validatePassword = validateString({
  min : 6,
  max : 25,
});

export const validateFields : ValidateFields = (fields, checker) => (
  fields.reduce((accumulator, { field, options }) => ({
    ...accumulator,

    [field]: checker(options),
  }), {})
);
