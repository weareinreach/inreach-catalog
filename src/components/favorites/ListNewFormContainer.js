import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'node-fetch';
import {withRouter} from 'react-router-dom';

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
    const {handleMessageNew, handleRequestClose, history, session, user} = this.props;
    const { name } = this.state;
    const apiDomain = config[process.env.OD_API_ENV].odas;
    const url = `${apiDomain}api/collections`;
    const payload = JSON.stringify({
      created_by_user_id: user,
      region: "USA",
      shared_status: "private",
      title: name,
    });
    const options = {
      method: 'POST',
      headers: {
        Authorization: session,
        'Content-Type': 'application/json',
        OneDegreeSource: 'asylumconnect',
      },
      body: payload,
    };
    console.log(options)
    fetch(url, options)
      .then(response => {
        if (response.status === 201) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(data => {
        history.push(`${user}/${data.collection.id}`);
        handleRequestClose();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <ListNewForm
        {...this.props}
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

ListNewFormContainer.defaultProps = {
  session: null,
  user: null,
};

ListNewFormContainer.propTypes = {
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  session: PropTypes.string,
  user: PropTypes.number,
};

export default withRouter(ListNewFormContainer);
