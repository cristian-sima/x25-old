// @flow

import type { Action, State } from "src\\types";

import * as Immutable from "immutable";
import { createSelector } from "reselect";

const initialState = Immutable.Map();

const
  fetchCurrentAccountFulfilled = (state : any, { payload }) => (
    payload.Counties
  );

const reducer = (state : any = initialState, action : Action) => {
  switch (action.type) {
    case "FETCH_INITIAL_INFORMATION_FULFILLED":
      return fetchCurrentAccountFulfilled(state,
        action);

    default:
      return state;
  }
};

const
  getCounties = (state : State) => state.get("counties"),
  getCountiesList = createSelector(
    getCounties,
    (ids) => ids.toList(),
  ),
  getCounty = (state : State, id : string) => (
    getCounties(state).get(id)
  ),
  getCountiesSorted = createSelector(
    getCountiesList,
    (list) => list.sortBy((county) => county.get("Name")),
  );

export const selectors = {
  getCounties,
  getCounty,
  getCountiesSorted,
};

export default reducer;
