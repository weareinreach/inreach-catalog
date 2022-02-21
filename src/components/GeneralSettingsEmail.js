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

class GeneralSettingsEmail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			currentEmail: this.props.currentEmail,
			newEmail: '',
			confirmedEmail: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleToggleDropDown = this.handleToggleDropDown.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.currentEmail !== this.props.currentEmail &&
			this.props.currentEmail !== null &&
			this.props.currentEmail !== null
		) {
			this.setState({
				currentEmail: nextProps.currentEmail,
				newEmail: '',
				confirmedEmail: ''
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

		const {currentEmail, newEmail, confirmedEmail} = this.state;
		if (!currentEmail || !newEmail || !confirmedEmail) {
			handleMessageNew(<FormattedMessage id="error.required-field-empty" />);
		}

		if (currentEmail && newEmail && confirmedEmail) {
			if (newEmail === confirmedEmail) {
				this.props.handleUpdateEmail(newEmail);
				//update the UI with the new value, clear the form
				this.setState({
					currentEmail: newEmail,
					newEmail: '',
					confirmedEmail: ''
				});
			} else {
				handleMessageNew(
					<FormattedMessage id="error.email-address-mismatch" />
				);
			}
		}
	}

	render() {
		const {classes} = this.props;
		const {currentEmail, newEmail, confirmedEmail} = this.state;
		return (
			<div>
				<div
					data-test-id="account-page-email"
					onClick={this.handleToggleDropDown}
					className={classes.settingsTypeFont}
				>
					<span>
						<FormattedMessage id="action.update-email-address" />
					</span>
					{this.state.open ? <ExpandLess /> : <ExpandMore />}
				</div>
				<Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
					<form className={classes.form} onSubmit={this.handleSubmit}>
						<TextField
							data-test-id="account-settings-email-old-address"
							className={classes.inputLabel}
							name="currentEmail"
							type="email"
							label={<FormattedMessage id="form.current-email-address" />}
							value={currentEmail}
							InputLabelProps={{
								shrink: true
							}}
							placeholder="current_example@email.org"
							onChange={this.handleChange}
							required
						/>
						<TextField
							data-test-id="account-settings-email-new-address"
							className={classes.inputLabel}
							name="newEmail"
							type="email"
							label={<FormattedMessage id="form.new-email-address" />}
							value={newEmail}
							InputLabelProps={{
								shrink: true
							}}
							placeholder="new_example@email.org"
							onChange={this.handleChange}
							required
						/>
						<TextField
							data-test-id="account-settings-email-new-address-confirm"
							className={classes.inputLabel}
							name="confirmedEmail"
							type="email"
							label={<FormattedMessage id="form.confirm-new-email-address" />}
							value={confirmedEmail}
							InputLabelProps={{
								shrink: true
							}}
							placeholder="new_example@email.org"
							onChange={this.handleChange}
							required
						/>
						<div>
							<AsylumConnectButton
								variant="secondary"
								testIdName="account-settings-email-button"
							>
								<FormattedMessage id="action.update-email-address" />
							</AsylumConnectButton>
						</div>
					</form>
				</Collapse>
			</div>
		);
	}
}

GeneralSettingsEmail.propTypes = {
	classes: PropTypes.object.isRequired,
	currentEmail: PropTypes.string.isRequired
};

export default withStyles(styles)(GeneralSettingsEmail);
