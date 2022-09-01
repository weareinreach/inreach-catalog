import React from 'react';
import {FormattedMessage} from 'react-intl';
import GeneralSettingsName from './GeneralSettingsName';
import GeneralSettingsEmail from './GeneralSettingsEmail';
import GeneralSettingsOrganization from './GeneralSettingsOrganization';
import GeneralSettingsPassword from './GeneralSettingsPassword';

import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {breakpoints} from '../theme';

import Typography from '@material-ui/core/Typography';

import {updateUser, updateUserPassword} from '../utils/api';

const styles = (theme) => ({
	root: {
		width: '50%',
		padding: '0 5% 0 5%'
	},
	formType: {
		margin: '10% 0 10% 0'
	},
	[`@media (max-width: ${breakpoints['md']}px)`]: {
		root: {
			width: '75%',
			padding: '0 5% 0 5%'
		}
	},
	[`@media (max-width: ${breakpoints['sm']}px)`]: {
		root: {
			width: 'auto',
			padding: '0'
		},
		formType: {
			margin: '2% 0 2% 0'
		}
	},
	settingsTypeFont: {
		padding: '15px 0 25px 0',
		fontSize: 13,
		fontWeight: 700,
		fontFamily: '"Inter", sans-serif',
		letterSpacing: '-.02em',
		color: theme.palette.secondary[500],
		cursor: 'pointer'
	}
});

class GeneralSettings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: this.props.userData,
			errorMessage: '',
			isPasswordUpdated: null,
			isEmailUpdated: null,
			dialog: 'none'
		};
		this.handleOdasError = this.handleOdasError.bind(this);
		this.updateName = this.updateName.bind(this);
		this.updateEmail = this.updateEmail.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
	}

	handleOdasError(error) {
		const {handleLogOut, handleMessageNew, handleRequestOpen} = this.props;
		if (error.response && error.response.status === 401) {
			handleMessageNew(
				<FormattedMessage
					id="app.inactivity-sign-in"
					defaultMessage="Due to inactivity, please sign in to confirm your identity."
					description="Inactivity message to sign in to see your account settings."
				/>
			);
			handleLogOut();
		} else if (error.response && error.response.status === 403) {
			handleRequestOpen('password');
		} else {
			handleMessageNew(
				<FormattedMessage
					id="error.unspecified"
					defaultMessage="Oops! Something went wrong."
					description="Error message from trying to process the request."
				/>
			);
		}
	}

	updateName(newName) {
		updateUser(this.state.userData, {name: newName})
			.then((data) => {
				this.setState({userData: data, isNameUpdated: true});
				this.props.handleMessageNew(
					<FormattedMessage
						id="action.update-name-successful"
						defaultMessage="Your name has been updated successfully!"
						description="Success message that your name has been updated."
					/>
				);
			})
			.catch((error) => this.handleOdasError(error));
	}

	updateEmail(newEmail) {
		updateUser(this.state.userData, {email: newEmail})
			.then((data) => {
				this.setState({userData: data, isEmailUpdated: true});
				this.props.handleMessageNew(
					<FormattedMessage
						id="action.update-email-successful"
						defaultMessage="Your email address has been updated successfully!"
						description="Success message that your email has been updated."
					/>
				);
			})
			.catch((error) => this.handleOdasError(error));
	}

	updatePassword(currentPassword, newPassword) {
		updateUserPassword(this.state.userData, newPassword)
			.then((data) => {
				this.setState({isPasswordUpdated: true});
				this.props.handleMessageNew(
					<FormattedMessage
						id="action.update-password-successful"
						defaultMessage="Your password has been updated successfully!"
						description="Success message that your password has been updated."
					/>
				);
			})
			.catch((error) => this.handleOdasError(error));
	}

	render() {
		const {
			affiliation,
			classes,
			handleLogOut,
			handleMessageNew,
			handleRequestOpen,
			handleUserUpdate,
			locale,
			session,
			userData,
			isApproved,
			userData: {isProfessional, email, name}
		} = this.props;
		const {isPasswordUpdated, isEmailUpdated, isNameUpdated} = this.state;

		return (
			<div className={classes.root}>
				{affiliation && (
					<Typography variant="h5" className={classes.formType}>
						<FormattedMessage
							id="account.your-account-heading"
							defaultMessage="Your Account"
							description="Account page header"
						/>
					</Typography>
				)}
				{isProfessional && (
					<GeneralSettingsOrganization
						affiliation={affiliation}
						handleMessageNew={handleMessageNew}
						handleUserUpdate={handleUserUpdate}
						locale={locale}
						session={session}
						userData={userData}
						isApproved={isApproved}
					/>
				)}
				{!isProfessional && (
					<GeneralSettingsName
						currentName={name}
						handleUpdateName={this.updateName}
						isNameUpdated={isNameUpdated}
						handleMessageNew={handleMessageNew}
					/>
				)}
				<GeneralSettingsEmail
					currentEmail={email}
					handleUpdateEmail={this.updateEmail}
					isEmailUpdated={isEmailUpdated}
					handleMessageNew={handleMessageNew}
				/>
				<GeneralSettingsPassword
					handleUpdatePassword={this.updatePassword}
					isPasswordUpdated={isPasswordUpdated}
					handleMessageNew={handleMessageNew}
					userData={userData}
				/>
				<div
					data-test-id="account-page-logout"
					onClick={() => {
						handleMessageNew(
							<FormattedMessage
								id="action.sign-out-successful"
								defaultMessage="You have signed out successfully"
								description="Success message that you have been signed out."
							/>
						);
						handleLogOut();
					}}
					className={classes.settingsTypeFont}
				>
					<span>
						<FormattedMessage
							id="account.sign-out"
							defaultMessage="Sign Out"
							description="Sign out button"
						/>
					</span>
				</div>
				<div
					data-test-id="account-page-delete-account"
					onClick={() => handleRequestOpen('deleteAccount')}
					className={classes.settingsTypeFont}
				>
					<span>
						<FormattedMessage
							id="action.delete-account"
							defaultMessage="Delete Account"
							description="Delete account button"
						/>
					</span>
				</div>
			</div>
		);
	}
}

GeneralSettings.propTypes = {
	classes: PropTypes.object.isRequired,
	handleLogOut: PropTypes.func.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired,
	handleUserUpdate: PropTypes.func.isRequired,
	session: PropTypes.string.isRequired,
	isApproved: PropTypes.bool.isRequired,
	userData: PropTypes.shape({
		affiliation: PropTypes.shape({}),
		isProfessional: PropTypes.bool.isRequired,
		email: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired
};

export default withStyles(styles)(GeneralSettings);
