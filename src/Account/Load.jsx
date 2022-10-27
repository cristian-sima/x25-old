// @flow
/* eslint-disable react/require-optimization */

import type { Dispatch, State } from "src\\types";

type PropTypes = {
  +appName: string;
  +isFetching: bool;
  +hasError: bool;
  +data: any;
  +children: any;
  +shouldFetch: any;

  +fetchInitialInformation: () => void;
}

import React from "react";

import { connect } from "react-redux";

import { selectors } from "./reducer";

import { fetchInitialInformation as fetchInitialInformationAction } from "./actions";

import { LargeErrorMessage, LoadingMessage } from "../Messages";

const
  mapStateToProps = (state : State) => ({
    data        : selectors.getCurrentAccount(state),
    hasError    : selectors.getCurrentAccountHasError(state),
    fetched     : selectors.getCurrentAccountIsFetched(state),
    isFetching  : selectors.getCurrentAccountIsFetching(state),
    shouldFetch : selectors.getCurrentAccountShouldFetch(state),
  }),
  mapDispatchToProps = (dispatch : Dispatch, { appName }) => ({
    fetchInitialInformation () {
      setTimeout(() => {
        dispatch(fetchInitialInformationAction(appName));
      });
    },
  });

const LoadAccount = (props : PropTypes) => {
  const { children, data, isFetching, shouldFetch, hasError, fetchInitialInformation } = props;

  React.useEffect(() => {
    if (shouldFetch) {
      fetchInitialInformation();
    }
  }, [
    shouldFetch,
    isFetching,
    hasError,
  ]);

  if (isFetching) {
    return (
      <LoadingMessage message="Așteaptă..." />
    );
  }

  if (hasError) {
    return (
      <LargeErrorMessage
        message="Nu am putut stabili conexiunea cu server-ul"
        onRetry={fetchInitialInformation}
      />
    );
  }

  if (data.size === 0) {
    return null;
  }

  return children;
};

export default connect(mapStateToProps,
  mapDispatchToProps)(LoadAccount);
