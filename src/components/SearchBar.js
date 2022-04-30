import React from 'react';
import Dimensions from 'react-dimensions';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ResourceTypeSelector from './ResourceTypeSelector';
import {searchInput, searchInputMobile, breakpoints} from '../theme';
import SearchRefinementControls from './SearchRefinementControls';

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
		left: 0,
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
		showResourceSelector = true,
		width
	} = props;
	const isMobile = width < breakpoints['sm'];
	return (
		<Grid container spacing={0} data-test-id="search-bar">
			<Grid item xs className="position-relative">
				{children}
			</Grid>
			{showResourceSelector && (
				<>
					<Grid
						item
						md={6}
						sm={12}
						xs={12}
						className="hide--on-print"
						data-test-id="search-service-type"
					>
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

					{!isMobile ? (
						<Grid
							item
							md={6}
							sm={12}
							xs={12}
							className="hide--on-print"
							data-test-id="search-additional-filters"
						>
							<SearchRefinementControls
								clearSearchFilters={props.clearSearchFilters}
								handleFilterSelect={props.handleFilterSelect}
								handleSortSelect={props.handleSortSelect}
								selectedFilters={props.selectedFilters.filter(
									(item) => item !== 'time-walk-in'
								)}
								selectedSort={props.selectedSort}
							/>
						</Grid>
					) : null}
				</>
			)}
		</Grid>
	);
};

export default withStyles(styles)(Dimensions({containerStyle: {}})(SearchBar));
