import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import AsylumConnectButton from '../AsylumConnectButton';
import PrivacyText from './PrivacyText';

const styles = (theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '4rem',
  },
  disclaimerBody: {
    padding: '5.5rem',
    overflowY: 'auto',
  },
  paperWidthSm: { maxWidth: '650px' },
  title: { paddingBottom: '1rem', textAlign: 'center', },
});

const PrivacyStatement = ({classes, handleRequestClose, isOpen}) => (
  <Dialog
    classes={{ paperWidthSm: classes.paperWidthSm }}
    open={isOpen}
    onRequestClose={handleRequestClose}
  >
    <div className={classes.disclaimerBody}>
      <Typography className={classes.title} type="display1">
        AsylumConnect User Privacy Statement
      </Typography>
      <PrivacyText />
      <div className={classes.buttonContainer}>
        <AsylumConnectButton onClick={handleRequestClose} variant="secondary">
          OK
        </AsylumConnectButton>
      </div>
    </div>
  </Dialog>
);

PrivacyStatement.propTypes = {
  handleRequestClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(PrivacyStatement);
