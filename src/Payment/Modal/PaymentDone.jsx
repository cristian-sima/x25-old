// @flow

import React from "react";
import { SimpleModal } from "../../Modal";

const ModalBankTransfer = () => (
  <SimpleModal title="Confirmare">
    <div className="mt-2">
      <h3 className="text-success">
        <i className="fa fa-check text-success" /> {"Am înregistrat cererea ta"}
      </h3>
      <div className="mt-4">
        <h5 className="mt-2">{"Ce se întâmplă acum?"}</h5>
        {"Rămâne să primim confirmarea din partea băncii tale și vom efectua operațiunile"}
      </div>
      <h5 className="mt-3">{"Cât timp va dura?"}</h5>
      <div>
        {`Durează între 1 și 3 zile lucrătoare pentru operațiunea bancară să
    se desfășoare. În momentul în care am primit banii în cont, te rugăm să acorzi
    1-2 zile lucrătoare să operăm modificările pe platforma Sidework și să
    te bucuri de beneficii.`}
      </div>
    </div>
  </SimpleModal>
);

export default ModalBankTransfer;
