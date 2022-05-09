import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {InformationIcon24} from './icons';

const styles = (theme) => ({
	announcement: {
		backgroundColor: theme.palette.banner[500],
		padding: '1rem 0',
		textAlign: 'center'
	},
	textContent: {
		color: theme.palette.common.black,
		maxWidth: theme.maxColumnWidth,
		margin: '0 16px',
		fontSize: '24px',
		textDecorationLine: 'underline'
	}
});

const Announcement = ({classes}) => (
	<div className={classes.announcement + ' hide--on-print'}>
		<a href="https://bit.ly/inreach-press-release">
			<InformationIcon24 fillColor={'#000000'} />
		</a>
		<a
			href="https://bit.ly/inreach-press-release"
			data-test-id="announcement-header"
		>
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

Announcement.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Announcement);
