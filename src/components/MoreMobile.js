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
				<Typography variant="h1" className={classes.title}>
					{more}
				</Typography>
			)}
		</FormattedMessage>
		<AsylumConnectCollapsibleSection
			className={classes.mobilePadding}
			expanded={false}
			title={messages['navigation.help-myself']}
			content={
				<LinkList
					list={[
						{label: `${messages['navigation.find-resources']}`, url: '/'},
						{
							label: `${messages['navigation.learn-more']}`,
							url: 'https://asylumconnect.org'
						},
						{
							label: `${messages['navigation.rate-app']}`,
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
			className={classes.mobilePadding}
			expanded={false}
			title={`${messages['navigation.help-someone-else']}`}
			content={
				<LinkList
					list={[
						{label: `${messages['navigation.find-referrals']}`, url: '/'},
						{
							label: `${messages['navigation.learn-more']}`,
							url:
								'https://asylumconnect.org/how-to-find-resources-for-clients/'
						},
						{
							label: `${messages['navigation.rate-app']}`,
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
			className={classes.mobilePadding}
			expanded={false}
			title={`${messages['navigation.general-supporter-information']}`}
			content={
				<LinkList
					list={[
						{
							label: `${messages['navigation.donate']}`,
							url: 'https://secure.actblue.com/donate/asylumconnect'
						},
						{
							label: `${messages['navigation.learn-more']}`,
							url: 'https://asylumconnect.org'
						}
					]}
					classes={classes}
					onLinkClick={handleRequestClose}
				/>
			}
		/>
		<AsylumConnectCollapsibleSection
			className={classes.mobilePadding}
			expanded={false}
			title={`${messages['suggestion.suggest-resource']}`}
			content={
				<LinkList
					list={[
						{
							label: `${messages['suggestion.suggest-resource-united-states']}`,
							url: '/en_US/suggestions/new'
						},
						{
							label: `${messages['suggestion.suggest-resource-canada']}`,
							url: '/en_CA/suggestions/new'
						}
					]}
					classes={classes}
					onLinkClick={handleRequestClose}
				/>
			}
		/>
		<AsylumConnectCollapsibleSection
			className={classes.mobilePadding}
			expanded={false}
			title={`${messages['legal.privacy-and-disclaimer']}`}
			content={
				<LinkList
					list={[
						{label: `${messages['legal.privacy-and-disclaimer']}`, url: '/'}
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
