import PropTypes from 'prop-types';
import React from 'react';
import {withStyles} from '@material-ui/core/styles';

import RatingControl from './ResourceRatingControl';
import ReviewCount from './ResourceReviewCount';

const styles = (theme) => ({
  ratingSpacing: {
    marginRight: theme.spacing(2),
  },
});

const RatingAndReviews = ({rating, total, classes}) => (
  <div>
    <RatingControl rating={rating} className={classes.ratingSpacing} />
    {total ? <ReviewCount total={total} /> : null}
  </div>
);

RatingAndReviews.propTypes = {
  total: PropTypes.number,
  rating: PropTypes.number.isRequired,
};

export default withStyles(styles)(RatingAndReviews);
