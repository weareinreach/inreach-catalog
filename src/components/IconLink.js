import React from 'react';
import PropTypes from 'prop-types';
import {Box} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
	linkLabel: {
		fontWeight: '600',
		fontSize: '10px',
		lineHeight: '14px',
		textTransform: 'uppercase'
	}
});

const IconLink = ({
	href,
	target,
	rel,
	label,
	className,
	style,
	children,
	classes
}) => {
	const linkStyle = {
		textAlign: 'center',
		...(label && {display: 'block'}),
		...style
	};

	return (
		<a
			href={href}
			target={target}
			rel={rel}
			style={linkStyle}
			className={className}
		>
			{children}
			{label && (
				<Box pt={1} className={classes.linkLabel}>
					{label}
				</Box>
			)}
		</a>
	);
};

IconLink.propTypes = {
	href: PropTypes.string,
	target: PropTypes.string,
	rel: PropTypes.string,
	label: PropTypes.string,
	className: PropTypes.string
};

export default withStyles(styles, {name: 'IconLink'})(IconLink);
