import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppStoreBadge from '../images/app-store-badge.svg';
import GooglePlayBadge from '../images/google-play-badge.png';

const styles = (theme) => ({
	bgDarkGrey: {backgroundColor: theme.palette.common.darkGrey},
	bgLightGrey: {backgroundColor: theme.palette.common.lightGrey},
	paddingBelow: {paddingBottom: '0.5rem'},
	paddingBelowLarge: {paddingBottom: '2rem'},
	paddingVertical: {padding: '1.5rem 0'},
	paddingVerticalIcons: {padding: '2.5rem 0 1rem 0'},
	paddingVerticalText: {padding: '1rem 0 1.5rem 0'},
	centerColumn: {
		maxWidth: theme.maxColumnWidth,
		margin: '0 auto'
	},
	textBlue: {color: theme.palette.secondary},
	textCenter: {textAlign: 'center'},
	footerLink: {
		fontWeight: '700'
	}
});

const Footer = ({classes, locale}) => {
	const {
		bgDarkGrey,
		bgLightGrey,
		paddingVertical,
		paddingVerticalIcons,
		paddingVerticalText,
		textBlue,
		textCenter,
		centerColumn,
		footerLink
	} = classes;

	const ContactLink = ({link, icon, testIdName}) => (
		<Grid item>
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				className={textBlue}
				data-test-id={testIdName}
			>
				<FontAwesome name={icon} size="lg" />
			</a>
		</Grid>
	);

	return (
		<footer className={classNames(textCenter, bgDarkGrey)}>
			<Grid
				container
				spacing={0}
				alignItems="center"
				justify="center"
				className={classNames(centerColumn, paddingVerticalIcons)}
			>
				<Grid item xs={12} md={6}>
					<Grid container spacing={2} justify="center">
						<ContactLink
							testIdName="footer-contact-facebook"
							link="https://www.facebook.com/asylumconnect"
							icon="facebook-f"
						/>
						<ContactLink
							testIdName="footer-contact-twitter"
							link="https://twitter.com/AsylumConnect"
							icon="twitter"
						/>
						<ContactLink
							testIdName="footer-contact-linkedin"
							link="https://www.linkedin.com/company/asylumconnect"
							icon="linkedin"
						/>
						<ContactLink
							testIdName="footer-contact-email"
							link="mailto:catalog@asylumconnect.org"
							icon="envelope-o"
						/>
						<ContactLink
							testIdName="footer-contact-instagram"
							link="https://www.instagram.com/asylumconnect/"
							icon="instagram"
						/>
						<ContactLink
							testIdName="footer-contact-youtube"
							link="https://www.youtube.com/channel/UCJsVS5-0ymo40mRjCe4BIHA"
							icon="youtube-play"
						/>
						<Grid
							container
							item
							xs={6}
							spacing={2}
							align="center"
							justify="center"
						>
							<Grid item>
								<a
									data-test-id="footer-apple-store-link"
									href="https://apps.apple.com/us/app/asylumconnect-lgbtq-help/id1482908383"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										height="35"
										src={AppStoreBadge}
										alt="Download on the App Store badge"
										data-test-id="footer-apple-store-image"
									/>
								</a>
							</Grid>
							<Grid item>
								<a
									data-test-id="footer-google-play-link"
									href="https://play.google.com/store/apps/details?id=org.asylumconnect.app"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										height="35"
										src={GooglePlayBadge}
										alt="Get it on Google Play badge"
										data-test-id="footer-google-play-image"
									/>
								</a>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<Grid
				container
				spacing={0}
				alignItems="center"
				justify="center"
				className={classNames(centerColumn, paddingVerticalText)}
			>
				<Grid item xs={12} md={6}>
					<Grid container spacing={0}>
						<Grid item xs>
							<Link
								to={'/' + locale + '/suggestions/new'}
								className={textBlue}
								data-test-id="footer-suggest-new"
							>
								<Typography
									variant="body1"
									color="secondary"
									classes={{body1: footerLink}}
								>
									<FormattedMessage id="suggestion.suggest-resource" />
								</Typography>
							</Link>
						</Grid>
						<Grid item xs>
							<a
								href="https://asylumconnect.org/newsletter/"
								className={textBlue}
								data-test-id="footer-newsletter-subscribe"
							>
								<Typography
									variant="body1"
									color="secondary"
									classes={{body1: footerLink}}
								>
									<FormattedMessage id="action.subscribe-to-newsletter" />
								</Typography>
							</a>
						</Grid>
						<Grid item xs>
							<a
								href="https://survey.az1.qualtrics.com/jfe/form/SV_4JylCyjAklvKGVL"
								className={textBlue}
								data-test-id="footer-share-feedback"
							>
								<Typography
									variant="body1"
									color="secondary"
									classes={{body1: footerLink}}
								>
									<FormattedMessage id="action.share-feedback" />
								</Typography>
							</a>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<div className={classNames(bgLightGrey, paddingVertical)}>
				<Typography variant="caption" data-test-id="footer-copy-rights">
					<FormattedMessage id="app.company-name" /> {new Date().getFullYear()}.{' '}
					<FormattedMessage id="app.copyright" />
				</Typography>
			</div>
		</footer>
	);
};

export default withStyles(styles)(Footer);
