import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

import LogoImg from '../images/AC-logo.png';

const styles = theme => ({
  root: {
    display: 'inherit'
  },
  IconButton: {
    display: 'inline',
    height: '60px'
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
      <div className={classes.root}>
        <IconButton className={classes.IconButton}>
          <img src={LogoImg} className={classes.LogoFitHeight}/>
        </IconButton>
        <Button href='http://www.asylumconnect.org/our-organization/'><Typography type="display4">about us</Typography></Button>
        <Button href=''><Typography type="display4">take action</Typography></Button>
        <Button href=''><Typography type="display4">get help</Typography></Button>
        <Button href='http://www.asylumconnect.org/contact-us/'><Typography type="display4">contact us</Typography></Button>
      </div>
    )
  }
  
}

OffsiteLink.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OffsiteLink);