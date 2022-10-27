// @flow

// import * as React from "react";

import type { State } from "src\\types";
import type { ModalsTypes } from "../Modal/types";

type Reducer = (state : State, action : any) => void;

type ReducerOptionsType = {
  key: string,
  func: Reducer,
};

type PaginatorType = {
  key: string,
  itemsReducer: Reducer;
  pagesReducer: Reducer;
};

type ReducersTypes = Array<ReducerOptionsType> | ReducerOptionsType;
type PaginatorsTypes = Array<PaginatorType> | PaginatorType;

type RouteType = {
  default: {
    module: string,
    Component: any,
    reducers: ReducersTypes,
    modals: ModalsTypes,
    paginators: PaginatorsTypes,
  },
}

export type {
  ReducersTypes,
  PaginatorsTypes,
  PaginatorType,
  RouteType,
};
