// @flow

export const isValidCIF = (rawValue : string) : boolean => {
  const len = rawValue.length,
    value = Number(rawValue),
    ten = 10,
    eleven = 11,
    controlDigit1 = value % ten,
    upperLimit = 10,
    lowerLimit = 4,
    getControlDigit2 = () : number => {
      let controlNumber = 753217532,
        controlDigit2 = 0,
        current = parseInt(value / ten,
          ten),
        accumulator = 0;

      while (current > 0) {
        const controlDigit = (controlNumber % ten);

        accumulator += (current % ten) * controlDigit;

        current = parseInt(current / ten,
          ten);
        controlNumber = parseInt(controlNumber / ten,
          ten);
      }

      controlDigit2 = accumulator * ten % eleven;

      if (controlDigit2 === ten) {
        controlDigit2 = 0;
      }

      return controlDigit2;
    };

  if (isNaN(value) || len > upperLimit || len < lowerLimit) {
    // console.warn("The length must be between 6 and 10 digits");
    return false;
  }

  return controlDigit1 === getControlDigit2();
};
