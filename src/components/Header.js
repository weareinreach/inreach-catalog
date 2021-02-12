import React from 'react';
import PropTypes from 'prop-types';

import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';
import NavTablet from './NavTablet';
import {breakpoints} from '../theme';
import withWidth from './withWidth';

const Header = ({
  handleRequestOpen,
  handleLogOut,
  session,
  width,
  logo,
  locale,
  location,
  history,
  match,
  messages
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
        locale={locale}
        logo={logo}
        messages={messages}
      />
    );
  } else if (isTablet) {
    return (
      <NavTablet
        handleLogOut={handleLogOut}
        handleRequestOpen={handleRequestOpen}
        locale={locale}
        logo={logo}
        session={session}
      />
    );
  } else {
    return (
      <NavDesktop
        handleLogOut={handleLogOut}
        handleRequestOpen={handleRequestOpen}
        locale={locale}
        logo={logo}
        session={session}
      />
    );
  }
};

Header.defaultProps = {session: null};

Header.propTypes = {
  handleLogOut: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  session: PropTypes.string,
  width: PropTypes.number.isRequired,
};

export default withWidth(Header);
