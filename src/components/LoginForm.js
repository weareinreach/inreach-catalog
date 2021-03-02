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
	<form className={classes.container} onSubmit={handleSubmit}>
		<FormattedMessage id="form.email">
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
				/>
			)}
		</FormattedMessage>
		<FormattedMessage id="form.password">
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
				/>
			)}
		</FormattedMessage>

		<Typography variant="body1" className={classes.paddingVertical}>
			<FormattedMessage id="legal.sign-in-agree-to-terms" />
			<FormattedMessage id="legal.privacy-policy">
				{(privacy) => (
					<a
						href="https://asylumconnect.org/privacy"
						rel="noopener noreferrer"
						target="_blank"
					>
						{privacy}
					</a>
				)}
			</FormattedMessage>{' '}
			<FormattedMessage id="legal.and" />{' '}
			<FormattedMessage id="legal.terms-of-use">
				{(terms) => (
					<a
						href="https://asylumconnect.org/terms-of-use"
						rel="noopener noreferrer"
						target="_blank"
					>
						{terms}
					</a>
				)}
			</FormattedMessage>
		</Typography>
		<FormattedMessage id="account.sign-in">
			{(signIn) => (
				<AsylumConnectButton variant="primary">{signIn}</AsylumConnectButton>
			)}
		</FormattedMessage>

		<FormattedMessage id="account.forgot-password">
			{(forgot) => (
				<a onClick={() => handleRequestOpen('forgot')}>
					<Typography
						className={classnames(classes.paddingAbove, classes.link)}
						variant="body1"
					>
						{forgot}
					</Typography>
				</a>
			)}
		</FormattedMessage>
		<FormattedMessage id="account.no-account">
			{(noAccount) => (
				<a onClick={() => handleRequestOpen('signup')}>
					<Typography variant="body1">
						<span className={classes.link}>{noAccount}</span>
					</Typography>
				</a>
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
