import React from 'react';
import {FormattedMessage} from 'react-intl';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import AsylumConnectCheckbox from './AsylumConnectCheckbox';
import AsylumConnectSwitch from './AsylumConnectSwitch';

import withWidth from './withWidth';
import {breakpoints} from '../theme';

const styles = (theme) => ({
	sectionHeader: {
		color: theme.palette.common.darkBlack
	},
	sectionTitle: {
		fontWeight: '600',
		display: 'inline-block',
		verticalAlign: 'middle'
	},
	strong: {
		//color: theme.palette.secondary[500]
	},
	dividerSpacing: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	switchRoot: {},
	switchLabel: {},
	[theme.breakpoints.down('xs')]: {
		strong: {
			//color: theme.palette.common.white
		},
		sectionTitle: {
			//color: theme.palette.common.white
		},
		sectionHeader: {
			//color: theme.palette.common.white
		},
		switchRoot: {
			flexDirection: 'row-reverse',
			width: '100%',
			maxWidth: '400px',
			justifyContent: 'space-between'
		},
		switchLabel: {
			//color: theme.palette.common.white,
		}
	},
	uncheckLink: {
		fontFamily: theme.typography.body1.fontFamily,
		fontSize: theme.typography.body1.fontSize,
		fontWeight: theme.typography.h3.fontWeight,
		position: 'absolute',
		right: theme.spacing(2),
		top: theme.spacing(2),
		textDecoration: 'none',
		cursor: 'pointer',
		left: '220px'
	}
});

const filterCollection = [
	[
		{
			label: (
				<FormattedMessage
					id="search.filter-has-confidentiality-policy"
					defaultMessage="Has a confidentiality policy"
					description=""
				/>
			),
			name: 'has-confidentiality-policy'
		},
		{
			label: (
				<FormattedMessage
					id="search.filter-has-free-services"
					defaultMessage="Has free services"
					description="free service option requirement"
				/>
			),
			name: 'cost-free'
		}
		//{label: <FormattedMessage id="search.filter-has-service-my-language />, name: 'lang-'},
	],
	[
		{
			label: (
				<FormattedMessage
					id="search.filter-photo-id"
					defaultMessage="Photo ID"
					description="photo id required requirement"
				/>
			),
			name: 'req-photo-id'
		},
		{
			label: (
				<FormattedMessage
					id="search.filter-proof-income"
					defaultMessage="Proof of Income"
					description="proof of income requirement"
				/>
			),
			name: 'req-proof-of-income'
		},
		{
			label: (
				<FormattedMessage
					id="search.filter-proof-age"
					defaultMessage="Proof of Age"
					description="proof of age requirement"
				/>
			),
			name: 'req-proof-of-age'
		},
		{
			label: (
				<FormattedMessage
					id="search.filter-medical-insurance"
					defaultMessage="Medical insurance"
					description="medical insurance requirement"
				/>
			),
			name: 'req-medical-insurance'
		},
		{
			label: (
				<FormattedMessage
					id="search.filter-proof-residence"
					defaultMessage="Proof of residence"
					description="proof of residence requirement"
				/>
			),
			name: 'req-proof-of-residence'
		},
		{
			label: (
				<FormattedMessage
					id="search.filter-referral"
					defaultMessage="A referral"
					description="needs a referral"
				/>
			),
			name: 'req-referral'
		}
	],
	[
		{
			label: (
				<FormattedMessage
					id="search.filter-exclude-no-new-clients"
					defaultMessage="Exclude resources that are currently unable to take new clients"
					description="option to exclude organizations not accepting clients"
				/>
			),
			name: 'at-capacity'
		}
	]
];

class SearchFilters extends React.Component {
	render() {
		const {props} = this;
		const isMobile = this.props.width < breakpoints['sm'];

		var selectedFilters = this.props.selectedFilters;

		/*		const handleFilterSelect = (event, checked) => {
			var index;
			const target = event.target;

			if (checked && selectedFilters.indexOf(target.value) < 0) {
				selectedFilters.push(target.value);
				selectedFilters.sort();
				this.setState({
					selectedFilters: selectedFilters
				});
			} else if (
				!checked &&
				(index = selectedFilters.indexOf(target.value)) >= 0
			) {
				selectedFilters.splice(index, 1);
				this.setState({
					selectedFilters: selectedFilters
				});
			}
		};

		const clearResourceTypes = (ev) => {
			if (ev) {
				ev.preventDefault();
			}

			this.setState({
				selectedFilters: []
			});
		};*/

		return (
			<div>
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<Typography variant="body2" className={props.classes.sectionHeader}>
							<span className={props.classes.sectionTitle}>
								<FormattedMessage
									id="search.filter-resources-placeholder"
									defaultMessage="Filter resources by..."
									description="title for inclusion section of check boxes"
								/>
							</span>
							<br />
							<FormattedMessage
								id="search.select-all-that-apply"
								defaultMessage="(Select all that apply)"
								description="Select all that apply text"
							/>
						</Typography>
					</Grid>
					{filterCollection[0].map((filter) => (
						<Grid item xs={12} key={filter.name}>
							{!isMobile ? (
								<AsylumConnectCheckbox
									label={filter.label}
									value={filter.name}
									onChange={props.onChange}
									checked={selectedFilters.indexOf(filter.name) >= 0}
								/>
							) : (
								<AsylumConnectSwitch
									label={filter.label}
									value={filter.name}
									onChange={props.onChange}
									checked={selectedFilters.indexOf(filter.name) >= 0}
									additionalClasses={{
										root: props.classes.switchRoot,
										label: props.classes.switchLabel
									}}
								/>
							)}
						</Grid>
					))}
					<Grid item xs={12}>
						<Divider className={props.classes.dividerSpacing} />
					</Grid>
					<Grid item xs={12}>
						<Typography variant="body2" className={props.classes.sectionHeader}>
							<span className={props.classes.sectionTitle}>
								<FormattedMessage
									id="search.filter-exclude-resources-with-requirements"
									defaultMessage="Do not show me resources that require..."
									description="title for exclusion section of check boxes"
								/>
							</span>
							<br />
							<FormattedMessage
								id="search.select-all-that-apply"
								defaultMessage="(Select all that apply)"
								description="Select all that apply text"
							/>
						</Typography>
					</Grid>
					{filterCollection[1].map((filter) => (
						<Grid item xs={12} md={6} key={filter.name}>
							{!isMobile ? (
								<AsylumConnectCheckbox
									label={filter.label}
									value={filter.name}
									onChange={props.onChange}
									checked={selectedFilters.indexOf(filter.name) >= 0}
								/>
							) : (
								<AsylumConnectSwitch
									label={filter.label}
									value={filter.name}
									onChange={props.onChange}
									checked={selectedFilters.indexOf(filter.name) >= 0}
									additionalClasses={{
										root: props.classes.switchRoot,
										label: props.classes.switchLabel
									}}
								/>
							)}
						</Grid>
					))}
					<Grid item xs={12}>
						<Divider className={props.classes.dividerSpacing} />
					</Grid>
					{filterCollection[2].map((filter) => (
						<Grid item xs={12} key={filter.name}>
							{!isMobile ? (
								<AsylumConnectCheckbox
									label={filter.label}
									value={filter.name}
									onChange={props.onChange}
									checked={selectedFilters.indexOf(filter.name) >= 0}
								/>
							) : (
								<AsylumConnectSwitch
									label={filter.label}
									value={filter.name}
									onChange={props.onChange}
									checked={selectedFilters.indexOf(filter.name) >= 0}
									additionalClasses={{
										root: props.classes.switchRoot,
										label: props.classes.switchLabel
									}}
								/>
							)}
						</Grid>
					))}
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(withWidth(SearchFilters));
