import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'node-fetch';

import config from '../../config/config.js';

import ListNewForm from './ListNewForm';

class ListNewFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
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
    console.log('submit');
  }

  render() {
    return (
      <ListNewForm
        {...this.props}
        {...this.state}
        handleChange={this.handleChange}
        handleMessageNew={this.handleMessageNew}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

ListNewFormContainer.propTypes = {
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
};

export default ListNewFormContainer;
