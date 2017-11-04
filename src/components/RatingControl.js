import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import StarRateIcon from 'material-ui-icons/Star';

const maxRating = 5;

const styles = (theme) => ({
  static: {
    color: theme.palette.primary[500]
  },
  interactive: {
    color: theme.palette.common.gold,
    cursor: 'pointer'
  },
  unfilled: {
    color: theme.palette.common.darkGrey
  },
});

class RatingControl extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.ratingArray = [];
    for(let i = 1; i <= maxRating; i++) {
      this.ratingArray.push(this.props.rating >= i);
    }
  }

  render() {
    const { classes, mode } = this.props;
    return (
      <span className="center-align">
        {this.ratingArray.map((item, index) => {
          return (
            <StarRateIcon className={(item ? classes[mode] : classes.unfilled)} />
          );
        })}
      </span>
    );
  }
}

RatingControl.propTypes = {
  mode: PropTypes.string,
  rating: PropTypes.number.isRequired
};

RatingControl.defaultProps = {
  mode: 'static'
};

export default withStyles(styles)(RatingControl);