import React from 'react';
import PropTypes from 'prop-types'

import NavDesktop from './navigation/NavDesktop';
import NavMobile from './navigation/NavMobile';
import NavTablet from './navigation/NavTablet';

import withWidth from './withWidth';
import breakpoints from '../theme/breakpoints';

class Header extends React.Component { 
  constructor(props) {
    super(props);
  }
  render(){
    const isMobile = this.props.width < breakpoints['sm'];
    const isTablet = this.props.width < breakpoints['md'];
    let Nav;
    if (isMobile) {
      Nav = <NavMobile handleRequestOpen={this.props.handleRequestOpen}/>
    } else if (isTablet) {
      Nav = <NavTablet />
    } else {
      Nav = <NavDesktop />
    }
    return (
      <div>
        {Nav}
      </div>
    )
  }
}

Header.propTypes = {
  handleRequestOpen: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired
};
  
export default withWidth(Header); 
