import React from 'react';
import PropTypes from 'prop-types';

import AsylumConnectButton from './AsylumConnectButton';
import DialogTitle from './DialogTitle';

import ThankYou from '../images/thanks.svg';

import Modal from 'react-modal';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import {
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Typography
} from '@material-ui/core';

const styles = (theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center'
	},
	img: {
		height: '205px',
		width: '220px',
		display: 'block',
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	body: {
		textAlign: 'center',
		paddingBottom: '48px'
	},
	title: {
		fontFamily: 'Open Sans',
		fontSize: '24px',
		fontStyle: 'normal',
		fontWeight: '700',
		lineHeight: '33px',
		textAlign: 'center'
	},
	moreMargin: {
		marginBottom: '0',
		marginTop: '32px',
		width: '270px',
		height: '34px',
		paddingLeft: '0',
		paddingRight: '0'
	}
});

const ThankYouDialog = (props) => {
	const {classes} = props;

	return (
		<div className={classes.container}>
			<DialogTitle className={classes.title}>Thank you!</DialogTitle>
			<Typography variant="body1" className={classes.body}>
				You are all set.
			</Typography>
			<img className={classes.img} src={ThankYou} alt="super thank you" />
			<AsylumConnectButton
				variant="primary"
				testIdName="thank-you-resource-button"
				className={classes.moreMargin}
			>
				FIND RESOURCES
			</AsylumConnectButton>
			<AsylumConnectButton
				variant="primary"
				testIdName="thank-you-profile-button"
				className={classes.moreMargin}
			>
				GO TO YOUR PROFILE
			</AsylumConnectButton>
		</div>
	);
};

export default withStyles(styles)(ThankYouDialog);
