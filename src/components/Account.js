import React from 'react';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    borderRight: "1px solid",
    borderColor: theme.palette.text.divider
  },
  lowercaseText: {
    textTransform: 'capitalize'
  }
});

class Account extends React.Component { 
  constructor(props) {
    super(props);
  }
  
  render() {
    const { classes } = this.props
    return (
    <div>
        <Button className={classes.divider}><Typography type="body1" className={classes.lowercaseText}>Log In</Typography></Button>
        <Button><Typography type="body1" className={classes.lowercaseText}>Sign Up</Typography></Button>
    </div>
    )
  }
}

export default withStyles(styles)(Account);
