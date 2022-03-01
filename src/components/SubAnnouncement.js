import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const styles = (theme) => ({
	subAnnouncementText: {
		color: theme.palette.common.darkBlack,
		fontWeight: theme.typography.fontWeightHeavy,
		'&:hover': {
			color: theme.palette.common.darkBlack
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: theme.typography.caption.fontSize,
			fontWeight: theme.typography.caption.fontWeight
		}
	},
	subAnnouncementTextArrow: {
		verticalAlign: 'bottom',
		height: '1.2rem'
	}
});

const SubAnnouncement = ({classes, handleRequestOpen, url}) => (
	<Typography variant="body2">
		<a
			data-test-id="subannouncement-link"
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className={classes.subAnnouncementText}
		>
			<FormattedMessage id="app.download-mobile-app" />
			&nbsp;&nbsp;
			<KeyboardArrowRightIcon className={classes.subAnnouncementTextArrow} />
		</a>
	</Typography>
);

SubAnnouncement.defaultProps = {url: 'https://asylumconnect.org/mobile-app/'};

SubAnnouncement.propTypes = {
	classes: PropTypes.object.isRequired,
	url: PropTypes.string
};

export default withStyles(styles)(SubAnnouncement);
