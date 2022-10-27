// @flow

import type { Dispatch } from "src\\types";

type SimpleModalPropTypes = {
  +size?: string;
  +title: string;
  +children: any;

  +hideModal: () => void;
};

import { connect } from "react-redux";
import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import { hideModal as hideModalAction } from "./actions";

import { delay } from "../utility";

const
  mapDispatchToProps = (dispatch : Dispatch, { cbHideModal }) => ({
    hideModal () {
      delay().
        then(() => {
          dispatch(hideModalAction());
        }).
        then(() => {
          if (typeof cbHideModal === "function") {
            cbHideModal();
          }
        });
    },
  });

const SimpleModal = ({ hideModal, children, size, title } : SimpleModalPropTypes) => (
  <Modal autoFocus isOpen size={size} toggle={hideModal} zIndex="1061">
    <ModalHeader toggle={hideModal}>
      { title }
    </ModalHeader>
    <ModalBody>
      { children }
    </ModalBody>
  </Modal>
);

export default connect(null, mapDispatchToProps)(SimpleModal);
