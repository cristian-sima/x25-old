// @flow

type MobilpayFormPropTypes = {
  +envKey: string;
  +data: string;
}

const delay = 1200;

import React from "react";

import { LoadingMessage } from "../Messages";

import { config } from "../config";

class MobilpayForm extends React.Component<MobilpayFormPropTypes> {

  props: MobilpayFormPropTypes;

  form: any;

  timeout: any;

  registerForm: (form :any) => void;
  submit: () => void;
  startWaiting: () => void;
  stopWaiting: () => void;

  constructor (props : MobilpayFormPropTypes) {
    super(props);

    this.registerForm = (form : any) => {
      this.form = form;
    };

    this.submit = () => {
      this.form.submit();
    };

    this.startWaiting = () => {
      this.timeout = setTimeout(() => {
        this.submit();
      }, delay);
    };

    this.stopWaiting = () => {
      clearTimeout(this.timeout);
    };
  }

  componentDidMount () {
    this.startWaiting();
  }

  shouldComponentUpdate (nextProps : MobilpayFormPropTypes) {
    return (
      this.props.envKey !== nextProps.envKey ||
      this.props.data !== nextProps.data
    );
  }

  componentWillUnmount () {
    this.stopWaiting();
  }

  render () {
    return (
      <form action={config.MobilPayURL} method="POST" ref={this.registerForm}>
        <input name="env_key" type="hidden" value={this.props.envKey} />
        <input name="data" type="hidden" value={this.props.data} />
        <LoadingMessage className="mt-5" message="Se inițiază conexiunea..." />
      </form>
    );
  }
}

export default MobilpayForm;
