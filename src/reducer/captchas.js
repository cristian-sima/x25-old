// @flow

import * as Immutable from "immutable";
import type { State } from "src\\types";

const initialState = Immutable.Map();

const
  showCaptcha = (state : any, { payload : { name, id } }) => (
    state.set(name,
      id)
  ),
  hideCaptcha = (state : any, { payload }) => (
    state.delete(payload)
  );

const captchasReducer = (state : any = initialState, action : any) => {
  switch (action.type) {
    case "SHOW_CAPTCHA":
      return showCaptcha(state,
        action);

    case "HIDE_CAPTCHA":
      return hideCaptcha(state,
        action);

    default:
      return state;
  }
};

const
  getCaptcha = (state : State, name : string) => (
    state.getIn([
      "captchas",
      name,
    ]) || ""
  );

export const selectors = {
  getCaptcha,
};

export default captchasReducer;
