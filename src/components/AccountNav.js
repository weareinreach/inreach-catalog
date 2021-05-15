import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from 'react-intl';

const styles = (theme) => ({
	accountNav: {
		display: 'flex',
		flex: '0 0 200px'
	},
	root: {
		display: 'flex',
		padding: '0 5px 0'
	},
	accountLinks: {
		padding: '5px 10px'
	},
	divider: {
		borderRight: '1px solid',
		borderColor: theme.palette.text.divider
	},
	lowercaseText: {
		textTransform: 'capitalize',
		cursor: 'pointer'
	},
	cursor: {
		cursor: 'pointer'
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
					className={[classes.divider, classes.accountLinks].join(' ')}
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
				<Link
					to="/"
					className={classes.accountLinks}
					onClick={handleLogOut}
					data-test-id="nav-account-sign-out"
				>
					<Typography type="body1" className={classes.lowercaseText}>
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
					className={[
						classes.divider,
						classes.accountLinks,
						classes.cursor
					].join(' ')}
					data-test-id="nav-account-sign-in"
					onClick={() => handleRequestOpen('login')}
				>
					<Typography type="body1" className={classes.lowercaseText}>
						<FormattedMessage
							id="account.sign-in"
							description="Account sign in text"
							defaultMessage="Sign In"
						/>
					</Typography>
				</a>
				<a
					className={[classes.accountLinks, classes.cursor].join(' ')}
					onClick={() => handleRequestOpen('signup')}
					data-test-id="nav-account-sign-up"
				>
					<Typography type="body1" className={classes.lowercaseText}>
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
