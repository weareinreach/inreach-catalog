import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {InformationIcon, InformationIcon24} from './icons';

const styles = (theme) => ({
	root: {
		backgroundColor: theme.palette.banner[500],
		padding: '16px 0',
		textAlign: 'center',
		width: '100%',
		[theme.breakpoints.down('xs')]: {
			borderRadius: '5px'
		}
	},
	textContent: {
		color: theme.palette.common.black,
		maxWidth: theme.maxColumnWidth,
		margin: '0 16px',
		fontSize: '24px',
		textDecorationLine: 'underline'
	}
});

const Announcement = (props) => {
	const {classes, useSmallIcon} = props;

	return (
		<div id="announcement-div" className={classes.root + ' hide--on-print'}>
			<a href="https://prn.to/3lMPU5Y">
				{useSmallIcon ? (
					<InformationIcon fillColor={'#000000'} />
				) : (
					<InformationIcon24 fillColor={'#000000'} />
				)}
			</a>
			<a href="https://prn.to/3lMPU5Y" data-test-id="announcement-header">
				<Typography
					variant="caption"
					color="primary"
					className={classes.textContent}
				>
					<FormattedMessage id="announcement-brand" />
				</Typography>
			</a>
		</div>
	);
};

Announcement.defaultProps = {
	useSmallIcon: false
};

Announcement.propTypes = {
	classes: PropTypes.object.isRequired,
	useSmallIcon: PropTypes.bool
};

export default withStyles(styles)(Announcement);
