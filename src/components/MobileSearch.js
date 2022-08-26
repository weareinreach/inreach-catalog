import React from 'react';
import Grid from '@material-ui/core/Grid';
import {FormattedMessage, useIntl} from 'react-intl';
import Fa from 'react-fontawesome';
import AsylumConnectButton from './AsylumConnectButton';
import AsylumConnectCheckbox from './AsylumConnectCheckbox';
import SearchBar from './SearchBar';
import SearchByLocation from './SearchByLocation';
import SearchByOrgName from './SearchByOrgName';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {distanceOptions} from '../data/distanceOptions';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const MobileSearch = (props) => {
	const {boldFont, searchButton, searchButtonContainer, lowerButton} =
		props.classes;
	const {
		onMoveSearchButton,
		handleOrgSelection,
		orgName,
		locale,
		searchDisabled,
		isNational,
		handleSearchByOrgName,
		handleSearchButtonClick,
		moveButton,
		mobileTabValue,
		handleTabChange,
		selectedDistance
	} = props;
	const variant = 'primary';
	const intl = useIntl();

	const distanceMessageObj = distanceOptions.find(
		(option) => option.searchValue == props.selectedDistance
	);

	return (
		<>
			<Accordion
				expanded={mobileTabValue === 1}
				onChange={(e) => handleTabChange(e, 1)}
			>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography component="h3" variant="h4" className={boldFont}>
						<FormattedMessage
							id="search.search-by-name-tab-heading"
							defaultMessage="Find an organization by name"
							description="Title for organization search form"
						/>
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Grid container>
						<Grid item xs={12}>
							<SearchBar
								{...props}
								classes={null}
								moveSearchButton={onMoveSearchButton}
								data-test-id="name-searchbar"
								showResourceSelector={false}
							>
								<SearchByOrgName
									handleOrgSelection={handleOrgSelection}
									orgName={orgName}
									locale={locale}
								/>
							</SearchBar>
						</Grid>
						<Grid
							item
							xs={12}
							container
							spacing={0}
							className={searchButtonContainer}
						>
							<Grid item xs className={searchButton}>
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
										description="serach button"
									/>
									{searchDisabled ? (
										<Fa name="spinner" spin style={{marginLeft: '0.5rem'}} />
									) : null}
								</AsylumConnectButton>
							</Grid>
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>
			<Accordion
				expanded={mobileTabValue === 0}
				onChange={(e) => handleTabChange(e, 0)}
			>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography component="h3" variant="h4" className={boldFont}>
						<FormattedMessage
							id="search.search-by-location-tab-heading"
							defaultMessage="Find services near you"
							description="helper text for search dropdown"
						/>
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Grid container>
						<Grid item xs>
							<SearchBar
								{...props}
								classes={null}
								moveSearchButton={onMoveSearchButton}
								data-test-id="serchbar"
								showResourceSelector={true}
							>
								<SearchByLocation {...props} />
							</SearchBar>
						</Grid>
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
								<Grid item xs={12} container spacing={0}>
									{distanceOptions.map((type, index) => (
										<Grid item xs key={index}>
											<FormControlLabel
												value={type.searchValue}
												control={<Radio />}
												label={intl.formatMessage({
													id: type.distanceFormatMessageId,
													defaultMessage: type.distanceDefaultMessage,
													description: type.description
												})}
												checked={props.selectedDistance === type.searchValue}
												data-test-id={type.searchValue}
											/>
										</Grid>
									))}
								</Grid>
							</RadioGroup>
						</Grid>
						<Grid
							item
							xs
							className={searchButton}
							style={{paddingBottom: '10px'}}
						>
							<AsylumConnectButton
								variant={variant}
								onClick={handleSearchButtonClick}
								disabled={props.searchDisabled || !props.nearAddress}
								className={moveButton ? lowerButton : null}
								testIdName="search-bar-search-by-location-button"
							>
								<FormattedMessage
									id="navigation.search"
									defaultMessage="Search"
									description="search button"
								/>
								{searchDisabled ? (
									<Fa name="spinner" spin style={{marginLeft: '0.5rem'}} />
								) : null}
							</AsylumConnectButton>
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>
		</>
	);
};

export default MobileSearch;
