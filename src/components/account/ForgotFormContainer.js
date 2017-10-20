import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'node-fetch';

import config from '../../config/config.js';
import ForgotForm from './ForgotForm';

class ForgotFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {handleMessageNew, handleRequestClose} = this.props;
    const {email} = this.state;
    const apiDomain = config[process.env.NODE_ENV].odas;
    const url = `${apiDomain}api/passwords`;
    const payload = JSON.stringify({email});
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Basic ZGVtbzoxNm1pc3Npb24=',
        'Content-Type': 'application/json',
        OneDegreeSource: 'asylumconnect',
      },
      body: payload,
    };
    fetch(url, options)
      .then(({status}) => {
        if (status === 200) {
          handleMessageNew(
            'Please check your inbox for instructions on how to reset your password.',
          );
          this.props.handleRequestClose();
        } else {
          handleMessageNew('Please check your email and try again.');
        }
      })
      .catch(error => {
        console.log(error);
      });
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
}

ForgotFormContainer.propTypes = {
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
};

export default ForgotFormContainer;
