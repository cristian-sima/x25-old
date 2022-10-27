// @flow

import agent from "superagent";

import { withPromiseCallback } from "../utility";

export const fetchSuggestions = (search : string) => (
  new Promise((resolve, reject) => (
    agent.
      get("/api/account/get-companies").
      type("form").
      set("Accept",
        "application/json").
      query({ search }).
      end(withPromiseCallback(resolve,
        reject))
  )) : Promise<any>
);

export const logOut = () => (
  new Promise((resolve, reject) => (
    agent.
      post("/api/account/logout").
      type("form").
      end(withPromiseCallback(resolve,
        reject))
  )) : Promise<any>
);
