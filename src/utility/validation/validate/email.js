// @flow

export const isValidEmail = (value : string) : boolean => (
  /* eslint-disable-next-line */
  new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm).test(value)
);
