import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import AsylumConnectSelector from './AsylumConnectSelector';
import AsylumConnectCheckbox from './AsylumConnectCheckbox';
import {breakpoints, searchInput, searchInputMobile} from '../theme';
import ResourceTypes from '../utils/tags';
import withWidth from './withWidth';

const styles = (theme) => ({
	searchInput: Object.assign(searchInput(theme), {
		borderLeft: '1px solid ' + theme.palette.common.lightGrey,
		cursor: 'pointer',
		position: 'relative',
		marginBottom: '0px',
		[theme.breakpoints.down('xs')]: searchInputMobile(theme)
	}),
	sectionHeader: {
		color: theme.palette.common.darkBlack
	},
	sectionTitle: {
		fontWeight: '600',
		display: 'inline-block',
		verticalAlign: 'middle'
	},
	resourceList: {
		padding: '2rem',
		right: '0',
		maxHeight: '420px'
	}
});

const FilterCollection = (props) => (
	<div>
		{props.index > 0 ? <Divider /> : null}
		<Typography
			variant="body2"
			className={props.classes.sectionHeader}
			data-test-id="resource-tag-selector"
		>
			<AsylumConnectCheckbox
				label={
					props.t(props.category) +
					' > ' +
					(props.title ? props.t(props.title) + ' > ' : '') +
					props.t(props.acTag)
				}
				value={props.acTag}
				onChange={props.onChange}
				checked={props.selectedResourceTags.indexOf(props.acTag) >= 0}
			/>
		</Typography>
	</div>
);

class ResourceTagSelector extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.resourceTypes = {};
	}

	render() {
		const {searchInput, sectionHeader, sectionTitle, resourceList} =
			this.props.classes;
		const {onChange, selectedResourceTags, locale, t} = this.props;
		const isMobile = this.props.width < breakpoints['sm'];
		const containerWidth = isMobile ? '100%' : this.props.containerWidth + 'px';

		if (
			typeof this.resourceTypes[locale] === 'undefined' ||
			this.resourceTypes[locale].length === 0
		) {
			this.resourceTypes[locale] = ResourceTypes.getResourceTypes(locale);
		}

		return (
			<AsylumConnectSelector
				label="Service Types"
				selected={selectedResourceTags}
				containerWidth={containerWidth}
				containerClass={searchInput}
				listContainerClass={resourceList}
			>
				{this.resourceTypes[locale].map((filter, i) => (
					<FilterCollection
						key={i}
						index={i}
						classes={{sectionHeader, sectionTitle}}
						onChange={onChange}
						selectedResourceTags={selectedResourceTags}
						t={t}
						{...filter}
					/>
				))}
			</AsylumConnectSelector>
		);
	}
}

export default withStyles(styles)(withWidth(ResourceTagSelector));
