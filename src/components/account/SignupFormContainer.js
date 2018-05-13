import React from 'react';
import PropTypes from 'prop-types';
import { createAffiliation, createUser } from '../../helpers/odasRequests';

import SignupForm from './SignupForm';
import withOrganizations from './withOrganizations';

class SignupFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      email: '',
      password: '',
      passwordConfirmation: '',
      selection: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCreateAffiliation = this.handleCreateAffiliation.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleStepNext = this.handleStepNext.bind(this);
    this.handleStepBack = this.handleStepBack.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSelect(selection) {
    this.setState({ selection });
    this.handleStepNext();
  }

  handleStepNext() {
    this.setState(prevState => ({ activeStep: prevState.activeStep + 1 }));
  }

  handleStepBack() {
    this.setState(prevState => ({ activeStep: prevState.activeStep - 1 }));
  }

  handleCreateAffiliation(event) {
    event.preventDefault();
    const {
      handleMessageNew,
      handleRequestClose,
      organizationSelection,
      session,
    } = this.props;
    const { id, name } = organizationSelection;
    createAffiliation({ id, name }, session)
      .then(() => handleRequestClose())
      .catch(() => {
        handleMessageNew(
          `Sorry. Something went wrong connecting you to your organization.`
        );
      });
  }

  handleSignUp(event) {
    event.preventDefault();
    const {
      handleMessageNew,
      handleRequestClose,
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

    createUser({ email, password, isProfessional })
      .then(({ jwt }) => {
        this.props.handleLogIn(jwt);
        if (!isProfessional) {
          handleRequestClose();
        } else {
          this.handleStepNext();
        }
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
        handleCreateAffiliation={this.handleCreateAffiliation}
        handleSelect={this.handleSelect}
        handleSignUp={this.handleSignUp}
        handleStepNext={this.handleStepNext}
        handleStepBack={this.handleStepBack}
      />
    );
  }
}

SignupFormContainer.defaultProps = {
  session: null,
};

SignupFormContainer.propTypes = {
  handleLogIn: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  session: PropTypes.string,
};

export default withOrganizations(SignupFormContainer);
