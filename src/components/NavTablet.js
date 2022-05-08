import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import AsylumConnectButton from './AsylumConnectButton';
import NavTabletMenu from './NavTabletMenu';
import Language from './Language';
import AccountTablet from './AccountTablet';
import FavoritesLink from './FavoritesLink';

import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
	searchInput,
	searchInputMobile,
	breakpoints,
	mobilePadding
} from '../theme';

const styles = (theme) => ({
	root: {
		padding: '0 32px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: '0 auto',
		// width: '960px',
		// padding: '10 0 10 0',
		// boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
		'@media(max-width:960px) and @media(min-width: 601px)': {
			width: '896px'
		}
	},
	IconButton: {
		display: 'inline',
		height: '48px',
		width: '127.91px',
		maxWidth: '128px'
	},
	languageIconColor: {
		fill: theme.palette.secondary[400],
		color: theme.palette.secondary[400]
	},
	viewYourFavoritesText: {
		color: theme.palette.secondary[500],
		fontWeight: '300'
	},
	inputClass: Object.assign(searchInput(theme), {
		cursor: 'pointer',
		position: 'relative',
		boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		marginBottom: '0',
		width: '145px',
		height: '48px',
		padding: '13px',
		color: theme.palette.signUp[600]
	})
});

const NavTablet = ({
	classes,
	handleLogOut,
	handleRequestOpen,
	locale,
	logo,
	session
}) => {
	return (
		<div className={classes.root}>
			<Link to="/">
				<img
					src={logo}
					data-test-id="nav-button-logo"
					alt="logo button"
					className={classes.IconButton}
				/>
			</Link>
			<a className="hide--on-screen" href="/#">
				<FormattedMessage id="app.asylum-connect-catalog">
					{(catalog) => <Typography variant="h1">{catalog}</Typography>}
				</FormattedMessage>
			</a>
			<NavTabletMenu />
			<a
				className="hide--on-print"
				data-test-id="nav-button-safety-exit"
				href="https://www.google.com/"
			>
				<FormattedMessage id="navigation.safety-exit">
					{(safety) => (
						<AsylumConnectButton variant="safety">{safety}</AsylumConnectButton>
					)}
				</FormattedMessage>
			</a>
			<Language
				colorClass={classes.languageIconColor}
				inputClass={classes.inputClass}
				useIcon
				enableOverlay
			/>
			<AccountTablet
				handleLogOut={handleLogOut}
				handleRequestOpen={handleRequestOpen}
				locale={locale}
				session={session}
			/>
		</div>
	);
};

NavTablet.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavTablet);
