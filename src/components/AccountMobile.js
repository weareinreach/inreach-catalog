import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {FormattedMessage} from 'react-intl';

import ForgotFormContainer from './ForgotFormContainer';
import LoginFormContainer from './LoginFormContainer';
import SignupFormContainer from './SignupFormContainer';
import withWidth from './withWidth';
import {breakpoints} from '../theme';

const TabContainer = ({children, width}) => {
	const isMobile = width < breakpoints['sm'];
	const tabPadding = isMobile ? '.5rem 1.5rem' : '2.5rem';

	return <div style={{padding: tabPadding}}>{children}</div>;
};

TabContainer.propTypes = {children: PropTypes.node.isRequired};

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		marginLeft: '2.5em',
		marginRight: '2.5em',
		borderBottom: '1px solid ' + theme.palette.common.faintBlack,
		boxShadow: 'none'
	},
	textCenter: {textAlign: 'center'}
});

const AccountMobile = ({
	classes,
	dialog,
	handleLogIn,
	handleMessageNew,
	handleRequestClose,
	handleRequestOpen,
	session,
	tab,
	width,
	userData
}) => (
	<div>
		<Paper className={classes.root}>
			{tab === 0 && (
				<FormattedMessage
					id="account.sign-in"
					defaultMessage="Sign In"
					description="button to sign in to app"
				>
					{(signIn) => (
						<Typography className={classes.textCenter} variant="h3">
							{signIn}
						</Typography>
					)}
				</FormattedMessage>
			)}
			{tab === 1 && (
				<FormattedMessage
					id="account.sign-up"
					defaultMessage="Sign Up"
					description="button to create an account"
				>
					{(signUp) => (
						<Typography className={classes.textCenter} variant="h3">
							{signUp}
						</Typography>
					)}
				</FormattedMessage>
			)}
			<Tabs
				value={tab}
				onChange={(e, tab) => handleRequestOpen(tab === 0 ? 'login' : 'signup')}
				indicatorColor="secondary"
				textColor="secondary"
				centered
			>
				<Tab
					data-test-id="account-mobile-sign-in"
					label={
						<FormattedMessage
							id="account.sign-in"
							defaultMessage="Sign In"
							description="button to sign in to app"
						/>
					}
				/>
				<Tab
					data-test-id="account-mobile-sign-up"
					label={
						<FormattedMessage
							id="account.sign-up"
							defaultMessage="Sign Up"
							description="button to create an account"
						/>
					}
				/>
			</Tabs>
		</Paper>
		<TabContainer width={width}>
			{tab === 0 && dialog === 'login' && (
				<LoginFormContainer
					handleLogIn={handleLogIn}
					handleMessageNew={handleMessageNew}
					handleRequestClose={handleRequestClose}
					handleRequestOpen={handleRequestOpen}
				/>
			)}
			{tab === 0 && dialog === 'forgot' && (
				<ForgotFormContainer
					handleMessageNew={handleMessageNew}
					handleRequestClose={handleRequestClose}
					handleRequestOpen={handleRequestOpen}
				/>
			)}
			{tab === 1 && (
				<SignupFormContainer
					handleLogIn={handleLogIn}
					handleMessageNew={handleMessageNew}
					handleRequestClose={handleRequestClose}
					handleRequestOpen={handleRequestOpen}
					session={session}
					userData={userData}
				/>
			)}
		</TabContainer>
	</div>
);

AccountMobile.defaultProps = {
	session: null
};

AccountMobile.propTypes = {
	classes: PropTypes.object.isRequired,
	handleLogIn: PropTypes.func.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired,
	session: PropTypes.string,
	tab: PropTypes.number.isRequired
};

export default withStyles(styles)(withWidth(AccountMobile));
