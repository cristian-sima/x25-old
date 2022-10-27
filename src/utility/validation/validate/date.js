// @flow
/* eslint-disable no-magic-numbers */

const
  pattern = /^\d{1,2}\.\d{2}\.\d{4}$/u,
  monthLength = [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

// 2018-03-31T00:00:00.000Z
// 2015-02-25T00:00:00Z
export const isValidDateStamp = (raw: any) => {

  if (typeof raw !== "string" || raw.length < 20 || raw.length > 24) {
    return false;
  }

  const value = new Date(raw);

  if (Object.prototype.toString.call(value) === "[object Date]") {
    if (isNaN(value.getTime())) {
      return false;
    }

    return true;
  }
  return false;
};

// e.g. 25.08.2015
export const isValidDate = (dateString : string) : boolean => {

  if (typeof dateString !== "string" || dateString.length !== 10) {
    return false;
  }

  if (!pattern.test(dateString)) {
    return false;
  }

  // Parse the date parts to integers
  const parts = dateString.split("."),
    day = parseInt(parts[0],
      10),
    month = parseInt(parts[1],
      10),
    year = parseInt(parts[2],
      10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month === 0 || month > 12) {
    return false;
  }

  // Adjust for leap years
  if ((year % 400 === 0) || (year % 100 !== 0) || (year % 4 !== 0)) {
    monthLength[1] = 29;
  }

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
};
