import React from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppStoreBadge from '../images/app-store-badge.svg';
import GooglePlayBadge from '../images/google-play-badge.png';
import PropTypes from 'prop-types';

const styles = (theme) => ({
	bgDarkGrey: {backgroundColor: theme.palette.common.darkGrey},
	bgLightGrey: {backgroundColor: theme.palette.common.lightGrey},
	paddingBelow: {paddingBottom: '0.5rem'},
	paddingBelowLarge: {paddingBottom: '2rem'},
	paddingVertical: {padding: '1.5rem 0'},
	paddingVerticalIcons: {padding: '2.5rem 0 1rem 0'},
	paddingVerticalText: {padding: '1rem 0 1.5rem 0'},
	textBlue: {
		color: theme.palette.secondary
	},
	textCenter: {textAlign: 'center'},
	footerLink: {
		fontWeight: '600',
		fontSize: '16px'
	},
	pointer: {
		cursor: 'pointer',
		display: 'inline-block',
		position: 'relative'
	},
	pointerText: {
		textShadow:
			'2px 0 ' +
			theme.palette.secondary[500] +
			', -2px 0 ' +
			theme.palette.secondary[500]
	}
});

const Footer = ({classes, locale, handleRequestOpen}) => {
	const {
		bgDarkGrey,
		bgLightGrey,
		paddingVertical,
		paddingVerticalIcons,
		paddingVerticalText,
		textBlue,
		textCenter,
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

	const intl = useIntl();

	return (
		<footer className={classNames(textCenter, bgDarkGrey)}>
			<Grid
				container
				spacing={0}
				alignItems="center"
				justify="center"
				className={classNames(paddingVerticalIcons)}
			>
				<Grid item xs={12} md={6} lg={6}>
					<Grid container spacing={2} justify="center">
						<ContactLink
							testIdName="footer-contact-facebook"
							link="https://www.facebook.com/weareinreach"
							icon="facebook-f"
						/>
						<ContactLink
							testIdName="footer-contact-twitter"
							link="https://twitter.com/weareinreach"
							icon="twitter"
						/>
						<ContactLink
							testIdName="footer-contact-linkedin"
							link="http://linkedin.com/company/weareinreach"
							icon="linkedin"
						/>
						<ContactLink
							testIdName="footer-contact-email"
							link="mailto:hello@inreach.org"
							icon="envelope-o"
						/>
						<ContactLink
							testIdName="footer-contact-instagram"
							link="https://www.instagram.com/weareinreach/"
							icon="instagram"
						/>
						<ContactLink
							testIdName="footer-contact-youtube"
							link="https://www.youtube.com/channel/weareinreach"
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
										alt={intl.formatMessage({
											id: 'alt-text.download-on-app-store'
										})}
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
										alt={intl.formatMessage({
											id: 'alt-text.download-on-google-play'
										})}
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
				className={classNames(paddingVerticalText)}
			>
				<Grid item xs={12} lg={8}>
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
								href="https://inreach.org/newsletter/"
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
								href="https://bit.ly/inreach-app-share-feedback"
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
						<Grid item xs>
							<Typography
								variant="body1"
								color="secondary"
								classes={{body1: footerLink}}
								className={classes.pointer}
								onClick={() => handleRequestOpen('disclaimer')}
							>
								<FormattedMessage id="legal.read-disclaimer-prompt-pt2" />
							</Typography>
						</Grid>
						<Grid item xs>
							<Typography
								variant="body1"
								color="secondary"
								classes={{body1: footerLink}}
								className={classes.pointer}
								onClick={() => handleRequestOpen('privacy')}
							>
								<FormattedMessage id="legal.read-disclaimer-prompt-pt3" />
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<div className={classNames(bgLightGrey, paddingVertical)}>
				<Typography variant="caption" data-test-id="footer-copy-rights">
					<FormattedMessage id="app.company-name" /> {new Date().getFullYear()}.{' '}
					<FormattedMessage id="app.copyright" />.
				</Typography>
			</div>
		</footer>
	);
};
Footer.propTypes = {
	handleRequestOpen: PropTypes.func.isRequired
};

export default withStyles(styles)(Footer);
