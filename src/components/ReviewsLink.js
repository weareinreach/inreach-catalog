import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from 'react-intl';

const styles = (theme) => ({
	viewYourReviewsText: {
		color: theme.palette.secondary[500],
		'&:hover': {
			color: theme.palette.secondary[900]
		},
		fontSize: '14px',
		fontWeight: theme.typography.fontWeightMedium,
		lineHeight: '20px',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '82px',
		'@media(max-width:972px)': {
			fontSize: '12px'
		}
	}
});

const ReviewsLink = ({classes, locale}) => (
	<Link
		to={'/' + locale + '/reviews'}
		className="hide--on-print"
		data-test-id="nav-button-view-reviews"
	>
		<FormattedMessage
			id="review.review-title"
			defaultMessage="Reviews"
			description="Link to reviews"
		>
			{(reviews) => (
				<Typography variant="h4" className={classes.viewYourReviewsText}>
					{reviews}
				</Typography>
			)}
		</FormattedMessage>
	</Link>
);

ReviewsLink.propTypes = {classes: PropTypes.object.isRequired};

export default withStyles(styles)(ReviewsLink);
