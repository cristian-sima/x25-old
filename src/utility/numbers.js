// @flow
/* eslint-disable no-magic-numbers */

declare var Intl:any

const numberFormat : any = new Intl.NumberFormat("ro",
  {
    minimumFractionDigits: 2,
  });

const plainNumberFormat : any = new Intl.NumberFormat("ro");

const replaceCharInString = ({ word, oldChar, newChar } : {
  word: string,
  oldChar: string,
  newChar: string
}) : string => {

  const regex = new RegExp(oldChar,
    "gu");

  return word.replace(regex,
    newChar);
};

// 127.99 ----> 127,99
// 0 ----> ""
export const formatZeroValue = (word : any, optional?: bool) : string => (
  optional && word === ""
) ? "" : replaceCharInString({
    word    : String(word),
    oldChar : "\\.",
    newChar : ",",
  });

export const formatNumber = (word : any) : string => replaceCharInString({
  word    : String(word),
  oldChar : "\\.",
  newChar : ",",
});

// 78,45 ---> 78.45
export const normalizeNumber = (word : any) : string => replaceCharInString({
  word    : String(word),
  oldChar : ",",
  newChar : ".",
});

export const numberToLocale = (value : number) : string => numberFormat.format(value);

export const plainNumberToLocale = (value : number) : string => (
  plainNumberFormat.format(value)
);

export const numberToLocaleForm = (value : number) : string => {
  const upperLimit = 20,
    formatted = plainNumberFormat.format(value);

  if (value < upperLimit) {
    return formatted;
  }

  return `${formatted} de`;
};

export const numericBehavior = {
  normalize : normalizeNumber,
  format    : formatNumber,
};

export const tryToParseNumber = (raw : string) => {
  const result = Number(raw);

  if (!isNaN(result) && raw !== "") {
    return result;
  }

  return raw;
};

export const numberToLocaleHideBlank = (raw : any) => (
  (typeof raw === "number" && raw !== 0) ? numberToLocale(raw) : ""
);

export const plainNumberToLocaleHideZero = (raw : any) => (
  (typeof raw === "number" && raw !== 0) ? plainNumberToLocale(raw) : ""
);
