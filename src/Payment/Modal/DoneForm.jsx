// @flow
/* eslint-disable no-magic-numbers, max-classes-per-file */

import type { Dispatch, State } from "src\\types";

type FormPropTypes = {
  +error?: string;
  +pristine: boolean;
  +submitting: boolean;
  +handleSubmit: (formData : any) => Promise<*>;
};

type DoneFormPropTypes = {
  +details: string;
  +showUserResponse: () => void;
};

import { connect } from "react-redux";
import { SubmissionError, Field, reduxForm, formValueSelector } from "redux-form/immutable";

import React from "react";

import { showTransferWasDone } from "../actions";

import { confirmBankTransfer as confirmBankTransferRequest } from "../request";

import {
  extractErrorsFromCheckers,
  validateString,
  delay,
  ReduxFormSubmissionError,
} from "../../utility";

import { hideModal } from "../../actions";
import { LoadingMessage } from "../../Messages";
import { FocusTemplate } from "../../Inputs";

const
  TransferNumber = validateString({
    min: 4,
  });

const validate = extractErrorsFromCheckers({
  TransferNumber,
});

const selector = formValueSelector("ADD_CAR_FORM");

const
  mapStateToProps = (state : State) => ({
    ExpiryDate: selector(state, "ExpiryDate"),
  }),
  mapDispatchToProps = (dispatch : Dispatch) => ({
    showUserResponse () {
      delay().
        then(() => {
          dispatch(hideModal());
        }).
        then(() => {
          dispatch(hideModal());
        }).
        // then(() => {
        //   dispatch(notify("Operațiune îndeplinită cu succes"));
        // }).
        then(() => {
          dispatch(showTransferWasDone());
        });
    },
  });


class TheForm extends React.Component<FormPropTypes> {

    props: FormPropTypes;

    field: any;

    handleSubmitForm: (data : any) => void;
    handleRegisterRef: (node : any) => void;
    focusNameInput: () => void;

    constructor (props : FormPropTypes) {
      super(props);

      this.handleSubmitForm = (data : any) => {
        const { handleSubmit } = this.props;

        const result = handleSubmit(data);

        if (typeof result.then !== "undefined") {
          result.then(() => {
            this.focusNameInput();
          });
        }
      };

      this.focusNameInput = () => {
        setTimeout(() => {
          const { field } = this;

          if (field && field !== null) {
            field.focus();
          }
        });
      };

      this.handleRegisterRef = (node : any) => {
        this.field = node;
      };
    }

    componentDidMount () {
      this.focusNameInput();
    }

    render () {
      const { error, pristine, submitting } = this.props;

      return (
        <form autoComplete="off" className="mt-4" onSubmit={this.handleSubmitForm}>
          {error ? (
            <div className="alert alert-danger">
              {error}
            </div>
          ) : null}
          <div className="alert alert-primary">
            {"Te rugăm să completezi numărul tranzacției bancare:"}
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md">
                <Field
                  autoFocus
                  component={FocusTemplate}
                  forwardRef
                  label="Număr tranzacție"
                  name="TransferNumber"
                  onRegisterRef={this.handleRegisterRef}
                  placeholder="ex. 238747324"
                />
              </div>
            </div>
          </div>
          <div className="text-center mb-4">
            {
              submitting ? (
                <LoadingMessage sm />
              ) : (
                <button
                  aria-label="Trimite"
                  className="btn btn-primary"
                  disabled={pristine || submitting}
                  type="submit">
                  {"Trimite"}
                </button>
              )
            }
          </div>
        </form>
      );
    }
}

const
  Form = reduxForm({
    form: "PAYMENT_BANK_TRANSFER_NUMBER",
    validate,
  })(TheForm);

class DoneForm extends React.Component<DoneFormPropTypes> {

  props: DoneFormPropTypes;

  handleSubmit: (formData : any) => Promise<*>;

  constructor () {
    super();

    this.handleSubmit = (formData : any) => {

      const
        { showUserResponse } = this.props,
        data = {
          ...formData.toJS(),
          Details: this.props.details,
        };

      return confirmBankTransferRequest(data).
        then((response : any) => {
          if (response.Error === "") {
            showUserResponse();
          } else {
            throw new SubmissionError({
              _error: response.Error,
            });
          }
        }).
        catch(ReduxFormSubmissionError);
    };
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoneForm);
