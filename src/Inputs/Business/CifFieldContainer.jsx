/* eslint-disable no-magic-numbers */
// @flow

import React from "react";
import { change, stopSubmit } from "redux-form/immutable";

import { getCompanyDetails } from "./request";

import { notifyWarning } from "../../actions";
// import { notify, notifyError, notifyWarning } from "Extern/actions";

import { delay, isValidCIF } from "../../utility";

import CifField from "./CifField";
import { useDispatch } from "react-redux";

import * as Immutable from "immutable";

const
  CifContainer = (props : any) => {
    const
      dispatch = useDispatch(),

      isGood = isValidCIF(props.input.value),

      [theHistory, setTheHistory] = React.useState(Immutable.Map()),

      [isWaiting, setIsWaiting] = React.useState(false),
      [foundData, setFoundData] = React.useState(false),
      [hasRequested, setHasRequested] = React.useState(false),

      // [requestTimeout, setRequestTimeout] = React.useState(),
      [clearTextTimeout, setClearTextTimeout] = React.useState(),

      [typeDelay, setTypeDelay] = React.useState(),

      clearText = () => {
        clearTimeout(clearTextTimeout);

        setIsWaiting(false);
        setHasRequested(false);
        setFoundData(false);

      },
      searchOnWeb = (cif : string, automatic = false) => () => {

        // const temp = setTimeout(() => {

        // }, 2000);

        // setRequestTimeout(temp);


        const
          changeFields = (data : Map<string, any>) => {
            for (const [
              key,
              value,
            ] of data) {
              if (value !== "") {
                dispatch(change(props.formID, key, value));
              }
            }
          },
          endRequest = (isOk) => {
            setIsWaiting(false);
            setFoundData(isOk);

            setTheHistory(
              theHistory.set(cif, true),
            );

            const temp2 = setTimeout(clearText, 3000);

            setClearTextTimeout(temp2);
          };

        // dispatch(startSubmit(props.formID));

        clearTimeout(clearTextTimeout);
        clearTimeout(typeDelay);


        if (isValidCIF(cif)) {

          setIsWaiting(true);
          setHasRequested(true);
          setFoundData(false);

          // clearTimeout(requestTimeout);

          const
            mainReason = props.reason ? props.reason : "",
            reason = `${mainReason} - ${automatic ? "automatic" : "click buton"}`;

          getCompanyDetails(cif, reason).then((response) => {
            const map = new Map();

            Object.keys(response).forEach((key) => {
              if (key !== "Capital") {
                map.set(key, response[key]);
              }
            });

            delay().
              then(() => {
                changeFields(map);
              }).
              // then(() => {
              //   dispatch(notify("Am preluat informațiile"));
              // }).
              then(() => {
                // dispatch(stopSubmit(props.formID));
              }).
              then(() => {
                props.focusInput();
              }).
              then(() => {
                if (typeof props.onSuccess === "function") {
                  props.onSuccess(response);
                }

                endRequest(true);
              });
          }).
            catch(() => {
              if (typeof onError === "function") {
                delay().
                  then(() => {
                    // dispatch(stopSubmit(props.formID));
                  }).
                  then(() => {
                    props.onError();
                  });
              } else {
                delay().
                  // then(() => {
                  //   dispatch(notifyError("Nu am putut prelua informațiile firmei"));
                  // }).
                  then(() => {
                    dispatch(stopSubmit(props.formID));
                  }).
                  then(() => {
                    props.focusInput();
                  });
              }

              endRequest(false);
            });
        } else {
          delay().
            then(() => {
              dispatch(notifyWarning("Trebuie furnizat un CIF valid"));
            }).
            then(() => {
              // dispatch(stopSubmit(props.formID));
            }).
            then(() => {
              props.focusInput();
            });
        }
      },
      checkIfNeedsToRequest = (current) => {
        clearText();
        clearTimeout(typeDelay);

        const typeTimeout = setTimeout(() => {
          const
            isValid = isValidCIF(current),
            hasNotRequestedThis = !theHistory.has(current);

          if (isValid && hasNotRequestedThis) {
            searchOnWeb(current, true)();
          }
        }, 2000);

        setTypeDelay(typeTimeout);

      },
      handleKeyUp = () => {
        setHasRequested(false);
        const
          current = props.input.value;

        checkIfNeedsToRequest(current);

        // const { justEnter, input: { value } } = props;

        //   const fired = (
        //     (justEnter && event.key === "Enter") ||
        // (!justEnter && (event.key === "Enter" && event.shiftKey))
        //   );

      // if (fired) {
      //   event.preventDefault();
      //   event.stopPropagation();
      //   findDetailsByCif(value)();
      // }
      };

    return (
      <CifField
        {...props}
        findDetailsByCif={searchOnWeb}
        foundData={foundData}
        handleKeyUp={handleKeyUp}
        hasRequested={hasRequested}
        isGood={isGood}
        isWaiting={isWaiting}
      />
    );
  };

export default CifContainer;

