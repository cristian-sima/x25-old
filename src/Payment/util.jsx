// @flow

type DataType = {
  Credits: number;
  Months: number;
  companyID: number;
};

import * as codes from "./codes";

const getDetails = (application : string, data : DataType) => {

  const getParams = () => {
    const { Credits, Months, companyID } = data;

    switch (application) {
      case codes.ApplicationCodeSMSAlert:

        return [
          Credits,
          companyID,
        ];

      case codes.ApplicationCodeAutoService:
      case codes.ApplicationCodeInvoiceService:
        return [
          Months,
          companyID,
        ];

      default:
        return [];
    }
  };

  return `${application}-${getParams().join("-")}`;
};

const info = {
  to      : "S.C. SIDEWORK S.R.L.",
  cif     : "40375263",
  regCom  : "J52/21/2019",
  address : "B-dul Republicii, Bl. B3, Ap. 19, Et. 2, Camera 1 & Camera 2, Bolintin Vale, Giurgiu",

  bankName    : "Banca Transilvania S.A.",
  bankAccount : "RO27 BTRL RONC RT04 8269 9301",
};

export {
  info,
  getDetails,
};
