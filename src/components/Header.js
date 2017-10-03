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
      <NavMobile />
    )
  else if (width > 425 && width <= 1024)
    return (
      <NavTablet />
    )
  else
    return (
      <NavDesktop />
    )      
}

Header.propTypes = { width: PropTypes.number.isRequired };
  
export default withWidth(Header); 
