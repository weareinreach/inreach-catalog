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
	greenBar: {
		height: '7px',
		backgroundColor: '#00D56C',
		marginBottom: `${theme.spacing(3)}px`
	}
});

const ThankYouMobile = (props) => {
	const {classes, history, handleRequestClose, locale, userData} = props;

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
				<div className={classes.greenBar} />
				<DialogTitle data-test-id="thank-you-header">
					<FormattedMessage
						id="app.thank-you-heading"
						defaultMessage="Thank You!"
						description="Thank You message"
					/>
				</DialogTitle>
				<Typography
					variant="body1"
					className={classes.body}
					data-test-id="thank-you-text"
				>
					{userData.catalogType === 'reviewer' ? (
						<FormattedMessage
							id="app.thank-you-text-reviewer"
							defaultMessage="You will receive a notification from the InReach team soon."
							description="thank you message"
						/>
					) : (
						<FormattedMessage
							id="app.thank-you-text"
							defaultMessage="You are all set."
							description="thank you message"
						/>
					)}
				</Typography>
				<img
					data-test-id="thank-you-image"
					className={classes.img}
					src={ThankYou}
					alt={intl.formatMessage({
						id: 'alt-text.resource-suggest-edits-thank-you',
						defaultMessage: 'super thank you',
						description: 'Super thank you message'
					})}
				/>
				<div className={classes.dialogBody1}>
					<AsylumConnectButton
						variant="primary"
						testIdName="thank-you-resource-button"
						className={classes.moreMargin}
						onClick={goToResources}
					>
						<FormattedMessage
							id="navigation.find-resources"
							defaultMessage="Find Resources"
							description="Find Resources Navigation Prompt"
						/>
					</AsylumConnectButton>
					<AsylumConnectButton
						variant="primary"
						testIdName="thank-you-profile-button"
						className={classes.moreMargin}
						onClick={goToAccount}
					>
						<FormattedMessage
							id="app.go-to-profile"
							defaultMessage="My profile"
							description="My Profile Prompt"
						/>
					</AsylumConnectButton>
				</div>
			</Modal>
		</Paper>
	);
};

export default withStyles(styles)(ThankYouMobile);
