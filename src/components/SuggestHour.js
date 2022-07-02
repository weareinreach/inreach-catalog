import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';

import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import AsylumConnectCheckbox from './AsylumConnectCheckbox';

const styles = (theme) => ({
	root: {},
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
	formControl: {
		display: 'flex',
		flexDirection: 'row',
		'& label': {
			...theme.custom.inputLabel,
			width: '30%'
		},
		'&>div': {
			width: '70%'
		}
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
	textField: {
		display: 'flex',
		flexDirection: 'row',
		'& div': {
			flex: 1
		},
		'& input': theme.custom.inputText
	},
	inputLabel: {
		'& label': theme.custom.inputLabel,
		'& div': {
			marginTop: '20px'
		},
		'& input': theme.custom.inputText
	}
});

class SuggestHour extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleToggleDropDown = this.handleToggleDropDown.bind(this);
	}
	handleToggleDropDown() {
		this.setState({open: !this.state.open});
	}
	handleChange(e) {
		const {name, value} = e.target;
		this.props.handleChange(name, value);
	}
	render() {
		const {classes, schedule, selectedDays, handleDaySelect, intl} = this.props;
		return (
			<div className={classes.root} data-test-id="suggest-page-hour">
				<div
					onClick={this.handleToggleDropDown}
					className={classes.settingsTypeFont}
				>
					<span>
						<FormattedMessage
							id="form.schedule"
							defaultMessage="Schedule"
							description="Schedule message"
						/>
					</span>
					{this.state.open ? <ExpandLess /> : <ExpandMore />}
				</div>
				<Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
					<form className={classes.form}>
						<div className={classes.formControl}>
							<AsylumConnectCheckbox
								testIdName="suggest-page-hour-monday"
								label={intl.formatMessage({
									id: 'app.days-monday',
									defaultMessage: 'Monday',
									description: 'Monday'
								})}
								value="monday"
								onChange={(ref) =>
									handleDaySelect(
										'select',
										ref.target.value,
										schedule.monday_start,
										schedule.monday_end
									)
								}
								checked={selectedDays.monday}
							/>
							<div className={classes.textField}>
								<TextField
									type="time"
									name="monday_start"
									data-test-id="suggest-page-hour-monday-start"
									defaultValue={schedule.monday_start}
									InputLabelProps={{
										shrink: true
									}}
									onChange={this.handleChange}
									onKeyUp={(ref) =>
										handleDaySelect(
											'autoSelect',
											ref.target.name,
											schedule.monday_start,
											schedule.monday_end
										)
									}
								/>
								<TextField
									type="time"
									name="monday_end"
									data-test-id="suggest-page-hour-monday-end"
									defaultValue={schedule.monday_end}
									InputLabelProps={{
										shrink: true
									}}
									onChange={this.handleChange}
									onKeyUp={(ref) =>
										handleDaySelect(
											'autoSelect',
											ref.target.name,
											schedule.monday_start,
											schedule.monday_end
										)
									}
								/>
							</div>
						</div>
						<div className={classes.formControl}>
							<AsylumConnectCheckbox
								testIdName="suggest-page-hour-tuesday"
								label={intl.formatMessage({
									id: 'app.days-tuesday',
									defaultMessage: 'Tuesday',
									description: 'Tuesday'
								})}
								value="tuesday"
								onChange={(ref) =>
									handleDaySelect(
										'select',
										ref.target.value,
										schedule.tuesday_start,
										schedule.tuesday_end
									)
								}
								checked={selectedDays.tuesday}
							/>
							<div className={classes.textField}>
								<TextField
									type="time"
									name="tuesday_start"
									data-test-id="suggest-page-hour-tuesday-start"
									defaultValue={schedule.tuesday_start}
									InputLabelProps={{
										shrink: true
									}}
									onChange={this.handleChange}
									onKeyUp={(ref) =>
										handleDaySelect(
											'autoSelect',
											ref.target.name,
											schedule.tuesday_start,
											schedule.tuesday_end
										)
									}
								/>
								<TextField
									type="time"
									name="tuesday_end"
									data-test-id="suggest-page-hour-tuesday-end"
									defaultValue={schedule.tuesday_end}
									InputLabelProps={{
										shrink: true
									}}
									onChange={this.handleChange}
									onKeyUp={(ref) =>
										handleDaySelect(
											'autoSelect',
											ref.target.name,
											schedule.tuesday_start,
											schedule.tuesday_end
										)
									}
								/>
							</div>
						</div>
						<div className={classes.formControl}>
							<AsylumConnectCheckbox
								testIdName="suggest-page-hour-wednesday"
								label={intl.formatMessage({
									id: 'app.days-wednesday',
									defaultMessage: 'Wednesday',
									description: 'wednesday'
								})}
								value="wednesday"
								onChange={(ref) =>
									handleDaySelect(
										'select',
										ref.target.value,
										schedule.wednesday_start,
										schedule.wednesday_end
									)
								}
								checked={selectedDays.wednesday}
							/>
							<div className={classes.textField}>
								<TextField
									type="time"
									name="wednesday_start"
									data-test-id="suggest-page-hour-wednesday-start"
									defaultValue={schedule.wednesday_start}
									InputLabelProps={{
										shrink: true
									}}
									onChange={this.handleChange}
									onKeyUp={(ref) =>
										handleDaySelect(
											'autoSelect',
											ref.target.name,
											schedule.wednesday_start,
											schedule.wednesday_end
										)
									}
								/>
								<TextField
									type="time"
									name="wednesday_end"
									data-test-id="suggest-page-hour-wednesday-end"
									defaultValue={schedule.wednesday_end}
									InputLabelProps={{
										shrink: true
									}}
									onChange={this.handleChange}
									onKeyUp={(ref) =>
										handleDaySelect(
											'autoSelect',
											ref.target.name,
											schedule.wednesday_start,
											schedule.wednesday_end
										)
									}
								/>
							</div>
						</div>
						<div className={classes.formControl}>
							<AsylumConnectCheckbox
								testIdName="suggest-page-hour-thursday"
								label={intl.formatMessage({
									id: 'app.days-thursday',
									defaultMessage: 'Thursday',
									description: 'thursday'
								})}
								value="thursday"
								onChange={(ref) =>
									handleDaySelect(
										'select',
										ref.target.value,
										schedule.thursday_start,
										schedule.thursday_end
									)
								}
								checked={selectedDays.thursday}
							/>
							<div className={classes.textField}>
								<TextField
									type="time"
									name="thursday_start"
									data-test-id="suggest-page-hour-thursday-start"
									defaultValue={schedule.thursday_start}
									InputLabelProps={{
										shrink: true
									}}
									onChange={this.handleChange}
									onKeyUp={(ref) =>
										handleDaySelect(
											'autoSelect',
											ref.target.name,
											schedule.thursday_start,
											schedule.thursday_end
										)
									}
								/>
								<TextField
									type="time"
									name="thursday_end"
									data-test-id="suggest-page-hour-thursday-end"
									defaultValue={schedule.thursday_end}
									InputLabelProps={{
										shrink: true
									}}
									onChange={this.handleChange}
									onKeyUp={(ref) =>
										handleDaySelect(
											'autoSelect',
											ref.target.name,
											schedule.thursday_start,
											schedule.thursday_end
										)
									}
								/>
							</div>
						</div>
						<div className={classes.formControl}>
							<AsylumConnectCheckbox
								testIdName="suggest-page-hour-friday"
								label={intl.formatMessage({
									id: 'app.days-friday',
									defaultMessage: 'Friday',
									description: 'friday'
								})}
								value="friday"
								onChange={(ref) =>
									handleDaySelect(
										'select',
										ref.target.value,
										schedule.friday_start,
										schedule.friday_end
									)
								}
								checked={selectedDays.friday}
							/>
							<div className={classes.textField}>
								<TextField
									type="time"
									name="friday_start"
									data-test-id="suggest-page-hour-friday-start"
									defaultValue={schedule.friday_start}
									InputLabelProps={{
										shrink: true
									}}
									onChange={this.handleChange}
									onKeyUp={(ref) =>
										handleDaySelect(
											'autoSelect',
											ref.target.name,
											schedule.friday_start,
											schedule.friday_end
										)
									}
								/>
								<TextField
									type="time"
									name="friday_end"
									data-test-id="suggest-page-hour-friday-end"
									defaultValue={schedule.friday_end}
									InputLabelProps={{
										shrink: true
									}}
									onChange={this.handleChange}
									onKeyUp={(ref) =>
										handleDaySelect(
											'autoSelect',
											ref.target.name,
											schedule.friday_start,
											schedule.friday_end
										)
									}
								/>
							</div>
						</div>
						<div className={classes.formControl}>
							<AsylumConnectCheckbox
								testIdName="suggest-page-hour-saturday"
								label={intl.formatMessage({
									id: 'app.days-saturday',
									defaultMessage: 'Saturday',
									description: 'saturday'
								})}
								value="saturday"
								onChange={(ref) =>
									handleDaySelect(
										'select',
										ref.target.value,
										schedule.saturday_start,
										schedule.saturday_end
									)
								}
								checked={selectedDays.saturday}
							/>
							<div className={classes.textField}>
								<TextField
									type="time"
									name="saturday_start"
									data-test-id="suggest-page-hour-saturday-start"
									defaultValue={schedule.saturday_start}
									InputLabelProps={{
										shrink: true
									}}
									onChange={this.handleChange}
									onKeyUp={(ref) =>
										handleDaySelect(
											'autoSelect',
											ref.target.name,
											schedule.saturday_start,
											schedule.saturday_end
										)
									}
								/>
								<TextField
									type="time"
									name="saturday_end"
									data-test-id="suggest-page-hour-saturday-end"
									defaultValue={schedule.saturday_end}
									InputLabelProps={{
										shrink: true
									}}
									onChange={this.handleChange}
									onKeyUp={(ref) =>
										handleDaySelect(
											'autoSelect',
											ref.target.name,
											schedule.saturday_start,
											schedule.saturday_end
										)
									}
								/>
							</div>
						</div>
						<div className={classes.formControl}>
							<AsylumConnectCheckbox
								testIdName="suggest-page-hour-sunday"
								label={intl.formatMessage({
									id: 'app.days-sunday',
									defaultMessage: 'Sunday',
									description: 'sunday'
								})}
								value="sunday"
								onChange={(ref) =>
									handleDaySelect(
										'select',
										ref.target.value,
										schedule.sunday_start,
										schedule.sunday_end
									)
								}
								checked={selectedDays.sunday}
							/>
							<div className={classes.textField}>
								<TextField
									type="time"
									name="sunday_start"
									data-test-id="suggest-page-hour-sunday-start"
									defaultValue={schedule.sunday_start}
									InputLabelProps={{
										shrink: true
									}}
									onChange={this.handleChange}
									onKeyUp={(ref) =>
										handleDaySelect(
											'autoSelect',
											ref.target.name,
											schedule.sunday_start,
											schedule.sunday_end
										)
									}
								/>
								<TextField
									type="time"
									name="sunday_end"
									data-test-id="suggest-page-hour-sunday-end"
									defaultValue={schedule.sunday_end}
									InputLabelProps={{
										shrink: true
									}}
									onChange={this.handleChange}
									onKeyUp={(ref) =>
										handleDaySelect(
											'autoSelect',
											ref.target.name,
											schedule.sunday_start,
											schedule.sunday_end
										)
									}
								/>
							</div>
						</div>
						<TextField
							data-test-id="suggest-page-hour-additional-information"
							className={classes.inputLabel}
							label={
								intl.formatMessage({
									id: 'form.additional-information',
									defaultMessage: 'Additional Information',
									description: 'Prompt for additional information on form'
								}) + ':'
							}
							defaultValue={schedule.notes}
							multiline={true}
							name="notes"
							InputLabelProps={{
								shrink: true
							}}
							onChange={this.handleChange}
							placeholder={intl.formatMessage({
								id: 'form.resource-schedule-additional-information-placeholder',
								defaultMessage: 'e.g. closed on holidays',
								description: 'Placeholder for additional schedule information'
							})}
						/>
					</form>
				</Collapse>
			</div>
		);
	}
}

SuggestHour.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(injectIntl(SuggestHour));
