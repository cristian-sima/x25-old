// @flow

import Big from "big.js";

const up = 3;

export const
// in LEI 16.01.2019
// in LEI 15.03.2022
  pricePerMonth = 24.99,
  getPrice = (months : number) => parseFloat(
    new Big(months).
      times(new Big(pricePerMonth)).
      round(0,
        up),
  );
