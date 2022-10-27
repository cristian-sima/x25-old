// @flow

import type { List as ImmutableList, Map as ImmutableMap } from "immutable";

type ReduxError = {
  error: any;
}

import React from "react";
import { SubmissionError } from "redux-form/immutable";

export const getDateSortNumber = (item : string) => (
  Number(new Date(item).getTime())
);

export const isAdministratorAccount = (current : number) => (
  current === 0
);

export const createModal = (modalType : string, modalProps? : any) => ({
  type    : "SHOW_MODAL",
  payload : {
    modalType,
    modalProps,
  },
});

export const
  noError = "",
  rowsPerLoad = 50,
  nothingFetched = -1;

export const removeID = (payload : ImmutableMap<string, any>) => (list : ImmutableList<string>) => (
  // $FlowFixMe
  list.delete(list.findIndex((current : string) => current === String(payload.get("ID"))))
);

export const addID = (payload : ImmutableMap<string, any>) => (list : ImmutableList<string>) => (
  list.push(String(payload.get("ID")))
);

export const ReduxFormSubmissionError = (error? : ReduxError) => {
  if (error) {
    if (error instanceof SubmissionError) {
      throw error;
    }

    const _error = typeof error.error === "string" ? error.error : "Am pierdut conexiunea cu server-ul";

    throw new SubmissionError({
      _error,
    });
  }
};

export const delay = () => (
  new Promise((resolve) => {
    setTimeout(resolve);
  }) : Promise<any>
);

export const showCheck = (value : boolean) => (
  value ? (
    <i className="fa fa-check text-success" />
  ) : null
);

export const userHasPressedCKeyAlone = (currentEvent : KeyboardEvent) : boolean => {
  const {
    ctrlKey,
    keyCode,
    srcElement: {
      localName,
    },
  } = currentEvent;

  const
    createInvoiceKey = 67,
    tag = localName.toLowerCase(),
    isNotInputOrTextarea = (
      tag !== "input" &&
      tag !== "textarea"
    );

  return (
    !ctrlKey &&
    keyCode === createInvoiceKey &&
    isNotInputOrTextarea
  );
};

export const years = [
  {
    value : 2018,
    name  : "2018",
  },
  {
    value : 2019,
    name  : "2019",
  },
  {
    value : 2020,
    name  : "2020",
  },
  {
    value : 2021,
    name  : "2021",
  },
];

export const months = [
  {
    value : 0,
    name  : "Ianuarie",
  },
  {
    value : 1,
    name  : "Februarie",
  },
  {
    value : 2,
    name  : "Martie",
  },
  {
    value : 3,
    name  : "Aprilie",
  },
  {
    value : 4,
    name  : "Mai",
  },
  {
    value : 5,
    name  : "Iunie",
  },
  {
    value : 6,
    name  : "Iulie",
  },
  {
    value : 7,
    name  : "August",
  },
  {
    value : 8,
    name  : "Septembrie",
  },
  {
    value : 9,
    name  : "Octombrie",
  },
  {
    value : 10,
    name  : "Noiembrie",
  },
  {
    value : 11,
    name  : "Decembrie",
  },
];
