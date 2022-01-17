import React from 'react';
import {FormattedMessage} from 'react-intl';
import Typography from '@material-ui/core/Typography';

import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import AsylumConnectButton from './AsylumConnectButton';

const styles = (theme) => ({
	root: {
		width: '30%',
		padding: '0 5% 0 5%'
	},
	settingsTypeFont: {
		padding: '15px 0 25px 0',
		fontSize: 13,
		fontWeight: 700,
		fontFamily: '"Open Sans", sans-serif',
		letterSpacing: '-.02em',
		color: theme.palette.secondary[500],
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		cursor: 'pointer'
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		'& > div': {
			margin: '15px 0 15px 0'
		}
	},
	formType: {
		margin: '10% 0 10% 0'
	},
	inputLabel: {
		'& label': theme.custom.inputLabel,
		'& div': {
			marginTop: '20px'
		},
		'& input': theme.custom.inputText
	}
});

class GeneralSettingsName extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			currentName: this.props.currentName,
			newName: '',
			confirmedName: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleToggleDropDown = this.handleToggleDropDown.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.currentName !== this.props.currentName &&
			this.props.currentName !== null &&
			this.props.currentName !== null
		) {
			this.setState({
				currentName: nextProps.currentName,
				newName: '',
				confirmedName: ''
			});
		}
	}

	handleChange(e) {
		const {name, value} = e.target;
		this.setState({
			[name]: value
		});
	}

	handleToggleDropDown() {
		this.setState({open: !this.state.open});
	}

	handleSubmit(e) {
		e.preventDefault();
		const {handleMessageNew} = this.props;

		const {currentName, newName, confirmedName} = this.state;
		if (!currentName || !newName || !confirmedName) {
			handleMessageNew('Missing name input.');
		}

		if (currentName && newName && confirmedName) {
			if (newName === confirmedName) {
				this.props.handleUpdateName(newName);
				//update the UI with the new value, clear the form
				this.setState({
					currentName: newName,
					newName: '',
					confirmedName: ''
				});
			} else {
				handleMessageNew('The new name values you have entered do not match.');
			}
		}
	}

	render() {
		const {classes} = this.props;
		const {currentName, newName, confirmedName} = this.state;
		return (
			<div>
				<div
					data-test-id="account-page-name"
					onClick={this.handleToggleDropDown}
					className={classes.settingsTypeFont}
				>
					<span>Update Name</span>
					{this.state.open ? <ExpandLess /> : <ExpandMore />}
				</div>
				<Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
					<form className={classes.form} onSubmit={this.handleSubmit}>
						<TextField
							data-test-id="account-settings-name-old"
							className={classes.inputLabel}
							name="currentName"
							type="text"
							label={<FormattedMessage id="form.name" />}
							value={
								!currentName ||
								currentName === 'user name' ||
								currentName.trim().length < 1
									? ''
									: currentName
							}
							InputLabelProps={{
								shrink: true
							}}
							placeholder="John Smith"
							onChange={this.handleChange}
							required
						/>
						<TextField
							data-test-id="account-settings-name-new"
							className={classes.inputLabel}
							name="newName"
							type="text"
							label={<FormattedMessage id="form.new-name" />}
							value={newName}
							InputLabelProps={{
								shrink: true
							}}
							placeholder="New name"
							onChange={this.handleChange}
							required
						/>
						<TextField
							data-test-id="account-settings-name-new-confirm"
							className={classes.inputLabel}
							name="confirmedName"
							type="text"
							label={<FormattedMessage id="form.confirm-new-name" />}
							value={confirmedName}
							InputLabelProps={{
								shrink: true
							}}
							placeholder="Confirm new name"
							onChange={this.handleChange}
							required
						/>
						<div>
							<AsylumConnectButton
								variant="secondary"
								testIdName="account-settings-name-button"
							>
								Update Name
							</AsylumConnectButton>
						</div>
					</form>
				</Collapse>
			</div>
		);
	}
}

GeneralSettingsName.propTypes = {
	classes: PropTypes.object.isRequired,
	currentName: PropTypes.string.isRequired
};

export default withStyles(styles)(GeneralSettingsName);
