import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import createList from '../../helpers/createList';

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
    const {session, user} = this.props;
    const {name} = this.state;
    const payload = {
      created_by_user_id: user,
      title: name,
    };
    createList(payload, session)
      .then(response => {
        if (response.status === 201) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(data => {
        const {handleListNew, handleRequestClose, history} = this.props;
        handleListNew(Object.assign({}, payload, data.collection, { fetchable_list_items: []}));
        history.push(`/favorites/${user}/${data.collection.id}`);
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
