// @flow

import type { State } from "src\\types";

type ModalRootPropTypes = {
  +list: any;
};

import { connect } from "react-redux";
import React from "react";

import getComponent from "./getComponent";

import { selectors } from "./reducer";

const mapStateToProps = (state : State) => ({
  list: selectors.getModals(state),
});

class ModalRoot extends React.Component<ModalRootPropTypes> {

  props: ModalRootPropTypes;

  shouldComponentUpdate (nextProps : ModalRootPropTypes) {
    return this.props.list !== nextProps.list;
  }

  render () {
    const { list } = this.props;

    if (list.size === 0) {
      return null;
    }

    return (
      list.map((current, index) => {
        const
          modalType = current.get("type"),
          Component = getComponent(modalType);

        if (typeof Component === "undefined") {
          return (
            <div>
              {`No MODAL component for the type [${modalType}] in Modal/components.jsx`}
            </div>
          );
        }

        return (
          <Component key={index} {...current.get("props").toJS()} />
        );
      })
    );
  }
}

export default connect(mapStateToProps)(ModalRoot);
