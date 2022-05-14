import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import AsylumConnectButton from './AsylumConnectButton';
import NavTabletMenu from './NavTabletMenu';
import Language from './Language';
import AccountTablet from './AccountTablet';
import FavoritesLink from './FavoritesLink';
import {navLinks} from '../data/navLinks';

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
		color: theme.palette.signUp[600],
		'@media(max-width:750px)': {
			width: 'unset'
		}
	}),
	inputClassLanguage: Object.assign(searchInput(theme), {
		cursor: 'pointer',
		position: 'relative',
		boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		marginBottom: '0',
		// width: '145px',
		height: '48px',
		padding: '13px',
		color: theme.palette.signUp[600],
		'@media(max-width:750px)': {
			width: 'unset'
		}
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
	const useSmall = window.innerWidth > 600 && window.innerWidth <= 750;

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
				href={navLinks.safety}
			>
				<FormattedMessage id="navigation.safety-exit">
					{(safety) => (
						<AsylumConnectButton variant="safety">{safety}</AsylumConnectButton>
					)}
				</FormattedMessage>
			</a>

			{useSmall ? (
				<Language
					colorClass={classes.languageIconColor}
					inputClass={classes.inputClassLanguage}
					useOnlyIcon
					enableOverlay
					noArrow
				/>
			) : (
				<Language
					colorClass={classes.languageIconColor}
					inputClass={classes.inputClassLanguage}
					useIcon
					enableOverlay
				/>
			)}
			{useSmall ? (
				<AccountTablet
					colorClass={classes.languageIconColor}
					handleLogOut={handleLogOut}
					handleRequestOpen={handleRequestOpen}
					locale={locale}
					session={session}
					noArrow
				/>
			) : (
				<AccountTablet
					colorClass={classes.languageIconColor}
					handleLogOut={handleLogOut}
					handleRequestOpen={handleRequestOpen}
					locale={locale}
					session={session}
				/>
			)}
		</div>
	);
};

NavTablet.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavTablet);
