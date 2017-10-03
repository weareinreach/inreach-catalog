import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

import LogoImg from '../images/AC-logo.png';

const styles = theme => ({
  root: {
    display: 'inline',
  },
  centerTextAlign: {
    textAlign: 'center',
  },
  LogoFitHeight: {
    height: '100%',
  },
});

class OffsiteLink extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const classes = this.props.classes;
    return (
      <Grid container
            align='center'
            direction='row'
            justify='space-between'
            className={classes.centerTextAlign}>
      <Grid item xs={3}>
        <IconButton className={classes.root}>
            <img src={LogoImg} className={classes.LogoFitHeight}/>
        </IconButton>
      </Grid>
      <Grid item xs={2}><a href='http://www.asylumconnect.org/our-organization/'><Typography type="display4">about us</Typography></a></Grid>
      <Grid item xs={2}><a href=''><Typography type="display4">take action</Typography></a></Grid>
      <Grid item xs={2}><a href=''><Typography type="display4">get help</Typography></a></Grid>
      <Grid item xs={2}><a href='http://www.asylumconnect.org/contact-us/'><Typography type="display4">contact us</Typography></a></Grid>
    </Grid>
    )
  }
  
}

OffsiteLink.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OffsiteLink);