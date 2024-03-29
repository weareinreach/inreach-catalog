import React from 'react';
import {FormattedMessage} from 'react-intl';

import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
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

const PromptReconfirm = ({classes, handleRequestOpen}) => (
	<Paper className={classes.container}>
		<Typography className={classes.spacingVertical}>
			<FormattedMessage
				id="app.sensitive-information-sign-in-prompt"
				defaultMessage="This page contains sensitive information. For your security, please sign in."
				description="warning message about sensitive information"
			/>
		</Typography>
		<AsylumConnectButton
			className={classes.spacingVertical}
			onClick={() => handleRequestOpen('password')}
			variant="primary"
		>
			<FormattedMessage
				id="account.sign-in"
				defaultMessage="Sign in"
				description="button to open sign in dialog"
			/>
		</AsylumConnectButton>
	</Paper>
);

PromptReconfirm.propTypes = {
	handleRequestOpen: PropTypes.func.isRequired
};

export default withStyles(styles)(PromptReconfirm);
