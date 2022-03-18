import React from 'react';
import {FormattedMessage, injectIntl} from 'react-int';
import ResourceTypeSelector from './ResourceTypeSelector';

import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

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
	inputLabel: {
		'& label': theme.custom.inputLabel,
		'& div': {
			marginTop: '20px'
		},
		'& input': theme.custom.inputText
	},
	formControl: {
		display: 'flex',
		flexDirection: 'row',
		'& label': theme.custom.inputLabel,
		'& div': {
			marginTop: 0,
			'& input': theme.custom.inputText
		}
	},
	settingsTypeFont: {
		marginRight: '20px',
		fontSize: 13,
		fontWeight: 700,
		fontFamily: '"Open Sans", sans-serif',
		letterSpacing: '-.02em',
		color: theme.palette.common.lightBlack,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		cursor: 'pointer'
	},
	modifiedSelector: {
		'&>div': {
			'&>div:first-child': {
				height: 0,
				backgroundColor: 'white',
				boxShadow: 'none',
				padding: 0,
				fontSize: 13,
				fontWeight: 700,
				fontFamily: '"Open Sans", sans-serif',
				letterSpacing: '-.02em',
				color: theme.palette.common.lightBlack,
				'&>div': {
					display: 'flex'
				}
			}
		},
		'& svg': {
			float: 'none'
		}
	}
});

class OrgSettingsAdditional extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true,
			capacity: false,
			selectedResources: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleToggleCapacity = this.handleToggleCapacity.bind(this);
		this.handleResourceTypeSelect = this.handleResourceTypeSelect.bind(this);
	}

	handleChange(e) {
		const {name, value} = e.target;
		this.setState({
			[name]: value
		});
	}
	handleToggleCapacity(e) {
		const {name} = e.target;
		this.setState({
			[name]: !this.state[name]
		});
	}
	handleResourceTypeSelect(event, checked) {
		var index;
		const target = event.target;
		var selectedResources = this.state.selectedResources.slice();
		if (checked && selectedResources.indexOf(target.value) < 0) {
			selectedResources.push(target.value);
			this.setState({
				selectedResources: selectedResources,
				searchStatus: null
			});
		} else if (
			!checked &&
			(index = selectedResources.indexOf(target.value)) >= 0
		) {
			selectedResources.splice(index, 1);
			this.setState({
				selectedResources: selectedResources,
				searchStatus: null
			});
		}
	}
	render() {
		const {classes, intl} = this.props;
		return (
			<div className={classes.root}>
				<form className={classes.form}>
					<TextField
						className={classes.inputLabel}
						label={
							intl.formatMessage({id: 'resource.additional-information'}) + ':'
						}
						InputLabelProps={{
							shrink: true
						}}
						placeholder={intl.formatMessage({
							id: 'resource.additional-information'
						})}
					/>
					<FormControl className={classes.formControl}>
						<div>
							<div className={classes.settingsTypeFont}>
								<span>
									<FormattedMessage id="resource.mark-at-capacity" />:
								</span>
							</div>
						</div>
						<FormControlLabel
							control={
								<Radio
									name="capacity"
									checked={this.state.capacity}
									value={this.state.capacity ? 'on' : 'off'}
									onClick={this.handleToggleCapacity}
								/>
							}
							label={<FormattedMessage id="form.yes" />}
						/>
					</FormControl>
					<FormControl className={classes.modifiedSelector}>
						<ResourceTypeSelector
							onChange={this.handleResourceTypeSelect}
							selectedResources={this.state.selectedResources}
						/>
					</FormControl>
				</form>
			</div>
		);
	}
}

OrgSettingsAdditional.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(injectIntl(OrgSettingsAdditional));
