import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'node-fetch';

import config from '../../config/config.js';

import ListShareForm from './ListShareForm';

class ListShareFormContainer extends React.Component {
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
    console.log('submit');
  }

  render() {
    return (
      <ListShareForm
        {...this.props}
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

ListShareFormContainer.propTypes = {
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  listId: PropTypes.number.isRequired,
  session: PropTypes.string.isRequired,
};

export default ListShareFormContainer;
