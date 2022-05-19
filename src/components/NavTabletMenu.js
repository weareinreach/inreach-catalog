import React from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/List';
import {withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

import classNames from 'classnames';
import Filter from './Filter';
import withWidth from './withWidth';
import {
	breakpoints,
	mobilePadding,
	searchInput,
	searchInputMobile
} from '../theme';

import AsylumConnectDropdownListItem from './AsylumConnectDropdownListItem';
import AsylumConnectSelector from './AsylumConnectSelector';

import {navLinks} from '../data/navLinks';

const styles = (theme) => ({
	root: {
		display: 'block'
	},
	inputClass: Object.assign(searchInput(theme), {
		cursor: 'pointer',
		position: 'relative',
		boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		marginBottom: '0',
		width: '110px',
		height: '48px',
		padding: '13px',
		color: theme.palette.signUp[600],
		'@media(max-width:750px)': {
			width: 'unset'
		}
	})
});

const NavTabletMenu = (props) => {
	const {classes} = props;
	const intl = useIntl();

	const useSmall = window.innerWidth <= 750;

	const generateOnlyIconLabel = () => {
		return (
			<div>
				<MenuIcon />
			</div>
		);
	};

	return (
		<AsylumConnectSelector
			label={
				useSmall
					? generateOnlyIconLabel()
					: intl.formatMessage({
							id: 'naviagtion.menu',
							description: 'In Reach Website links',
							defaultMessage: 'Menu'
					  })
			}
			containerClass={classes.inputClass}
			closeOnClick={true}
			containerWidth={'110px'}
			noArrow={useSmall}
		>
			<AsylumConnectDropdownListItem data-test-id="tablet-menu-item-about">
				<a data-test-id="tablet-nav-menu-item-about" href={navLinks.about}>
					<FormattedMessage id="navigation.about">
						{(about) => <Typography variant="h6">{about}</Typography>}
					</FormattedMessage>
				</a>
			</AsylumConnectDropdownListItem>
			<AsylumConnectDropdownListItem data-test-id="tablet-menu-item-action">
				<a
					data-test-id="tablet-nav-menu-item-take-action"
					href={navLinks.action}
				>
					<FormattedMessage id="navigation.take-action">
						{(action) => <Typography variant="h6">{action}</Typography>}
					</FormattedMessage>
				</a>
			</AsylumConnectDropdownListItem>
			<AsylumConnectDropdownListItem data-test-id="tablet-menu-item-faq">
				<a data-test-id="tablet-nav-menu-item-faqs" href={navLinks.help}>
					<FormattedMessage id="navigation.get-help">
						{(help) => <Typography variant="h6">{help}</Typography>}
					</FormattedMessage>
				</a>
			</AsylumConnectDropdownListItem>
			<AsylumConnectDropdownListItem data-test-id="tablet-menu-item-contact">
				<a data-test-id="tablet-nav-menu-item-contact" href={navLinks.contact}>
					<FormattedMessage id="navigation.contact">
						{(contact) => <Typography variant="h6">{contact}</Typography>}
					</FormattedMessage>
				</a>
			</AsylumConnectDropdownListItem>
		</AsylumConnectSelector>
	);
};

export default withStyles(styles)(NavTabletMenu);
