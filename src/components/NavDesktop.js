import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from 'react-intl';

import AccountNav from './AccountNav';
import AsylumConnectButton from './AsylumConnectButton';
import FavoritesLink from './FavoritesLink';
import Language from './Language';
import {navLinks} from '../data/navLinks';
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
		'@media(min-width:1364px)': {
			width: '1364px'
		},
		'@media(max-width:1364px) and @media(min-width: 1281px)': {
			width: 'auto'
		},
		'@media(max-width:1280px) and @media(min-width: 1236px)': {
			width: '1236px'
		},
		'@media(max-width:1235px) and @media(min-width: 962px)': {
			width: 'auto',
			fontSize: '14px'
		},
		'@media(max-width:961px)': {
			width: 'auto'
		}
	},
	displayInherit: {
		display: 'inherit'
	},
	IconButton: {
		display: 'inline',
		height: '48px',
		width: '127.91px',
		maxWidth: '128px'
	},
	languageIconColor: {
		fill: theme.palette.secondary[400],
		color: theme.palette.secondary[400],
		'@media(max-width:1020px) and @media(min-width: 960px)': {
			fontSize: '12px'
		}
	},
	headerLink: {
		lineHeight: '20px',
		color: 'rgba(29, 31, 35, 1)',
		padding: '0 2.5px',
		'@media(max-width:1020px) and @media(min-width: 960px)': {
			fontSize: '11px'
		}
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
		},
		'@media(max-width:1020px) and @media(min-width: 960px)': {
			fontSize: '12px'
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
		},
		'@media(max-width:1020px) and @media(min-width: 960px)': {
			fontSize: '12px'
		}
	})
});

const NavDesktop = ({
	classes,
	handleLogOut,
	handleRequestOpen,
	locale,
	logo,
	session
}) => {
	const {headerLink} = classes;

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
			<a
				className="hide--on-print"
				data-test-id="nav-button-about"
				target="_blank"
				href={navLinks.about}
			>
				<FormattedMessage id="navigation.about">
					{(about) => (
						<Typography variant="h6" classes={{h6: headerLink}}>
							{about}
						</Typography>
					)}
				</FormattedMessage>
			</a>
			<a
				className="hide--on-print"
				data-test-id="nav-button-take-action"
				target="_blank"
				href={navLinks.action}
			>
				<FormattedMessage id="navigation.take-action">
					{(action) => (
						<Typography variant="h6" classes={{h6: headerLink}}>
							{action}
						</Typography>
					)}
				</FormattedMessage>
			</a>
			<a
				className="hide--on-print"
				data-test-id="nav-button-get-help"
				target="_blank"
				href={navLinks.help}
			>
				<FormattedMessage id="navigation.get-help">
					{(help) => (
						<Typography variant="h6" classes={{h6: headerLink}}>
							{help}
						</Typography>
					)}
				</FormattedMessage>
			</a>
			<a
				className="hide--on-print"
				data-test-id="nav-button-contact"
				target="_blank"
				href={navLinks.contact}
			>
				<FormattedMessage id="navigation.contact">
					{(contact) => (
						<Typography variant="h6" classes={{h6: headerLink}}>
							{contact}
						</Typography>
					)}
				</FormattedMessage>
			</a>
			<a
				className="hide--on-print"
				data-test-id="nav-button-safety-exit"
				target="_blank"
				href={navLinks.safety}
			>
				<FormattedMessage id="navigation.safety-exit">
					{(safety) => (
						<AsylumConnectButton variant="safety">{safety}</AsylumConnectButton>
					)}
				</FormattedMessage>
			</a>
			<Language
				colorClass={classes.languageIconColor}
				inputClass={classes.inputClassLanguage}
				useIcon
				enableOverlay
			/>
			{session && <FavoritesLink locale={locale} />}
			<AccountNav
				handleLogOut={handleLogOut}
				handleRequestOpen={handleRequestOpen}
				locale={locale}
				session={session}
			/>
		</div>
	);
};

NavDesktop.defaultProps = {session: null};

NavDesktop.propTypes = {
	classes: PropTypes.object.isRequired,
	handleLogOut: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired,
	session: PropTypes.string
};

export default withStyles(styles)(NavDesktop);
