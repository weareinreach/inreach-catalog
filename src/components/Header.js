import React from 'react';
import PropTypes from 'prop-types'

import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';
import NavTablet from './NavTablet';

import Grid from 'material-ui/Grid';
import withWidth from './withWidth'

const Header = ({width}) => { 
  if (width <= 425) 
    return (
      <Grid container>
          <Grid item xs={12}  style={{position: 'fixed', bottom:'0', width: '100%'}}>
            <NavMobile />
          </Grid>
      </Grid>
    )
  else if (width > 425 && width <= 768)
    return (
      <Grid container>
        <Grid item md={12}>
          <NavTablet />
        </Grid>
      </Grid>
    )
  else
    return (
      <Grid container>
        <Grid item md={12}>
          <NavDesktop />
        </Grid>
      </Grid>
    )      
}

Header.propTypes = { width: PropTypes.number.isRequired };
  
export default withWidth(Header); 
