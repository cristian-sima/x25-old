// @flow;

import type { State } from "src\\types";

import { connect } from "react-redux";
import { selectors } from "../../reducer";

import CustomSelect from "./Custom";

const
  mapStateToProps = (state : State) => ({
    data        : selectors.getCountiesSorted(state),
    label       : "Județ",
    isImmutable : true,
    nameKey     : "Name",
    valueKey    : "Short",
  });

export default connect(mapStateToProps)(CustomSelect);
