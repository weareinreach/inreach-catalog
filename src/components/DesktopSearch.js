import React from 'react';
import Fa from 'react-fontawesome';
import Grid from '@material-ui/core/Grid';
import {FormattedMessage, useIntl} from 'react-intl';
import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import TabContext from '@material-ui/lab/TabContext';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/lab/TabPanel';
import TabList from '@material-ui/lab/TabList';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import AsylumConnectButton from './AsylumConnectButton';
import AsylumConnectCheckbox from './AsylumConnectCheckbox';
import SearchBar from './SearchBar';
import SearchByLocation from './SearchByLocation';
import SearchByOrgName from './SearchByOrgName';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {distanceOptions} from '../data/distanceOptions';

const DesktopSearch = (props) => {
	const {
		nationalOrgCheckboxContainer,
		searchButton,
		searchButtonContainer,
		lowerButton,
		tabs
	} = props.classes;
	const {
		handleOrgSelection,
		handleSearchByOrgName,
		onMoveSearchButton,
		locale,
		handleTabChange,
		tabValue,
		moveButton,
		selectedDistance
	} = props;
	const variant = 'primary';
	const intl = useIntl();

	const a11yProps = (index) => {
		return {
			id: `search-tab-${index}`,
			'aria-controls': `search-tabpanel-${index}`
		};
	};
	const distanceMessageObj = distanceOptions.find(
		(option) => option.searchValue === selectedDistance
	);

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
								description="tab heading to search by location"
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
								description="tab heading to search by organization name"
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
				<Grid container spacing={0} style={{paddingTop: '24px'}}>
					<Grid item>
						<Typography variant="h5">
							<FormattedMessage
								id="search.distance-select"
								defaultMessage="Select Search Distance"
								description="label for distance selection form"
							/>
							:
						</Typography>
						<Typography>
							{!props.nearAddress ? (
								<FormattedMessage
									id="error.no-location-entered"
									defaultMessage="Please enter a city or state in the location search box above."
									description="error when a location is not specified"
								/>
							) : (
								<FormattedMessage
									id={distanceMessageObj.selectionMessageFormatMessageId}
									defaultMessage={
										distanceMessageObj.selectionMessageDefaultMessage
									}
									description={distanceMessageObj.selectedDescription}
									values={{searchLocation: props.nearAddress}}
								/>
							)}
						</Typography>
						<RadioGroup
							name="selectedDistance"
							required={true}
							onChange={props.handleDistanceSelection}
						>
							<Grid container spacing={0}>
								{distanceOptions.map((type, index) => (
									<Grid item key={index}>
										<FormControlLabel
											value={type.searchValue}
											control={<Radio />}
											label={intl.formatMessage({
												id: type.distanceFormatMessageId,
												defaultMessage: type.distanceDefaultMessage,
												description: type.description
											})}
											checked={selectedDistance === type.searchValue}
											data-test-id={type.searchValue}
										/>
									</Grid>
								))}
							</Grid>
						</RadioGroup>
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
							disabled={props.searchDisabled || !props.nearAddress}
							className={moveButton ? lowerButton : null}
							testIdName="search-bar-search-button"
						>
							<FormattedMessage
								id="navigation.search"
								defaultMessage="Search"
								description="search action button"
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
							disabled={props.searchDisabled || !props.orgName}
							className={moveButton ? lowerButton : null}
							testIdName="search-bar-search-button"
						>
							<FormattedMessage
								id="navigation.search"
								defaultMessage="Search"
								description="search action button"
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
