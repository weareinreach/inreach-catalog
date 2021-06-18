import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import AsylumConnectCheckbox from './AsylumConnectCheckbox';
// TODO: Restore with new tags by locale
// import ResourceTagSelector from './ResourceTagSelector';

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
		'& label': {...theme.custom.inputLabel, width: '30%'},
		'&>div': {
			width: '70%'
		}
	},
	settingsTypeFont: {
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

class SuggestAdditional extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openFeature: true,
			openRequirement: true,
			openResourceTags: true
		};
		this.handleToggleDropDown = this.handleToggleDropDown.bind(this);
	}
	handleToggleDropDown(menu) {
		this.setState({[menu]: !this.state[menu]});
	}
	render() {
		const {
			classes,
			handleRequirementSelect,
			selectedRequirements,
			handleFeatureSelect,
			selectedFeatures
		} = this.props;
		return (
			<div className={classes.root}>
				<form className={classes.form}>
					<div>
						<div
							onClick={(ref) => this.handleToggleDropDown('openFeature')}
							className={classes.settingsTypeFont}
							data-test-id="suggest-page-feature"
						>
							<span>Feature</span>
							{this.state.openFeature ? <ExpandLess /> : <ExpandMore />}
						</div>
						<Collapse
							in={this.state.openFeature}
							transitionDuration="auto"
							unmountOnExit
						>
							<div>
								{selectedFeatures
									? selectedFeatures.map((feature) => (
											<AsylumConnectCheckbox
												testIdName="suggest-page-feature-checkbox-options"
												key={feature.name}
												label={feature.label}
												value={feature.name}
												onChange={handleFeatureSelect}
												checked={feature.value}
											/>
									  ))
									: ''}
							</div>
						</Collapse>
					</div>
					<div>
						<div
							onClick={(ref) => this.handleToggleDropDown('openRequirement')}
							className={classes.settingsTypeFont}
							data-test-id="suggest-page-requirement"
						>
							<span>Requirement</span>
							{this.state.openRequirement ? <ExpandLess /> : <ExpandMore />}
						</div>
						<Collapse
							in={this.state.openRequirement}
							transitionDuration="auto"
							unmountOnExit
						>
							<div>
								{selectedRequirements
									? selectedRequirements.map((requirement) => (
											<AsylumConnectCheckbox
												testIdName="suggest-page-requirement-checkbox-options"
												key={requirement.name}
												label={requirement.label}
												value={requirement.name}
												onChange={handleRequirementSelect}
												checked={requirement.value}
											/>
									  ))
									: ''}
							</div>
						</Collapse>
					</div>
					{/* <ResourceTagSelector
            onChange={handleTagSelect}
            selectedResourceTags={selectedTags}
            locale={this.props.locale}
            t={this.props.t}
          /> */}
				</form>
			</div>
		);
	}
}

SuggestAdditional.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SuggestAdditional);
