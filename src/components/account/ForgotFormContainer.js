import React from 'react';
import fetch from 'node-fetch';

import config from '../../config/config.js';
import ForgotForm from './ForgotForm';

class ForgotFormContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <ForgotForm
        {...this.props}
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
};

export default ForgotFormContainer;
