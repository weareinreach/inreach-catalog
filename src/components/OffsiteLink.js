import React from 'react';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const OffsiteLink = () => { 
  return (
    <Grid container
          align='stretch'
          direction='row'
          justify='space-around'>
    <Grid item xs={3}><Typography type="display1">Logo</Typography></Grid>
    <Grid item xs={2}><Typography type="display1">About Us</Typography></Grid>
    <Grid item xs={2}><Typography type="display1">Take Action</Typography></Grid>
    <Grid item xs={2}><Typography type="display1">Get Help</Typography></Grid>
    <Grid item xs={2}><Typography type="display1">Contact Us</Typography></Grid>
  </Grid>
  )
}

export default OffsiteLink