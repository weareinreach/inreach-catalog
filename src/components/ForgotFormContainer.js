import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ForgotForm from './ForgotForm';
import { catalogPost } from '../utils/api';

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
    const { handleMessageNew } = this.props;
    catalogPost('/users/forgotPassword', { email: this.state.email })
      .then((res) => {
        if(res.status === 200){
          handleMessageNew('Success! Your password has been reset, please check your email!');
        };
      })
      .catch((error) => {
        handleMessageNew('Oops! Please check that you entered the correct information.');
      });
  };

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
