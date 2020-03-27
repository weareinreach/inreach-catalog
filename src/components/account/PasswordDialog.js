import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import PasswordFormContainer from './PasswordFormContainer';
import {DialogTitle} from '../dialog';

import {breakpoints} from '../../theme';
import theWidth from '../theWidth';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginLeft: '2.5em',
    marginRight: '2.5em',
    borderBottom: '1px solid ' + theme.palette.common.faintBlack,
    boxShadow: 'none'
  },
  textCenter: {textAlign: 'center'}
});

const PasswordMobile = ({
  handleConfirmSession,
  handleMessageNew,
  handleRequestClose,
  session
}) => (
  <div>
    <Paper className={classes.root}>
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
  handleConfirmSession: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  session: PropTypes.string.isRequired
};

export default PasswordMobile;
