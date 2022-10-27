// @flow

import type { ModalsTypes } from "./types";

let all = {};

export const injectModals = (newModals : ModalsTypes) => {
  all = {
    ...all,
    // $FlowFixMe
    ...newModals,
  };
};

export const getModal = (type : string) => all[type];
