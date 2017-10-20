import React from 'react';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 5 0'
  },
  accountLinks: {
    padding: '5 5 5'
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
    <div className={classes.root}>
      <a className={[classes.divider, classes.accountLinks].join(' ')} href=''><Typography type='body1' className={classes.lowercaseText}>Log In</Typography></a>
      <a className={classes.accountLinks} href=''><Typography type='body1' className={classes.lowercaseText}>Sign Up</Typography></a>
    </div>
    )
  }
}

export default withStyles(styles)(Account);
