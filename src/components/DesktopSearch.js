import React from 'react';
import Fa from 'react-fontawesome';
import Grid from '@material-ui/core/Grid';
import {FormattedMessage, useIntl} from 'react-intl';

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
		moveButton,
		handleFilterSelect
	} = props;
	const variant = 'primary';
	const toolbarClass = showWalkinCheckbox ? halfBottomMargin : fullBottomMargin;
	const intl = useIntl();
	const checkboxLabel = intl
		.formatMessage({
			id: 'search.show-national-organizations-country',
			defaultMessage:
				'Show me national organizations who can help anyone located in the country'
		})
		.toString();

	const a11yProps = (index) => {
		return {
			id: `search-tab-${index}`,
			'aria-controls': `search-tabpanel-${index}`
		};
	};
	return (
		<TabContext value={tabValue.toString()}>
			<AppBar position="static">
				<TabList onChange={handleTabChange} aria-label="search panel tabs">
					<Tab
						data-test-id="desktop-search-address"
						label={
							<FormattedMessage
								id="search.search-by-location-tab-heading"
								defaultMessage="Find services near you"
							/>
						}
						{...a11yProps(0)}
						className={tabs}
						fullWidth
						value="0"
					/>
					<Tab
						data-test-id="desktop-search-organization"
						label={
							<FormattedMessage
								id="search.search-by-name-tab-heading"
								defaultMessage="Find an organization by name"
							/>
						}
						{...a11yProps(1)}
						className={tabs}
						fullWidth
						value="1"
					/>
				</TabList>
			</AppBar>
			<TabPanel value="0" index={0}>
				<SearchBar
					{...props}
					classes={null}
					moveSearchButton={onMoveSearchButton}
					data-test-id="location-searchbar"
					showResourceSelector={false}
				>
					<SearchByLocation {...props} />
				</SearchBar>
				<SearchBar
					{...props}
					classes={null}
					moveSearchButton={onMoveSearchButton}
					data-test-id="servicetype-searchbar"
				/>
				<Grid
					container
					spacing={0}
					className={nationalOrgCheckboxContainer}
					style={{paddingTop: '24px'}}
				>
					<Grid item>
						<AsylumConnectCheckbox
							label={checkboxLabel}
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
				</Grid>
			</TabPanel>
			<TabPanel value="1" index={1}>
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
