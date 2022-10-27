// @flow
/* eslint-disable no-alert, no-console, no-undefined, callback-return, max-len */

import * as Immutable from "immutable";

const setFavIconToDev = () => {
  const element : any = document.querySelector("link[rel*='icon");

  if (element !== null && element.href) {
    element.href = "/static/dev.ico";
  }
};

const ensureImmutableState = (ignored : Array<*> = []) => {

  const ignore = (key : string) => (
    ignored.includes(key)
  );

  const isGood = (data, key) => (
    ignore(key) ||
  data === null ||
  data === undefined ||
  Immutable.isImmutable(data) ||
  typeof data === "number" ||
  typeof data === "boolean" ||
  typeof data === "string"
  );

  let
    problems : any = Immutable.Map(),
    allKeys = Immutable.List(),
    currentKey = Immutable.List();

  const listCurrentProblems = () => {
    if (currentKey.size !== 0) {
      const log = ({ data, state, key }) => {
        const itExists = (
          typeof data !== "undefined" ||
          typeof state !== "undefined" ||
          typeof key !== "undefined"
        );

        if (itExists) {
          console.group("redux-ensure-state-is-immutable");
          console.log("data:",
            data);
          console.log("parent:",
            state.toJS());
          console.log("typeof data:",
            typeof data);
          console.log("key:",
            key);
          console.groupEnd();
        }
      };

      alert("something is not immutable. check console");

      currentKey.map((current) => log(problems.get(current)));
      currentKey = currentKey.clear();
    }
  };

  const addProblem = ({ data, state, key }) => {
    problems = problems.set(key,
      {
        key,
        state,
        data,
      });

    if (!allKeys.includes(key)) {
      allKeys = allKeys.push(key);
      currentKey = currentKey.push(key);
    }
  };

  const shouldParse = (data, key) => (
    !ignore(key) &&
  Immutable.isImmutable(data)
  );

  const checkStateContainsOnlyImmutable = (state) => {
    const parse = (data, key) => {
      const goodData = isGood(data,
        key);
      const canParse = shouldParse(data,
        key);

      if (!goodData) {
        addProblem({
          data,
          state,
          key,
        });
      }

      listCurrentProblems();

      if (canParse) {
        checkStateContainsOnlyImmutable(data);
      }
    };

    state.forEach((current, key) => {
      parse(current,
        key);
    });
  };

  return ({ getState } : any) => (next : any) => (action : any) => {

    const
      returnValue = next(action),
      state = getState();

    checkStateContainsOnlyImmutable(state);

    return returnValue;
  };
};

export {
  setFavIconToDev,
  ensureImmutableState,
};
