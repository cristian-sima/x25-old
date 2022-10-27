// @flow

import type { Action, State } from "src\\types";

import { createSelector } from "reselect";
import * as Immutable from "immutable";

import { isAdministratorAccount, noError } from "../utility";

const initialState = Immutable.Map({
  error    : noError,
  fetched  : false,
  fetching : false,

  info      : Immutable.Map(),
  companies : Immutable.Map(),
});

const
  fetchCurrentAccountPending = (state : any) => (
    state.merge({
      error    : noError,
      fetching : true,
    })
  ),
  fetchCurrentAccountRejected = (state : any, { payload : { error } }) => (
    state.merge({
      error,
      fetching: false,
    })
  ),
  fetchCurrentAccountFulfilled = (state : any, { payload }) => (
    state.mergeDeep({
      fetched  : true,
      fetching : false,

      info      : payload.Account,
      companies : payload.Companies,
    })
  ),
  accountChangePassword = (state : any) => (
    state.setIn([
      "info",
      "RequireChange",
    ], false)
  ),
  accountGaveConsent = (state : any) => (
    state.setIn([
      "info",
      "HasToGiveConsent",
    ], false)
  );

const reducer = (state : any = initialState, action : Action) => {

  switch (action.type) {
    case "FETCH_INITIAL_INFORMATION_PENDING":
      return fetchCurrentAccountPending(state);

    case "FETCH_INITIAL_INFORMATION_REJECTED":
      return fetchCurrentAccountRejected(state,
        action);

    case "FETCH_INITIAL_INFORMATION_FULFILLED":
      return fetchCurrentAccountFulfilled(state,
        action);

    case "ACCOUNT_CHANGE_PASSWORD":
      return accountChangePassword(state);

    case "ACCOUNT_GAVE_CONSENT":
      return accountGaveConsent(state);

    default:
      return state;
  }
};

const
  getFetched = (state : State) => state.getIn([
    "account",
    "fetched",
  ]),
  getError = (state : State) => state.getIn([
    "account",
    "error",
  ]);

const
  getCurrentAccount = (state : State) => state.getIn([
    "account",
    "info",
  ]),
  getCurrentAccountCompanies = (state : State) => state.getIn([
    "account",
    "companies",
  ]),
  getCurrentAccountIsFetching = (state : State) => state.getIn([
    "account",
    "fetching",
  ]),
  getCurrentAccountShouldFetch = createSelector(
    getCurrentAccountIsFetching,
    getFetched,
    getError,
    (isFetching, isFetched, error) => (
      !isFetching && !isFetched && error === noError
    ),
  ),
  getCurrentAccountIsFetched = createSelector(
    getCurrentAccountIsFetching,
    getFetched,
    getError,
    (isFetching, isFetched, error) => (
      !isFetching && isFetched && error === noError
    ),
  ),
  getCurrentAccountHasError = createSelector(
    getError,
    (error) => error !== noError,
  ),
  getIsCurrentAccountAdministrator = createSelector(
    getCurrentAccount,
    (account) => (
      isAdministratorAccount(account.get("Type"))
    ),
  );

export const selectors = {
  getCurrentAccountCompanies,
  getCurrentAccount,
  getCurrentAccountIsFetching,
  getCurrentAccountShouldFetch,
  getCurrentAccountIsFetched,
  getCurrentAccountHasError,
  getIsCurrentAccountAdministrator,
};

export default reducer;
