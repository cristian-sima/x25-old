// @flow

import { validateFloat } from "./common";

export const validateDay = validateFloat({
  min     : 1,
  max     : 31,
  integer : true,
});
