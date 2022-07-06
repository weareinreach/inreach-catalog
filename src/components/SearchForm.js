import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {FormattedMessage} from 'react-intl';
import LocaleSelector from './LocaleSelector';
import withWidth from './withWidth';
import {breakpoints, boldFont} from '../theme';
import DesktopSearch from './DesktopSearch';
import MobileSearch from './MobileSearch';
import Disclaimer from './Disclaimer';
import {getLocale} from '../utils/locale';

const styles = (theme) => ({
	formRow: {
		marginBottom: theme.spacing(3)
	},
	callout: {
		color: theme.palette.primary[500]
	},
	underline: {
		textDecoration: 'underline',
		'&:hover': {
			color: theme.palette.primary[900]
		}
	},
	secondary: {
		color: theme.palette.secondary[500],
		'&:hover': {
			backgroundColor: 'inherit'
		}
	},
	tooltip: {fontFamily: 'sans-serif'},
	filterContainer: {
		marginTop: '-0.8rem'
	},
	fullBottomMargin: {
		marginBottom: theme.spacing(4),
		[theme.breakpoints.down('xs')]: {
			marginBottom: 0
		}
	},
	halfBottomMargin: {
		marginBottom: theme.spacing(2)
	},
	searchButtonContainer: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(1)
	},
	[theme.breakpoints.down('xs')]: {
		nationalOrgCheckboxContainer: {
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2)
		},
		searchButton: {
			textAlign: 'center'
		},
		body2: {
			color: theme.palette.common.white
		},
		link: {
			color: theme.palette.common.white,
			textDecoration: 'underline'
		}
	},
	[theme.breakpoints.down('xl')]: {
		nationalOrgCheckboxContainer: {
			paddingBottom: theme.spacing(3)
		},
		lowerButton: {
			marginTop: theme.spacing(53),
			marginBottom: theme.spacing(3)
		}
	},
	tabs: {
		display: 'flex',
		flex: 1,
		padding: 0,
		flexGrow: 1,
		[theme.breakpoints.down('xl')]: {
			minWidth: '350px',
			maxWidth: '400px'
		},
		[theme.breakpoints.down('lg')]: {
			minWidth: '350px',
			maxWidth: '380px'
		},
		[theme.breakpoints.down('md')]: {
			minWidth: 'auto',
			maxWidth: 'auto',
			'&:first-child': {
				marginRight: '25px'
			}
		}
	},
	infographicContainer: {
		paddingBottom: theme.spacing(12),
		paddingTop: theme.spacing(3)
	},
	boldFont: boldFont(theme)
});

class SearchForm extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			moveButton: false,
			tabValue:
				props.match.path === '/:locale/search/name' ||
				props.match.path === '/:locale/search/name/:name/:sort'
					? 1
					: 0,
			mobileTabValue:
				props.match.path === '/:locale/search/name' ||
				props.match.path === '/:locale/search/name/:name/:sort'
					? 1
					: 0
		};
		this.onMoveSearchButton = this.onMoveSearchButton.bind(this);
	}

	onMoveSearchButton(newPosition) {
		if (newPosition !== this.state.moveButton) {
			this.setState({
				moveButton: !this.state.moveButton
			});
		} else if (newPosition === this.state.moveButton) {
			this.setState({
				moveButton: !this.state.moveButton
			});
		}
	}
	handleTabChange = (event, newValue) => {
		const isMobile = this.props.width < breakpoints['sm'];
		if (isMobile) {
			this.setState({mobileTabValue: newValue});
		} else {
			this.setState({tabValue: newValue});
		}
	};
	a11yProps = (index) => {
		return {
			id: `search-tab-${index}`,
			'aria-controls': `search-tabpanel-${index}`
		};
	};

	render() {
		const {searchButton, infographicContainer} = this.props.classes;
		const {handleOrgSelection, handleSearchByOrgName, handleSearchButtonClick} =
			this.props;
		const localeLabel = (
			<FormattedMessage
				id="app.select-country"
				defaultMessage="Select country"
				decription="location selection dropdown"
			/>
		);
		const isMobile = this.props.width < breakpoints['sm'];

		return (
			<div>
				{isMobile ? (
					<Grid container>
						<Grid item xs={12} sm={12} style={{margin: '16px'}}>
							<LocaleSelector
								label={localeLabel}
								setOnChange={true}
								handleSelectLocale={this.props.onLocaleSelect}
								changeLocale={this.props.changeLocale}
							/>
						</Grid>
					</Grid>
				) : null}
				{isMobile ? (
					<>
						{getLocale() === 'en_US' || getLocale() === 'es_US' ? (
							<Disclaimer
								data-test-id="announcement-alert-message"
								text={
									<FormattedMessage
										id="announcement.alert-message"
										decription="placeholder for alert messages. message will vary."
										values={{
											b: (chunks) => (
												<strong style={{color: 'black'}}>{chunks}</strong>
											),
											i: (chunks) => (
												<span style={{fontStyle: 'italic'}}>{chunks}</span>
											)
										}}
									/>
								}
							/>
						) : null}
						<MobileSearch
							handleSearchByOrgName={handleSearchByOrgName}
							handleSearchButtonClick={handleSearchButtonClick}
							handleOrgSelection={handleOrgSelection}
							handleTabChange={this.handleTabChange}
							{...this.props}
							{...this.state}
						/>
					</>
				) : (
					<DesktopSearch
						handleTabChange={this.handleTabChange}
						{...this.props}
						{...this.state}
					/>
				)}
			</div>
		);
	}
}

export default withStyles(styles)(withWidth(SearchForm));
