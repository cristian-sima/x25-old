// @flow

import * as Immutable from "immutable";

const initialState = Immutable.Map();

const
  initModule = (state : any, { payload }) => (
    state.set(payload, true)
  );

const reducer = (state : any = initialState, action : any) => {

  switch (action.type) {
    case "INIT_MODULE":
      return initModule(state, action);

    default:
      return state;
  }
};

const getIsModuleReady = (state : any, id : string) => (
  state.getIn([
    "module",
    id,
  ]) || false
);

const moduleIsReadyAction = (payload : string) => ({
  type: "INIT_MODULE",
  payload,
});

export {
  // selectors
  getIsModuleReady,

  // actions
  moduleIsReadyAction,
};

export default reducer;
