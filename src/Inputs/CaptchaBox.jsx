// @flow

type CaptchaPropTypes = {
  +type: string;
  +id: string;
  +tabIndex?: string;
  +input: any;
  +label: string;
  +autoFocus?: boolean;
  +left?: string;
  +right?: string;
  +meta: {
    touched: boolean;
    error?: any;
    submitting: boolean;
  }
};

type InfoIconStateTypes = {
  showTooltip: boolean;
};


import React from "react";
import { Tooltip } from "reactstrap";
import classnames from "classnames";

class InfoIcon extends React.Component<{}, InfoIconStateTypes> {

  state: InfoIconStateTypes;

  toggle: () => void;

  constructor (props) {
    super(props);

    this.state = {
      showTooltip: false,
    };

    this.toggle = () => {
      this.setState((prevState : InfoIconStateTypes) => ({
        showTooltip: !prevState.showTooltip,
      }));
    };
  }

  render () {
    return (
      <div className="d-inline float-right">
        <i
          className="fa fa-info-circle fa-2x text-info pull-right"
          id="TooltipExample"
        />
        <Tooltip
          isOpen={this.state.showTooltip}
          placement="right"
          target="TooltipExample"
          toggle={this.toggle}>
          {`Scopul acestei verificări este de a deosebi o personă de un robot.
          De obicei, acest cod apare atunci cand se fololește excesiv
          o functionalitate din aplicație`}
        </Tooltip>
      </div>
    );
  }
}

export const CaptchaBox = (props : CaptchaPropTypes) => {
  const {
    autoFocus,
    id,
    input,
    tabIndex,
    label,
    left,
    right,
    meta: { touched, error, submitting },
    type,
  } = props;

  if (typeof id === "undefined" || id === "") {
    return null;
  }

  return (
    <div className="form-group row">
      <label
        className={`${left ? left : "col-md-4 text-md-right"} form-control-label`}
        htmlFor={input.name}>
        {"Verificare "}
        <InfoIcon />
      </label>
      <div className={right ? right : "col-md-8"}>
        <div className="custom-class">
          <span className="custom-control-description text-muted">
            {"Tastează numere din imaginea de mai jos"}
          </span>
          <div className="text-center my-1">
            <img
              alt="CaptchaBox"
              src={`/captcha/${id}.png`}
            />
          </div>
        </div>
        <input
          {...input}
          aria-label={label}
          autoFocus={autoFocus}
          className={classnames("form-control", {
            "is-invalid": touched && error,
          })}
          disabled={submitting}
          id={input.name}
          placeholder="Tastează numerele"
          tabIndex={tabIndex}
          type={type}
        />
        <div className="invalid-feedback">
          {
            touched && error ? (
              <span>
                {error}
              </span>
            ) : null
          }
        </div>
      </div>
    </div>
  );
};
