import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';

import Disclaimer from './Disclaimer';
import LoginForm from './LoginForm';
import {catalogPost} from '../utils/api';

const styles = (theme) => ({
  paddingDisclaimer: {paddingTop: theme.spacing(1)},
  disclaimerLink: {
    cursor: 'pointer',
    color: theme.palette.secondary[900],
  },
  removeParagraphMargin: {
    margin: '0',
  },
});

class LoginFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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

    const {handleMessageNew, handleRequestClose} = this.props;
    const {email, password} = this.state;

    catalogPost('/auth', {email, password})
      .then((response) => {
        if (response.status === 200) {
          this.props.handleLogIn(response.token);
          handleRequestClose();
        } else {
          handleMessageNew('The email or password you entered was incorrect.');
        }
      })
      .catch((error) => {
        handleMessageNew('Oops! Something went wrong.');
      });
  }

  render() {
    const {
      paddingDisclaimer,
      removeParagraphMargin,
      disclaimerLink,
    } = this.props.classes;
    return (
      <Fragment>
        <Disclaimer className={paddingDisclaimer} marginBottom={'0'}>
          <p className={removeParagraphMargin}>
            Due to moving to a new technology system, we are asking all of our
            users who created an account before April 11th, 2020 to create a new
            account. We apologize for any inconvenience. To create your new
            account, please click{' '}
            <u>
              <span
                onClick={() => this.props.handleRequestOpen('signup')}
                className={disclaimerLink}
              >
                here
              </span>
            </u>
            .
          </p>
        </Disclaimer>
        <LoginForm
          {...this.props}
          {...this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Fragment>
    );
  }
}

LoginFormContainer.propTypes = {
  handleLogIn: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(LoginFormContainer);
