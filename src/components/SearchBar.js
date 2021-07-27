import React from 'react';
import Dimensions from 'react-dimensions';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ResourceTypeSelector from './ResourceTypeSelector';
import {searchInput, searchInputMobile} from '../theme';

const styles = (theme) => ({
	searchInput: searchInput(theme),
	[theme.breakpoints.down('xs')]: {
		searchInput: searchInputMobile(theme)
	},
	searchInputContainer: {
		position: 'relative',
		zIndex: '10'
	},
	placesContainer: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[2],
		position: 'absolute',
		zIndex: '20',
		top: 'calc(100% - 1.5rem)',
		width: '100%',
		right: '0',
		left: '0'
	},
	inlineSearchButton: {
		position: 'absolute',
		top: 0,
		right: 0,
		zIndex: 100,
		height: '48px',
		borderRadius: 0,
		color: theme.palette.common.white,
		backgroundColor: theme.palette.primary[500],
		borderColor: theme.palette.primary[500],
		'&:hover': {
			color: theme.palette.common.white,
			backgroundColor: theme.palette.primary[900],
			borderColor: theme.palette.primary[900]
		}
	},
	inlineSearchButtonDisabled: {
		color: theme.palette.common.white,
		backgroundColor: theme.palette.primary[100],
		borderColor: theme.palette.primary[100],
		'&:active': {
			color: theme.palette.common.white,
			backgroundColor: theme.palette.primary[100],
			borderColor: theme.palette.primary[100]
		},
		'&:hover': {
			color: theme.palette.common.white,
			backgroundColor: theme.palette.primary[100],
			borderColor: theme.palette.primary[100]
		}
	}
});

const SearchBar = (props) => {
	const {
		clearResourceTypes,
		containerWidth,
		handleResourceTypeSelect,
		locale,
		moveSearchButton,
		selectedResourceTypes,
		t,
		children,
		showResourceSelector = true
	} = props;

	return (
		<Grid container spacing={0}>
			<Grid item xs className="position-relative">
				{children}
			</Grid>
			{showResourceSelector && (
				<Grid item md={4} sm={12} xs={12} className="hide--on-print">
					<ResourceTypeSelector
						containerWidth={containerWidth}
						onChange={handleResourceTypeSelect}
						selectedResourceTypes={selectedResourceTypes}
						clearResourceTypes={clearResourceTypes}
						locale={locale}
						t={t}
						moveSearchButton={moveSearchButton}
					/>
				</Grid>
			)}
		</Grid>
	);
};

export default withStyles(styles)(Dimensions({containerStyle: {}})(SearchBar));
