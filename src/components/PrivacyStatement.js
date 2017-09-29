import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import AsylumConnectButton from './AsylumConnectButton';

const styles = (theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '4rem',
  },
  disclaimerBody: { padding: '5.5rem' },
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
      <Typography type="body1">
        The AsylumConnect catalog uses Google Analytics with anonymized IP addresses to help analyze how visitors use this site. Google Analytics uses cookies, which are small text files placed on your computer, to collect standard visitor behavior information in an anonymous form. No personally identifiable information is collected about you, unless you explicitly submit that information on this website. If you would like to opt-out of Google Analytics, you may do so by clicking here.
      </Typography>
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
