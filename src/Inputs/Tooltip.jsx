// @flow

type TooltipPropTypes = {
  +long: any;
  +short: any;
  +target: string;
  +placement?: string;
};

type TooltipStateTypes = {
  tooltipOpen: boolean;
};

import React from "react";
import { Tooltip as ReactstrapTooltip } from "reactstrap";

export class Tooltip extends React.Component<TooltipPropTypes, TooltipStateTypes> {
  props: TooltipPropTypes;
  state: TooltipStateTypes;

  toggle: () => void;

  constructor (props: TooltipPropTypes) {
    super(props);

    this.state = {
      tooltipOpen: false,
    };

    this.toggle = () => this.setState((prevState) => ({
      tooltipOpen: !prevState.tooltipOpen,
    }));
  }

  shouldComponentUpdate (nextProps: TooltipPropTypes, nextState : TooltipStateTypes) {
    return (
      this.props.long !== nextProps.long ||
      this.props.short !== nextProps.short ||
      this.props.placement !== nextProps.placement ||
      this.props.target !== nextProps.target ||
      this.state.tooltipOpen !== nextState.tooltipOpen
    );
  }

  render () {
    const { target, short, placement } = this.props;

    return (
      <span>
        <span id={`${target}-tooltip`}>{short}</span>
        <ReactstrapTooltip
          isOpen={this.state.tooltipOpen}
          placement={placement}
          target={`${target}-tooltip`}
          toggle={this.toggle}>
          {this.props.long}
        </ReactstrapTooltip>
      </span>
    );
  }
}
