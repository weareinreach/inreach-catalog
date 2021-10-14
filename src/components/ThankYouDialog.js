import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, useIntl} from 'react-intl';
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
import {useHistory} from 'react-router-dom';

import AsylumConnectButton from './AsylumConnectButton';
import DialogTitle from './DialogTitle';
import ThankYou from '../images/thanks.svg';

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
	const {classes, history, handleRequestClose, locale} = props;

	const intl = useIntl();

	const goToAccount = async () => {
		handleRequestClose();
		history.push('/' + locale + '/account');
	};

	const goToResources = async () => {
		handleRequestClose();
		history.push('/');
	};

	return (
		<div className={classes.container}>
			<DialogTitle>
				<FormattedMessage id="app.thank-you-heading" />
			</DialogTitle>
			<Typography variant="body1" className={classes.body}>
				<FormattedMessage id="app.thank-you-text" />
			</Typography>
			<img
				className={classes.img}
				src={ThankYou}
				alt={intl.formatMessage({
					id: 'alt-text.resource-suggest-edits-thank-you'
				})}
			/>
			<AsylumConnectButton
				variant="primary"
				testIdName="thank-you-resource-button"
				className={classes.moreMargin}
				onClick={goToResources}
			>
				<FormattedMessage id="navigation.find-resources" />
			</AsylumConnectButton>
			<AsylumConnectButton
				variant="primary"
				testIdName="thank-you-profile-button"
				className={classes.moreMargin}
				onClick={goToAccount}
			>
				<FormattedMessage id="app.go-to-profile" />
			</AsylumConnectButton>
		</div>
	);
};

export default withStyles(styles)(ThankYouDialog);
