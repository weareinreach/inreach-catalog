import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/Textfield';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import AsylumConnectButton from '../AsylumConnectButton';

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  paddingAbove: { paddingTop: '2.5rem' },
  paddingVertical: { padding: '2.5rem 6rem' },
});

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container}>
        <TextField
          required
          id="email"
          label="Email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          required
          id="password"
          label="Password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
          margin="normal"
        />
        <Typography type="body1" className={classes.paddingVertical}>
          By clicking "Log In," you agree to One Degree's{` `}
          <a href="https://www.1degree.org/privacy" target="_blank">
            Privacy Policy
          </a>
          {` `}and{` `}
          <a href="https://www.1degree.org/terms-of-use" target="_blank">
            Terms of Use
          </a>
          .
        </Typography>
        <AsylumConnectButton
          variant="secondary"
        >
          Log In
        </AsylumConnectButton>
        <Typography type="body1" className={classes.paddingAbove}>
          Forgot Password?
        </Typography>
      </form>
    );
  }
};

export default withStyles(styles)(LoginForm);
