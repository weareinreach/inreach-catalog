import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Fa from 'react-fontawesome';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from 'react-intl';
import AsylumConnectCollapsibleSection from './AsylumConnectCollapsibleSection';

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		marginLeft: '2.5em',
		marginRight: '2.5em',
		borderBottom: '1px solid ' + theme.palette.common.faintBlack,
		boxShadow: 'none'
	},
	textCenter: {textAlign: 'center'},
	title: {
		padding: '20px'
	},
	linkStyles: {
		display: 'block',
		margin: theme.spacing(2, 0),
		fontWeight: theme.typography.fontWeightMedium
	},
	mobilePadding: {
		paddingLeft: '20px',
		paddingRight: '20px'
	}
});

const LinkList = ({classes, list, onLinkClick}) => {
	return (
		<div>
			{list.map((item, index) => {
				if (item.url.indexOf('http') === 0) {
					return (
						<a
							data-test-id={item.testIdName}
							key={index}
							className={classes.linkStyles}
							href={item.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							{item.label} <Fa name="link" />
						</a>
					);
				} else {
					return (
						<Link
							data-test-id={item.testIdName}
							key={index}
							to={item.url}
							className={classes.linkStyles}
							onClick={onLinkClick}
						>
							{item.label} <Fa name="link" />
						</Link>
					);
				}
			})}
		</div>
	);
};

const MoreMobile = ({
	classes,
	handleRequestClose,
	handleRequestOpen,
	messages
}) => (
	<div>
		<FormattedMessage
			id="navigation.more"
			defaultMessage="more"
			description="button to see more options"
		>
			{(more) => (
				<Typography
					variant="h1"
					className={classes.title}
					data-test-id="more-mobile-title"
				>
					{more}
				</Typography>
			)}
		</FormattedMessage>
		<AsylumConnectCollapsibleSection
			testIdName="more-help-for-myself"
			className={classes.mobilePadding}
			expanded={false}
			title={
				<FormattedMessage
					id="navigation.help-myself"
					defaultMessage="Help for Myself"
					description="section to get more information on finding help for ones self"
				/>
			}
			content={
				<LinkList
					list={[
						{
							testIdName: 'more-help-myself-find-resources',
							label: (
								<FormattedMessage
									id="navigation.find-resources"
									defaultMessage="Find Resources"
									description="section to get more information on finding additional resources"
								/>
							),
							url: '/'
						},
						{
							testIdName: 'more-help-myself-learn-more',
							label: (
								<FormattedMessage
									id="navigation.learn-more"
									defaultMessage="Learn More"
									description="link that goes to the app FAQ"
								/>
							),
							url: 'https://inreach.org/faqs/'
						},
						{
							testIdName: 'more-help-myself-rate-app',
							label: (
								<FormattedMessage
									id="navigation.rate-app"
									defaultMessage="Rate This App"
									description="Link that goes to an app feedback form"
								/>
							),
							url: 'https://bit.ly/inreach-app-share-feedback'
						}
					]}
					classes={classes}
					onLinkClick={handleRequestClose}
				/>
			}
		/>
		<AsylumConnectCollapsibleSection
			testIdName="more-help-for-someone"
			className={classes.mobilePadding}
			expanded={false}
			title={<FormattedMessage id="navigation.help-someone-else" />}
			content={
				<LinkList
					list={[
						{
							testIdName: 'more-help-someone-find-referrals',
							label: (
								<FormattedMessage
									id="navigation.find-referrals"
									defaultMessage="Help for a Client/Someone Else"
									description="section to get more information on finding help for someone else"
								/>
							),
							url: '/'
						},
						{
							testIdName: 'more-help-someone-learn-more',
							label: (
								<FormattedMessage
									id="navigation.learn-more"
									defaultMessage="Learn More"
									description="link that goese to the InReach FAQ"
								/>
							),
							url: 'https://inreach.org/how-to-find-resources-for-clients/'
						},
						{
							testIdName: 'more-help-someone-rate-app',
							label: (
								<FormattedMessage
									id="navigation.rate-app"
									defaultMessage="Rate This App"
									description="Link that goes to an app feedback form"
								/>
							),
							url: 'https://bit.ly/inreach-app-share-feedback'
						}
					]}
					classes={classes}
					onLinkClick={handleRequestClose}
				/>
			}
		/>
		<AsylumConnectCollapsibleSection
			testIdName="more-general-supporter-information"
			className={classes.mobilePadding}
			expanded={false}
			title={
				<FormattedMessage
					id="navigation.general-supporter-information"
					defaultMessage="General Supporter Information"
					description="section to get more information on finding general help"
				/>
			}
			content={
				<LinkList
					list={[
						{
							testIdName: 'more-general-supporter-donate',
							label: (
								<FormattedMessage
									id="navigation.donate"
									defaultMessage="Donate"
									description="link to the InReach organization donation page"
								/>
							),
							url: 'https://inreach.org/donate/'
						},
						{
							testIdName: 'more-general-supporter-learn-more',
							label: (
								<FormattedMessage
									id="navigation.learn-more"
									defaultMessage="Learn More"
									description="link to the main InReach.org website"
								/>
							),
							url: 'https://inreach.org/'
						}
					]}
					classes={classes}
					onLinkClick={handleRequestClose}
				/>
			}
		/>
		<AsylumConnectCollapsibleSection
			testIdName="more-suggest-a-resource"
			className={classes.mobilePadding}
			expanded={false}
			title={
				<FormattedMessage
					id="suggestion.suggest-resource"
					defaultMessage="Suggest a resource"
					description="link to the suggest a new resource page"
				/>
			}
			content={
				<LinkList
					list={[
						{
							testIdName: 'more-suggest-a-resource-us',
							label: (
								<FormattedMessage
									id="suggestion.suggest-resource-united-states"
									defaultMessage="Suggest a U.S. resource"
									description="link to the suggest a new resource form for the US"
								/>
							),
							url: '/en_US/suggestions/new'
						},
						{
							testIdName: 'more-suggest-a-resource-ca',
							label: (
								<FormattedMessage
									id="suggestion.suggest-resource-canada"
									defaultMessage="Suggest a Canada Resource"
									description="link to the suggest a new resource form for Canada"
								/>
							),
							url: '/en_CA/suggestions/new'
						},
						{
							testIdName: 'more-suggest-a-resource-mx',
							label: (
								<FormattedMessage
									id="suggestion.suggest-resource-mexico"
									defaultMessage="Suggest a Mexico Resource"
									description="link to the suggest a new resource form for Mexico"
								/>
							),
							url: '/en_MX/suggestions/new'
						}
					]}
					classes={classes}
					onLinkClick={handleRequestClose}
				/>
			}
		/>
		<AsylumConnectCollapsibleSection
			testIdName="more-privacy-disclaimer"
			className={classes.mobilePadding}
			expanded={false}
			title={
				<FormattedMessage
					id="legal.privacy-and-disclaimer"
					defaultMessage="Privacy Statement & Disclaimer"
					description="Privacy Statement & Disclaimer section"
				/>
			}
			content={
				<LinkList
					list={[
						{
							testIdName: 'more-privacy-and-disclaimer',
							label: (
								<FormattedMessage
									id="legal.privacy-and-disclaimer"
									defaultMessage="Privacy Statement & Disclaimer"
									description="link to the privacy-and-disclaimer Statement"
								/>
							),
							url: '/'
						}
					]}
					classes={classes}
					onLinkClick={() => {
						handleRequestOpen('privacy');
					}}
				/>
			}
		/>
	</div>
);

MoreMobile.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MoreMobile);
