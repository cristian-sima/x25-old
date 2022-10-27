// @flow

export type PaymentOptions = {
  reference: string;
}

export type BankTransferArgsTypes = any;
// Immutable.Map({
//   Credits,
//   companyID,
//   amount,
// }),

export type PayUsingBankTransferType = (application: string, options: BankTransferArgsTypes) => void;
