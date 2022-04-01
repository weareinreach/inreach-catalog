import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import MaskedInput from 'react-text-mask';

import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

function TextMaskCustom(props) {
	return (
		<MaskedInput
			{...props}
			mask={[
				'(',
				/[1-9]/,
				/\d/,
				/\d/,
				')',
				' ',
				/\d/,
				/\d/,
				/\d/,
				'-',
				/\d/,
				/\d/,
				/\d/,
				/\d/
			]}
			placeholderChar={'\u2000'}
			showMask
		/>
	);
}

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
		marginTop: '10%'
	},
	inputLabel: {
		'& label': theme.custom.inputLabel,
		'&>div': {
			marginTop: '20px'
		},
		'& input': theme.custom.inputText,
		'& .Mui-disabled': {
			color: 'black'
		}
	}
});

class OrgSettingsInfo extends React.Component {
	constructor(props) {
		super(props);
		const {initialData} = this.props;
		this.state = {
			phone:
				initialData && initialData.phone ? initialData.phone : '(  )   -   ',
			description:
				initialData && initialData.description ? initialData.description : '',
			address: initialData && initialData.address ? initialData.address : '',
			website: initialData && initialData.website ? initialData.website : '',
			name: initialData && initialData.name ? initialData.name : '',
			region: initialData && initialData.region ? initialData.region : '',
			city: initialData && initialData.city ? initialData.city : '',
			state: initialData && initialData.state ? initialData.state : '',
			zip_code: initialData && initialData.zip_code ? initialData.zip_code : '',
			target: ''
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		const {name, value} = e.target;

		if (
			['alert_message', 'name', 'website', 'description', 'region'].includes(
				name
			)
		) {
			this.props.onChange('info', name, value);
		} else if (name === 'digits') {
			this.props.onChange('phones', name, value);
		} else {
			this.props.onChange('address', name, value);
		}
	}
	render() {
		const {
			address,
			alert_message,
			classes,
			description,
			isSuggestion,
			name,
			phones,
			region,
			website,
			intl
		} = this.props;
		const {digits} = phones?.[0] || '(   )   -   ';

		return (
			<div className={classes.root}>
				<form className={classes.form}>
					{!isSuggestion ? (
						<TextField
							className={classes.inputLabel}
							label={
								intl.formatMessage({id: 'form.organization-name-title'}) + ':'
							}
							value={name}
							disabled={!isSuggestion}
						/>
					) : (
						<TextField
							className={classes.inputLabel}
							label={
								intl.formatMessage({id: 'form.organization-name-title'}) + ':'
							}
							name="name"
							value={name}
							InputLabelProps={{
								shrink: true
							}}
							placeholder={intl.formatMessage({
								id: 'form.organization-name-title'
							})}
							onChange={this.handleChange}
						/>
					)}
					<TextField
						className={classes.inputLabel}
						label={intl.formatMessage({id: 'resource.about-header'}) + ':'}
						name="description"
						value={description}
						multiline={true}
						InputLabelProps={{
							shrink: true
						}}
						placeholder={intl.formatMessage({
							id: 'form.resource-description-placeholder'
						})}
						onChange={this.handleChange}
					/>
					<TextField
						className={classes.inputLabel}
						label={intl.formatMessage({id: 'form.alert-message'}) + ':'}
						name="alert_message"
						value={alert_message}
						multiline={true}
						InputLabelProps={{
							shrink: true
						}}
						placeholder={intl.formatMessage({
							id: 'form.alert-message-placeholder'
						})}
						onChange={this.handleChange}
					/>
					<TextField
						className={classes.inputLabel}
						label={intl.formatMessage({id: 'resource.website-label'}) + ':'}
						name="website"
						value={website}
						InputLabelProps={{
							shrink: true
						}}
						placeholder={intl.formatMessage({id: 'form.website-placeholder'})}
						onChange={this.handleChange}
					/>
					{/* <FormControl className={classes.inputLabel}>
            <InputLabel children="Phone number:" shrink />
            <Input
              name="digits"
              value={digits}
              inputComponent={TextMaskCustom}
              onChange={this.handleChange}
            />
          </FormControl> */}
					{/* <TextField
            className={classes.inputLabel}
            label="Address:"
            name="address"
            value={address?.address}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Address"
            onChange={this.handleChange}
          /> */}
					{/* <TextField
            className={classes.inputLabel}
            label="Region:"
            name="region"
            value={region}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Region"
            onChange={this.handleChange}
          /> */}
					{/* <TextField
            className={classes.inputLabel}
            label="City:"
            name="city"
            value={address.city ? address.city : ''}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="City"
            onChange={this.handleChange}
          /> */}
					{/* <TextField
            className={classes.inputLabel}
            label="State:"
            name="state"
            value={address.state ? address.state : ''}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="State"
            onChange={this.handleChange}
          /> */}
					{/* <TextField
            className={classes.inputLabel}
            label="Zip code:"
            name="zip_code"
            value={address.zip_code ? address.zip_code : ''}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Zip code"
            onChange={this.handleChange}
          /> */}
				</form>
			</div>
		);
	}
}

OrgSettingsInfo.propTypes = {
	classes: PropTypes.object.isRequired,
	info: PropTypes.object,
	handleCollectInfoData: PropTypes.func
};

export default withStyles(styles)(injectIntl(OrgSettingsInfo));
