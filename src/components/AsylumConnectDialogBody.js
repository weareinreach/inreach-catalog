import React from 'react';
import {withStyles} from '@material-ui/core';
import ActionButton from './ActionButton';

const styles = (theme) => ({
	dialogBody: {
		minWidth: '503px',
		minHeight: '567px',
		overflowY: 'auto'
	},
	blueBar: {
		width: 'auto',
		height: '7px',
		backgroundColor: '#5073B3',
		marginBottom: `${theme.spacing(6)}px`
	}
});

const AsylumConnectDialogBody = (props) => {
	const {classes, children, handleRequestClose} = props;

	return (
		<div
			className={classes.dialogBody}
			data-test-id="asylum-connect-dialog-body"
		>
			<div className={classes.blueBar} />
			<ActionButton
				onClick={handleRequestClose}
				testIdName="dialog-close-button"
			>
				&times;
			</ActionButton>
			{children}
		</div>
	);
};

export default withStyles(styles)(AsylumConnectDialogBody);
