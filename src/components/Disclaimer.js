import React from 'react';
import PropTypes from 'prop-types';

import Dialog, { DialogTitle } from 'material-ui/Dialog';
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
  title: { paddingBottom: '1rem', textAlign: 'center', },
});

const Disclaimer = ({classes, handleRequestClose, isOpen}) => (
  <Dialog open={isOpen} onRequestClose={handleRequestClose}>
    <div className={classes.disclaimerBody}>
      <Typography className={classes.title} type="display1">
        AsylumConnect Disclaimer
      </Typography>
      <Typography type="body1">
        The AsylumConnect team will do its best to confirm basic facts about service providers listed on this website. However, we lack the necessary resources to fully vet service providers and make no representations regarding the viability or capabilities of any such providers. Consequently, AsylumConnect assumes no responsibility for the actions of providers listed on this website and asylum seekers who contact any such providers do so at their own risk.
      </Typography>
      <div className={classes.buttonContainer}>
        <AsylumConnectButton onClick={handleRequestClose} variant="secondary">
          OK
        </AsylumConnectButton>
      </div>
    </div>
  </Dialog>
);

Disclaimer.propTypes = {
  handleRequestClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(Disclaimer);
