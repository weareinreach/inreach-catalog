import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {FormattedMessage} from 'react-intl';
import classnames from 'classnames';

import AsylumConnectButton from './AsylumConnectButton';
import {breakpoints} from '../theme';

const styles = (theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center'
	},
	link: {
		color: theme.palette.secondary[500],
		cursor: 'pointer'
	},
	paddingAbove: {paddingTop: theme.spacing(5)},
	paddingVertical: {
		padding: theme.spacing(5, 10)
	},
	[`@media (max-width: ${breakpoints['sm']}px)`]: {
		paddingVertical: {
			padding: theme.spacing(3, 0)
		}
	}
});

const LoginForm = ({
	classes,
	email,
	handleChange,
	handleRequestOpen,
	handleSubmit,
	password
}) => (
	<form
		className={classes.container}
		data-test-id="log-in-dialog-container-login-form"
		onSubmit={handleSubmit}
	>
		<FormattedMessage
			id="form.email"
			defaultMessage="Email"
			description="sign in form, email input field"
		>
			{(emailText) => (
				<TextField
					id="email"
					label={emailText}
					margin="normal"
					name="email"
					onChange={handleChange}
					required
					type="email"
					value={email}
					data-test-id="log-in-dialog-container-email-input"
				/>
			)}
		</FormattedMessage>
		<FormattedMessage
			id="form.password"
			defaultMessage="Password"
			description="sign in form, password input field"
		>
			{(passwordText) => (
				<TextField
					id="password"
					label={passwordText}
					margin="normal"
					name="password"
					onChange={handleChange}
					required
					type="password"
					value={password}
					data-test-id="log-in-dialog-container-password-input"
				/>
			)}
		</FormattedMessage>

		<Typography variant="body1" className={classes.paddingVertical}>
			<FormattedMessage
				id="legal.sign-in-agree-to-terms"
				defaultMessage="By clicking Sign in, you agree to InReach's"
				description="part 1 of terms and conditions"
			/>
			{` `}
			<FormattedMessage
				id="legal.privacy-policy"
				defaultMessage="Privacy Policy"
				description="label for privacy policy"
			>
				{(privacy) => (
					<a
						href="https://inreach.org/privacy/"
						rel="noopener noreferrer"
						target="_blank"
						data-test-id="log-in-dialog-container-privacy"
					>
						{privacy}
					</a>
				)}
			</FormattedMessage>{' '}
			<FormattedMessage id="legal.and" defaultMessage="and" />{' '}
			<FormattedMessage id="legal.terms-of-use" defaultMessage="Terms of Use">
				{(terms) => (
					<a
						href="https://inreach.org/terms-of-use/"
						rel="noopener noreferrer"
						target="_blank"
						data-test-id="log-in-dialog-container-terms-of-use"
					>
						{terms}
					</a>
				)}
			</FormattedMessage>
		</Typography>
		<FormattedMessage
			id="account.sign-in"
			defaultMessage="Sign In"
			description="sign in button"
		>
			{(signIn) => (
				<AsylumConnectButton
					variant="signUp"
					testIdName="log-in-dialog-container-sign-in-button"
				>
					{signIn}
				</AsylumConnectButton>
			)}
		</FormattedMessage>

		<FormattedMessage
			id="account.forgot-password"
			defaultMessage="Forgot Password"
			description="link to request password reset"
		>
			{(forgot) => (
				<p onClick={() => handleRequestOpen('forgot')}>
					<Typography
						className={classnames(classes.paddingAbove, classes.link)}
						variant="body1"
						data-test-id="log-in-dialog-container-forgot-password"
					>
						{forgot}
					</Typography>
				</p>
			)}
		</FormattedMessage>
		<FormattedMessage
			id="account.no-account"
			defaultMessage="Don't have an account?"
			description="link to go to the create account form"
		>
			{(noAccount) => (
				<p
					onClick={() => handleRequestOpen('signup')}
					data-test-id="log-in-dialog-container-no-acount"
				>
					<Typography variant="body1">
						<span className={classes.link}>{noAccount}</span>
					</Typography>
				</p>
			)}
		</FormattedMessage>
	</form>
);

LoginForm.propTypes = {
	classes: PropTypes.object.isRequired,
	email: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	password: PropTypes.string.isRequired
};

export default withStyles(styles)(LoginForm);
