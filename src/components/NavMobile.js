import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {withStyles} from '@material-ui/core/styles';
import {navLinks} from '../data/navLinks';

import {
	AccountIcon,
	FavoritesIcon,
	LanguageIcon,
	MoreIcon,
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
			minWidth: '20%',
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
				handleRequestOpen('language');
				break;
			case 3:
				if (session) {
					handleRequestOpen('none');
				} else {
					handleRequestOpen('login');
				}
				history.replace(`/${locale}/account`);
				break;
			case 4:
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
							/>
						}
						showLabel
						data-test-id="mobile-nav-button-search"
						icon={<SearchIcon width="30px" color={this.iconColor(0)} />}
					/>
					<BottomNavigationAction
						className={classes.navButton}
						classes={buttonStyles}
						label={
							<FormattedMessage
								id="navigation.favorites"
								defaultMessage="Favorites"
							/>
						}
						showLabel
						data-test-id="mobile-nav-button-favorites"
						icon={<FavoritesIcon width="30px" color={this.iconColor(1)} />}
					/>
					<BottomNavigationAction
						className={classes.navButton}
						classes={buttonStyles}
						label={
							<FormattedMessage
								id="navigation.language"
								defaultMessage="Language"
							/>
						}
						showLabel
						data-test-id="mobile-nav-button-language"
						icon={<LanguageIcon width="30px" color={this.iconColor(2)} />}
					/>
					<BottomNavigationAction
						className={classes.navButton}
						classes={buttonStyles}
						label={
							<FormattedMessage
								id="navigation.account"
								defaultMessage="Account"
							/>
						}
						showLabel
						data-test-id="mobile-nav-button-account"
						icon={<AccountIcon width="30px" color={this.iconColor(3)} />}
					/>
					<BottomNavigationAction
						className={classes.navButton}
						classes={buttonStyles}
						label={
							<FormattedMessage id="navigation.more" defaultMessage="More" />
						}
						showLabel
						data-test-id="mobile-nav-button-more"
						icon={<MoreIcon width="30px" color={this.iconColor(4)} />}
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
