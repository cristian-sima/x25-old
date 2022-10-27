// @flow

import agent from "superagent";
import * as Immutable from "immutable";

import { withPromiseCallback } from "../utility";
import { selectors } from "./reducer";

export const fetchCurrentCompany = (id : string) => (
  new Promise((resolve, reject) => (
    agent.
      get(`/api/company/${id}/get-information`).
      set("Accept",
        "application/json").
      end(withPromiseCallback((data) => resolve(Immutable.Map(data)),
        reject))
  )) : Promise<any>
);

export const modifyCurrentCompany = (data : any) => (
  new Promise((resolve, reject) => (
    agent.
      post(`/api/company/${selectors.getCurrentCompanyID()}/modify-info`).
      set("Accept",
        "application/json").
      send(data).
      end(withPromiseCallback(resolve,
        reject))
  )) : Promise<any>
);
