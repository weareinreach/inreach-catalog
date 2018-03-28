import React from 'react';
import PropTypes from 'prop-types';
import { createAffiliation, createUser } from '../../helpers/odasRequests';

import SignupForm from './SignupForm';
import withOrganizations from './withOrganizations';

class SignupFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      selection: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSelect(selection) {
    this.setState({ selection });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      handleMessageNew,
      handleRequestClose,
      organizationSelection,
    } = this.props;
    const { email, password, passwordConfirmation, selection } = this.state;
    const isProfessional = selection === 'provider';

    if (password.length < 8) {
      handleMessageNew('Password must be at least 8 characters.');
      return;
    }
    if (password !== passwordConfirmation) {
      handleMessageNew('The passwords you have entered do not match');
      return;
    }
    //Temporarily make the organization field not required
    if (false && selection === 'provider' && !organizationSelection) {
      handleMessageNew('Please select an organization.');
      return;
    }

    createUser({ email, password, isProfessional })
      .then(({ jwt }) => {
        this.props.handleLogIn(jwt);
        if (!organizationSelection) {
          handleRequestClose();
        }
        const { id, name } = organizationSelection;
        createAffiliation({ id, name }, jwt)
          .then(() => handleRequestClose())
          .catch(() => {
            handleMessageNew(
              `Sorry. Something went wrong connecting you to your organization.`
            );
            handleRequestClose();
          });
      })
      .catch(error => {
        error.response.status === 400
          ? handleMessageNew(
              'Sorry. We could not create an account with that email.'
            )
          : handleMessageNew('Oops! Something went wrong.');
      });
  }

  render() {
    return (
      <SignupForm
        {...this.props}
        {...this.state}
        handleChange={this.handleChange}
        handleSelect={this.handleSelect}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

SignupFormContainer.propTypes = {
  handleLogIn: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
};

export default withOrganizations(SignupFormContainer);
