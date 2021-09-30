import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {FormattedMessage} from 'react-intl';

import AsylumConnectButton from './AsylumConnectButton';

const styles = (theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center'
	},
	helperText: {
		lineHeight: '1.54'
	},
	spacingAbove: {marginTop: '3rem'}
});

const ListNewForm = ({classes, handleChange, handleSubmit, name, password}) => (
	<form className={classes.container} onSubmit={handleSubmit}>
		<Typography
			variant="body1"
			data-test-id="favorites-create-new-page-header-text"
		>
			Your favorites lists are only visible to you and anyone you share
			them&nbsp;with.
		</Typography>
		<TextField
			id="name"
			label="List name"
			margin="normal"
			helperText="You could name your list by category, by day of the week, or by the name of whoever this list is for."
			className={classes.helperText}
			name="name"
			onChange={handleChange}
			required
			value={name}
			data-test-id="favorites-create-new-list-name-input"
		/>
		<AsylumConnectButton
			className={classes.spacingAbove}
			variant="primary"
			testIdName="favorites-create-new-button"
		>
			<FormattedMessage id="favorites.create-new-list" />
		</AsylumConnectButton>
	</form>
);

ListNewForm.propTypes = {
	classes: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired
};

export default withStyles(styles)(ListNewForm);
