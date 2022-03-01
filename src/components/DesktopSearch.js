import React from 'react';
import Fa from 'react-fontawesome';
import Grid from '@material-ui/core/Grid';
import {FormattedMessage} from 'react-intl';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import TabContext from '@material-ui/lab/TabContext';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/lab/TabPanel';
import TabList from '@material-ui/lab/TabList';
import Tooltip from '@material-ui/core/Tooltip';

import AsylumConnectButton from './AsylumConnectButton';
import AsylumConnectCheckbox from './AsylumConnectCheckbox';
import SearchBar from './SearchBar';
import SearchByLocation from './SearchByLocation';
import SearchByOrgName from './SearchByOrgName';
import SearchRefinementControls from './SearchRefinementControls';

const DesktopSearch = (props) => {
	const {
		nationalOrgCheckboxContainer,
		searchButton,
		searchButtonContainer,
		lowerButton,
		tabs,
		secondary,
		tooltip,
		filterContainer,
		fullBottomMargin,
		halfBottomMargin
	} = props.classes;
	const {
		handleOrgSelection,
		handleSearchByOrgName,
		onMoveSearchButton,
		showWalkinCheckbox,
		locale,
		handleTabChange,
		tabValue,
		moveButton
	} = props;
	const variant = 'primary';
	const toolbarClass = showWalkinCheckbox ? halfBottomMargin : fullBottomMargin;

	const a11yProps = (index) => {
		return {
			id: `search-tab-${index}`,
			'aria-controls': `search-tabpanel-${index}`
		};
	};
	return (
		<TabContext value={tabValue}>
			<AppBar position="static">
				<TabList onChange={handleTabChange} aria-label="search panel tabs">
					<Tab
						label={
							<FormattedMessage
								id="search.search-by-location-tab-heading"
								defaultMessage="Find services near you"
							/>
						}
						{...a11yProps(0)}
						className={tabs}
						fullWidth
					/>
					<Tab
						label={
							<FormattedMessage
								id="search.search-by-name-tab-heading"
								defaultMessage="Find an organization by name"
							/>
						}
						{...a11yProps(1)}
						className={tabs}
						fullWidth
					/>
				</TabList>
			</AppBar>
			<TabPanel value={0} index={0}>
				<SearchBar
					{...props}
					classes={null}
					moveSearchButton={onMoveSearchButton}
					data-test-id="serchbar"
				>
					<SearchByLocation {...props} />
				</SearchBar>
				<Grid container spacing={0} className={nationalOrgCheckboxContainer}>
					<Grid item>
						<AsylumConnectCheckbox
							label={
								<FormattedMessage
									id="search.show-national-organizations-country"
									defaultMessage="Show me national organizations who can help anyone located in the country"
								/>
							}
							checked={props.isNational}
							onChange={props.handleNationalCheckBox}
							testIdName="search-page-checkbox"
						/>
					</Grid>
				</Grid>
				<Grid container spacing={0} className={searchButtonContainer}>
					<Grid
						item
						xs
						className={searchButton}
						style={{paddingBottom: '10px'}}
					>
						<AsylumConnectButton
							variant={variant}
							onClick={props.handleSearchButtonClick}
							disabled={props.searchDisabled}
							className={moveButton ? lowerButton : null}
							testIdName="search-bar-search-button"
						>
							<FormattedMessage
								id="navigation.search"
								defaultMessage="Search"
							/>
							{props.searchDisabled ? (
								<Fa name="spinner" spin style={{marginLeft: '0.5rem'}} />
							) : null}
						</AsylumConnectButton>
					</Grid>

					<Grid item xs className="pull-right">
						<Tooltip
							className={tooltip}
							classes={{tooltipPlacementTop: 'badge-tooltipTop'}}
							title={<FormattedMessage id="action.print-results" />}
							placement="top"
						>
							<IconButton
								className={secondary}
								style={{height: 'auto'}}
								onClick={props.handlePrintClick}
								disabled={props.printDisabled}
							>
								<Fa name="print" />
							</IconButton>
						</Tooltip>
					</Grid>
					<Grid item xs className={filterContainer + ' ' + toolbarClass}>
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
				</Grid>
			</TabPanel>
			<TabPanel value={1} index={1}>
				<SearchBar
					{...props}
					classes={null}
					moveSearchButton={onMoveSearchButton}
					data-test-id="name-searchbar"
					showResourceSelector={false}
				>
					<SearchByOrgName
						handleOrgSelection={handleOrgSelection}
						orgName={props.orgName}
						locale={locale}
					/>
				</SearchBar>
				<Grid container spacing={0} className={searchButtonContainer}>
					<Grid
						item
						xs
						className={searchButton}
						style={{paddingBottom: '10px'}}
					>
						<AsylumConnectButton
							variant={variant}
							onClick={handleSearchByOrgName}
							disabled={props.searchDisabled}
							className={moveButton ? lowerButton : null}
							testIdName="search-bar-search-button"
						>
							<FormattedMessage
								id="navigation.search"
								defaultMessage="Search"
							/>
							{props.searchDisabled ? (
								<Fa name="spinner" spin style={{marginLeft: '0.5rem'}} />
							) : null}
						</AsylumConnectButton>
					</Grid>
				</Grid>
			</TabPanel>
		</TabContext>
	);
};

export default DesktopSearch;
