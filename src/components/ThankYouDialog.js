import React from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {withStyles, Typography} from '@material-ui/core';
import AsylumConnectButton from './AsylumConnectButton';
import DialogTitle from './DialogTitle';
import ThankYou from '../images/thanks.svg';
import ActionButton from './ActionButton';

const styles = (theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		minWidth: '503px',
		minHeight: '561px',
		overflowY: 'auto',
		borderTop: 'solid 6px #00D56C',
		' & .OrganizationAutocomplete-container': {
			zIndex: 'unset'
		}
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
	moreMargin: {
		marginBottom: '0',
		marginTop: '32px',
		width: '270px',
		height: '34px',
		paddingLeft: '0',
		paddingRight: '0'
	},
	dialogTitle: {
		marginTop: '41px'
	}
});

const ThankYouDialog = (props) => {
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

	return (
		<div className={classes.container}>
			<ActionButton
				onClick={handleRequestClose}
				testIdName="dialog-close-button"
				variant="primary"
			>
				&times;
			</ActionButton>
			<DialogTitle
				className={classes.dialogTitle}
				data-test-id="thank-you-header"
				variant="primary"
			>
				<FormattedMessage
					id="app.thank-you-heading"
					defaultMessage="Thank you!"
					description="thank you dialog title"
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
					description: 'thank you dialog text'
				})}
			/>
			<AsylumConnectButton
				variant="primary"
				testIdName="thank-you-resource-button"
				className={classes.moreMargin}
				onClick={goToResources}
			>
				<FormattedMessage
					id="navigation.find-resources"
					defaultMessage="Find Resources"
					description="link to find organizations page"
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
					description="link to account settings page"
				/>
			</AsylumConnectButton>
		</div>
	);
};

export default withStyles(styles)(ThankYouDialog);
