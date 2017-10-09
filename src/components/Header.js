import React from 'react';
import PropTypes from 'prop-types'

import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';
import NavTablet from './NavTablet';

import Grid from 'material-ui/Grid';
import withWidth from './withWidth'

const Header = ({handleRequestOpen, width}) => { 
  if (width <= 600)
    return (
      <NavMobile handleRequestOpen={handleRequestOpen}/>
    )
  else if (width > 600 && width <= 1024)
    return (
      <NavTablet />
    )
  else
    return (
      <NavDesktop />
    )      
}

Header.propTypes = {
  handleRequestOpen: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired
};
  
export default withWidth(Header); 
