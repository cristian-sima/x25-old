// @flow
/* eslint-disable no-magic-numbers */

import type { BankTransferArgsTypes, PayUsingBankTransferType } from "./types";

type PaymentWrapPropTypes = {
  +url: string;
  +application: string;
  +companyID: number;
  +children: any;
  +payUsingBankTransfer: PayUsingBankTransferType;
};

type PaymentWrapStateTypes = {
  envKey: string;
  data: string;
  show3rdServiceForm: bool;
};

import { SubmissionError } from "redux-form/immutable";

import React from "react";

import { addPayment as addPaymentRequest } from "./request";

import { ReduxFormSubmissionError } from "../utility";

import MobilpayForm from "./MobilpayForm";

import { connect } from "react-redux";

import { payUsingBankTransferModal } from "./actions";

import { getDetails } from "./util";

const
  mapDispatchToProps = (dispatch : any) => ({
    payUsingBankTransfer: (application : string, options : BankTransferArgsTypes) => () => {
      dispatch(payUsingBankTransferModal(application, options));
    },
  });


/*
  Injects a createPayment method ready for dealing with adding the payment.
  After that, it submits the payment
*/
class PaymentWrap extends React.Component<PaymentWrapPropTypes, PaymentWrapStateTypes> {

  props: PaymentWrapPropTypes;
  state: PaymentWrapStateTypes;

  createPayment: (formData : any) => Promise<*>;

  constructor (props : PaymentWrapPropTypes) {
    super(props);

    this.state = {
      envKey             : "",
      data               : "",
      show3rdServiceForm : false,
    };

    this.createPayment = (formData : any) => {
      const
        { companyID } = this.props,
        data : any = formData.toJS(),
        Details = getDetails(this.props.application, {
          ...data,
          companyID,
        }),
        toSend = {
          CompanyID: companyID,
          Details,
        };

      return addPaymentRequest(toSend).
        then((response : any) => {
          if (response.Error === "") {
            this.setState({
              envKey             : response.EnvKey,
              data               : response.Data,
              show3rdServiceForm : true,
            });
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
    const { children, companyID } = this.props;

    if (this.state.show3rdServiceForm) {
      return (
        <MobilpayForm
          data={this.state.data}
          envKey={this.state.envKey}
          url={this.props.url}
        />
      );
    }

    if (children === null) {
      return null;
    }

    return (
      React.cloneElement(children, {
        companyID,
        createPayment        : this.createPayment,
        payUsingBankTransfer : this.props.payUsingBankTransfer,
      })
    );
  }
}

export * from "./codes";

export default connect(null, mapDispatchToProps)(PaymentWrap);
