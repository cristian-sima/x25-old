// @flow

import type { ErrorType, InfoType } from "./types";

type ErrorBoundaryProps = {
  +error?: ErrorType;
  +status?: InfoType;
  +children: any;
  +info?: string;
}

type ErrorBoundaryState = {
  status: ?string;
  error: ?ErrorType;
  info: ?InfoType;
}

import React from "react";

import TheError from "./TheError";

const
  refreshKeyCode = 82,
  timeoutDelay = 200;

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {

  handleKey: (event : KeyboardEvent) => void;
  refresh: () => void;

  componentDidCatch (error : ErrorType, info : InfoType) {
    this.setState({
      error,
      info,
    });
  }

  constructor (props : ErrorBoundaryProps) {
    super(props);

    this.state = {
      status : null,
      error  : null,
      info   : null,
    };

    this.handleKey = (event : KeyboardEvent) => {
      if (event.keyCode === refreshKeyCode) {
        this.refresh();
      }
    };

    this.refresh = () => {
      this.setState({
        status : "Trying to recover...",
        error  : null,
        info   : null,
      }, () => {
        setTimeout(() => {
          this.setState({
            status : null,
            error  : null,
            info   : null,
          });
        }, timeoutDelay);
      });

    };
  }

  shouldComponentUpdate () {
    return (
      true
    );
  }

  render () {
    const { info, error, status } = this.state;

    // render fallback UI
    if (error) {
      return (
        <TheError
          error={error}
          handleKey={this.handleKey}
          info={info}
          refresh={this.refresh}
          status={status}
        />
      );
    }

    // when there's not an error, render children untouched
    return this.props.children;
  }
}

export default ErrorBoundary;
