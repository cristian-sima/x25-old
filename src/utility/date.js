// @flow
/* eslint-disable */

type MonthAndYear =  { year: string, month: string };

import { isValidDate } from "./validation/validate";

const ten = 10;

export const getPreviousMonth = (year : string, month: string) => {
  if (month === "0") {
    return {
      previousMonth : "11",
      previousYear  : String(Number(year) - 1),
    };
  }

  return {
    previousMonth    : String(Number(month) - 1),
    previousYear  : String(year),
  };
};

export const getLastMonthAndYear = () : MonthAndYear => {
  const
    currentDate = new Date(),
    currentYear = String(currentDate.getFullYear()),
    currentMonth = String(currentDate.getMonth()),
    { previousMonth, previousYear } = getPreviousMonth(currentYear, currentMonth);

    return {
      month: previousMonth,
      year: previousYear,
    };
};

// new Date("2016-08-25T00:00:00Z") ---> 25.08.2016
export const formatDateObject = (date : Date) : string => {

  const dd = date.getDate(),
    mm = date.getMonth() + 1,
    yyyy = date.getFullYear(),
    addZero = (value) => {
      if (value < ten) {
        return `0${value}`;
      }

      return value;
    },
    newDD = addZero(dd),
    newMM = addZero(mm);

  return `${newDD}.${newMM}.${yyyy}`;
};

// "2016-08-25T00:00:00Z" ---> 25.08.2016
export const formatDate = (normalizedValue : string) : string => {

  const parts = normalizedValue.split("T");

  if (parts.length !== 2) {
    return normalizedValue;
  }

  const dateParts = parts[0].split("-"),
    nrOfParts = 3;

  if (dateParts.length !== nrOfParts) {
    return normalizedValue;
  }

  const [yyyy, mm, dd] = dateParts;

  if (!isValidDate(`${dd}.${mm}.${yyyy}`)) {
    return normalizedValue;
  }

  const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd), 0, 0, 0, 0);

  return formatDateObject(date);
};

// 25.08.2016 ---> 2016-08-25T00:00:00Z
export const normalizeDate = (currentValue : string) : string => {

  const normalizeCurrent = () : string => {
    const parts = currentValue.split("."),
      dd = parts[0],
      mm = parts[1],
      yyyy = parts[2];

    return `${yyyy}-${mm}-${dd}T00:00:00Z`;
  };

  if (isValidDate(currentValue)) {
    return normalizeCurrent();
  }

  return currentValue;
};
