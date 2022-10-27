// @flow
/* eslint-disable global-require */

import * as Immutable from "immutable";

import type { Action, State } from "src\\types";

import { createSelector } from "reselect";

import { noError } from "../utility";

import { getIDFromURL } from "./util";

const reducerKey = "companyInfo";

type CurrentState = any;

const initialState : CurrentState = Immutable.Map({
  error    : noError,
  fetched  : false,
  fetching : false,

  company: Immutable.Map(),
});

const
  fetchCompanyPending = () => (
    initialState.set("fetching",
      true)
  ),
  fetchCompanyRejected = (state : any, { payload : { error } }) => (
    state.merge({
      error,
      fetching: false,
    })
  ),
  fetchCompanyFulfilled = (state : any, { payload }) => (
    state.mergeDeep({
      fetched  : true,
      fetching : false,
      company  : payload,
    })
  ),
  modifyCompany = (state : any, { payload }) => (
    state.set("company",
      payload)
  ),
  clearInfoIfCurrentCompany = (state : any, { payload }) => {
    const
      companyID = String(state.getIn([
        "company",
        "ID",
      ])),
      fetched = state.get("fetched"),
      dataID = String(payload.get("ID")),
      theCurrentCompanyHasChanged = fetched && (dataID === companyID);

    if (theCurrentCompanyHasChanged) {
      return state.clear();
    }

    return state;
  };

const reducer = (state : any = initialState, action : Action) => {
  switch (action.type) {
    case "FETCH_CURRENT_COMPANY_INFO_PENDING":
      return fetchCompanyPending();

    case "FETCH_CURRENT_COMPANY_INFO_REJECTED":
      return fetchCompanyRejected(state,
        action);

    case "FETCH_CURRENT_COMPANY_INFO_FULFILLED":
      return fetchCompanyFulfilled(state,
        action);

    case "MODIFY_CURRENT_COMPANY_INFO":
      return modifyCompany(state,
        action);

    case "TOGGLE_COMPANY_STATE":
    case "DELETE_COMPANY":
      return clearInfoIfCurrentCompany(state,
        action);

    default:
      return state;
  }
};

const
  getFetching = (state : State) => state.getIn([
    reducerKey,
    "fetching",
  ]) || false,
  getFetched = (state : State) => state.getIn([
    reducerKey,
    "fetched",
  ]) || false,
  getError = (state : State) => state.getIn([
    reducerKey,
    "error",
  ]) || noError,
  getCurrentAccountFetched = (state : State) => state.getIn([
    "account",
    "fetched",
  ]) || false;

const checkForNoErrors = (error) => error !== noError;

const
  getCurrentCompany = (state : State) : any => (
    state.getIn([
      reducerKey,
      "company",
    ]) || Immutable.Map()
  ),
  getCurrentCompanyIsFetched = createSelector(
    getFetching,
    getFetched,
    getError,
    (isFetching, isFetched, error) => (
      !isFetching && isFetched && error === noError
    ),
  ),
  getCurrentCompanyIsFetching = createSelector(
    getFetching,
    getError,
    (isFetching, error) => (
      isFetching && error === noError
    ),
  ),
  getCurrentCompanyHasError = createSelector(
    getError,
    checkForNoErrors,
  ),
  getCurrentCompanyShouldFetch = createSelector(
    getCurrentAccountFetched,
    getCurrentCompanyIsFetched,
    getCurrentCompanyHasError,
    getFetching,
    getCurrentCompany,
    (accountFetched, isFetched, hasError, isFetching, company) => (rawID : string) => {
      const
        hasIDChanged = () => {
          const
            id = company.get("ID"),
            newID = Number(rawID);

          return (
            id === 0 ||
          id !== newID ||
          (id === newID && !isFetched)
          );
        };

      return (
        accountFetched && !hasError && !isFetching && hasIDChanged()
      );
    },
  ),
  getCompanyModules = createSelector(
    getCurrentCompany,
    (company) => company.get("Modules") || "",
  ),

  /*
    This function is special, because it is called also in the
    requests
    In case the state is not ready, we take the id of the current company
    from the URL

    The url must have this pathname:

    something/:companyID/something...
  */
  getCurrentCompanyID = (state : any) => {
    if (typeof state === "undefined" || state === null) {
      return getIDFromURL();
    }

    return state.getIn([
      reducerKey,
      "company",
      "ID",
    ]);
  };


export const selectors = {
  getCurrentCompany,
  getCurrentCompanyIsFetched,
  getCurrentCompanyIsFetching,
  getCurrentCompanyHasError,
  getCurrentCompanyShouldFetch,
  getCompanyModules,
  getCurrentCompanyID,
};

export default reducer;
