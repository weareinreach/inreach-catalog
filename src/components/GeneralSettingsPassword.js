import React from 'react';
import {FormattedMessage} from 'react-intl';
import {catalogPost} from '../utils/api';

import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import AsylumConnectButton from './AsylumConnectButton';

const styles = (theme) => ({
	root: {
		width: '30%',
		padding: '0 5% 0 5%'
	},
	settingsTypeFont: {
		padding: '15px 0 25px 0',
		fontSize: 13,
		fontWeight: 700,
		fontFamily: '"Inter", sans-serif',
		letterSpacing: '-.02em',
		color: theme.palette.secondary[500],
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		cursor: 'pointer'
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		'& > div': {
			margin: '15px 0 15px 0'
		}
	},
	formType: {
		margin: '10% 0 10% 0'
	},
	inputLabel: {
		'& label': theme.custom.inputLabel,
		'& div': {
			marginTop: '20px'
		},
		'& input': theme.custom.inputText
	}
});

class GeneralSettingsPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: this.props.userData,
			phoneTextMask: '(  )   -   ',
			open: false,
			currentPassword: '',
			newPassword: '',
			confirmedPassword: '',
			email: this.props.userData.email
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleToggleDropDown = this.handleToggleDropDown.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const {name, value} = e.target;
		this.setState({
			[name]: value
		});
	}

	handleToggleDropDown() {
		this.setState({open: !this.state.open});
	}

	handleSubmit(e) {
		e.preventDefault();
		const {handleMessageNew} = this.props;
		const {currentPassword, newPassword, confirmedPassword, email} = this.state;

		if (!currentPassword || !newPassword || !confirmedPassword) {
			handleMessageNew(
				<FormattedMessage
					id="error.required-field-empty"
					defaultMessage="Please fill out all fields"
					description="Error message that all fields must be filled out."
				/>
			);
		}
		if (currentPassword && newPassword && confirmedPassword) {
			if (newPassword === confirmedPassword) {
				let password = currentPassword;
				//verify current password, then update to the new password
				catalogPost('/auth', {email, password})
					.then((response) => {
						if (response.status === 200) {
							//update password here
							this.props
								.handleUpdatePassword(currentPassword, newPassword)
								.then(() => {
									handleMessageNew(
										<FormattedMessage
											id="action.update-password-successful"
											defaultMessage="Your password has been updated successfully!"
											description="Success message that your password has been updated."
										/>
									);
								})
								.catch(() => {
									this.setState({currentPassword: ''});
									this.setState({newPassword: ''});
									this.setState({confirmedPassword: ''});
									handleMessageNew(
										<FormattedMessage
											id="error.unspecified"
											defaultMessage="Oops! Something went wrong."
											description="Error message from processing the request."
										/>
									);
								});
						} else {
							this.setState({currentPassword: ''});
							this.setState({newPassword: ''});
							this.setState({confirmedPassword: ''});
							handleMessageNew(
								<FormattedMessage
									id="error.incorrect-password"
									defaultMessage="The password you entered was incorrect"
									description="Error message that the entered password is incorrect."
								/>
							);
						}
					})
					.catch((error) => {
						this.setState({currentPassword: ''});
						this.setState({newPassword: ''});
						this.setState({confirmedPassword: ''});
						handleMessageNew(
							<FormattedMessage
								id="error.unspecified"
								defaultMessage="Oops! Something went wrong."
								description="Error message from processing the request."
							/>
						);
					});
			} else {
				this.setState({currentPassword: ''});
				this.setState({newPassword: ''});
				this.setState({confirmedPassword: ''});
				handleMessageNew(
					<FormattedMessage
						id="error.password-mismatch"
						defaultMessage="The passwords you have entered do not match."
						description="Message that the passwords entered must match."
					/>
				);
			}
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.isPasswordUpdated !== null) {
			this.setState({
				currentPassword: '',
				newPassword: '',
				confirmedPassword: ''
			});
		}
	}

	render() {
		const {classes} = this.props;
		const {currentPassword, newPassword, confirmedPassword} = this.state;
		const pswdTest = new RegExp(
			'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&?])(?=.{10,})'
		);
		let fullDate = new Date(this.state.userData.created_at);
		let year = fullDate.getFullYear();
		let errorMsg = '';

		if (year < '2022') {
			errorMsg = (
				<FormattedMessage
					id="error.password-length"
					defaultMessage="Password must be at least 8 characters."
					description="Message that passwords must have at least 8 characters."
				/>
			);
		} else if (year > '2021') {
			errorMsg = (
				<FormattedMessage
					id="error.password-format"
					defaultMessage="Invalid password - your password must be at least 10 characters long; it must contain 1 uppercase character, 1 number, and 1 special character of the following !@#$%^&?"
					description="Message that the password is invalid."
				/>
			);
		}

		function errorCheck(value) {
			return value.length > 0 && !pswdTest.test(value);
		}

		function errorConfirmMatch(value1, value2) {
			return value1.length > 0 && value1 !== value2;
		}

		return (
			<div>
				<div
					data-test-id="account-page-change-password"
					onClick={this.handleToggleDropDown}
					className={classes.settingsTypeFont}
				>
					<span>
						<FormattedMessage
							id="action.update-password"
							defaultMessage="Update password"
							description="Update password dropdown button"
						/>
					</span>
					{this.state.open ? <ExpandLess /> : <ExpandMore />}
				</div>
				<Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
					<form className={classes.form} onSubmit={this.handleSubmit}>
						<TextField
							data-test-id="account-settings-password-old-password"
							className={classes.inputLabel}
							name="currentPassword"
							label={
								<FormattedMessage
									id="form.current-password"
									defaultMessage="Current password"
									description="Current password input field"
								/>
							}
							type="password"
							error={
								(year < '2022' &&
									currentPassword.length > 0 &&
									currentPassword.length < 8) ||
								(year > '2021' &&
									currentPassword.length > 0 &&
									!pswdTest.test(currentPassword))
							}
							helperText={
								(year < '2022' &&
									currentPassword.length > 0 &&
									currentPassword.length < 8) ||
								(year > '2021' &&
									currentPassword.length > 0 &&
									!pswdTest.test(currentPassword))
									? errorMsg
									: null
							}
							value={currentPassword}
							InputLabelProps={{
								shrink: true
							}}
							placeholder="***"
							onChange={this.handleChange}
							required
						/>
						<TextField
							data-test-id="account-settings-password-new-password"
							className={classes.inputLabel}
							name="newPassword"
							label={
								<FormattedMessage
									id="form.new-password"
									defaultMessage="New password"
									description="New password input field"
								/>
							}
							type="password"
							error={errorCheck(newPassword)}
							helperText={
								errorCheck(newPassword) ? (
									<FormattedMessage
										id="error.password-format"
										defaultMessage="Invalid password - your password must be at least 10 characters long; it must contain 1 uppercase character, 1 number, and 1 special character of the following !@#$%^&?"
										description="Message that the password is invalid."
									/>
								) : null
							}
							value={newPassword}
							InputLabelProps={{
								shrink: true
							}}
							placeholder="***"
							onChange={this.handleChange}
							required
						/>
						<TextField
							data-test-id="account-settings-password-new-password-confirm"
							className={classes.inputLabel}
							name="confirmedPassword"
							label={
								<FormattedMessage
									id="form.confirm-new-password"
									defaultMessage="Confirm new password"
									description="Confirm new password input field"
								/>
							}
							type="password"
							error={errorConfirmMatch(confirmedPassword, newPassword)}
							helperText={
								errorConfirmMatch(confirmedPassword, newPassword) ? (
									<FormattedMessage
										id="error.password-mismatch"
										defaultMessage="The passwords you have entered do not match."
										description="Error message that the passwords do not match."
									/>
								) : null
							}
							value={confirmedPassword}
							InputLabelProps={{
								shrink: true
							}}
							placeholder="***"
							onChange={this.handleChange}
							required
						/>
						<div>
							<AsylumConnectButton
								variant="secondary"
								testIdName="account-settings-password-button"
							>
								<FormattedMessage
									id="action.update-password"
									defaultMessage="Update password"
									description="Update password button"
								/>
							</AsylumConnectButton>
						</div>
					</form>
				</Collapse>
			</div>
		);
	}
}

GeneralSettingsPassword.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GeneralSettingsPassword);
