import React from 'react';
import Grid from '@material-ui/core/Grid';
import {FormattedMessage} from 'react-intl';
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

const MobileSearch = (props) => {
	const {
		boldFont,
		searchButton,
		searchButtonContainer,
		lowerButton,
		nationalOrgCheckboxContainer
	} = props.classes;
	const {
		onMoveSearchButton,
		handleOrgSelection,
		orgName,
		locale,
		searchDisabled,
		isNational,
		handleNationalCheckBox,
		handleSearchByOrgName,
		handleSearchButtonClick,
		moveButton,
		mobileTabValue,
		handleTabChange
	} = props;
	const variant = 'primary';

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
									disabled={searchDisabled}
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
						<Grid item className={nationalOrgCheckboxContainer}>
							<AsylumConnectCheckbox
								label={
									<FormattedMessage
										id="search.show-national-organizations-country"
										defaultMessage="Show me national organizations who can help anyone located in the country"
										description="checkbox to find all national organizations"
									/>
								}
								checked={isNational}
								onChange={handleNationalCheckBox}
								testIdName="search-page-checkbox"
							/>
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
								disabled={searchDisabled}
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
