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

const styles = (theme) => ({
	root: {
		width: '1300px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: '0 auto',
		'@media(min-width:961px)': {
			width: 'auto',
			padding: '0 32px'
		}
	},
	displayInherit: {
		display: 'inherit'
	},
	IconButton: {
		display: 'inline',
		height: '60px',
		width: 'auto',
		maxWidth: '65px'
	},
	languageIconColor: {
		fill: theme.palette.secondary[400],
		color: theme.palette.secondary[400]
	},
	headerLink: {
		lineHeight: '20px',
		color: 'rgba(29, 31, 35, 1)',
		padding: '0 2.5px',
		'@media(max-width:999px)': {
			fontSize: '10px'
		}
	}
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
				href="https://asylumconnect.org/mission/"
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
				href="https://asylumconnect.org/donate/"
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
				href="https://asylumconnect.org/faqs/"
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
				href="https://asylumconnect.org/contact/"
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
				href="https://www.google.com/"
			>
				<FormattedMessage id="navigation.safety-exit">
					{(safety) => (
						<AsylumConnectButton variant="safety">{safety}</AsylumConnectButton>
					)}
				</FormattedMessage>
			</a>
			<Language colorClass={classes.languageIconColor} useIcon enableOverlay />
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
