import React from 'react';
import PropTypes from 'prop-types';

// import {updateListPermissions} from '../utils/api';
import ShareForm from './ShareForm';

class ShareFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      shareUrl: window.location.href,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  sendEmail() {
    const {
      handleLogOut,
      handleMessageNew,
      handleRequestClose,
      handleRequestOpen,
      session,
    } = this.props;

    let url = window.location.origin + '/api/share';
    let payload = JSON.stringify({
      recipients: this.state.email,
      shareType: this.props.shareType,
      shareUrl: this.state.shareUrl,
      jwt: session,
    });
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: payload,
    };

    fetch(url, options)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((responseData) => {
            if (responseData.status === 'success') {
              handleRequestClose();
              handleMessageNew('Email sent!');
            } else {
              if (responseData.statusCode && responseData.statusCode === 401) {
                handleMessageNew(
                  'Your session has expired. Please log in again.'
                );

                if (handleLogOut) {
                  handleLogOut();
                }
              } else if (
                responseData.statusCode &&
                responseData.statusCode === 403
              ) {
                handleMessageNew(
                  "It looks like you've been idle. Please re-confirm your password and try sharing again."
                );
                handleRequestOpen('password');
              } else {
                handleMessageNew(responseData.message);
              }
            }
          });
        }
      })
      .catch((error) => {
        handleMessageNew('Oops! Something went wrong.');
      });
  }

  handleSubmit(event) {
    const {
      handleMessageNew,
      handleRequestClose,
      handleRequestOpen,
      handleLogOut,
      listId,
      session,
    } = this.props;
    event.preventDefault();

    if (!this.state.email || !this.state.shareUrl) {
      handleMessageNew('Invalid request');
      return;
    }

    if (this.props.shareType === 'collection') {
      // updateListPermissions(listId, 'public', session)
      //   .then((response) => {
      //     if (response.collection) {
      //       this.sendEmail();
      //     }
      //   })
      //   .catch((error) => {
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
    } else {
      this.sendEmail();
    }
  }

  render() {
    return (
      <ShareForm
        {...this.props}
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

ShareFormContainer.propTypes = {
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
  session: PropTypes.string.isRequired,
  shareType: PropTypes.string.isRequired,
};

export default ShareFormContainer;
