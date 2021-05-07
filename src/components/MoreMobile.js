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
		<FormattedMessage id="navigation.more">
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
				/>
			}
			content={
				<LinkList
					list={[
						{
							label: (
								<FormattedMessage
									id="navigation.find-resources"
									defaultMessage="Find Resources"
								/>
							),
							url: '/'
						},
						{
							label: (
								<FormattedMessage
									id="navigation.learn-more"
									defaultMessage="Learn More"
								/>
							),
							url: 'https://asylumconnect.org'
						},
						{
							label: (
								<FormattedMessage
									id="navigation.rate-app"
									defaultMessage="Rate This App"
								/>
							),
							url:
								'https://survey.az1.qualtrics.com/jfe/form/SV_4JylCyjAklvKGVL'
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
							label: (
								<FormattedMessage
									id="navigation.find-referrals"
									defaultMessage="Help for a Client/Someone Else"
								/>
							),
							url: '/'
						},
						{
							label: (
								<FormattedMessage
									id="navigation.learn-more"
									defaultMessage="Learn More"
								/>
							),
							url:
								'https://asylumconnect.org/how-to-find-resources-for-clients/'
						},
						{
							label: (
								<FormattedMessage
									id="navigation.rate-app"
									defaultMessage="Rate This App"
								/>
							),
							url:
								'https://survey.az1.qualtrics.com/jfe/form/SV_4JylCyjAklvKGVL'
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
				/>
			}
			content={
				<LinkList
					list={[
						{
							label: (
								<FormattedMessage
									id="navigation.donate"
									defaultMessage="Donate"
								/>
							),
							url: 'https://secure.actblue.com/donate/asylumconnect'
						},
						{
							label: (
								<FormattedMessage
									id="navigation.learn-more"
									defaultMessage="Learn More"
								/>
							),
							url: 'https://asylumconnect.org'
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
				/>
			}
			content={
				<LinkList
					list={[
						{
							label: (
								<FormattedMessage
									id="suggestion.suggest-resource-united-states"
									defaultMessage="Suggest a U.S. resource"
								/>
							),
							url: '/en_US/suggestions/new'
						},
						{
							label: (
								<FormattedMessage
									id="suggestion.suggest-resource-canada"
									defaultMessage="Suggest a Canada Resource"
								/>
							),
							url: '/en_CA/suggestions/new'
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
				/>
			}
			content={
				<LinkList
					list={[
						{
							label: (
								<FormattedMessage
									id="legal.privacy-and-disclaimer"
									defaultMessage="Privacy Statement & Disclaimer"
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
