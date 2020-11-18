import React from 'react';
import PropTypes from 'prop-types';

import withWidth from './withWidth';
import {breakpoints} from '../theme';
import {withStyles} from '@material-ui/core/styles';
import StarRateIcon from '@material-ui/icons/Star';

const maxRating = 5;

const styles = (theme) => ({
  static: {
    color: theme.palette.secondary[500],
  },
  user: {
    color: theme.palette.common.gold,
  },
  interactive: {
    color: theme.palette.common.gold,
    cursor: 'pointer',
  },
  unfilled: {
    color: theme.palette.common.darkGrey,
  },
  flair: {
    display: 'inline-block',
    backgroundColor: theme.palette.primary[100],
    color: theme.palette.primary[500],
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontSize: theme.typography.h4.fontSize,
    padding: theme.spacing(1 / 2, 1),
    borderRadius: '2px',
  },
  flairText: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  flairStar: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '18px',
  },
});

class RatingControl extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      rating: this.updateIcons(props.rating),
      selectedRating: props.rating,
    };

    this.handleStarHover = this.handleStarHover.bind(this);
    this.handleStarOut = this.handleStarOut.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.rating !== prevProps.rating) {
      this.setState({rating: this.updateIcons(this.props.rating)});
    }
  }

  handleStarHover(index) {
    if (this.props.mode !== 'interactive') return;
    this.setState({
      rating: this.updateIcons(index + 1),
    });
  }

  handleStarOut(index) {
    if (this.props.mode !== 'interactive') return;
    this.setState({
      rating: this.updateIcons(this.state.selectedRating),
    });
  }

  handleStarSelect(index) {
    if (this.props.mode !== 'interactive') return;
    this.setState({
      rating: this.updateIcons(index + 1),
      selectedRating: index + 1,
    });

    if (typeof this.props.onClick === 'function') {
      this.props.onClick(index + 1);
    }
  }

  updateIcons(rating) {
    let ratingArray = [];
    for (let i = 1; i <= maxRating; i++) {
      ratingArray.push(rating >= i);
    }
    return ratingArray;
  }

  render() {
    const {classes, mode, className} = this.props;
    const isMobile = this.props.width < breakpoints['sm'];

    if (isMobile && this.props.mode === 'static') {
      return (
        <span>
          {this.props.rating < 1 ? null : (
            <div className={classes.flair}>
              <span className={classes.flairText}>{this.props.rating}</span>{' '}
              <StarRateIcon className={classes.flairStar} />
            </div>
          )}
        </span>
      );
    } else {
      return (
        <span className={className + ' center-align'}>
          {this.state.rating.map((item, index) => {
            return (
              <StarRateIcon
                key={index}
                onMouseOver={(ev) => {
                  this.handleStarHover(index);
                }}
                onMouseOut={(ev) => {
                  this.handleStarOut(index);
                }}
                onClick={(ev) => {
                  this.handleStarSelect(index);
                }}
                className={item ? classes[mode] : classes.unfilled}
              />
            );
          })}
        </span>
      );
    }
  }
}

RatingControl.propTypes = {
  mode: PropTypes.string,
  rating: PropTypes.number.isRequired,
};

RatingControl.defaultProps = {
  mode: 'static',
  rating: 0
};

export default withStyles(styles)(withWidth(RatingControl));
