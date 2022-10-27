import {
  firstToUppercase,
  toLower,
  toTitle,
  toUpper,
} from "./strings";

// toTitle
(() => {
  describe("Test toTitle",
    () => {
      const tests = [
        {
          input  : "",
          output : "",
        },
        {
          input  : "cosovei",
          output : "Cosovei",
        },
        {
          input  : "simona cosovei",
          output : "Simona Cosovei",
        },
        {
          input  : "ștefănică țepeș",
          output : "Ștefănică Țepeș",
        },
        {
          input  : "this is 4 long name 5",
          output : "This Is 4 Long Name 5",
        },
      ];

      for (const { input, output } of tests) {
        describe(`Given the raw string "${input}"`,
          () => {
            it(`should be transformed to "${output}"`,
              () => {
                expect(toTitle(input)).toEqual(output);
              });
          });
      }
    });
})();

// firstToUppercase
(() => {
  describe("Test firstToUppercase",
    () => {
      const tests = [
        {
          input  : "",
          output : "",
        },
        {
          input  : "sima",
          output : "Sima",
        },
        {
          input  : "Simona Cosovei",
          output : "Simona Cosovei",
        },
        {
          input  : "this is 4 long name 5",
          output : "This is 4 long name 5",
        },
      ];

      for (const { input, output } of tests) {
        describe(`given "${input}"`,
          () => {
            it(`should be transformed to "${output}"`,
              () => {
                expect(firstToUppercase(input)).toEqual(output);
              });
          });
      }
    });
})();

// toUpper
(() => {
  const tests = [
    {
      input  : "",
      output : "",
    },
    {
      input  : "sima",
      output : "SIMA",
    },
    {
      input  : "this is 4 long name 5",
      output : "THIS IS 4 LONG NAME 5",
    },
  ];

  for (const { input, output } of tests) {
    describe(`given "${input}"`,
      () => {
        it(`should be transformed to "${output}"`,
          () => {
            expect(toUpper(input)).toEqual(output);
          });
      });
  }
})();

// toLower
(() => {
  const tests = [
    {
      input  : "",
      output : "",
    },
    {
      input  : "siMa",
      output : "sima",
    },
    {
      input  : "This is 4 long Name 5",
      output : "this is 4 long name 5",
    },
  ];

  for (const { input, output } of tests) {
    describe(`given "${input}"`,
      () => {
        it(`should be transformed to "${output}"`,
          () => {
            expect(toLower(input)).toEqual(output);
          });
      });
  }
})();
