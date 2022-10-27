// @flow
/* eslint-disable no-magic-numbers, max-statements */

export const isValidCNP = (rawValue : string) : boolean => {

  type CNP = Array<number>;

  type PositionPropTypes = {
    [key: string]: number;
  };

  const decimalSystem = 10,
    position : PositionPropTypes = {
      yearMillenium : 0,
      sex           : 0,

      yearDecades : 1,
      yearUnits   : 2,

      monthDecimals : 3,
      monthUnits    : 4,

      dayDecimals : 5,
      dayUnits    : 6,

      countyDecimals : 7,
      countyUnits    : 8,

      numberHundreds : 9,
      numberDecimals : 10,
      numberUnits    : 11,

      controlDigit: 12,
    },
    getCNP = (raw : string) : CNP => {

      let hashResult = 0;

      const hashTable = [
          2,
          7,
          9,
          1,
          4,
          6,
          3,
          5,
          8,
          2,
          7,
          9,
        ],
        normalLength = 13,
        cnp = [];

      const reduceHash = (rawHash : number) : number => {
        const
          nrOfDigits = 11,
          reduced = parseInt(rawHash % nrOfDigits,
            decimalSystem);

        if (reduced === 10) {
          return 1;
        }

        return reduced;
      };

      if (raw.length !== normalLength) {
        throw new Error(`The length [actual:${raw.length}]
        should be ${normalLength} characters`);
      }

      if (raw[0] === "0") {
        throw new Error("The sex can not be 0");
      }

      const controlDigit = parseInt(
        raw.charAt(position.controlDigit),
        decimalSystem,
      );

      if (isNaN(controlDigit)) {
        throw new Error("The control digit should be number");
      }

      for (let index = 0; index < 12; index += 1) {

        const rawChar = raw.charAt(index),
          parsedValue = parseInt(rawChar,
            decimalSystem),
          correspondingHashNumber = hashTable[index];

        if (isNaN(parsedValue)) {
          throw new Error(`The char at position ${index} should be numeric`);
        }

        cnp[index] = parsedValue;
        hashResult += (parsedValue * correspondingHashNumber);
      }

      if (controlDigit !== reduceHash(hashResult)) {
        throw new Error(`
          The control digit is not good
          [${controlDigit} === ${reduceHash(hashResult)}]
          `);
      }

      return cnp;
    },
    validate = (cnp : CNP) => {
      const getCNPDigit = (currentPosition : number) : number => cnp[currentPosition],
        isValidDate = () => {
          const getYear = () : number => {
            const computeYear = () : number => {
                const {
                  yearMillenium,
                  yearDecades,
                  yearUnits,
                } = position;

                let year = (
                  (getCNPDigit(yearDecades) * 10) +
                  getCNPDigit(yearUnits)
                );

                switch (getCNPDigit(yearMillenium)) {
                  case 1:
                  case 2:
                    year += 1900;
                    break;
                  case 3:
                  case 4:
                    year += 1800;
                    break;
                  case 5:
                  case 6:
                    year += 2000;
                    break;

                    // 7,8,9
                  default: {
                    year += 2000;

                    const today : any = new Date(),
                      tempYear = parseInt(today.getYear(),
                        10) - 14;

                    if (year > tempYear) {
                      year -= 100;
                    }
                  }
                    break;
                }

                return year;
              },
              year : number = computeYear();

            if (year < 1800 || year > 2099) {
              throw new Error(`
                Year [actual: ${String(year)}] is not valid.
                It should be between 1800 and 2099
                `);
            }

            return year;
          };

          const year : number = getYear();

          const {
              monthDecimals,
              monthUnits,
              dayDecimals,
              dayUnits,
            } = position,
            month = (
              (getCNPDigit(monthDecimals) * 10) +
              getCNPDigit(monthUnits)
            ),
            day = (
              (getCNPDigit(dayDecimals) * 10) +
              getCNPDigit(dayUnits)
            ),
            // js months are starting from 0 -> 11
            jsMonth = month - 1,
            date = new Date(year,
              jsMonth,
              day,
              0,
              0,
              0,
              0);

          if (
            (date.getFullYear() !== year) ||
              (date.getMonth() !== jsMonth) ||
              (date.getDate() !== day)
          ) {
            throw new Error(`
                The given date
                [
                  year -> ${String(year)}
                  month -> ${String(month)}
                  day -> ${String(day)}
                ]`);
          }
        },
        isValidCounty = () => {
          const {
              countyDecimals,
              countyUnits,
            } = position,
            lowerLimit = 1,
            upperLimit = 52,
            code = (
              (getCNPDigit(countyDecimals) * 10) +
                getCNPDigit(countyUnits)
            );

          if (
            code < lowerLimit ||
                code > upperLimit
          ) {
            throw new Error(`
                  The country code is invalid [actual: ${code}],
                  should be between: ${lowerLimit} <= ${code} >= ${upperLimit}
                  `);
          }
        },
        isValidNumber = () => {
          const {
              numberHundreds,
              numberDecimals,
              numberUnits,
            } = position,
            number = (
              (getCNPDigit(numberHundreds) * 100) +
                  (getCNPDigit(numberDecimals) * 10) +
                  getCNPDigit(numberUnits)
            );

          if (number === 0) {
            throw new Error("The number should not be 0");
          }
        };

      isValidDate();
      isValidCounty();
      isValidNumber();
    };

  try {
    validate(getCNP(rawValue));

    return true;
  } catch (error) {
    return false;
  }
};
