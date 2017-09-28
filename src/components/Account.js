import React from 'react';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const Account = () => { 
  return (
    <Grid container
          align='stretch'
          direction='row'
          justify='space-around'>
      <Grid item lg={7}>
        <Typography type="body1" style={{textAlign:'right'}}>Log In</Typography>
      </Grid>
      <Grid item lg={5}>
        <Typography type="body1">Log Out</Typography>
      </Grid>
    </Grid>
  )
}

export default Account
