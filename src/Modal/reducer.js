// @flow

import type { Action, State } from "src\\types";

import * as Immutable from "immutable";

const initialState = Immutable.List();

const
  showModal = (state : any, { payload : { modalType, modalProps } }) => (
    state.push(Immutable.Map({
      type  : modalType,
      props : Immutable.Map(modalProps),
    }))
  ),
  hideModal = (state : any) => (
    state.pop()
  );

const reducer = (state : any = initialState, action : Action) => {
  switch (action.type) {
    case "SHOW_MODAL":
      return showModal(state,
        action);

    case "HIDE_MODAL":
      return hideModal(state);

    default:
      return state;
  }
};

const getModals = (state : State) => state.get("modal") || Immutable.List();

export const selectors = {
  getModals,
};

export default reducer;
