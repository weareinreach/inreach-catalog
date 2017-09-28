import React from 'react';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const OffsiteLink = () => { 
  return (
    <Grid container
          align='stretch'
          direction='row'
          justify='space-between'
          style={{textAlign: 'center'}}>
    <Grid item xs={3}><a href='' target='_blank'><Typography type="display4">Logo</Typography></a></Grid>
    <Grid item xs={2}><Typography type="display4">About Us</Typography></Grid>
    <Grid item xs={2}><Typography type="display4">Take Action</Typography></Grid>
    <Grid item xs={2}><Typography type="display4">Get Help</Typography></Grid>
    <Grid item xs={2}><Typography type="display4">Contact Us</Typography></Grid>
  </Grid>
  )
}

export default OffsiteLink