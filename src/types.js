// @flow
/* eslint-disable no-use-before-define */

import type { List as ListType, Map as MapType } from "immutable";

export type State = any;

export type Action = any;

export type ErrorType = string;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type Dispatch = (action: any | ThunkAction | PromiseAction) => any;
export type GetState = () => State;
export type PromiseAction = Promise<any>;

export type ModalActionType = string;

export type NullUInt = {
  Valid: bool;
  UInt: number;
};

export type ModalPayload = {
  modalType: ModalActionType;
  modalProps: any;
};

export type NormalizedResult = {
  entities : MapType<string, any>;
  result : ListType<string>;
};
