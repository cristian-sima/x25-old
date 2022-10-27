// @flow

import BankTransfer from "./BankTransfer";
import PaymentDone from "./PaymentDone";
import CompanyValability from "./CompanyValability";

const modals = {
  "PAYMENT_BANK_TRANSFER"  : BankTransfer,
  "PAYMENT_WAS_DONE"       : PaymentDone,
  "ESTIMATE_COMPANY_PRICE" : CompanyValability,
};

export default modals;
