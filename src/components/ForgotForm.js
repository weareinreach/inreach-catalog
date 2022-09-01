import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import AsylumConnectButton from './AsylumConnectButton';

const styles = (theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center'
	},
	spacingVertical: {margin: theme.spacing(5, 0)},
	link: {
		color: theme.palette.secondary[500],
		cursor: 'pointer'
	}
});

const ForgotForm = ({
	classes,
	email,
	handleChange,
	handleRequestOpen,
	handleSubmit,
	password
}) => (
	<form className={classes.container} onSubmit={handleSubmit}>
		<Typography variant="body1" data-test-id="forgot-password-body">
			<FormattedMessage
				id="account.request-password-reset"
				defaultMessage="Enter your email address and we will send you an email to reset your password."
				description="Message to enter your email address to reset password"
			/>
		</Typography>
		<TextField
			id="email"
			label={
				<FormattedMessage
					id="form.email"
					defaultMessage="Email"
					description="Message to enter your email here"
				/>
			}
			margin="normal"
			name="email"
			onChange={handleChange}
			required
			type="email"
			data-test-id="forgot-password-email"
			value={email}
		/>
		<AsylumConnectButton
			className={classes.spacingVertical}
			variant="primary"
			testIdName="forgot-password-send-button"
		>
			<FormattedMessage
				id="form.send"
				defaultMessage="Send"
				description="Button to send new password to your email"
			/>
		</AsylumConnectButton>
		<div onClick={() => handleRequestOpen('login')}>
			<Typography
				variant="body1"
				className={classes.link}
				data-test-id="forgot-password-back-button"
			>
				<FormattedMessage
					id="navigation.back"
					defaultMessage="Back"
					description="Back button to go back to the sign in page"
				/>
			</Typography>
		</div>
	</form>
);

ForgotForm.propTypes = {
	classes: PropTypes.object.isRequired,
	email: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(ForgotForm);
