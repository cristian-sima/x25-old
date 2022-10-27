// @flow

import React from "react";
import { SimpleModal } from "../../Modal";

import EstimatePrice from "../EstimatePrice";

const ModalWrap = ({ id } : { +id : string }) => (
  <SimpleModal size="lg" title="Reînnoiește abonamentul">
    <EstimatePrice id={id} />
  </SimpleModal>
);

export default ModalWrap;
