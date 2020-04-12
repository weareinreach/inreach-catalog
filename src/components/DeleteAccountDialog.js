import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import AsylumConnectButton from './AsylumConnectButton';
import DialogTitle from './DialogTitle';
import {deleteUser} from '../utils/api';

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  marginTop: {
    marginTop: theme.spacing(1),
  },
});

class DeleteAccountDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value,
    });
  }

  confirmDelete() {
    const {handleMessageNew, handleLogOut} = this.props;

    deleteUser(this.props.userData)
      .then(() => {
        this.props.handleRequestClose();
        this.setState({password: ''});
        handleMessageNew('Your account has been deleted.');
        handleLogOut();
      })
      .catch(() => {
        handleMessageNew('Oops! Something went wrong.');
      });
  }

  render() {
    const {classes, handleRequestClose} = this.props;
    const {password} = this.state;
    return (
      <div className={classes.container}>
        <DialogTitle>Delete Account</DialogTitle>
        <Typography type="body1">
          Are you sure you want to delete your account? Your account will be
          delete permanently, and any stored information will be erased.
        </Typography>
        <form className={classes.container}>
          <Typography variant="body1">
            Deleting your account requires your password.
          </Typography>
          <TextField
            label="Password"
            margin="normal"
            name="password"
            onChange={this.handleChange}
            required
            type="password"
            value={password}
          />
          <AsylumConnectButton
            variant="primary"
            onClick={this.confirmDelete}
            className={classes.marginTop}
          >
            delete account
          </AsylumConnectButton>
        </form>

        <AsylumConnectButton variant="primary" onClick={handleRequestClose}>
          cancel
        </AsylumConnectButton>
      </div>
    );
  }
}

DeleteAccountDialog.propTypes = {
  //handleDeleteAccount: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(DeleteAccountDialog);
