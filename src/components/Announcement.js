import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import {InformationIcon, InformationIcon24, WarningIcon} from './icons';
import language from '../utils/language';
import {useIntl} from '../config';

const langCode = language.getLanguageCode();
const provider = language.getLanguageProvider();

const doNativeTranslation =
	langCode !== 'en' && provider === 'inreach' && useIntl ? true : false;

const styles = (theme) => ({
	root: {
		backgroundColor: theme.palette.banner[500],
		padding: '16px 0',
		textAlign: 'center',
		width: '100%',
		[theme.breakpoints.down('xs')]: {
			borderRadius: '5px'
		}
	},
	textContent: {
		color: theme.palette.common.black,
		maxWidth: theme.maxColumnWidth,
		margin: '0 16px',
		fontSize: '18px',
		textDecorationLine: 'underline'
	},
	textBeta: {
		color: theme.palette.common.black,
		maxWidth: theme.maxColumnWidth,
		fontSize: '16px'
	},
	rootBeta: {
		backgroundColor: theme.palette.banner[300],
		padding: '5px 5px',
		textAlign: 'center',
		width: '100%',
		[theme.breakpoints.down('xs')]: {
			borderRadius: '5px'
		},
		'& p': {
			margin: '0'
		}
	}
});

const Announcement = (props) => {
	const {classes, useSmallIcon} = props;

	function handleUseGoogle() {
		language.setLanguageProvider('gt');
		window.location.hash = '#googtrans(' + langCode + ')';
		window.location.reload();
	}

	return (
		<>
			<div id="announcement-div" className={classes.root + ' hide--on-print'}>
				<a href="https://inreach.org/new-inreach-app-redesign-coming-soon/">
					<InformationIcon fillColor={'#000000'} width={18} height={18} />
				</a>
				<a
					href="https://inreach.org/sneak-peak-inreach-app-redesign/"
					data-test-id="announcement-header"
				>
					<Typography
						variant="caption"
						color="primary"
						className={classes.textContent}
					>
						<FormattedMessage
							id="announcement-brand"
							defaultMessage="New InReach Redesign Coming Soon"
						/>
					</Typography>
				</a>
				|
				{/* <a href="https://inreach.org/new-inreach-app-redesign-coming-soon/">
					<WarningIcon width={18} fillColor={'#FF0000'} />
				</a> */}
				<a
					href="https://inreach.org/information-for-trans-youth-their-caregivers-and-other-trans-people-facing-anti-trans-legislation-in-united-states/"
					data-test-id="announcement-header2"
				>
					<Typography
						variant="caption"
						color="primary"
						className={classes.textContent}
					>
						<FormattedMessage
							id="announcement.antitranslegislation"
							defaultMessage="Information about U.S. Anti-Trans Legislation."
						/>
					</Typography>
				</a>
			</div>
			{/* {doNativeTranslation ? (
				<div
					id="announcement-div-spanish-beta"
					className={classes.rootBeta + ' hide--on-print'}
				>
					<p>
						<Typography
							variant="caption"
							color="secondary"
							className={classes.textBeta}
						>
							<FormattedMessage
								id="announcement-language-test"
								defaultMessage='Español \"Proporcionado por InReach\" es una función Beta, <b>{clickeHere}</b> para enviar tus comentarios.'
								description="Notice that seeing data in Spanish is being tested"
								values={{
									b: (chunks) => <strong>{chunks}</strong>,
									clickHere: (
										<a
											href="mailto:hello@inreach.org"
											target="_blank"
											rel="noopener noreferrer"
											className="hide--on-print"
										>
											<FormattedMessage
												id="resource.click-here"
												defaultMessage="Click Here"
												description="opens an email app"
											/>
										</a>
									)
								}}
							/>
						</Typography>
					</p>
					<p>
						<Typography
							variant="caption"
							color="secondary"
							className={classes.textBeta}
						>
							<FormattedMessage
								id="announcement-use-google-translate"
								defaultMessage="De manera opcional, <b>{clickeHere}</b> para usar el traductor de Google."
								description="Use google tranlate instaead of InReach Spanish"
								values={{
									b: (chunks) => <strong>{chunks}</strong>,
									clickHere: (
										<Button
											variant="text"
											style={{
												padding: '0',
												textTransform: 'none',
												fontWeight: 400,
												fontFamily: 'Inter, sans-serif',
												color: '#5073B3',
												fontSize: '16px'
											}}
											onClick={() => {
												handleUseGoogle();
											}}
										>
											<FormattedMessage
												id="resource.click-here"
												defaultMessage="Click Here"
												description="changes to Google Translated Spanish"
											/>
										</Button>
									)
								}}
							/>
						</Typography>
					</p>
				</div>
			) : null} */}
		</>
	);
};

Announcement.defaultProps = {
	useSmallIcon: false
};

Announcement.propTypes = {
	classes: PropTypes.object.isRequired,
	useSmallIcon: PropTypes.bool
};

export default withStyles(styles)(Announcement);
