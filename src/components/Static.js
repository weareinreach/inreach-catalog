import React from 'react';
import {FormattedMessage} from 'react-intl';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import ContentMarkdown from './ContentMarkdown';
import Loading from './Loading';
import LocaleSelector from './LocaleSelector';
import Section from './StaticSection';
import SubAnnouncement from './SubAnnouncement';
import AsylumConnectBackButton from './AsylumConnectBackButton';
import {StandaloneIcon} from './icons';
import withWidth from './withWidth';
import {getStaticPage} from '../utils/api';
import {clearLocale} from '../utils/locale';
import {breakpoints, mobilePadding} from '../theme';

const styles = (theme) => ({
	root: {
		marginBottom: '70px',
		display: 'flex',
		flexDirection: 'column'
	},
	header: {
		margin: '5% 0',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '0 10%'
	},
	headline: {
		textAlign: 'center'
	},
	subtitle: {
		marginTop: theme.spacing(4),
		textAlign: 'center'
	},
	section: {
		padding: '6% 30% 8%'
	},
	inlineBlock: {
		display: 'inline-block'
	},
	iconPadding: {
		padding: theme.spacing(1)
	},
	navigation: {
		marginTop: theme.spacing(10)
	},
	localeHeader: {
		[theme.breakpoints.down('xs')]: {
			backgroundColor: theme.palette.secondary[500]
		}
	},
	changeCountryButton: {
		marginTop: theme.spacing(2),
		marginLeft: theme.spacing(-1)
	},
	subAnnouncement: {
		backgroundColor: '#e9e9e9',
		paddingTop: '1rem',
		paddingBottom: '1rem',
		textAlign: 'center',
		paddingLeft: '5%',
		paddingRight: '5%'
	},
	[`@media (max-width: ${breakpoints['md']}px)`]: {
		section: {
			padding: '5% 5% 7%'
		},
		header: {
			padding: '0 5%'
		},
		hr: {
			margin: theme.spacing + ' 5%'
		}
	},
	[`@media (max-width: ${breakpoints['sm']}px)`]: {
		marginBottom: {
			marginBottom: '5%'
		},
		navigation: {
			marginTop: theme.spacing(2)
		}
	},
	textAlignCenter: {
		textAlign: 'center'
	},
	textBold: {
		fontWeight: theme.typography.fontWeightHeavy
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
	subheading: {
		marginBottom: theme.spacing(4),
		[theme.breakpoints.down('xs')]: {
			fontSize: theme.typography.h2.fontSize,
			lineHeight: '1.5'
		}
	},
	[theme.breakpoints.down('xs')]: {
		subheading: {
			color: theme.palette.common.white,
			marginBottom: theme.spacing(4)
		},
		containerSearchForm: Object.assign(mobilePadding(theme), {
			alignContent: 'flex-start',
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2),
			backgroundColor: theme.palette.secondary[500]
		})
	}
});

class Static extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			loading: true,
			locale: props.match.params.locale
		};
		this.fetchPage = this.fetchPage.bind(this);
		this.handleLocaleSelect = this.handleLocaleSelect.bind(this);
		this.handleLocaleReset = this.handleLocaleReset.bind(this);
	}

	componentWillMount() {
		window.scroll(0, 0);
		this.fetchPage(this.props.match.params.pageName);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.pageName !== this.props.match.params.pageName) {
			this.fetchPage(nextProps.match.params.pageName);
		}
	}

	fetchPage(name) {
		getStaticPage(name).then((data) => {
			if (data.error) {
				this.props.history.push('/');
				this.props.handleMessageNew(
					<FormattedMessage id="error.page-not-found" />
				);

				return;
			}

			this.setState({loading: false, ...data});
		});
	}

	handleLocaleSelect(locale, language) {
		let redirect = false;
		switch (locale) {
			case 'intl':
				redirect = '/intl/page/outside-US-and-Canada';
				break;
			default:
				redirect = '/';
				break;
		}

		this.setState({locale});

		if (redirect) {
			this.props.history.push(redirect);
		}
	}

	handleLocaleReset() {
		this.setState({
			locale: false
		});
		clearLocale();
		this.handleLocaleSelect();
	}

	render() {
		const classes = this.props.classes;
		const lastSection = this.state.page ? this.state.page.length : 0;
		const isMobile = this.props.width < breakpoints['sm'];
		const localeLabel = <FormattedMessage id="app.select-country" />;

		return (
			<>
				{isMobile ? (
					<Grid
						container
						alignItems="center"
						justify="center"
						spacing={0}
						className={classes.localeHeader}
					>
						<Grid item xs={12}>
							<a href="https://www.asylumconnect.org">
								<IconButton className={classes.iconButton}>
									<img
										alt="asylumconnect logo"
										src={this.props.logo}
										className={classes.logoFitHeight}
									/>
								</IconButton>
							</a>
						</Grid>
						<Grid container spacing={0} className={classes.containerSearchForm}>
							<Grid item xs={12}>
								<Typography
									variant="subtitle2"
									className={classes.subheading}
									data-test-id="static-page-header"
								>
									<FormattedMessage id="app.search-services" />
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<LocaleSelector
									label={localeLabel}
									setOnChange={true}
									locale={this.props.match.params.locale}
									handleSelectLocale={this.handleLocaleSelect}
									changeLocale={this.props.changeLocale}
								/>
							</Grid>
						</Grid>
					</Grid>
				) : null}
				<Grid
					container
					alignItems="center"
					justify="center"
					spacing={0}
					className={classes.localeHeader}
				>
					{!isMobile ? (
						<>
							<Grid item xs={12} className={classes.subAnnouncement}>
								<SubAnnouncement />
							</Grid>
							<Grid item xs={12} sm={11} md={10} lg={10} xl={11}>
								<AsylumConnectBackButton
									className={classes.changeCountryButton}
									color="default"
									text={<FormattedMessage id="app.choose-different-country" />}
									onClick={this.handleLocaleReset}
								/>
							</Grid>
						</>
					) : null}
				</Grid>
				<div className="static--page-container">
					{this.state.loading ? (
						<Loading />
					) : (
						<div className={classes.root}>
							<div>
								{this.state?.page?.[0]?.heading === 'Intro' ? (
									<div className={classes.header}>
										<Typography
											variant="h1"
											className={classes.headline}
											data-test-id="static-page-title"
										>
											<ContentMarkdown source={this.state.page[0].title} />
										</Typography>
										<Typography
											variant="subtitle2"
											className={classes.subtitle}
											data-test-id="static-page-body-1"
										>
											<ContentMarkdown source={this.state.page[0].caption} />
										</Typography>
										<Grid
											container
											spacing={0}
											alignItems="flex-start"
											justify="space-between"
											className={classes.navigation}
										>
											{this.state.page.map((section, index) => {
												if (section?.icon) {
													return (
														<Grid
															key={index}
															item
															xs={3}
															sm={2}
															className={classes.textAlignCenter}
														>
															<a
																href={`#${section?.heading.replace(/ /g, '-')}`}
																className={classes.inlineBlock}
															>
																<StandaloneIcon
																	name={section?.icon}
																	fillColor={section?.color}
																	strokeColor="#000"
																	className={classes.iconPadding}
																/>
															</a>
															<Typography
																variant="h6"
																className={classes.textBold}
															>
																{section?.heading}
															</Typography>
														</Grid>
													);
												}

												return null;
											})}
										</Grid>
									</div>
								) : null}
							</div>
							<div>
								{this.state.page.map((section, index) => {
									if (section?.heading === 'Intro') {
										return null;
									}

									const isLastSection = index + 1 < lastSection;

									return (
										<div key={index}>
											<div
												className={classes.section}
												id={section?.heading.replace(/ /g, '-')}
											>
												<Section
													color={section?.color}
													icon={section?.icon}
													type={section?.heading}
													title={section?.title}
													description={section?.description}
													resources={
														section?.resources?.length > 0
															? section?.resources
															: []
													}
													dropdown={section?.dropdown || null}
												/>
											</div>
											{isLastSection ? (
												<Grid
													container
													spacing={0}
													alignItems="flex-start"
													justify="center"
												>
													<Grid item xs={12} md={8}>
														<hr className={classes.hr} />
													</Grid>
												</Grid>
											) : null}
										</div>
									);
								})}
							</div>
						</div>
					)}
				</div>
			</>
		);
	}
}

export default withStyles(styles)(withWidth(Static));
