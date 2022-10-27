// @flow

import agent from "superagent";

const normalizePayment = (resolve, reject) => (
  (error, response) => {

    if (error) {
      reject({ error });
    } else {
      const { body } = response,
        { Error } = body;

      if (typeof Error !== "undefined" && Error !== "") {
        reject({
          error: Error,
        });
      } else {
        resolve({
          ...body,
          Error,
        });
      }
    }
  }
);

export const addPayment = (data : any) => (
  new Promise((resolve, reject) => (
    agent.
      put("/api/settings/payments").
      set("Accept",
        "application/json").
      send(data).
      end(normalizePayment(resolve,
        reject))
  )) : Promise<any>
);

export const confirmBankTransfer = (data : any) => (
  new Promise((resolve, reject) => (
    agent.
      put("/api/settings/payments/confirm-bank-transfer").
      set("Accept",
        "application/json").
      send(data).
      end(normalizePayment(resolve,
        reject))
  )) : Promise<any>
);
