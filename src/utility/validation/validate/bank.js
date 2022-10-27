// @flow

export const isValidBankAccount = (rawValue : string) : boolean => {

  // Remove spaces and to upper case
  const checkPosition = 4,
    iban = rawValue.replace(/ /gu,
      "").toUpperCase(),
    hasGoodCountryCode = () : boolean => {

      if (iban.length <= 2) {
        return false;
      }

      const countrycode = iban.substring(0,
          2),
        bbancountrypatterns = {
          "AD" : "\\d{8}[\\dA-Z]{12}",
          "AE" : "\\d{3}\\d{16}",
          "AL" : "\\d{8}[\\dA-Z]{16}",
          "AT" : "\\d{16}",
          "AZ" : "[\\dA-Z]{4}\\d{20}",
          "BA" : "\\d{16}",
          "BE" : "\\d{12}",
          "BG" : "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
          "BH" : "[A-Z]{4}[\\dA-Z]{14}",
          "BR" : "\\d{23}[A-Z][\\dA-Z]",
          "CH" : "\\d{5}[\\dA-Z]{12}",
          "CR" : "\\d{17}",
          "CY" : "\\d{8}[\\dA-Z]{16}",
          "CZ" : "\\d{20}",
          "DE" : "\\d{18}",
          "DK" : "\\d{14}",
          "DO" : "[A-Z]{4}\\d{20}",
          "EE" : "\\d{16}",
          "ES" : "\\d{20}",
          "FI" : "\\d{14}",
          "FO" : "\\d{14}",
          "FR" : "\\d{10}[\\dA-Z]{11}\\d{2}",
          "GB" : "[A-Z]{4}\\d{14}",
          "GE" : "[\\dA-Z]{2}\\d{16}",
          "GI" : "[A-Z]{4}[\\dA-Z]{15}",
          "GL" : "\\d{14}",
          "GR" : "\\d{7}[\\dA-Z]{16}",
          "GT" : "[\\dA-Z]{4}[\\dA-Z]{20}",
          "HR" : "\\d{17}",
          "HU" : "\\d{24}",
          "IE" : "[\\dA-Z]{4}\\d{14}",
          "IL" : "\\d{19}",
          "IS" : "\\d{22}",
          "IT" : "[A-Z]\\d{10}[\\dA-Z]{12}",
          "KW" : "[A-Z]{4}[\\dA-Z]{22}",
          "KZ" : "\\d{3}[\\dA-Z]{13}",
          "LB" : "\\d{4}[\\dA-Z]{20}",
          "LI" : "\\d{5}[\\dA-Z]{12}",
          "LT" : "\\d{16}",
          "LU" : "\\d{3}[\\dA-Z]{13}",
          "LV" : "[A-Z]{4}[\\dA-Z]{13}",
          "MC" : "\\d{10}[\\dA-Z]{11}\\d{2}",
          "MD" : "[\\dA-Z]{2}\\d{18}",
          "ME" : "\\d{18}",
          "MK" : "\\d{3}[\\dA-Z]{10}\\d{2}",
          "MR" : "\\d{23}",
          "MT" : "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
          "MU" : "[A-Z]{4}\\d{19}[A-Z]{3}",
          "NL" : "[A-Z]{4}\\d{10}",
          "NO" : "\\d{11}",
          "PK" : "[\\dA-Z]{4}\\d{16}",
          "PL" : "\\d{24}",
          "PS" : "[\\dA-Z]{4}\\d{21}",
          "PT" : "\\d{21}",
          "RO" : "[A-Z]{4}[\\dA-Z]{16}",
          "RS" : "\\d{18}",
          "SA" : "\\d{2}[\\dA-Z]{18}",
          "SE" : "\\d{20}",
          "SI" : "\\d{15}",
          "SK" : "\\d{20}",
          "SM" : "[A-Z]\\d{10}[\\dA-Z]{12}",
          "TN" : "\\d{20}",
          "TR" : "\\d{5}[\\dA-Z]{17}",
          "VG" : "[\\dA-Z]{4}\\d{16}",
        },
        bbanpattern = bbancountrypatterns[countrycode];

      /*
       * As new countries will start using IBAN in the
       * future, we only check if the countrycode is known.
       * This prevents false negatives, while almost all
       * false positives introduced by this, will be caught
       * by the checksum validation below anyway.
       * Strict checking should return FALSE for unknown
       * countries.
       */
      if (typeof bbanpattern === "undefined") {
        return false;
      }

      const ibanregexp = new RegExp(`^[A-Z]{2}\\d{2}${bbanpattern}$`,
        "u");

      // Invalid country specific format
      return ibanregexp.test(iban);
    },
    hasGoodRest = () : boolean => {
      const getCheckDigits = () => {

          const getCheck = () : string => {
              const first = String(iban.substring(checkPosition,
                  iban.length)),
                second = String(iban.substring(0,
                  checkPosition));

              return first + second;
            },
            ibancheck = getCheck();


          let leadingZeroes = true,
            value = "";

          for (let index = 0; index < ibancheck.length; index += 1) {
            const character = ibancheck.charAt(index);

            if (character !== "0") {
              leadingZeroes = false;
            }

            if (!leadingZeroes) {
              value += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(character);
            }
          }

          return value;
        },
        ibancheckdigits = getCheckDigits(),
        nrToDevide = 97,
        getOperator = ({ cRest, cChar } : { cRest: number, cChar : string}) => {
          const rest = (cRest === 0) ? "" : String(cRest);

          return Number(`${rest}${cChar}`);
        };

      let currentRest = 0;

      for (let index = 0; index < ibancheckdigits.length; index += 1) {
        const cChar = ibancheckdigits.charAt(index),
          cOperator = getOperator({
            cRest: currentRest,
            cChar,
          });

        if (cOperator === "" || isNaN(cOperator)) {
          return false;
        }

        currentRest = cOperator % nrToDevide;
      }

      return currentRest === 1;
    };

  // 1. Check the country code and find the country specific format

  if (!hasGoodCountryCode()) {

    return false;
  }

  // 2. Check the checksum{
  if (!hasGoodRest()) {

    return false;
  }

  return true;
};
