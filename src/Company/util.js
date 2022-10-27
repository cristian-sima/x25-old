// @flow

export const getIDFromURL = () => {
  const parts = String(window.location.pathname).split("/");

  return parts[2];
};
