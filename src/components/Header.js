import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';
import NavTablet from './NavTablet';
import {breakpoints} from '../theme';
import withWidth from './withWidth';

const styles = (theme) => ({
	root: {
		width: '100%',
		alignItems: 'center',
		textAlign: 'center',
		boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
		position: 'sticky',
		top: '0px',
		zIndex: '1000',
		backgroundColor: 'white',
		padding: '16px 0'
	}
});

const Header = ({
	classes,
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
	const isMobile = width <= breakpoints['sm'];
	const isTablet = width <= breakpoints['md'];

	if (isMobile) {
		return (
			<div id="header-div" className={classes.root} class="hide">
				<NavMobile
					handleLogOut={handleLogOut}
					handleRequestOpen={handleRequestOpen}
					session={session}
					location={location}
					history={history}
					match={match}
					locale={locale}
					logo={logo}
				/>
			</div>
		);
	} else if (isTablet) {
		return (
			<div id="header-div" className={classes.root}>
				<NavTablet
					handleLogOut={handleLogOut}
					handleRequestOpen={handleRequestOpen}
					locale={locale}
					logo={logo}
					session={session}
				/>
			</div>
		);
	} else {
		return (
			<div id="header-div" className={classes.root}>
				<NavDesktop
					handleLogOut={handleLogOut}
					handleRequestOpen={handleRequestOpen}
					locale={locale}
					logo={logo}
					session={session}
				/>
			</div>
		);
	}
};

Header.defaultProps = {session: null};

Header.propTypes = {
	handleLogOut: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired,
	session: PropTypes.string,
	width: PropTypes.number.isRequired
};

export default withWidth(withStyles(styles)(Header));
