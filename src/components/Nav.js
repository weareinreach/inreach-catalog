import React from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const Nav = () => { 
  return (
    <Grid container
          align='stretch'
          direction='row'
          justify='space-around' 
          className='nav' 
          style={{display:'flex', flexDirection:'row'}}>
      <Grid item xs={4}><Typography type="display1">Logo</Typography></Grid>
      <Grid item xs={2}><Typography type="display1">About Us</Typography></Grid>
      <Grid item xs={2}><Typography type="display1">Take Action</Typography></Grid>
      <Grid item xs={2}><Typography type="display1">Get Help</Typography></Grid>
      <Grid item xs={2}><Typography type="display1">Contact Us</Typography></Grid>
    </Grid>
  )
}

export default Nav