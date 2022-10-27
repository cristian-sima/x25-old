/* eslint-disable max-len, no-duplicate-imports */
// @flow

import type { NormalizedResult } from "src\\types";

type Normalizr = (item : any) => any;

type NormalizeBoolean = (input : "" | bool) => bool;
type NormalizeArray = (raw : Array<any>) => NormalizedResult;
type Normalize = (raw : Array<any>, field : string, normalizr : Normalizr) => NormalizedResult;
type DefaultNormalize = (raw : Array<any>, field : string) => NormalizedResult;

type Resolve = (data : any) => void;
type Reject = (arg : any) => void;

type Response = {
  body: any;
};

type Error = {
  status: any;
}

import * as Immutable from "immutable";

const timeout = 500;

const defaultNormalizr : Normalizr = (item) => Immutable.Map(item);

const defaultValue = () => ({
  entities : Immutable.Map(),
  result   : Immutable.List(),
});

export const customNormalizeArrayByField : Normalize = (raw : Array<any>, field : string, normalizr : Normalizr) => (
  raw === null ? defaultValue() : (
    raw.reduce((previous, current) => {
      const stringID = String(current[field]);

      previous.entities = previous.entities.set(stringID,
        normalizr(current));

      previous.result = previous.result.push(stringID);

      return previous;
    }, defaultValue())
  )
);

export const normalizeArrayByField : DefaultNormalize = (raw : Array<any>, field : string) => (
  customNormalizeArrayByField(raw,
    field,
    defaultNormalizr)
);

export const withPromiseCallback = (resolve : Resolve, reject : Reject) => (error : Error, response : Response) => {
  if (error) {
    const StatusUnauthorized = 401;

    if (error.status === StatusUnauthorized) {
      document.location.href = "/";
    } else {
      // error.message
      reject({ error: "Ceva nu a funcționat cum trebuia" });
    }
  } else {
    resolve(response.body);
  }
};

export const withHandlePDFCallback = (
  { resolve, reject, title } : { resolve : Resolve, reject : Reject, title : string },
) => (error : Error, response : Response) => {
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  const newBlob = new Blob([response.body],
    { type: "application/pdf" });

  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);
    return;
  }

  // For other browsers:
  // Create a link pointing to the ObjectURL containing the blob.
  const data = window.URL.createObjectURL(newBlob);
  const link = document.createElement("a");

  link.href = data;
  link.download = `${title}.pdf`;
  link.click();
  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(data);
    withPromiseCallback(resolve,
      reject)(error,
      response);
  }, timeout);
};

/*
 * entities ---> Object { "1": Immutable.Map(), ... ]) }
 * result ---> List([ "1", "2", "3" ])
 */

export const normalizeArray : NormalizeArray = (raw : Array<any>, normalizr?: Normalizr) => (
  customNormalizeArrayByField(raw,
    "ID",
    typeof normalizr === "undefined" ? defaultNormalizr : normalizr)
);

export const normalizeBoolean : NormalizeBoolean = (value : boolean | "") => value || false;

export const normalizeSelectNumeric = (raw : string) => (
  (typeof raw === "string" && raw !== "") ? parseInt(raw,
    10) : raw
);
