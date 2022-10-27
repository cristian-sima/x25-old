// @flow

import agent from "superagent";
import * as Immutable from "immutable";

import { noError, normalizeArrayByField, withPromiseCallback, normalizeArray } from "../utility";


const normalizeCompanies = (companies) => (
  companies.map((company) => ({
    ...company,
    CountyID : company.CountyID.Int32,
    CityID   : company.CityID.Int32,
  }))
);


const normalizeInitialInformation = (info : any) => {

  const
    { Account, IsConnected, Counties, Companies } = info;

  return {
    Account  : Immutable.Map(Account || {}),
    IsConnected,
    Error    : IsConnected ? noError : "Not connected",
    Counties : (typeof Counties === "undefined") ? Immutable.List() : (
      normalizeArrayByField(Counties,
        "Short").entities
    ),
    Companies: (typeof Companies === "undefined") ? Immutable.List() : (
      normalizeArray(normalizeCompanies(Companies)).entities
    ),
  };
};

export const fetchInitialInformation = (app : string) => (
  new Promise((resolve, reject) => (
    agent.
      get("/api/extern/get-initial-information").
      type("form").
      query({ app }).
      end(withPromiseCallback((reponse) => resolve(normalizeInitialInformation(reponse)),
        reject))
  )) : Promise<any>
);
