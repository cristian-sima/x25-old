// @flow
/* eslint-disable */

import React from "react";

type TypeInputPropTypes = {
  +change : (event : any) => void;
  +value: any;
  +tabIndex?: string;
  +delay?: number;
};

type TypeInputStateTypes = {
  value: string;
  isWaiting: bool;
};

const delay = 700;

import { LoadingMessage } from "../Messages";

export class DelayInputChange extends React.Component<TypeInputPropTypes, TypeInputStateTypes> {
  props: TypeInputPropTypes;
  state: TypeInputStateTypes;

  timeout: any;

  delayChange: (event : any) => void;
  handleKeyPressed: (event : any) => void;
  stopWaiting: (value : string) => void;

  constructor (props : TypeInputPropTypes) {
    super(props);

    this.timeout = null;

    this.state = {
      isWaiting : false,
      value     : this.props.value,
    };

    this.handleKeyPressed = (event : any) => {
      if (event.key === "Enter") {
        this.stopWaiting(this.state.value);
      }
    };

    this.stopWaiting = (value :string) => {
      clearTimeout(this.timeout);

      this.setState({
        isWaiting: false,
        value,
      }, () => {
        this.props.change({
          target: {
            value,
          },
        });
      });
    };

    this.delayChange = ({ target : { value } }) => {
      clearTimeout(this.timeout);

      if (value === "") {
        this.stopWaiting(value);
      } else {
        const that = this;

        that.setState({
          isWaiting: true,
          value,
        }, () => {

          that.timeout = setTimeout(() => {
            that.setState({
              isWaiting: false,
            });
            that.props.change({
              target: {
                value,
              },
            });
          }, this.props.delay || delay);
        });
      }
    };
  }

  UNSAFE_componentWillReceiveProps (nextProps : TypeInputPropTypes) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  shouldComponentUpdate (nextProps : TypeInputPropTypes, nextState :TypeInputStateTypes) {
    return (
      this.props.value !== nextProps.value ||
      this.state.value !== nextState.value ||
      this.state.isWaiting !== nextState.isWaiting
    );
  }

  render () {
    const { value, isWaiting } = this.state;

    const { tabIndex } = this.props;

    return (
      <div className="delay-input">
        <input
          {...this.props}
          change=""
          onChange={this.delayChange}
          onKeyPress={this.handleKeyPressed}
          tabIndex={tabIndex}
          value={value}
        />
        {
          isWaiting ? (
            <LoadingMessage className="loading-spinner d-inline-block" sm />
          ) : null
        }
      </div>
    );
  }
}
