// @flow
/* eslint-disable react/require-optimization */

import type { Dispatch, State } from "src\\types";

type PropTypes = {
  +isAdministrator: bool;
  +isFetching: bool;
  +hasError: bool;

  +data: any;
  +shouldFetch: any;
  +children: any;

  +fetchCurrentCompany: () => void;
}

import React from "react";

import { withRouter } from "react-router-dom";
// import moment from "moment";
import { connect } from "react-redux";

import { selectors } from "./reducer";
import { accountSelectors } from "../Account";

import { fetchCurrentCompany as fetchCurrentCompanyAction } from "./actions";

import { LargeErrorMessage, LoadingMessage } from "../Messages";

// import EstimatePrice from "../Payment/EstimatePrice";

const
  mapStateToProps = (state : State) => ({
    isAdministrator : accountSelectors.getIsCurrentAccountAdministrator(state),
    data            : selectors.getCurrentCompany(state),
    hasError        : selectors.getCurrentCompanyHasError(state),
    fetched         : selectors.getCurrentCompanyIsFetched(state),
    isFetching      : selectors.getCurrentCompanyIsFetching(state),
    shouldFetch     : selectors.getCurrentCompanyShouldFetch(state),
  }),
  mapDispatchToProps = (dispatch : Dispatch, { match : { params : { company } } }) => ({
    fetchCurrentCompany () {
      dispatch(fetchCurrentCompanyAction(company));
    },
  });


const LoadCompany = (props : PropTypes) => {
  const { children, data, isFetching, shouldFetch, hasError, fetchCurrentCompany } = props;

  React.useEffect(() => {
    if (shouldFetch) {
      fetchCurrentCompany();
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
        onRetry={fetchCurrentCompany}
      />
    );
  }

  if (data.size === 0) {
    return null;
  }

  return children;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoadCompany));
