import React from 'react';
import {FormattedMessage} from 'react-intl';

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
		fontFamily: '"Inter", sans-serif',
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

class GeneralSettingsLocation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			currentLocation: this.props.currentLocation,
			newLocation: '',
			confirmedLocation: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleToggleDropDown = this.handleToggleDropDown.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.currentLocation !== this.props.currentLocation &&
			this.props.currentLocation !== null &&
			this.props.currentLocation !== null
		) {
			this.setState({
				currentLocation: nextProps.currentLocation,
				newLocation: '',
				confirmedLocation: ''
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

		const {currentLocation, newLocation, confirmedLocation} = this.state;
		if (!currentLocation || !newLocation || !confirmedLocation) {
			handleMessageNew(
				<FormattedMessage
					id="error.required-field-empty"
					defaultMessage="Please fill out all fields"
					description="Error message that all fields must be filled out."
				/>
			);
		}

		if (currentLocation && newLocation && confirmedLocation) {
			if (newLocation === confirmedLocation) {
				this.props.handleUpdateLocation(newLocation);
				//update the UI with the new value, clear the form
				this.setState({
					currentLocation: newLocation,
					newLocation: '',
					confirmedLocation: ''
				});
			} else {
				handleMessageNew(
					<FormattedMessage
						id="error.location-mismatch"
						defaultMessage="The location values you have entered do not match."
						description="Error message that the entered location values do not match."
					/>
				);
			}
		}
	}

	render() {
		const {classes} = this.props;
		const {currentLocation, newLocation, confirmedLocation} = this.state;
		return (
			<div>
				<div
					data-test-id="account-page-location"
					onClick={this.handleToggleDropDown}
					className={classes.settingsTypeFont}
				>
					<span>
						<FormattedMessage
							id="action.update-current-location"
							defaultMessage="Update Current Location"
							description="Update location dropdown button"
						/>
					</span>
					{this.state.open ? <ExpandLess /> : <ExpandMore />}
				</div>
				<Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
					<form className={classes.form} onSubmit={this.handleSubmit}>
						<TextField
							data-test-id="account-settings-location-old-value"
							className={classes.inputLabel}
							name="currentLocation"
							type="text"
							label={
								<FormattedMessage
									id="form.current-location"
									defaultMessage="Current location"
									description="Current location text field"
								/>
							}
							value={currentLocation}
							InputLabelProps={{
								shrink: true
							}}
							required
							disabled
						/>
						<TextField
							data-test-id="account-settings-location-new-value"
							className={classes.inputLabel}
							name="newLocation"
							type="text"
							label={
								<FormattedMessage
									id="form.new-location"
									defaultMessage="New location"
									description="New location input field"
								/>
							}
							value={newLocation}
							InputLabelProps={{
								shrink: true
							}}
							placeholder="San Francisco, CA"
							onChange={this.handleChange}
							required
						/>
						<TextField
							data-test-id="account-settings-location-confirm"
							className={classes.inputLabel}
							name="confirmedLocation"
							type="text"
							label={
								<FormattedMessage
									id="form.confirm-new-location"
									defaultMessage="Confirm new location"
									description="Confirm new location input field"
								/>
							}
							value={confirmedLocation}
							InputLabelProps={{
								shrink: true
							}}
							placeholder="San Francisco, CA"
							onChange={this.handleChange}
							required
						/>
						<div>
							<AsylumConnectButton
								variant="secondary"
								testIdName="account-settings-location-button"
							>
								<FormattedMessage
									id="action.update-location"
									defaultMessage="Update location"
									description="Update location button"
								/>
							</AsylumConnectButton>
						</div>
					</form>
				</Collapse>
			</div>
		);
	}
}

GeneralSettingsLocation.propTypes = {
	classes: PropTypes.object.isRequired,
	currentLocation: PropTypes.string.isRequired
};

export default withStyles(styles)(GeneralSettingsLocation);
