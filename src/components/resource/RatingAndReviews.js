import React from 'react';
import PropTypes from 'prop-types';

import RatingControl from './RatingControl';
import ReviewCount from './ReviewCount';

import {withStyles} from 'material-ui/styles';

const styles = (theme) => ({
  ratingSpacing: {
    marginRight: "1rem"
  }
});

const RatingAndReviews = ({rating, total, classes}) => (
  <div>
    <RatingControl rating={rating} className={classes.ratingSpacing} />
    <ReviewCount total={total} />
  </div>
)

RatingAndReviews.propTypes = {
  total: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired
};

export default withStyles(styles)(RatingAndReviews);