import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {
  createList,
  createListFavorite,
} from '../../helpers/odasRequests';

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
      .then(data => {
        const {
          handleListAddFavorite,
          handleListNew,
          handleRequestClose,
          history,
          origin,
          originList,
        } = this.props;
        handleListNew(
          Object.assign({}, payload, data.collection, {
            fetchable_list_items: [],
          }),
        );
        if (origin === 'saveToFavorites') {
          createListFavorite(data.collection.id, originList, session)
            .then(() => {
              handleListAddFavorite(data.collection.id, parseInt(originList));
            })
            .catch(error => {
              console.warn(error);
            });
        } else if (origin === 'favoritesList') {
          history.push(`/favorites/${user}/${data.collection.id}`);
        }
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
  originList: null,
  session: null,
  user: null,
};

ListNewFormContainer.propTypes = {
  handleListAddFavorite: PropTypes.func.isRequired,
  handleListNew: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  origin: PropTypes.oneOf(['favoritesList', 'saveToFavorites']).isRequired,
  originList: PropTypes.string,
  session: PropTypes.string,
  user: PropTypes.number,
};

export default withRouter(ListNewFormContainer);
