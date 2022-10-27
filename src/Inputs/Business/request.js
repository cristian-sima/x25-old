// @flow

import agent from "superagent";

const fields = [
  "Address",
  "IsVatPayer",
  "Name",
  "Phone",
  "Registration",
  "Email",
];

const normalizeCompanyDetails = (resolve, reject) => (
  (error, response) => {
    if (error) {
      reject({ error });
    } else {
      const { body } = response;

      resolve(fields.reduce((accumulator, currentValue) => ({
        // $FlowFixMe
        ...accumulator,
        // $FlowFixMe
        [currentValue]: body[currentValue],
      }), {}));
    }
  }
);

export const getCompanyDetails = (cif: string, reason : string) => (
  new Promise((resolve, reject) => (
    agent.
      post(`/api/extern/get-company-information/${cif}/${reason}`).
      type("json").
      end(normalizeCompanyDetails(resolve,
        reject))
  )) : Promise<any>
);
