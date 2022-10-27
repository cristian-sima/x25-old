// @flow
/* eslint-disable handle-callback-err, react/forbid-component-props, no-console */

import type { Dispatch } from "src\\types";

type onConfirmMethodsTypes = {
  startPerforming: () => void;
  endPerforming: (cb : any) => void;
  closeModal: () => void;
};

type ConfirmPropTypes = {
  +cancelButtonLabel: ?string;
  +confirmButtonLabel: ?string;
  +message: any;
  +errMessage?: string;
  +focusButton: boolean;
  +title?: string;
  +confirmButtonColor?: "primary" | "secondary" | "danger" | "success" | "link" | "info" | "warning";

  +onConfirm: (methods : onConfirmMethodsTypes) => () => void;
  +closeModal: () => void;
  +showError: (message? : string) => void;
  +request: () => Promise<*>;
  +onSuccess: (response : any) => void;
  +isResponseValid: (response : any) => {
    valid: boolean;
    error: string;
  };
};

type ConfirmStateTypes = {
  isPerforming: boolean,
};

import React from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { language } from "../utility";

const { message : languageMessage, label } = language;

import * as actions from "./actions";
import * as x25-react16Actions from "../actions";

const
  mapDispatchToProps = (dispatch : Dispatch) => ({
    closeModal () {
      dispatch(actions.hideModal());
    },
    showError (errMessage) {
      dispatch(x25-react16Actions.notifyError(errMessage));
    },
  });

class Confirm extends React.Component<ConfirmPropTypes, ConfirmStateTypes> {

  /* eslint-disable max-statements */

  static defaultProps = {
    errMessage         : languageMessage.failPerform,
    title              : label.confirmation,
    cancelButtonLabel  : label.cancel,
    confirmButtonColor : "danger",
    confirmButtonLabel : label.remove,
    focusButton        : true,

    isResponseValid: (response : any) => ({
      valid : response === "",
      error : response,
    }),
  }

  props: ConfirmPropTypes;

  state: ConfirmStateTypes;

  field: any;

  endPerforming: () => void;
  handleConfirmation: (startPerforming: any, endPerforming: any) => void;
  handleConfirmButton: (node : any) => void;
  startPerforming: () => void;
  focusConfirmButton: () => any;

  constructor (props : ConfirmPropTypes) {

    super(props);

    const that = this;

    this.state = {
      isPerforming: false,
    };

    this.handleConfirmButton = (node : any) => {
      this.field = node;
    };

    this.focusConfirmButton = () => setTimeout(() => {
      const { focusButton } = this.props;

      if (focusButton) {
        setTimeout(() => {
          const { field } = this;

          if (field && field !== null) {
            field.focus();
          }
        });
      }
    });

    this.startPerforming = (cb : any) => {
      this.setState({
        isPerforming: true,
      }, cb);
    };

    this.endPerforming = (cb : any) => this.setState({
      isPerforming: false,
    }, () => {

      /* eslint-disable callback-return */

      that.focusConfirmButton();

      if (typeof cb === "function") {
        cb();
      }
    });

    const { startPerforming, endPerforming } = this;

    this.handleConfirmation = () => {
      const {
        request,
        onSuccess,
        closeModal,
        errMessage,
        showError,
        isResponseValid,
      } = this.props;

      startPerforming(() => {
        request().
          then((response : string) => {
            const { valid, error } = isResponseValid(response);

            if (valid) {
              closeModal();
              onSuccess(response);
            } else {
              endPerforming();
              showError(error);
            }
          }).
          catch((exception) => {
            endPerforming();
            showError(errMessage);
            // eslint-disable
            console.log("exception", exception);
          });
      });
    };
  }

  componentDidMount () {
    this.focusConfirmButton();
  }

  shouldComponentUpdate (nextProps : ConfirmPropTypes, nextState : ConfirmStateTypes) {
    return (
      this.props.cancelButtonLabel !== nextProps.cancelButtonLabel ||
      this.props.confirmButtonLabel !== nextProps.confirmButtonLabel ||
      this.props.focusButton !== nextProps.focusButton ||
      this.props.title !== nextProps.title ||
      this.props.confirmButtonColor !== nextProps.confirmButtonColor ||

      this.state.isPerforming !== nextState.isPerforming
    );
  }

  render () {

    const { isPerforming } = this.state;

    const {
      cancelButtonLabel,
      confirmButtonLabel,
      message,
      title,
      confirmButtonColor,
      closeModal,
    } = this.props;

    const getConfirmButtonText = () => {
      if (isPerforming) {
        return (
          <span>
            <i className="fa fa-refresh fa-spin fa-fw" />
            {" Așteaptă"}
          </span>
        );
      }

      return confirmButtonLabel;
    };

    return (
      <Modal autoFocus={!this.props.focusButton} isOpen toggle={closeModal} zIndex="1061">
        <ModalHeader toggle={closeModal}>
          {title}
        </ModalHeader>
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button className="me-1" color="secondary" onClick={closeModal}>
            {cancelButtonLabel}
          </Button>
          <button
            className={`btn ${confirmButtonColor ? `btn-${confirmButtonColor}` : ""}`}
            disabled={isPerforming}
            onClick={this.handleConfirmation}
            ref={this.handleConfirmButton}
            type="button">
            {getConfirmButtonText()}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(null, mapDispatchToProps)(Confirm);
