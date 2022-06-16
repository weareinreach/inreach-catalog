import React from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage, useIntl} from 'react-intl';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import AsylumConnectDropdownListItem from './AsylumConnectDropdownListItem';
import AsylumConnectSelector from './AsylumConnectSelector';
import {AccountIcon} from './icons';

import {mobilePadding, searchInput, searchInputMobile} from '../theme';

import withWidth from './withWidth';

const styles = (theme) => ({
	root: {
		display: 'block'
	},
	inputClass: Object.assign(searchInput(theme), {
		cursor: 'pointer',
		position: 'relative',
		boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		marginBottom: '0',
		width: '122px',
		height: '48px',
		padding: '13px',
		color: theme.palette.signUp[600],
		'@media(max-width:750px)': {
			width: 'unset',
			padding: '8px'
		}
	}),
	cursor: {
		cursor: 'pointer'
	},
	line: {
		border: '0.5px solid #1D1F23',
		margin: '0 16px'
	},
	signInUp: {
		width: '54px'
	},
	signOut: {
		width: '35px'
	},
	lowercaseText: {
		textTransform: 'capitalize',
		cursor: 'pointer',
		width: '66px',
		fontWeight: theme.typography.fontWeightMedium,
		fontSize: '16px',
		lineHeight: '24px'
	}
});

const AccountTablet = (props) => {
	const {
		classes,
		locale,
		session,
		handleLogOut,
		handleRequestOpen,
		width,
		colorClass,
		noArrow
	} = props;

	const intl = useIntl();

	const useSmall = window.innerWidth <= 750;

	const generateOnlyIconLabel = () => {
		return (
			<div>
				<AccountIcon width="33px" color="#4792DA" />
			</div>
		);
	};

	return (
		<div
			className={classes.root + ' hide--on-print'}
			data-test-id="nav-button-account"
		>
			{session && (
				<AsylumConnectSelector
					label={
						useSmall
							? generateOnlyIconLabel()
							: intl.formatMessage({
									id: 'account.account',
									description: 'Account menu text',
									defaultMessage: 'Account'
							  })
					}
					containerClass={classes.inputClass}
					closeOnClick={true}
					containerWidth={'122px'}
					noArrow={noArrow}
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
							>
								{(favorites) => (
									<Typography variant="h6">{favorites}</Typography>
								)}
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
			)}
			{!session && (
				<div className={classes.root}>
					<a
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
};

export default withStyles(styles)(AccountTablet);
