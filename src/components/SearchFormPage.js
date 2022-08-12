import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {FormattedMessage} from 'react-intl';
import WhoServeSelector from './WhoServeSelector';
import AsylumConnectDropdownListItem from './AsylumConnectDropdownListItem';
import AsylumConnectBackButton from './AsylumConnectBackButton';
import LocaleForm from './LocaleForm';
import SearchForm from './SearchForm';
import SubAnnouncement from './SubAnnouncement';
import Announcement from './Announcement';
import withWidth from './withWidth';
import Disclaimer from './Disclaimer';
import {getLocale, isLocaleSet, fetchLocaleName} from '../utils/locale';
import {breakpoints, mobilePadding} from '../theme';

const styles = (theme) => ({
	title: {
		marginBottom: theme.spacing(1)
	},
	subheading: {
		marginBottom: theme.spacing(4),
		[theme.breakpoints.down('xs')]: {
			fontSize: theme.typography.h2.fontSize,
			lineHeight: '1.5',
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2),
			paddingTop: theme.spacing(2)
		}
	},
	container: {
		minHeight: '500px',
		paddingTop: theme.spacing(8),
		[theme.breakpoints.down('xs')]: {
			paddingTop: 0
		}
	},
	subAnnouncement: {
		backgroundColor: '#e9e9e9',
		paddingTop: '1rem',
		paddingBottom: '1rem',
		position: 'absolute',
		top: '0',
		left: '0',
		right: '0',
		[theme.breakpoints.down('xs')]: Object.assign(mobilePadding(theme), {
			position: 'static',
			paddingTop: '80px',
			marginLeft: '0'
		})
	},
	mobileSubContainer: {
		'& > div:nth-child(2)': {
			padding: '0 5% 16px'
		},
		'& > div:nth-child(3)': {
			padding: '0 5% 24px',
			'& > div:nth-child(1) > :nth-child(2) :nth-child(1)': {
				fontSize: '14px'
			}
		},
		'& > div:nth-child(4)': {
			// padding: '0 5% 8px',
			'& > p:nth-child(1)': {
				fontSize: '24px',
				fontWeight: 700,
				lineHeight: '29px'
			}
		},
		'& > div:nth-child(5)': {
			padding: '16px 5% 24px',
			'& > p:nth-child(1)': {
				fontSize: '14px',
				fontWeight: 400,
				lineHeight: '17px'
			}
		},
		'& > div:nth-child(6)': {
			// padding: '0 0 24px'
		}
	},
	containerSearchForm: {
		paddingTop: theme.spacing(3)
	},
	infographicSpacing: {},
	[theme.breakpoints.down('xs')]: {
		title: {
			color: theme.palette.common.white
		},
		subheading: {
			marginBottom: theme.spacing(4)
		},
		container: {
			height: '100%',
			backgroundColor: theme.palette.common.white
		},
		containerSearchForm: {
			alignContent: 'flex-start',
			paddingTop: theme.spacing(4),
			paddingBottom: theme.spacing(8),
			backgroundColor: theme.palette.common.white
		},
		infographicSpacing: {
			marginTop: '1rem'
		}
	},
	changeCountryButton: {
		color: theme.palette.secondary[400]
	},
	backButton: {
		position: 'fixed',
		backgroundColor: theme.palette.common.white,
		color: theme.palette.common.darkBlack,
		top: '0',
		left: '0',
		right: '0',
		height: '60px',
		width: '100%',
		zIndex: '200',
		'&:hover, &:active': {
			backgroundColor: theme.palette.common.white
		}
	},
	backButtonLabel: {
		textTransform: 'none',
		fontWeight: '600',
		justifyContent: 'left',
		fontFamily: theme.typography.h2.fontFamily
	},
	iconButton: {
		display: 'inline',
		height: '60px',
		width: 'auto'
	},
	logoFitHeight: {
		maxWidth: '65px',
		paddingLeft: '20px'
		//height: '100%',
	},
	logoMobile: {
		width: '120px',
		height: '48px'
	},
	mobileGridItem: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 'unset !important'
	},
	subheadingMobile: {
		fontSize: '14px',
		lineHeight: '14.97px',
		textAlign: 'center'
	}
});

class SearchFormContainer extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			locale: isLocaleSet() ? getLocale() : false
		};

		this.handleLocaleSelect = this.handleLocaleSelect.bind(this);
		this.handleLocaleReset = this.handleLocaleReset.bind(this);
	}

	componentWillMount() {
		if (isLocaleSet()) {
			this.handleLocaleSelect(getLocale());
		}
	}

	// First called when selecting a different country
	handleLocaleSelect(locale, language, hasLanguageChanged) {
		let redirect = false;
		switch (locale) {
			case 'intl':
				redirect = '/intl/page/outside-US-and-Canada';
				break;
			default:
				this.setState({
					locale: locale
				});
				if (this.state.locale !== locale) {
					window.location.reload();
				}
				break;
		}

		if (redirect) {
			if (hasLanguageChanged) {
				window.location = redirect + '#googtrans(' + language + ')';
			} else {
				this.props.history.push(redirect);
			}
		} else if (hasLanguageChanged) {
			window.location.reload();
		}
	}

	handleLocaleReset() {
		this.setState({
			locale: false
		});
	}

	render() {
		const {classes, logo, width} = this.props;
		const {locale} = this.state;
		const {
			container,
			iconButton,
			logoMobile,
			title,
			subheading,
			changeCountryButton,
			containerSearchForm,
			subAnnouncement,
			mobileGridItem,
			subheadingMobile,
			mobileSubContainer
		} = classes;
		const isMobile = width < breakpoints['sm'];

		let leftPadding = '';
		if (width > 1364) {
			leftPadding = Math.abs(32 + (width - 1364) / 2);
		} else {
			leftPadding = Math.abs((width * 0.06) / 2);
		}

		if (isMobile) {
			return (
				<div style={{position: 'relative'}}>
					<Grid container className={container}>
						<Grid item class={mobileSubContainer}>
							<Grid item xs={12} sm={12} className={mobileGridItem}>
								<a
									href="https://www.asylumconnect.org"
									data-test-id="search-form-logo"
								>
									<IconButton className={iconButton}>
										<img src={logo} alt="inreach logo" className={logoMobile} />
									</IconButton>
								</a>
							</Grid>
							<Grid item xs={12} sm={12}>
								<Typography
									variant="body1"
									className={[subheadingMobile, mobileGridItem].join(',')}
									data-test-id="search-form-body-2"
									style={{textAlign: 'center'}}
								>
									<FormattedMessage
										id="app.welcome-main-2"
										defaultMessage="Seek LGBTQ+ resources. Reach safety. Find belonging."
									/>
								</Typography>
							</Grid>
							<Grid item xs={12} sm={12}>
								<Announcement useSmallIcon />
							</Grid>
							{!locale ? (
								<Grid item xs={12} sm={12}>
									<Typography
										variant="body1"
										className={[subheadingMobile, mobileGridItem].join(',')}
										data-test-id="search-form-body-2"
										style={{textAlign: 'center'}}
									>
										<FormattedMessage
											id="app.welcome-main-1"
											defaultMessage="Welcome to InReach"
										/>
									</Typography>
								</Grid>
							) : null}
							{!locale ? (
								<Grid item xs={12} sm={12}>
									<Typography
										variant="body1"
										className={[subheadingMobile, mobileGridItem].join(',')}
										data-test-id="search-form-body-2"
										style={{textAlign: 'center'}}
									>
										<FormattedMessage
											id="app.welcome-main-3"
											defaultMessage="The world's first tech platform matching LGBTQ+ people with safe, verified resources."
										/>
									</Typography>
								</Grid>
							) : null}
							<Grid item xs={12} sm={12}>
								<WhoServeSelector
									label={<FormattedMessage id="app.banner" />}
									data-test-id="who-serve-question"
								>
									<AsylumConnectDropdownListItem data-test-id="who-serve-answer">
										<Typography
											variant="body1"
											data-test-id="banner-text-1"
											className={[subheadingMobile, mobileGridItem].join(',')}
										>
											<FormattedMessage
												id="app.banner-1-green"
												defaultMessage="InReach is for the entire diverse LGBTQ+ community"
												values={{
													greenTag: (
														<span style={{color: '#00D56C'}}>
															<FormattedMessage id="app.banner-1" />
														</span>
													)
												}}
											/>
											{' - '}
											<FormattedMessage
												id="app.banner-2"
												defaultMessage="including asylum seekers and refugees, undocumented and other immigrants, young people experiencing homelessness, those facing family or community rejection due to their identity, and other transgender and non-binary people in need of safe resources."
											/>
										</Typography>
									</AsylumConnectDropdownListItem>
								</WhoServeSelector>
							</Grid>
							<Grid item className={mobileGridItem}>
								{locale ? (
									<SearchForm
										{...this.props}
										classes={null}
										onLocaleReset={this.handleLocaleReset}
										onLocaleSelect={this.handleLocaleSelect}
										locale={locale}
									/>
								) : (
									<LocaleForm
										{...this.props}
										classes={null}
										onLocaleSelect={this.handleLocaleSelect}
									/>
								)}
							</Grid>
						</Grid>
					</Grid>
				</div>
			);
		} else {
			//not mobile, so use desktop and tablet components
			return (
				<div style={{position: 'relative'}}>
					<div
						className={subAnnouncement}
						style={{paddingLeft: leftPadding + 'px'}}
					>
						<SubAnnouncement />
					</div>
					<Grid
						container
						alignItems="flex-start"
						spacing={0}
						className={container}
						style={{paddingLeft: leftPadding + 'px'}}
					>
						<Grid item xs={12} sm={11} md={11} lg={11} xl={11}>
							{locale ? (
								<Grid item xs={12}>
									<AsylumConnectBackButton
										className={changeCountryButton}
										color="default"
										text={
											<FormattedMessage id="app.choose-different-country" />
										}
										onClick={this.handleLocaleReset}
									/>
								</Grid>
							) : null}
							<Grid container spacing={0} className={containerSearchForm}>
								<Grid item xs={12}>
									<Typography
										variant="h1"
										className={title}
										data-test-id="search-form-body"
									>
										{this.state.locale ? (
											<FormattedMessage
												id="app.welcome"
												defaultMessage="Welcome to InReach"
												values={{
													country: fetchLocaleName(locale)
												}}
											/>
										) : (
											<>
												<FormattedMessage
													id="app.welcome-main-1"
													defaultMessage="Welcome to InReach"
												/>
											</>
										)}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography
										variant="h2"
										className={subheading}
										data-test-id="search-form-body-2"
									>
										{this.state.locale ? (
											<>
												<FormattedMessage
													id="app.welcome-main-3"
													defaultMessage="Seek LGBTQ+ resources. Reach safety. Find belonging."
												/>
											</>
										) : (
											<FormattedMessage
												id="app.welcome-main-2"
												defaultMessage="The world's first tech platform matching LGBTQ+ people with safe, verified resources."
											/>
										)}
									</Typography>
								</Grid>
								{this.state.locale &&
								(this.state.locale === 'en_US' ||
									this.state.locale === 'es_US') ? (
									<Grid item xs={12}>
										<Disclaimer
											icon={true}
											data-test-id="announcement-alert-message"
											text={
												<FormattedMessage
													id="announcement.alert-message"
													values={{
														b: (chunks) => (
															<strong style={{color: 'black'}}>{chunks}</strong>
														),
														i: (chunks) => (
															<span style={{fontStyle: 'italic'}}>
																{chunks}
															</span>
														)
													}}
												/>
											}
										/>
										<Disclaimer
											icon={true}
											data-test-id="announcement-alert-message-1"
											text={
												<FormattedMessage
													id="announcement.alert-message-1"
													values={{
														hereLink: (
															<a
																target="_blank"
																rel="noopener noreferrer"
																href={`https://help.grindr.com/hc/en-us/articles/8216530716307-Monkeypox-Virus`}
																className="hide--on-print"
															>
																<FormattedMessage id="legal.privacy-here" />
															</a>
														)
													}}
												/>
											}
										/>
									</Grid>
								) : locale ? (
									<Grid item xs={12}>
										<Disclaimer
											icon={true}
											data-test-id="announcement-alert-message-1"
											text={
												<FormattedMessage
													id="announcement.alert-message-1"
													values={{
														hereLink: (
															<a
																target="_blank"
																rel="noopener noreferrer"
																href={`https://help.grindr.com/hc/en-us/articles/8216530716307-Monkeypox-Virus`}
																className="hide--on-print"
															>
																<FormattedMessage id="legal.privacy-here" />
															</a>
														)
													}}
												/>
											}
										/>
									</Grid>
								) : null}
								<Grid item xs={12}>
									{locale ? (
										<SearchForm
											{...this.props}
											classes={null}
											onLocaleReset={this.handleLocaleReset}
											onLocaleSelect={this.handleLocaleSelect}
											locale={locale}
										/>
									) : (
										<LocaleForm
											{...this.props}
											classes={null}
											onLocaleSelect={this.handleLocaleSelect}
										/>
									)}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</div>
			);
		}
	}
}

export default withStyles(styles)(withWidth(SearchFormContainer));
