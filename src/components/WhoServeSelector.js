import React, {Fragment} from 'react';

import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import classNames from 'classnames';

import AsylumConnectIndicator from './AsylumConnectIndicator';
import withWidth from './withWidth';
import {dropShadow} from '../theme';

const styles = (theme) => ({
	toggledSelect: {
		// backgroundColor: theme.palette.common.darkGrey + ' !important'
	},
	selectList: {
		backgroundColor: theme.palette.common.darkGrey,
		boxShadow: '0px 8px 10px 0px rgba(0, 0, 0, 0.12)',
		width: '100%',
		top: '100%',
		[theme.breakpoints.up('sm')]: {
			position: 'absolute',
			left: '0'
		},
		zIndex: '50'
	},
	arrow: {
		width: '24px',
		height: '24px',
		color: theme.palette.signUp[600],
		float: 'right'
	},
	relative: {
		position: 'relative'
	},
	selectContainer: {
		cursor: 'pointer'
	},
	selectedLabel: {
		fontWeight: theme.typography.fontWeightMedium,
		fontSize: theme.typography.fontSize - 1,
		lineHeight: 1.25
	},
	labelContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: theme.palette.common.darkGrey,
		height: '49px',
		padding: '0 16px'
	},
	indicator: {
		display: 'inline-block',
		verticalAlign: 'top',
		marginLeft: '0.2rem',
		marginRight: '0.2rem',
		[theme.breakpoints.down('xs')]: {
			position: 'absolute',
			right: '20px'
		}
	},
	overlay: {
		top: '0',
		left: '0',
		width: '100%',
		height: '100%',
		position: 'fixed',
		backgroundColor: 'rgba(0,0,0,0.3)'
	}
});

class WhoServeSelector extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			open: false
		};
		this.id = 'selector--' + Date.now().toString();

		this.handleToggleRequest = this.handleToggleRequest.bind(this);
		this.handleOutsideClick = this.handleOutsideClick.bind(this);
		this.handlePaperClick = this.handlePaperClick.bind(this);
		this.handleOpenDrawer = this.handleOpenDrawer.bind(this);
	}

	handleOutsideClick(event) {
		var watch = document.querySelectorAll('#' + this.id);
		if (watch.length) {
			if (!watch[0].contains(event.target)) {
				this.handleToggleRequest();
				this.handleOpenDrawer(event);
			}
		}
	}

	handleToggleRequest() {
		if (!this.state.open) {
			document.addEventListener('click', this.handleOutsideClick);
		} else {
			document.removeEventListener('click', this.handleOutsideClick);
		}

		this.setState({
			open: !this.state.open
		});
	}

	handlePaperClick() {
		if (this.props.closeOnClick === true) {
			this.handleToggleRequest();
		}
	}

	handleOpenDrawer(event) {
		if (event && this.props.moveSearchButton) {
			this.props.moveSearchButton(this.state.open);
		}
	}

	render() {
		const {
			arrow,
			toggledSelect,
			relative,
			selectList,
			selectedLabel,
			selectContainer,
			labelContainer,
			indicator,
			overlay
		} = this.props.classes;
		const {
			selected,
			label,
			containerWidth,
			containerClass,
			listContainerClass,
			colorClass,
			enableOverlay,
			noArrow
		} = this.props;
		const containerClasses = classNames(
			containerClass,
			this.state.open ? toggledSelect : '',
			selectContainer
		);
		const listContainerClasses = listContainerClass
			? classNames(listContainerClass, selectList)
			: selectList;
		const rootClass =
			(this.props.rootClass ? this.props.rootClass + ' ' : '') + relative;

		console.log(this.props);
		return (
			<div className={rootClass} data-test-id="drop-down-selector-container">
				<div
					className={containerClasses}
					onClick={(event) => {
						this.handleToggleRequest();
						this.handleOpenDrawer(event);
					}}
				>
					<div
						className={labelContainer}
						data-test-id="drop-down-selector-item"
					>
						<span className={selectedLabel}>{label}</span>
						<div style={{display: 'flex'}}>
							{selected && selected.length ? (
								<AsylumConnectIndicator className={indicator} color="secondary">
									{selected.length}
								</AsylumConnectIndicator>
							) : null}
							{!noArrow ? (
								<>
									{this.state.open ? (
										<KeyboardArrowUpIcon
											className={classNames(arrow, colorClass)}
										/>
									) : (
										<KeyboardArrowDownIcon
											className={classNames(arrow, colorClass)}
										/>
									)}
								</>
							) : null}
						</div>
					</div>
				</div>
				{this.state.open ? (
					<Fragment>
						{enableOverlay && <div className={overlay} />}
						<Paper
							id={this.id}
							className={listContainerClasses + ' selector--asylum-connect'}
							style={{width: containerWidth}}
							onClick={this.handlePaperClick}
						>
							{this.props.children}
						</Paper>
					</Fragment>
				) : null}
			</div>
		);
	}
}

export default withStyles(styles)(withWidth(WhoServeSelector));
