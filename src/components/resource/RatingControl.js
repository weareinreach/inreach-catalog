import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import StarRateIcon from 'material-ui-icons/Star';

const maxRating = 5;

const styles = (theme) => ({
  static: {
    color: theme.palette.primary[500]
  },
  user: {
    color: theme.palette.common.gold,
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

    this.state = {
      rating: this.updateIcons(props.rating),
      selectedRating: props.rating
    };

    this.handleStarHover = this.handleStarHover.bind(this);
    this.handleStarOut = this.handleStarOut.bind(this);
  }

  handleStarHover(index) {
    if(this.props.mode !== 'interactive') return;
    this.setState({
      rating: this.updateIcons(index+1)
    })
  }

  handleStarOut(index) {
    if(this.props.mode !== 'interactive') return;
    this.setState({
      rating: this.updateIcons(this.state.selectedRating)
    })
  }

  handleStarSelect(index) {
    if(this.props.mode !== 'interactive') return;
    this.setState({
      rating: this.updateIcons(index+1),
      selectedRating: index+1
    });
    
    if(typeof this.props.onClick === 'function') {
      this.props.onClick(index+1);
    }
  }

  updateIcons(rating) {
    let ratingArray = []
    for(let i = 1; i <= maxRating; i++) {
      ratingArray.push(rating >= i);
    }
    return ratingArray;
  }


  render() {
    const { classes, mode, className } = this.props;
    return (
      <span className={className + " center-align"}>
        {this.state.rating.map((item, index) => {
          return (
            <StarRateIcon 
              key={index} 
              onMouseOver={(ev) => {this.handleStarHover(index)}} 
              onMouseOut={(ev) => {this.handleStarOut(index)}} 
              onClick={(ev) => {this.handleStarSelect(index)}}
              className={(item ? classes[mode] : classes.unfilled)} />
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