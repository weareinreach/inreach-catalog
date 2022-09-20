import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {InformationIcon, InformationIcon24} from './icons';
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
		fontSize: '24px',
		textDecorationLine: 'underline'
	},
	textBeta1: {
		color: theme.palette.common.black,
		maxWidth: theme.maxColumnWidth,
		fontSize: '18px'
	},
	textBeta2: {
		color: theme.palette.common.black,
		maxWidth: theme.maxColumnWidth,
		fontSize: '18px'
	},
	rootBeta: {
		backgroundColor: theme.palette.banner[300],
		padding: '12px 0',
		textAlign: 'center',
		width: '100%',
		[theme.breakpoints.down('xs')]: {
			borderRadius: '5px'
		}
	}
});

const Announcement = (props) => {
	const {classes, useSmallIcon} = props;

	return (
		<>
			<div id="announcement-div" className={classes.root + ' hide--on-print'}>
				<a href="https://prn.to/3lMPU5Y">
					{useSmallIcon ? (
						<InformationIcon fillColor={'#000000'} />
					) : (
						<InformationIcon24 fillColor={'#000000'} />
					)}
				</a>
				<a href="https://prn.to/3lMPU5Y" data-test-id="announcement-header">
					<Typography
						variant="caption"
						color="primary"
						className={classes.textContent}
					>
						<FormattedMessage
							id="announcement-brand"
							defaultMessage="AsylumConnect is now InReach"
							description="update app users of name change"
						/>
					</Typography>
				</a>
			</div>
			{doNativeTranslation ? (
				<>
					<div
						id="announcement-div-spanish-beta"
						className={classes.rootBeta + ' hide--on-print'}
					>
						<Typography
							variant="caption"
							color="secondary"
							className={classes.textBeta1}
						>
							<FormattedMessage
								id="announcement-language-test"
								defaultMessage='Spanish "Provided by InReach" is a Beta Feature, {clickHere} to provide feedback.'
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
					</div>
					<div
						id="announcement-div-google-translate"
						className={classes.rootBeta + ' hide--on-print'}
					>
						<Typography
							variant="caption"
							color="secondary"
							className={classes.textBeta2}
							onClick={alert('sdsdd')}
						>
							<FormattedMessage
								id="announcement-language-test"
								defaultMessage="Optionally {clickHere} to use Google Translate"
								description="Use google tranlate instaead of InReach Spanish"
								values={{
									b: (chunks) => <strong>{chunks}</strong>,
									clickHere: (
										<FormattedMessage
											id="resource.click-here"
											defaultMessage="Click Here"
											description="changes to Google Translated Spanish"
										/>
									)
								}}
							/>
						</Typography>
					</div>
				</>
			) : null}
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
