import React from 'react';
import PropTypes from 'prop-types';

import { DialogTitle } from '../dialog';
import AsylumConnectButton from '../AsylumConnectButton';

import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import {
  deleteUser
} from '../../helpers/odasRequests';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  marginTop: {
    marginTop: '10px'
  }
});

class DeleteAccountDialog extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    password: ''
  }
  this.handleChange = this.handleChange.bind(this)
  this.confirmDelete = this.confirmDelete.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  confirmDelete(){
    const { handleMessageNew, handleLogOut, history } = this.props;

    deleteUser(this.state.password, this.props.session)
      .then((data) => {
        if (data.message === 'User deleted') {
          history.push('/');
          handleMessageNew('Your account has been deleted.');
          handleLogOut();
        } else {
          handleMessageNew('Your password is incorrect.');
        }
      })
    //this.props.handleDeleteAccount(this.state.password)
    this.props.handleRequestClose()
    this.setState({password:''})
  }

  render() {
    const { classes, handleRequestClose} = this.props;
    const { password } = this.state;
    return (
      <div className={classes.container}>
        <DialogTitle>
          Delete Account
        </DialogTitle>
        <Typography type='body1'>Are you sure you want to delete your account? Your account will be delete permanently, and any stored information will be erased.</Typography>
        <form className={classes.container}>
          <Typography type="body1">
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
          <AsylumConnectButton variant="primary" onClick={this.confirmDelete} className={classes.marginTop}>delete account</AsylumConnectButton>
        </form>
        
        <AsylumConnectButton variant="primary" handleRequestClose={handleRequestClose}>
          cancel
        </AsylumConnectButton>
      </div>
    )
  }
}

DeleteAccountDialog.propTypes = {
  //handleDeleteAccount: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(DeleteAccountDialog);
