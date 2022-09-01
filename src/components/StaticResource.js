import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ContentMarkdown from './ContentMarkdown';

require('./StaticResource.styles.scss');

const styles = (theme) => ({
	resourceMargin: {
		marginTop: theme.spacing(4)
	},
	marginBottom: {
		marginBottom: theme.spacing(1)
	},
	marginTop: {
		marginTop: theme.spacing(2)
	},
	infoItem: {
		fontWeight: theme.typography.fontWeightMedium,
		marginTop: theme.spacing(2)
	},
	applyColor: (props) => ({
		color: props?.color
	}),
	linkColor: {
		color: theme.palette.secondary[500],
		'&:hover': {
			color: theme.palette.secondary[900]
		}
	}
});

const Resource = ({
	classes,
	color,
	name,
	link,
	description,
	who,
	how,
	visit,
	email
}) => (
	<div className={'resource--with-markdown ' + classes.resourceMargin}>
		{name && (
			<Typography
				data-test-id="static-resource-title"
				variant="subtitle2"
				className={classes.marginBottom}
			>
				{name}
			</Typography>
		)}
		{link && (
			<a href={`${link}`} target="_blank" rel="noopener noreferrer">
				<Typography
					variant="body2"
					data-test-id="static-resource-body-1"
					className={classes.linkColor + ' ' + classes.marginBottom}
				>
					{link}
				</Typography>
			</a>
		)}
		{description && (
			<Typography
				variant="body2"
				data-test-id="static-resource-body-2"
				className={classes.marginTop}
			>
				<ContentMarkdown
					renderers={{
						link: (props) => (
							<a href={props.href} target={props.target}>
								{props.children}
							</a>
						)
					}}
					source={description}
				/>
			</Typography>
		)}
		{who && (
			<Typography
				variant="body2"
				className={classes.infoItem}
				data-test-id="static-resource-header-1"
			>
				<FormattedMessage
					id="resource.who-it-serves"
					defaultMessage="Who this resource serves"
					description="who this resource serves message"
				/>
				:
			</Typography>
		)}
		{who && (
			<Typography variant="body2">
				<ContentMarkdown
					renderers={{
						link: (props) => (
							<a href={props.href} target={props.target}>
								{props.children}
							</a>
						)
					}}
					source={who}
				/>
			</Typography>
		)}
		{how && (
			<Typography
				variant="body2"
				className={classes.infoItem}
				data-test-id="static-resource-header-2"
			>
				<FormattedMessage
					id="resource.how-to-use"
					defaultMessage="How to use this resource"
					description="how to use this resource message"
				/>
				:
			</Typography>
		)}
		{how && (
			<Typography variant="body2">
				<ContentMarkdown
					renderers={{
						link: (props) => (
							<a href={props.href} target={props.target}>
								{props.children}
							</a>
						)
					}}
					source={how}
				/>
			</Typography>
		)}
		{visit && (
			<Typography
				variant="body2"
				className={classes.infoItem}
				data-test-id="static-resource-header-3"
			>
				<FormattedMessage
					id="resource.how-to-visit"
					defaultMessage="How to visit this resource"
					description="how to visit this resource message"
				/>
				:
			</Typography>
		)}
		{visit && (
			<Typography variant="body2">
				<ContentMarkdown
					renderers={{
						link: (props) => (
							<a href={props.href} target={props.target}>
								{props.children}
							</a>
						)
					}}
					source={visit}
				/>
			</Typography>
		)}
	</div>
);

Resource.propTypes = {
	name: PropTypes.string.isRequired,
	color: PropTypes.string,
	link: PropTypes.string,
	description: PropTypes.string,
	who: PropTypes.string,
	how: PropTypes.string,
	visit: PropTypes.string,
	email: PropTypes.string
};

export default withStyles(styles)(Resource);
