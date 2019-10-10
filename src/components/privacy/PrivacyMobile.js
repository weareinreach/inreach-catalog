import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import DisclaimerText from './DisclaimerText';
import PrivacyText from './PrivacyText';

const TabContainer = ({ children }) => (
  <div style={{ padding: '2.5rem' }}>
    {children}
  </div>
);

TabContainer.propTypes = { children: PropTypes.node.isRequired };

const styles = theme => ({
  mobilePadding: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  underline: {
    paddingBottom: "20px",
    borderBottom: "1px solid "+theme.palette.common.faintBlack,
  },
  title: {
    padding: '20px',
    borderBottom: "1px solid "+theme.palette.common.faintBlack
  },
  titleSpacing: {
    marginTop: '20px',
    marginBottom: '10px'
  },
  textCenter: { textAlign: 'center' },
});

const PrivacyMobile = ({classes, handleRequestOpen, tab}) => (
  <div>
    <Typography variant='headline' className={classes.title}>
      Privacy &amp; Disclaimer
    </Typography>
    <Grid container spacing={0} className={classes.mobilePadding}>
      <Grid item xs={12} className={classes.underline}>
        <Typography variant="title" className={classes.titleSpacing}>
          Privacy Statement
        </Typography>
        <PrivacyText />
      </Grid>
       <Grid item xs={12} >
        <Typography variant="title" className={classes.titleSpacing}>
          AC Disclaimer
        </Typography>
        <DisclaimerText />
      </Grid>
    </Grid>
    
  </div>
);

PrivacyMobile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrivacyMobile);
