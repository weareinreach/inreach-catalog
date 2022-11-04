import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage, useIntl} from 'react-intl';
import AsylumConnectDropdownListItem from './AsylumConnectDropdownListItem';
import AsylumConnectSelector from './AsylumConnectSelector';
import {searchInput} from '../theme';

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
		fontWeight: theme.typography.fontWeightMedium,
		fontSize: '16px',
		lineHeight: '24px',
		'@media(max-width:972px)': {
			fontSize: '12px'
		}
	},
	inputClass: Object.assign(searchInput(theme), {
		cursor: 'pointer',
		position: 'relative',
		boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		marginBottom: '0',
		width: '122px',
		height: '48px',
		padding: '13px',
		color: theme.palette.signUp[600]
	}),
	cursor: {
		cursor: 'pointer'
	},
	line: {
		border: '0.5px solid #1D1F23',
		margin: '0 16px'
	},
	signInUp: {
		width: 'fit-content'
	},
	signOut: {
		width: '35px'
	}
});

const AccountNav = (props) => {
	const {classes, session, handleLogOut, handleRequestOpen, locale} = props;

	const intl = useIntl();

	return (
		<div
			className={classes.accountNav + ' hide--on-print'}
			data-test-id="nav-button-account"
		>
			{session && (
				// <div className={classes.root}>
				// 	<Link
				// 		to={'/' + locale + '/account'}
				// 		data-test-id="nav-account-account-settings"
				// 	>
				// 		<Typography type="body1" className={classes.lowercaseText}>
				// 			<FormattedMessage
				// 				id="account.account-settings"
				// 				description="Account settings text"
				// 				defaultMessage="Account Settings"
				// 			/>
				// 		</Typography>
				// 	</Link>
				// 	<div className={classes.line} />
				// 	<Link to="/" onClick={handleLogOut} data-test-id="nav-account-sign-out">
				// 		<Typography
				// 			type="body1"
				// 			className={[classes.lowercaseText, classes.signOut].join(' ')}
				// 		>
				// 			<FormattedMessage
				// 				id="account.sign-out"
				// 				description="Account sign out text"
				// 				defaultMessage="Sign Out"
				// 			/>
				// 		</Typography>
				// 	</Link>
				// </div>
				<div className={classes.root}>
					<AsylumConnectSelector
						label={intl.formatMessage({
							id: 'account.account',
							description: 'Account menu text',
							defaultMessage: 'Account'
						})}
						containerClass={classes.inputClass}
						closeOnClick={true}
						containerWidth={'122px'}
					>
						<AsylumConnectDropdownListItem>
							<Link
								to={'/' + locale + '/favorites'}
								className="hide--on-print"
								data-test-id="nav-button-view-favorites"
							>
								<FormattedMessage
									id="favorites.view-favorites"
									defaultMessage="View Your Favorites"
									description="title of favorites page"
								>
									{(favorites) => (
										<Typography variant="h6">{favorites}</Typography>
									)}
								</FormattedMessage>
							</Link>
						</AsylumConnectDropdownListItem>
						<AsylumConnectDropdownListItem>
							<Link
								to={'/' + locale + '/reviews'}
								className="hide--on-print"
								data-test-id="nav-button-reviews"
							>
								<FormattedMessage
									id="reviews.your-reviews"
									defaultMessage="Reviews"
									description="Drop down option to see reviews"
								>
									{(reviews) => <Typography variant="h6">{reviews}</Typography>}
								</FormattedMessage>
							</Link>
						</AsylumConnectDropdownListItem>
						<AsylumConnectDropdownListItem>
							<Link
								to={'/' + locale + '/account'}
								data-test-id="nav-account-account-settings"
							>
								<FormattedMessage
									id="account.account-settings"
									description="Account settings text"
									defaultMessage="Account Settings"
								>
									{(accountSettings) => (
										<Typography variant="h6">{accountSettings}</Typography>
									)}
								</FormattedMessage>
							</Link>
						</AsylumConnectDropdownListItem>
						<AsylumConnectDropdownListItem>
							<Link
								to="/"
								onClick={handleLogOut}
								data-test-id="nav-account-sign-out"
							>
								<FormattedMessage
									id="account.sign-out"
									description="Account sign out text"
									defaultMessage="Sign Out"
								>
									{(signOut) => <Typography variant="h6">{signOut}</Typography>}
								</FormattedMessage>
							</Link>
						</AsylumConnectDropdownListItem>
					</AsylumConnectSelector>
				</div>
			)}
			{!session && (
				<div className={classes.root}>
					<p
						className={classes.cursor}
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
					</p>
					<div className={classes.line} />
					<p
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
					</p>
				</div>
			)}
		</div>
	);
};

export default withStyles(styles)(AccountNav);
