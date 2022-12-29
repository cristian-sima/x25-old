/* eslint-disable require-unicode-regexp */

export const
  floatToLocalComma = (raw) => String(raw).replace(".", ","),
  floatToEnglishComma = (raw) => String(raw).replace(",", "."),
  isFloat = (raw) => {
    const floatRegex = /^-?\d+(?:[.]\d*?)?$/;

    return floatRegex.test(raw);
  },
  getFloatValueToStore = (raw) => {
    const
      parsedFloat = floatToEnglishComma(raw),
      parsedValue = parseFloat(parsedFloat),
      canGetNumericValue = isFloat(parsedFloat) && !isNaN(parsedValue);

    if (canGetNumericValue) {
      return parsedValue;
    }

    return 0;
  },
  clearFloatOnBlur = (value) => {
    const
      parts = floatToLocalComma(value).split(","),
      shouldRemoveComma = parts.length === 2 && (parts[1] === "" || Number(parts[1]) === 0),
      shouldCutTo2Decimals = parts.length === 2 && parts[1].length > 2;

    if (shouldRemoveComma) {
      return parts[0];
    }

    if (shouldCutTo2Decimals) {
      const
        [beforeDot] = parts,
        afterDot = parts[1].substring(0, 2);

      return `${beforeDot},${afterDot}`;
    }

    return value;
  };
