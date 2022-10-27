/*
 * @flow
 * Simona Cosovei ---> Simona Cosovei
 */
export const toTitle = (str : string) : string => {
  const transform = (txt : string) : string => {
    const firstPart = txt.charAt(0).toUpperCase(),
      secondPart = txt.substr(1).toLowerCase();

    return `${firstPart}${secondPart}`;
  };

  return str.replace(/\S+/gu,
    transform);
};

// this is an example ---> This is an example
export const firstToUppercase = (str : string) : string => {
  const firstPart = str.charAt(0).toUpperCase(),
    secondPart = str.slice(1);

  return `${firstPart}${secondPart}`;
};

export const normalizeDiacritics = (str: string) : string => {
  const chars = {
    "ă" : "a",
    "â" : "a",
    "î" : "i",
    "ț" : "t",
    "ș" : "s",

    "Ă" : "A",
    "Â" : "A",
    "Î" : "I",
    "Ț" : "T",
    "Ș" : "S",
  };

  return str.replace(/ă|â|î|ț|ș|Ă|Â|Î|Ț|Ș/gui,
    (matched) => chars[matched]);
};

// This is ---> THIS IS
export const toUpper = (str : string) : string => str.toUpperCase();

// This is ---> this is
export const toLower = (str : string) : string => str.toLowerCase();

export const formatBankAccount = (raw: string) : string => {

  if (typeof raw === "undefined" || raw === "") {
    return "";
  }

  let output = "";

  const nrOfCharsPerGroup = 4,
    withoutSpaces = raw.replace(/ /gu,
      "");

  for (let index = 0; index < withoutSpaces.length; index += 1) {
    const currentChar = withoutSpaces.charAt(index);

    if (output !== "" && index % nrOfCharsPerGroup === 0) {
      output += " ";
    }

    output += currentChar;
  }

  return output;
};

export const normalizeCompanyName = (raw : string) : string => (
  toTitle(raw).replace(/\ssrl/gui,
    " S.R.L.").
    replace(/\ss\.r\.l/gui,
      " S.R.L")
);
