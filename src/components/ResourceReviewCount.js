import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

class ReviewCount extends React.Component {
	render() {
		const {total} = this.props;
		return (
			<Typography
				variant="body2"
				className="center-align"
				data-test-id="resource-review-count"
			>
				{total}{' '}
				{total !== 1 ? (
					<FormattedMessage id="resource.reviews-heading" />
				) : (
					<FormattedMessage id="resource.review-single" />
				)}
			</Typography>
		);
	}
}

ReviewCount.propTypes = {
	total: PropTypes.number.isRequired
};

export default ReviewCount;
