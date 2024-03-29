import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import AsylumConnectButton from './AsylumConnectButton';
// import {resetPassword} from '../utils/api';
import withWidth from './withWidth';

const styles = (theme) => ({
	container: {
		minHeight: '50%'
	},
	bottomSpacing: {
		marginBottom: '0.9rem'
	},
	[theme.breakpoints.down('xs')]: {
		container: {
			minHeight: '100%',
			paddingBottom: '91px'
		}
	}
});

class ResetPasswordPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			password: '',
			confirmPassword: '',
			submitted: false
		};
		this.token = null;
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleChangeConfirmPassword =
			this.handleChangeConfirmPassword.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentWillMount() {
		const {handleMessageNew, handleLogOut, session, location, history} =
			this.props;
		if (session) {
			handleLogOut();
		}
		let query = queryString.parse(location.search);

		if (query && (query.token || query.t)) {
			this.token = query.token || query.t;
		} else {
			handleMessageNew(
				<FormattedMessage
					id="error.invalid-reset-token"
					defaultMessage="Invalid password reset token"
					description="Error message for password reset token"
				/>
			);
			history.push('/');
		}
	}
	componentDidMount() {}
	handleChangePassword(event, value) {
		this.setState({
			password: event.target.value
		});
	}
	handleChangeConfirmPassword(event, value) {
		this.setState({
			confirmPassword: event.target.value
		});
	}

	handleSubmit(event) {
		const {handleMessageNew, history} = this.props;
		event.preventDefault();

		//check token
		if (!this.token) {
			handleMessageNew(
				<FormattedMessage
					id="error.invalid-reset-token"
					defaultMessage="Invalid password reset token"
					description="Error message for password reset token"
				/>
			);
			history.push('/');
		}

		//confirm passwords match
		if (this.state.password !== this.state.confirmPassword) {
			handleMessageNew(
				<FormattedMessage
					id="error.password-mismatch"
					defaultMessage="The passwords you have entered do not match."
					description="error message that passwords do not match"
				/>
			);
			this.setState({
				password: '',
				confirmPassword: ''
			});
			return;
		}

		//submit request
		// let payload = {
		//   reset_token: this.token,
		//   password: this.state.password,
		//   password_confirmation: this.state.confirmPassword,
		// };
		// resetPassword(payload)
		//   .then((response) => {
		//     let submitted = false;
		//     if (response) {
		//       handleMessageNew('Failed to reset password, please try again.');
		//     } else {
		//       submitted = true;
		//     }
		//     this.setState({
		//       password: '',
		//       confirmPassword: '',
		//       submitted: submitted,
		//     });
		//   })
		//   .catch((error) => {
		//     handleMessageNew(
		//       'Failed to reset password, please request a new reset link.'
		//     );
		//   });
	}

	render() {
		const {classes, intl} = this.props;
		const {password, confirmPassword, submitted} = this.state;
		const pswdTest = new RegExp(
			'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&?])(?=.{10,})'
		);

		function errorCheck(value) {
			return value.length > 0 && !pswdTest.test(value);
		}

		function errorConfirmMatch(value1, value2) {
			return value1.length > 0 && value1 !== value2;
		}

		return (
			<Grid
				container
				spacing={0}
				justify="center"
				alignItems="center"
				className={classes.container}
			>
				{!submitted ? (
					<Grid item xs={11} sm={8} md={5}>
						<form onSubmit={this.handleSubmit}>
							<Typography variant="h3" style={{textAlign: 'center'}}>
								<FormattedMessage
									id="account.reset-password"
									defaultMessage="Reset Your Password"
									description="Label for the Reset password form"
								/>
							</Typography>
							<TextField
								error={errorCheck(password)}
								helperText={
									errorCheck(password) ? (
										<FormattedMessage
											id="error.password-format"
											defaultMessage="Invalid password - your password must be at least 10 characters long; it must contain 1 uppercase character, 1 number, and 1 special character of the following !@#$%^&?"
											description="error message from reseting the password"
										/>
									) : null
								}
								id="password"
								label={intl.formatMessage({
									id: 'form.new-password',
									defaultMessage: 'New password',
									description: 'new password input field'
								})}
								margin="normal"
								name="password"
								onChange={this.handleChangePassword}
								required
								value={password}
								type="password"
								placeholder={intl.formatMessage({
									id: 'form.new-password',
									defaultMessage: 'New password',
									description: 'reset password placeholder text'
								})}
								fullWidth
							/>
							<TextField
								error={errorConfirmMatch(confirmPassword, password)}
								helperText={
									errorConfirmMatch(confirmPassword, password) ? (
										<FormattedMessage
											id="error.password-mismatch"
											defaultMessage="The passwords you have entered do not match."
											description="error message that passwords do not match"
										/>
									) : null
								}
								id="confirmPassword"
								label={intl.formatMessage({
									id: 'form.confirm-new-password',
									defaultMessage: 'Confirm new password',
									description: 'confirm password input field'
								})}
								margin="normal"
								name="confirmPassword"
								onChange={this.handleChangeConfirmPassword}
								required
								value={confirmPassword}
								type="password"
								placeholder={intl.formatMessage({
									id: 'form.confirm-new-password',
									defaultMessage: 'Confirm new password',
									description: 'confirm password placeholder text'
								})}
								fullWidth
								className={classes.bottomSpacing}
							/>
							<AsylumConnectButton variant="primary">
								<FormattedMessage
									id="action.reset-password"
									defaultMessage="Reset Your Password"
									description="button to reset the password"
								/>
							</AsylumConnectButton>
						</form>
					</Grid>
				) : (
					<Grid item xs={11} sm={8} md={5}>
						<Typography
							variant="h3"
							style={{textAlign: 'center'}}
							className={classes.bottomSpacing}
						>
							<FormattedMessage
								id="action.reset-password-success-no-email"
								defaultMessage="Your password has been reset successfully!"
								description="succes message after resetting the password"
							/>
						</Typography>
						<Typography variant="body2">
							<FormattedMessage
								id="action.reset-password-sign-in-prompt"
								defaultMessage="Your password has been reset. You can sign in now using your new password."
								description="succes message after resetting the password"
							/>
						</Typography>
					</Grid>
				)}
			</Grid>
		);
	}
}

ResetPasswordPage.propTypes = {
	handleLogOut: PropTypes.func.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	session: PropTypes.string,
	history: PropTypes.object.isRequired
};

export default withStyles(styles)(withWidth(injectIntl(ResetPasswordPage)));
