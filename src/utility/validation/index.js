// @flow

export * from "./common";
export * from "./specific";
export * from "./validate";

const processErrors = ({ error, isArray, _error, arrayErrors }, { field, errors }) => {
  if (isArray) {
    if (arrayErrors) {
      errors[field] = arrayErrors;
    } else {
      errors[field] = { _error };
    }
  } else {
    errors[field] = error;
  }
};

export const extractErrorsFromCheckers = (checkers : any) => (values : any) => {
  const errors = {};

  for (const field in checkers) {
    if (Object.prototype.hasOwnProperty.call(checkers,
      field)) {
      const
        checker = checkers[field],
        result = checker(values.get(field)),
        { notValid } = result;

      if (notValid) {
        processErrors(result,
          {
            field,
            errors,
          });
      }
    }
  }

  return errors;
};

export const performValidateRows = (items : any, checkers : any) => {
  const
    notValid = (
      (typeof items === "undefined") ||
    items.size === 0
    );

  if (notValid) {
    return {
      notValid,
      _error  : "Adaugă cel puțin un rând",
      isArray : true,
    };
  }

  const arrayErrors = items.reduce((previous, item, key) => {
    previous[key] = extractErrorsFromCheckers(checkers)(item);

    return previous;
  }, []);

  return {
    notValid: true,
    arrayErrors,

    isArray: true,
  };
};
