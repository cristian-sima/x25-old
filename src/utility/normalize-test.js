
import { normalizeArray } from "./normalize";

import * as Immutable from "immutable";
import * as matchers from "jest-immutable-matchers";

describe("test util/normalize",
  () => {
    beforeEach(() => {
      jest.addMatchers(matchers);
    });

    const input = [
      {
        ID   : 1,
        Name : "BlaBla 1",
      },
      {
        ID   : 2,
        Name : "BlaBla 2",
      },
      {
        ID   : 3,
        Name : "BlaBla 3",
      },
    ];

    describe("given an array",
      () => {
        const result = normalizeArray(input);

        it("normalizes the entities",
          () => {
            expect(result.entities).toEqualImmutable(Immutable.Map({
              "1": Immutable.Map({
                ID   : 1,
                Name : "BlaBla 1",
              }),
              "2": Immutable.Map({
                ID   : 2,
                Name : "BlaBla 2",
              }),
              "3": Immutable.Map({
                ID   : 3,
                Name : "BlaBla 3",
              }),
            }));
          });
        it("normalizes the result",
          () => {
            expect(result.result).toEqualImmutable(Immutable.List([
              "1",
              "2",
              "3",
            ]));
          });
      });
  });
