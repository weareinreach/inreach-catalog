import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import {withStyles} from 'material-ui/styles';

import config from '../../config.js';

import LoginForm from './LoginForm';
import Disclaimer from '../../components/static/Disclaimer';

const styles = (theme) => ({
  paddingDisclaimer: {paddingTop: theme.spacing.unit * 1},
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
    const apiDomain = config[process.env.OD_API_ENV].odas;
    const url = `${apiDomain}api/session`;
    const payload = JSON.stringify({
      session: {
        login_key: email,
        password,
      },
    });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        OneDegreeSource: 'asylumconnect',
      },
      body: payload,
    };
    fetch(url, options)
      .then((response) => {
        if (response.status === 201) {
          response.json().then(({jwt}) => {
            this.props.handleLogIn(jwt);
            handleRequestClose();
          });
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
