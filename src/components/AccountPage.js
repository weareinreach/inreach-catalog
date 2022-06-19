import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import GeneralSettings from './GeneralSettings';
import OrgSettings from './OrgSettings';
import PromptReconfirm from './PromptReconfirm';
import withWidth from './withWidth';
import {breakpoints} from '../theme';
import {fetchOrganizations, fetchUser} from '../utils/api';

import {returnOrgNativeLanguageData} from '../utils/utils';
import language from '../utils/language';

const langCode = language.getLanguageCode();
const provider = language.getLanguageProvider();

const doNativeTranslation =
	langCode !== 'en' && provider === 'inreach' ? true : false;

const styles = (theme) => ({
	root: {
		padding: '5% 0 5% 0',
		marginBottom: theme.spacing(9),
		display: 'flex',
		flexDirection: 'column'
	},
	[`@media (max-width: ${breakpoints['sm']}px)`]: {
		root: {
			padding: '5% 20px'
		},
		marginBottom: {
			marginBottom: '5%'
		}
	},
	formRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'baseline'
	},
	textAlignCenter: {
		textAlign: 'center'
	}
});

function TabContainer(props) {
	return <div style={{marginTop: 50}}>{props.children}</div>;
}

class AccountPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: 0,
			isAuthenticated: false,
			user: null
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleUserUpdate = this.handleUserUpdate.bind(this);
	}

	componentDidMount() {
		if (!this.props.session) {
			this.handleNullSession();
		} else {
			this.handleFetchUser();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.sessionConfirmed && nextProps.sessionConfirmed) {
			this.handleFetchUser();
		} else if (this.props.session && !nextProps.session) {
			this.handleNullSession();
		}
	}

	handleFetchUser() {
		fetchUser(this.props.session)
			.then((user) => {
				fetchOrganizations({owner: user.email})
					.then(({organizations}) => {
						organizations = doNativeTranslation
							? returnOrgNativeLanguageData(organizations, langCode)
							: organizations;

						const affiliation = organizations?.[0] || null;
						const isApproved =
							affiliation?.owners?.some(
								(owner) => owner.userId === user._id && owner.isApproved
							) || false;

						this.setState({
							affiliation: affiliation,
							isAuthenticated: true,
							isApproved: isApproved,
							userData: user
						});
					})
					.catch((err) => {
						this.props.handleMessageNew(
							<FormattedMessage id="error-unspecified" />
						);

						return;
					});
			})
			.catch((err) => {
				this.props.handleMessageNew(
					<FormattedMessage id="error-unspecified" />
				);

				return;
			});
	}

	handleUserUpdate(data) {
		this.setState((prevState) => ({
			user: {
				...prevState.user,
				...data
			}
		}));
	}

	handleNullSession() {
		this.props.history.push('/');
		this.props.handleMessageNew(
			<FormattedMessage id="account.user-sign-in-prompt" />
		);
	}

	handleChange(event, value) {
		this.setState({value});
	}

	render() {
		const {handleUserUpdate} = this;
		const {
			classes,
			handleLogOut,
			handleMessageNew,
			handleRequestOpen,
			locale,
			session
		} = this.props;
		const {affiliation, isAuthenticated, userData, value, isApproved} =
			this.state;
		const isMobile = this.props.width < breakpoints['sm'];
		let settings;
		if (isAuthenticated && affiliation && isApproved) {
			settings = isMobile ? (
				<div data-test-id="account-page-account">
					<AppBar position="static">
						<Tabs
							value={value}
							onChange={this.handleChange}
							indicatorColor="primary"
							fullWidth
						>
							<Tab
								label={<FormattedMessage id="account.your-account-heading" />}
							/>
							<Tab
								label={
									<FormattedMessage id="account.your-organization-heading" />
								}
							/>
						</Tabs>
					</AppBar>
					{value === 0 && (
						<TabContainer>
							<GeneralSettings
								affiliation={affiliation}
								handleLogOut={handleLogOut}
								handleMessageNew={handleMessageNew}
								handleRequestOpen={handleRequestOpen}
								handleUserUpdate={handleUserUpdate}
								locale={locale}
								session={session}
								userData={userData}
								isApproved={isApproved}
							/>
						</TabContainer>
					)}
					{value === 1 && (
						<TabContainer>
							<OrgSettings
								affiliation={affiliation}
								handleMessageNew={handleMessageNew}
								userData={userData}
							/>
						</TabContainer>
					)}
				</div>
			) : (
				<div>
					<Typography variant="h4" className={classes.textAlignCenter}>
						<FormattedMessage id="account.organization" />
					</Typography>
					<div className={classes.formRow}>
						<OrgSettings
							affiliation={affiliation}
							handleMessageNew={handleMessageNew}
							userData={userData}
						/>
						<GeneralSettings
							affiliation={affiliation}
							handleLogOut={handleLogOut}
							handleMessageNew={handleMessageNew}
							handleRequestOpen={handleRequestOpen}
							handleUserUpdate={handleUserUpdate}
							locale={locale}
							session={session}
							userData={userData}
							isApproved={isApproved}
						/>
					</div>
				</div>
			);
		} else if (isAuthenticated && (!affiliation || !isApproved)) {
			settings = isMobile ? (
				<div data-test-id="account-page-tabs">
					<AppBar
						data-test-id="account-page-tab-your-account"
						position="static"
					>
						<Tabs
							value={value}
							onChange={this.handleChange}
							indicatorColor="primary"
							fullWidth
						>
							<Tab
								label={<FormattedMessage id="account.your-account-heading" />}
							/>
							<Tab
								label={
									<FormattedMessage id="account.your-organization-heading" />
								}
								disabled
							/>
						</Tabs>
					</AppBar>
					{value === 0 && (
						<TabContainer>
							<GeneralSettings
								affiliation={affiliation}
								handleLogOut={handleLogOut}
								handleMessageNew={handleMessageNew}
								handleRequestOpen={handleRequestOpen}
								handleUserUpdate={handleUserUpdate}
								history={this.props.history}
								locale={locale}
								session={session}
								userData={userData}
								isApproved={isApproved}
							/>
						</TabContainer>
					)}
				</div>
			) : (
				<div data-test-id="account-page-tabs">
					<div className={classes.formRow}>
						<GeneralSettings
							affiliation={affiliation}
							handleLogOut={handleLogOut}
							handleMessageNew={handleMessageNew}
							handleRequestOpen={handleRequestOpen}
							handleUserUpdate={handleUserUpdate}
							locale={locale}
							session={session}
							userData={userData}
							isApproved={isApproved}
						/>
					</div>
				</div>
			);
		} else {
			settings = '';
		}
		return (
			<div className={classes.root} data-test-id="account-page-header">
				<Typography
					variant="h3"
					className={[classes.marginBottom, classes.textAlignCenter].join(' ')}
				>
					<FormattedMessage id="account.your-account-heading" />
				</Typography>
				{this.props.sessionConfirmed ? (
					settings
				) : (
					<PromptReconfirm handleRequestOpen={this.props.handleRequestOpen} />
				)}
			</div>
		);
	}
}

AccountPage.propTypes = {
	handleLogOut: PropTypes.func.isRequired,
	handleMessageNew: PropTypes.func.isRequired,
	handleRequestOpen: PropTypes.func.isRequired,
	handleUnconfirmSession: PropTypes.func.isRequired,
	session: PropTypes.string.isRequired,
	sessionConfirmed: PropTypes.bool.isRequired
};

export default withStyles(styles)(withWidth(AccountPage));
