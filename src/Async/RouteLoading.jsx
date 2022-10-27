/* eslint-disable no-process-env */
// @flow

type LoadingPropTypes = {
  +error?: any;
  +timedOut: bool;
  +pastDelay: bool;
  +retry: () => void;
}

import React from "react";

import { LoadingMessage } from "../Messages/Loading";
import SimulatedException from "./SimulatedException";

import { LargeErrorMessage } from "../Messages/Error";
import TheError from "../dev/TheError";

const RouteLoading = ({ error : theError, retry, pastDelay, timedOut } : LoadingPropTypes) => {
  if (theError) {

    if (theError.name === "ChunkLoadError") {
      return (
        <LargeErrorMessage
          onRetry={retry}
          message="Pagina nu a putut fi încărcată. Vă rugăm să faceți refresh la pagină"
        />
      );
    }

    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV === "development") {
      return (
        <TheError
          retry={retry}
          error={theError}
        />
      );
    }

    throw new SimulatedException(theError);
  } else if (timedOut) {
    return (
      <div>{"Se pare că se încarcă mai greu ca de obicei "}
        <button
          className="btn btn-primary btn-block"
          onClick={retry} type="button">{"Încearcă din nou"}
        </button>
      </div>
    );
  } else if (pastDelay) {
    // When the loader has taken longer than the delay
    return (
      <div className="mt-3">
        <LoadingMessage message="Așteaptă un pic..." />
      </div>
    );
  }

  // When the loader has just started
  return null;
};

export default RouteLoading;
