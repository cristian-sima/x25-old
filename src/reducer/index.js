// @flow

import modal, { selectors as modalSelectors } from "../Modal/reducer";
import account, { selectors as accountSelectors } from "../Account/reducer";

import captchas, { selectors as captchasReducer } from "./captchas";
import module from "./module";

const state = {
  module,
  account,
  captchas,
  modal,
};

const selectors = {
  ...captchasReducer,
  ...accountSelectors,
  ...modalSelectors,
};

export {
  state,
  selectors,
};
