import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';

import AsylumConnectButton from './AsylumConnectButton';
import {FormattedMessage} from 'react-intl';

const styles = (theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center'
	},
	spacingAbove: {marginTop: '3rem'}
});

const ShareForm = ({classes, email, handleChange, handleSubmit, shareType}) => (
	<form className={classes.container} onSubmit={handleSubmit}>
		<TextField
			id="email"
			label={
				<FormattedMessage
					id="form.email"
					defaultMessage="Email"
					description="text box to enter the email address of who you want to share this resource with"
				/>
			}
			margin="normal"
			name="email"
			onChange={handleChange}
			required
			type="email"
			value={email}
			data-test-id="favorites-list-share-email-input"
		/>
		<AsylumConnectButton
			testIdName="favorites-list-share-dialog-button"
			className={classes.spacingAbove}
			variant="primary"
		>
			{shareType === 'collection' ? (
				<FormattedMessage
					id="action.share-list"
					defaultMessage="Share List"
					description="button to share this item"
				/>
			) : (
				<FormattedMessage
					id="action.share-resource"
					defaultMessage="Share Resource"
					description="button to share this item"
				/>
			)}
		</AsylumConnectButton>
	</form>
);

ShareForm.propTypes = {
	classes: PropTypes.object.isRequired,
	email: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(ShareForm);
