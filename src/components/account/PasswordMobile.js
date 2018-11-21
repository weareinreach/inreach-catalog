import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';

import AsylumConnectBackButton from '../AsylumConnectBackButton';
import PasswordFormContainer from './PasswordFormContainer';
import {DialogTitle} from '../dialog';

import breakpoints from '../../theme/breakpoints';
import theWidth from '../theWidth';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginLeft: "2.5em",
    marginRight: "2.5em",
    borderBottom: "1px solid "+theme.palette.common.faintBlack,
    boxShadow: "none"
  },
  textCenter: {textAlign: 'center'},
  toolbarRoot: {
    justifyContent: 'space-between'
  },
  toolbarGutters: {
    paddingLeft: '0',
    paddingRight: '0',
  }
});

const PasswordMobile = ({
  classes,
  handleLogIn,
  handleMessageNew,
  handleRequestClose,
  handleConfirmSession,
  session,
}) => (
  <div>
    <Paper className={classes.root}>
      <Toolbar classes={{ root: classes.toolbarRoot, gutters: classes.toolbarGutters }}>
        <AsylumConnectBackButton onClick={() => {handleRequestClose()}} />
      </Toolbar>
      <DialogTitle>Confirm Password</DialogTitle>
      <PasswordFormContainer
        handleConfirmSession={handleConfirmSession}
        handleMessageNew={handleMessageNew}
        handleRequestClose={handleRequestClose}
        session={session}
      />
    </Paper>
  </div>
);

PasswordMobile.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogIn: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  session: PropTypes.string
};

export default withStyles(styles)(PasswordMobile);
