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
	spacingVertical: {margin: '2.5rem 0'}
});

const PasswordForm = ({classes, handleChange, handleSubmit, password}) => (
	<form className={classes.container} onSubmit={handleSubmit}>
		<Typography variant="body1">
			<FormattedMessage id="app.inactivity-sign-in" />
		</Typography>
		<TextField
			id="password"
			label={<FormattedMessage id="form.password" />}
			margin="normal"
			name="password"
			onChange={handleChange}
			required
			type="password"
			value={password}
		/>
		<AsylumConnectButton className={classes.spacingVertical} variant="primary">
			<FormattedMessage id="form.confirm-password" />
		</AsylumConnectButton>
	</form>
);

PasswordForm.propTypes = {
	classes: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	password: PropTypes.string.isRequired
};

export default withStyles(styles)(PasswordForm);
