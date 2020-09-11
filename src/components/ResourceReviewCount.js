import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

class ReviewCount extends React.Component {
  render() {
    const {total} = this.props;
    return (
      <Typography variant="body2" className="center-align">
        {total + ' review' + (total !== 1 ? 's' : '')}
      </Typography>
    );
  }
}

ReviewCount.propTypes = {
  total: PropTypes.number.isRequired,
};

export default ReviewCount;
