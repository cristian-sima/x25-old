// @flow

import type { State, Dispatch } from "src\\types";

import { connect } from "react-redux";

import Header from "./Header";

import { selectors } from "../Account/reducer";

import { isAdministratorAccount } from "../utility";

import { estimateCompanyPriceModal } from "../Payment/actions";

const
  mapStateToProps = (state : State) => {
    const data = selectors.getCurrentAccount(state);

    return {
      account : data,
      isAdmin : isAdministratorAccount(data.get("Type")),
    };
  },
  mapDispatchToProps = (dispatch : Dispatch) => ({
    showPayModal: (id) => () => {
      dispatch(estimateCompanyPriceModal(id));
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(Header);
