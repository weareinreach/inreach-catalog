import React from 'react';
import PropTypes from 'prop-types';

import NavDesktop from './navigation/NavDesktop';
import NavMobile from './navigation/NavMobile';
import NavTablet from './navigation/NavTablet';

import withWidth from './withWidth';
import breakpoints from '../theme/breakpoints';

const Header = ({
  handleRequestOpen,
  handleLogOut,
  session,
  width,
  location,
  history,
  match
}) => {
  const isMobile = width < breakpoints['sm'];
  const isTablet = width < breakpoints['md'];
  if (isMobile) {
    return (
      <NavMobile
        handleLogOut={handleLogOut}
        handleRequestOpen={handleRequestOpen}
        session={session}
        location={location}
        history={history}
        match={match}
      />
    );
  } else if (isTablet) {
    return (
      <NavTablet
        handleLogOut={handleLogOut}
        handleRequestOpen={handleRequestOpen}
        session={session}
      />
    );
  } else {
    return (
      <NavDesktop
        handleLogOut={handleLogOut}
        handleRequestOpen={handleRequestOpen}
        session={session}
      />
    );
  }
};

Header.defaultProps = { session: null };

Header.propTypes = {
  handleLogOut: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  session: PropTypes.string,
  width: PropTypes.number.isRequired,
};

export default withWidth(Header);
