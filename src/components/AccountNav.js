import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from 'react-intl';

const styles = (theme) => ({
	accountNav: {
		width: 'auto'
	},
	root: {
		display: 'flex'
	},
	lowercaseText: {
		textTransform: 'capitalize',
		cursor: 'pointer',
		width: '66px',
		// height: '48px',
		fontWeight: theme.typography.fontWeightMedium,
		fontSize: '16px',
		lineHeight: '24px',
		// '@media(max-width:961px)': {
		// 	fontSize: '12px',
		// 	fontWeight: theme.typography.fontWeightHeavy
		// },
		'@media(max-width:972px)': {
			fontSize: '12px'
		}
	},
	cursor: {
		cursor: 'pointer'
	},
	line: {
		border: '0.5px solid #1D1F23',
		margin: '0 16px'
	},
	linePadding: {
		// paddingRight: '16px'
	},
	signInUp: {
		width: '54px',
		// '@media(max-width:999px)': {
		// 	width: '46px',
		// },
		paddingTop: '25%'
	},
	signOut: {
		width: '35px'
		// '@media(max-width:999px)': {
		// 	width: '46px',
		// },
	}
});

const AccountNav = ({
	classes,
	session,
	handleLogOut,
	handleRequestOpen,
	locale
}) => (
	<div className={classes.accountNav + ' hide--on-print'}>
		{session && (
			<div className={classes.root}>
				<Link
					className={classes.linePadding}
					to={'/' + locale + '/account'}
					data-test-id="nav-account-account-settings"
				>
					<Typography type="body1" className={classes.lowercaseText}>
						<FormattedMessage
							id="account.account-settings"
							description="Account settings text"
							defaultMessage="Account Settings"
						/>
					</Typography>
				</Link>
				<div className={classes.line} />
				<Link
					to="/"
					// className={classes.accountLinks}
					onClick={handleLogOut}
					data-test-id="nav-account-sign-out"
				>
					<Typography
						type="body1"
						className={[classes.lowercaseText, classes.signOut].join(' ')}
					>
						<FormattedMessage
							id="account.sign-out"
							description="Account sign out text"
							defaultMessage="Sign Out"
						/>
					</Typography>
				</Link>
			</div>
		)}
		{!session && (
			<div className={classes.root}>
				<a
					className={[classes.cursor, classes.linePadding].join(' ')}
					data-test-id="nav-account-sign-in"
					onClick={() => handleRequestOpen('login')}
				>
					<Typography
						type="body1"
						className={[classes.lowercaseText, classes.signInUp].join(' ')}
					>
						<FormattedMessage
							id="account.sign-in"
							description="Account sign in text"
							defaultMessage="Sign In"
						/>
					</Typography>
				</a>
				<div className={classes.line} />
				<a
					className={classes.cursor}
					onClick={() => handleRequestOpen('signup')}
					data-test-id="nav-account-sign-up"
				>
					<Typography
						type="body1"
						className={[classes.lowercaseText, classes.signInUp].join(' ')}
					>
						<FormattedMessage
							id="account.sign-up"
							description="Account sign up text"
							defaultMessage="Sign Up"
						/>
					</Typography>
				</a>
			</div>
		)}
	</div>
);

AccountNav.propTypes = {
	classes: PropTypes.object.isRequired,
	handleLogOut: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired,
	session: PropTypes.string
};

export default withStyles(styles)(AccountNav);
