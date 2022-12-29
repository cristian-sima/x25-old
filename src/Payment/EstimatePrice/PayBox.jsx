// @flow
/* eslint-disable no-magic-numbers*/


// type PayBox = {
// };

import type { PayUsingBankTransferType } from "../types";

import React from "react";
import { Field } from "redux-form/immutable";

import { LoadingMessage } from "../../Messages";
import { CustomSelect, LabelTemplate } from "../../Inputs";
import { normalizeBoolean, plainNumberToLocale } from "../../utility";

import { ApplicationCodeInvoiceService } from "../codes";

import * as Immutable from "immutable";

import { getPrice } from "./util";

const createOption = (text, months) => ({
  name  : `${text}`,
  value : months,
});

const selectOptions = () => ([
  createOption("1 lună",
    1),
  createOption("3 luni",
    3),
  createOption("6 luni",
    6),
  createOption("1 an",
    12),
  createOption("2 ani",
    24),
]);

type PayBoxPropTypes = {
  +companyID: number;
  +current: any;
  +error?: any;
  +pristine: bool;
  +submitting: bool;
  +payUsingBankTransfer: PayUsingBankTransferType;
  +handleSubmit: (() => Promise<*>) => Promise<*>;
  +createPayment: (data : any) => Promise<*>
};

class PayBox extends React.Component<PayBoxPropTypes> {
  props: PayBoxPropTypes;

  shouldComponentUpdate () {
    return true;
  }

  render () {
    const { current, companyID, error, submitting,
      pristine, payUsingBankTransfer } = this.props;

    if (typeof current === "undefined") {
      return null;
    }

    const
      Months = current.get("Months");

    const
      amount = getPrice(Months);

    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.createPayment)}>
        {error ? (
          <div className="alert alert-danger">
            {error}
          </div>
        ) : null}
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card mb-2 mt-2 shadow-sm">
                <div className="card-header">
                  <h5 className="my-0 font-weight-normal">{"Serviciu facturare online"}</h5>
                </div>
                <div className="card-body">
                  <Field
                    component={CustomSelect}
                    data={selectOptions()}
                    disable={submitting}
                    label="Durată"
                    name="Months"
                  />
                  <h1 className="card-title pricing-card-title">
                    {`${plainNumberToLocale(amount)} lei`}
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>
                      <i className="fa fa-check mr-1 text-success" />
                      {"Emite documente simplu online"}
                    </li>
                    <li>
                      <i className="fa fa-check mr-1 text-success" />
                      {"Trimite facturi pe e-mail"}
                    </li>
                    <li>
                      <i className="fa fa-check mr-1 text-success" />
                      {"Scapă de stresul facturilor tipizate"}
                    </li>
                    <li>
                      <i className="fa fa-check mr-1 text-success" />
                      {"Gestionează nir-urile"}
                    </li>
                  </ul>
                  <div className="container mb-3 small">
                    <div className="row">
                      <div className="form-control-label">
                        <Field
                          component={LabelTemplate}
                          label={(
                            <span>
                              {"Sunt de acord cu "}
                              <a href="/settings/termeni-si-conditii/gestiune" target="_blank">
                                {"termenii și condițiile"}
                              </a>
                            </span>
                          )}
                          left=""
                          name="AcceptPolicy"
                          normalize={normalizeBoolean}
                          type="checkbox"
                        />
                      </div>
                    </div>
                  </div>
                  {
                    submitting ? (
                      <LoadingMessage sm />
                    ) : (
                      <button
                        aria-label="Trimite"
                        className="btn btn-lg btn-block btn-primary"
                        disabled={submitting || pristine}
                        type="submit">
                        <i className="fa fa-credit-card mr-1" />
                        {"Achiziționez online"}
                      </button>
                    )
                  }
                  <hr />
                  <button
                    className="btn btn-text text-muted curson-pointer m-0 p-0"
                    disabled={submitting}
                    onClick={payUsingBankTransfer(
                      ApplicationCodeInvoiceService,
                      Immutable.Map({
                        Months,
                        companyID,
                        amount,
                      }),
                    )}
                    type="button">
                    {"Plătesc prin transfer bancar"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default PayBox;
