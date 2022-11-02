import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {withStyles} from '@material-ui/core/styles';

import {
	AccountIcon,
	FavoritesIcon,
	LanguageIcon,
	MoreIcon,
	ReviewsIcon,
	SearchIcon
} from './icons';
import {breakpoints} from '../theme';

let theTheme;

const styles = (theme) => {
	theTheme = theme;
	return {
		root: {
			width: '100vw',
			display: 'flex',
			flexDirection: 'row',
			justify: 'space-between',
			height: 'auto'
		},
		BottomNavBar: {
			position: 'fixed',
			bottom: '0',
			zIndex: '100',
			borderTop: '1px solid ' + theme.palette.common.faintBlack,
			boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)'
		},
		navButton: Object.assign({}, theme.typography.body1, {
			fontSize: theme.typography.body1.fontSize - 2,
			transition: 'none',
			minWidth: '15%',
			textTransform: 'uppercase',
			fontWeight: 'bold',
			paddingTop: '8px',
			color: theme.palette.common.darkBlack,
			'&:hover': {
				color: theme.palette.common.darkBlack
			},
			[`@media (max-width: ${breakpoints['xs']}px)`]: {
				fontSize: theme.typography.body1.fontSize - 4
			}
		}),
		navButtonSelected: {
			paddingTop: '8px !important',
			fontSize: theme.typography.body1.fontSize - 2 + 'px !important',
			color: theme.palette.primary[500],
			'&:hover': {
				color: theme.palette.primary[500]
			},
			'@media (max-width:359.95px)': {
				fontSize: theme.typography.body1.fontSize - 4 + 'px !important'
			}
		}
	};
};

class NavMobile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.location) {
			let value = this.state.value;
			switch (nextProps.location.pathname) {
				case '/':
				case /^\/search/:
				case /^\/resource/:
					value = 0;
					break;
				case /^\/favorites/:
					value = 1;
					break;
				case /^\/reviews/:
					value = 2;
					break;
				case /^\/account/:
					value = 4;
					break;
				default:
					break;
			}
			if (value !== this.state.value) {
				this.setState({
					value
				});
			}
		}
	}

	handleChange(event, value) {
		const {handleRequestOpen, session, history, locale} = this.props;
		switch (value) {
			case 0:
				history.push('/');
				handleRequestOpen('none');
				break;
			case 1:
				history.replace(`/${locale}/favorites`);
				handleRequestOpen('none');
				break;
			case 2:
				history.replace(`/${locale}/reviews`);
				handleRequestOpen('none');
				break;
			case 3:
				handleRequestOpen('language');
				break;
			case 4:
				if (session) {
					handleRequestOpen('none');
				} else {
					handleRequestOpen('login');
				}
				history.replace(`/${locale}/account`);
				break;
			case 5:
				handleRequestOpen('more');
				break;
			default:
				break;
		}
		this.setState({value});
	}
	iconColor(position) {
		if (position === null) {
			return theTheme.palette.common.darkBlack;
		}

		if (this.state.value === position) {
			return theTheme.palette.primary[500];
		} else {
			return theTheme.palette.common.darkBlack;
		}
	}
	render() {
		const {classes} = this.props;
		const buttonStyles = {
			label: classes.navButton,
			selected: classes.navButtonSelected
		};
		const {value} = this.state;
		return (
			<div className={classes.BottomNavBar}>
				<BottomNavigation
					value={value}
					onChange={this.handleChange}
					showLabels
					data-test-id="mobile-nav-navigation"
					className={classes.root}
				>
					<BottomNavigationAction
						className={classes.navButton}
						classes={buttonStyles}
						label={
							<FormattedMessage
								id="navigation.search"
								defaultMessage="Search"
								description="Search button"
							/>
						}
						showLabel
						data-test-id="mobile-nav-button-search"
						icon={<SearchIcon width="25px" color={this.iconColor(0)} />}
					/>
					<BottomNavigationAction
						className={classes.navButton}
						classes={buttonStyles}
						label={
							<FormattedMessage
								id="navigation.favorites"
								defaultMessage="Favorites"
								description="Favorites button"
							/>
						}
						showLabel
						data-test-id="mobile-nav-button-favorites"
						icon={<FavoritesIcon width="25px" color={this.iconColor(1)} />}
					/>
					<BottomNavigationAction
						className={classes.navButton}
						classes={buttonStyles}
						label={
							<FormattedMessage
								id="navigation.reviews"
								defaultMessage="Reviews"
								description="Reviews button"
							/>
						}
						showLabel
						data-test-id="mobile-nav-button-reviews"
						icon={<ReviewsIcon width="25px" color={this.iconColor(2)} />}
					/>
					<BottomNavigationAction
						className={classes.navButton}
						classes={buttonStyles}
						label={
							<FormattedMessage
								id="navigation.language"
								defaultMessage="Language"
								description="Select Language button"
							/>
						}
						showLabel
						data-test-id="mobile-nav-button-language"
						icon={<LanguageIcon width="25px" color={this.iconColor(3)} />}
					/>
					<BottomNavigationAction
						className={classes.navButton}
						classes={buttonStyles}
						label={
							<FormattedMessage
								id="navigation.account"
								defaultMessage="Account"
								description="link to Account page"
							/>
						}
						showLabel
						data-test-id="mobile-nav-button-account"
						icon={<AccountIcon width="25px" color={this.iconColor(4)} />}
					/>
					<BottomNavigationAction
						className={classes.navButton}
						classes={buttonStyles}
						label={
							<FormattedMessage
								id="navigation.more"
								defaultMessage="More"
								description="link to more information"
							/>
						}
						showLabel
						data-test-id="mobile-nav-button-more"
						icon={<MoreIcon width="25px" color={this.iconColor(5)} />}
					/>
				</BottomNavigation>
			</div>
		);
	}
}

NavMobile.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavMobile);
