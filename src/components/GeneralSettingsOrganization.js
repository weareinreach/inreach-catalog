import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';

import PropTypes from 'prop-types';

import {createOrgOwner, deleteOrgOwner} from '../utils/api';

import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import AsylumConnectButton from './AsylumConnectButton';
import OrganizationAutocomplete from './OrganizationAutocomplete';
import withOrganizations from './withOrganizations';

const styles = (theme) => ({
	settingsTypeFont: {
		padding: '15px 0 25px 0',
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
	marginVertical: {margin: '1rem 0'}
});

class GeneralSettingsOrganization extends Component {
	constructor(props) {
		super(props);

		this.handleAffiliationDelete = this.handleAffiliationDelete.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleAffiliationDelete() {
		const {affiliation, handleMessageNew, userData} = this.props;

		deleteOrgOwner({orgId: affiliation._id, userId: userData._id})
			.then(() => {
				window.location.reload();
			})
			.catch(() => {
				handleMessageNew(<FormattedMessage id="error.unspecified" />);
			});
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({[name]: value});
	}

	handleSubmit(event) {
		event.preventDefault();
		const {handleMessageNew, organizationSelection, session, userData} =
			this.props;
		if (organizationSelection === null) {
			handleMessageNew(
				<FormattedMessage id="account.join-organization-error" />
			);
		} else {
			if (organizationSelection.owners.length) {
				const affiliate = organizationSelection.owners.find(
					(owner) => owner.email === userData.email
				);
				if (affiliate) {
					affiliate.isApproved
						? handleMessageNew(
								`You are already affiliated with ${organizationSelection.name}`
						  )
						: handleMessageNew(
								`Your request to be affiliated with ${organizationSelection.name} is pending.`
						  );
					return;
				}
			}
			const {_id} = organizationSelection;
			createOrgOwner(
				{email: userData.email, orgId: _id, userId: userData._id},
				session
			)
				.then(() => {
					handleMessageNew(
						`Request to be affiliated with ${organizationSelection.name} received. You will be notified when it is approved.`
					);
					window.location.reload();
				})
				.catch(() => {
					handleMessageNew(<FormattedMessage id="error.unspecified" />);
				});
		}
	}

	render() {
		const {affiliation, classes, locale, isApproved} = this.props;

		return (
			<div>
				{affiliation && !isApproved ? (
					<div>
						<Typography>
							Your request to join {affiliation.name} is pending.
						</Typography>
					</div>
				) : affiliation && isApproved ? (
					<div>
						<Typography>
							<FormattedMessage id="account.leave-organization-help" />
						</Typography>
						<AsylumConnectButton
							className={classes.marginVertical}
							onClick={this.handleAffiliationDelete}
							variant="secondary"
						>
							<FormattedMessage id="account.leave-organization" />
						</AsylumConnectButton>
					</div>
				) : (
					<form className={classes.form} onSubmit={this.handleSubmit}>
						<OrganizationAutocomplete
							handleBlurOrganizations={this.props.handleBlurOrganizations}
							handleMessageNew={this.props.handleMessageNew}
							handleOrganizationSearchChange={
								this.props.handleOrganizationSearchChange
							}
							handleOrganizationSelect={this.props.handleOrganizationSelect}
							handleOrganizationsFetchRequested={
								this.props.handleOrganizationsFetchRequested
							}
							handleOrganizationsClearRequested={
								this.props.handleOrganizationsClearRequested
							}
							isLoadingOrganizations={this.props.isLoadingOrganizations}
							locale={locale}
							organizationSearch={this.props.organizationSearch}
							organizationSelection={this.props.organizationSelection}
							organizations={this.props.organizations}
						/>
						<AsylumConnectButton
							className={classes.marginVertical}
							variant="secondary"
						>
							<FormattedMessage id="account.join-organization" />
						</AsylumConnectButton>
					</form>
				)}
			</div>
		);
	}
}

GeneralSettingsOrganization.defaultProps = {
	affiliation: null,
	organizationSelection: null
};

GeneralSettingsOrganization.propTypes = {
	affiliation: PropTypes.shape({}),
	classes: PropTypes.object.isRequired,
	handleBlurOrganizations: PropTypes.func.isRequired,
	handleOrganizationSearchChange: PropTypes.func.isRequired,
	handleOrganizationSelect: PropTypes.func.isRequired,
	handleOrganizationsFetchRequested: PropTypes.func.isRequired,
	handleOrganizationsClearRequested: PropTypes.func.isRequired,
	handleUserUpdate: PropTypes.func.isRequired,
	organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
	organizationSearch: PropTypes.string.isRequired,
	organizationSelection: PropTypes.object,
	session: PropTypes.string.isRequired,
	isApproved: PropTypes.bool.isRequired
};

export default withStyles(styles)(
	withOrganizations(GeneralSettingsOrganization)
);
