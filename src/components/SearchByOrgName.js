import React from 'react';
import {withStyles} from '@material-ui/core';

import OrganizationAutocomplete from './OrganizationAutocomplete';

import withOrganizations from './withOrganizations';

const styles = (theme) => ({});

const SearchByOrgName = (props) => {
	const {locale, handleOrgSelection} = props;
	const handleSelection = (event, {suggestion, suggestionValue}) => {
		handleOrgSelection(suggestionValue);
		props.handleOrganizationSelect(event, {suggestion});
	};
	return (
		<>
			<OrganizationAutocomplete
				handleBlurOrganizations={props.handleBlurOrganizations}
				handleMessageNew={props.handleMessageNew}
				handleOrganizationSearchChange={props.handleOrganizationSearchChange}
				handleOrganizationSelect={handleSelection}
				handleOrganizationsFetchRequested={
					props.handleOrganizationsFetchRequested
				}
				handleOrganizationsClearRequested={
					props.handleOrganizationsClearRequested
				}
				isLoadingOrganizations={props.isLoadingOrganizations}
				locale={locale}
				organizationSearch={props.organizationSearch}
				organizationSelection={props.organizationSelection}
				organizations={props.organizations}
			/>
		</>
	);
};

export default withStyles(styles)(withOrganizations(SearchByOrgName));
