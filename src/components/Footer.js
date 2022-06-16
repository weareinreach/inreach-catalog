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
	paddingVerticalText: {
		padding: '1rem 0 1.5rem 0',
		margin: 'auto'
	},
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
	},
	footerLinkContainerSize: {
		width: 'max-content',
		margin: 'auto'
	},
	footerLinkItemSize: {
		'@media(max-width: 760px)': {
			width: 'min-content'
		}
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
		footerLink,
		footerLinkContainerSize,
		footerLinkItemSize
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
				justifyContent="center"
				className={classNames(paddingVerticalIcons)}
			>
				<Grid item xs={12} md={6} lg={6}>
					<Grid container spacing={2} justifyContent="center">
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
							link="https://www.youtube.com/channel/UCJsVS5-0ymo40mRjCe4BIHA"
							icon="youtube-play"
						/>
						<Grid item className={classNames(footerLinkItemSize)}>
							<a
								target="_blank"
								href="https://inreach.org/mobile-app"
								className={textBlue}
								data-test-id="download-mobile-app"
							>
								<Typography
									variant="body1"
									color="secondary"
									classes={{body1: footerLink}}
								>
									<FormattedMessage id="app.download-mobile-app-footer" />
								</Typography>
							</a>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<Grid
				data-test-id="footer-bottom-links"
				container
				spacing={0}
				alignItems="center"
				justifyContent="center"
				className={classNames(paddingVerticalText)}
			>
				<Grid item xs={12} md={8} lg={8}>
					<Grid
						container
						spacing={2}
						justifyContent="center"
						className={classNames(footerLinkContainerSize)}
					>
						<Grid item className={classNames(footerLinkItemSize)}>
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
						<Grid item className={classNames(footerLinkItemSize)}>
							<a
								target="_blank"
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
						<Grid item className={classNames(footerLinkItemSize)}>
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
						<Grid item className={classNames(footerLinkItemSize)}>
							<Typography
								data-test-id="footer-disclaimer"
								variant="body1"
								color="secondary"
								classes={{body1: footerLink}}
								className={classes.pointer}
								onClick={() => handleRequestOpen('disclaimer')}
							>
								<FormattedMessage id="legal.read-disclaimer-prompt-pt2" />
							</Typography>
						</Grid>
						<Grid item className={classNames(footerLinkItemSize)}>
							<Typography
								data-test-id="footer-privacy"
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
