import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

// import {createList, createListFavorite} from '../utils/api';

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
    // createList(payload, session)
    //   .then((data) => {
    //     const {
    //       handleListAddFavorite,
    //       handleListNew,
    //       handleRequestClose,
    //       history,
    //       origin,
    //       originList,
    //     } = this.props;
    //     handleListNew(
    //       Object.assign({}, payload, data.collection, {
    //         items: [],
    //       })
    //     );
    //     if (origin === 'saveToFavorites') {
    //       // createListFavorite(data.collection.id, originList, session).then(
    //       //   () => {
    //       //     handleListAddFavorite(data.collection.id, parseInt(originList));
    //       //   }
    //       // );
    //     } else if (origin === 'favoritesList') {
    //       history.push(`/favorites/${data.collection.slug}`);
    //     }
    //     handleRequestClose();
    //   })
    //   .catch((error) => {
    //     const {
    //       handleLogOut,
    //       handleMessageNew,
    //       handleRequestClose,
    //       handleRequestOpen,
    //     } = this.props;
    //     if (error.response && error.response.status === 401) {
    //       handleMessageNew('Your session has expired. Please log in again.');
    //       handleLogOut();
    //       handleRequestClose();
    //     } else if (error.response && error.response.status === 403) {
    //       handleRequestOpen('password');
    //     } else {
    //       handleMessageNew('Oops! Something went wrong.');
    //       handleRequestClose();
    //     }
    //   });
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
  handleLogOut: PropTypes.func.isRequired,
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
