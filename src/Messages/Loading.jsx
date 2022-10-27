// @flow

type LoadingMessagePropTypes = {
  +className? : string;
  +message? : string;
  +sm?: bool;
};


import React from "react";

export const LoadingMessage = ({ message, sm, className } : LoadingMessagePropTypes) => {

  const isSmall = sm === true;

  const getMessage = () => {
    if (message === "") {
      return null;
    }

    return message;
  };

  if (isSmall) {
    return (
      <div className={`text-center ${className || ""} mb-1`}>
        <div className="font-weight-bold d-inline">
          {getMessage()}
        </div>
        <div className="loading-sm d-inline-block"><div /><div /><div /><div /></div>
      </div>
    );
  }

  return (
    <div className={`text-center my-4 ${className || ""}`}>
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">{"Se încarcă..."}</span>
      </div>
      <div className="text-fancy mt-1">{message}</div>
    </div>
  );
};
