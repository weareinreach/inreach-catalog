import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from 'react-intl';

import {ChevronIcon} from './icons';
import LogoImg from '../images/logo@2x.png';

const styles = (theme) => ({
	root: {
		display: 'inline'
	},
	LogoFitHeight: {
		maxWidth: '55px'
		/*height: '100%',*/
	},
	AsylumConnectMenu: {
		marginTop: '56px'
	}
});

class NavTabletMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			anchorEl: null,
			open: false
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleRequestClose = this.handleRequestClose.bind(this);
	}
	handleClick(event) {
		this.setState({open: true, anchorEl: event.currentTarget});
	}

	handleRequestClose() {
		this.setState({open: false});
	}

	render() {
		const {classes} = this.props;
		return (
			<div>
				<IconButton
					aria-owns={this.state.open ? 'simple-menu' : null}
					aria-haspopup="true"
					onClick={this.handleClick}
					className={classes.root}
					data-test-id="tablet-nav-button-icon"
				>
					<img
						src={LogoImg}
						alt="asylumconnect logo"
						className={classes.LogoFitHeight}
						data-test-id="tablet-nav-button-icon-image"
					/>
					<ChevronIcon width={'40px'} />
				</IconButton>
				<Menu
					id="simple-menu"
					anchorEl={this.state.anchorEl}
					open={this.state.open}
					onRequestClose={this.handleRequestClose}
					className={classes.AsylumConnectMenu}
					data-test-id="tablet-nav-menu-button"
				>
					<MenuItem onClick={this.handleRequestClose}>
						<a
							data-test-id="tablet-nav-menu-item-home"
							href="https://asylumconnect.org"
						>
							<FormattedMessage id="navigation.home">
								{(home) => <Typography variant="h6">{home}</Typography>}
							</FormattedMessage>
						</a>
					</MenuItem>
					<MenuItem onClick={this.handleRequestClose}>
						<a
							data-test-id="tablet-nav-menu-item-about"
							href="https://asylumconnect.org/mission/"
						>
							<FormattedMessage id="navigation.about">
								{(about) => <Typography variant="h6">{about}</Typography>}
							</FormattedMessage>
						</a>
					</MenuItem>
					<MenuItem onClick={this.handleRequestClose}>
						<a
							data-test-id="tablet-nav-menu-item-take-action"
							href="https://asylumconnect.org/donate/"
						>
							<FormattedMessage id="navigation.take-action">
								{(action) => <Typography variant="h6">{action}</Typography>}
							</FormattedMessage>
						</a>
					</MenuItem>
					<MenuItem onClick={this.handleRequestClose}>
						<a
							data-test-id="tablet-nav-menu-item-faqs"
							href="https://asylumconnect.org/faqs/"
						>
							<FormattedMessage id="navigation.get-help">
								{(help) => <Typography variant="h6">{help}</Typography>}
							</FormattedMessage>
						</a>
					</MenuItem>
					<MenuItem onClick={this.handleRequestClose}>
						<a
							data-test-id="tablet-nav-menu-item-contact"
							href="https://asylumconnect.org/contact/"
						>
							<FormattedMessage id="navigation.contact">
								{(contact) => <Typography variant="h6">{contact}</Typography>}
							</FormattedMessage>
						</a>
					</MenuItem>
					<MenuItem onClick={this.handleRequestClose}>
						<a
							data-test-id="tablet-nav-menu-item-safety-exit"
							href="https://www.google.com/"
						>
							<FormattedMessage id="navigation.safety-exit">
								{(safety) => <Typography variant="h6">{safety}</Typography>}
							</FormattedMessage>
						</a>
					</MenuItem>
				</Menu>
			</div>
		);
	}
}

NavTabletMenu.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavTabletMenu);
