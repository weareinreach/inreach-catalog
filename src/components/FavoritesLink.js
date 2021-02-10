import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from 'react-intl';

const styles = (theme) => ({
	viewYourFavoritesText: {
		color: theme.palette.secondary[500],
		'&:hover': {
			color: theme.palette.secondary[900]
		},
		fontWeight: theme.typography.fontWeightMedium,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

const FavoritesLink = ({classes, locale}) => (
	<Link to={'/' + locale + '/favorites'} className="hide--on-print">
		<FormattedMessage id="favorites.view-favorites">
			{(favorites) => (
				<Typography type="h4" className={classes.viewYourFavoritesText}>
					{favorites}
				</Typography>
			)}
		</FormattedMessage>
	</Link>
);

FavoritesLink.propTypes = {classes: PropTypes.object.isRequired};

export default withStyles(styles)(FavoritesLink);
