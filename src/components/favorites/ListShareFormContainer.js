import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import config from '../../config/config.js';

import ListShareForm from './ListShareForm';

class ListShareFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      shareType: 'list',
      shareUrl: window.location.href
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    const {handleMessageNew, handleRequestClose} = this.props;
    event.preventDefault()

    if(!this.state.email || !this.state.shareType || this.state.shareUrl){
      handleMessageNew("Invalid request");
    }

    let url = window.location.origin + '/api/share';
    let payload = JSON.stringify({
        recipients: this.state.email,
        shareType: this.state.shareType,
        shareUrl: this.state.shareUrl, 
        jwt: window.localStorage.getItem("jwt")
      });
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: payload
    };

    console.log("fetch options", options);

    fetch(url, options)
      .then(response => {
        if (response.status === 201) {
          handleRequestClose();
          handleMessageNew('Email sent!');
        }
      })
      .catch(error => {
        // console.log(error);
        handleMessageNew('Oops! Something went wrong.');
      });
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
