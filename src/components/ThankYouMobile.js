import React from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import Modal from 'react-modal';
import {withStyles, Typography} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import AsylumConnectButton from './AsylumConnectButton';

import DialogTitle from './DialogTitle';
import ThankYou from '../images/thanks.svg';

const styles = (theme) => ({
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
	moreMargin: {
		marginBottom: '0',
		marginTop: '32px',
		height: '34px',
		paddingLeft: '0',
		paddingRight: '0'
	},
	root: {
		flexGrow: 1,
		marginLeft: '2.5em',
		marginRight: '2.5em',
		borderBottom: '1px solid ' + theme.palette.common.faintBlack,
		boxShadow: 'none'
	},
	reactContent: {
		position: 'absolute',
		inset: '40px',
		border: '1px solid rgb(204, 204, 204)',
		background: 'rgb(255, 255, 255)',
		overflow: 'auto',
		borderRadius: '4px',
		outline: 'none',
		paddingBottom: '20px',
		height: 'fit-content',
		width: '80%'
	},
	dialogBody1: {
		marginLeft: '10%',
		marginRight: '10%'
	},
	blueBar: {
		height: '7px',
		backgroundColor: '#5073B3',
		marginBottom: `${theme.spacing(3)}px`
	}
});

const ThankYouMobile = (props) => {
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

	// document.getElementById("myElementID").classList.add('myClassName');

	return (
		<Paper className={classes.root}>
			<Modal
				isOpen={true}
				className={classes.reactContent}
				style={{
					overlay: {
						zIndex: 10
					}
				}}
			>
				<div className={classes.blueBar} />
				<DialogTitle data-test-id="thank-you-header">
					<FormattedMessage id="app.thank-you-heading" />
				</DialogTitle>
				<Typography
					variant="body1"
					className={classes.body}
					data-test-id="thank-you-text"
				>
					<FormattedMessage id="app.thank-you-text" />
					sdfsdf
				</Typography>
				<img
					data-test-id="thank-you-image"
					className={classes.img}
					src={ThankYou}
					alt={intl.formatMessage({
						id: 'alt-text.resource-suggest-edits-thank-you'
					})}
				/>
				<div className={classes.dialogBody1}>
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
			</Modal>
		</Paper>
	);
};

export default withStyles(styles)(ThankYouMobile);
