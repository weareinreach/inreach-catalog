import React from 'react';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
	bgLightGrey: {backgroundColor: theme.palette.common.lightGrey},
	textCenter: {textAlign: 'center'},
	content: {
		maxWidth: '80%',
		margin: '0 10%'
	},
	paddingVertical: {padding: '1.5rem 0'}
});

const BottomBanner = ({classes}) => {
	const {bgLightGrey, textCenter, content, paddingVertical} = classes;

	return (
		<div className={classNames(textCenter, bgLightGrey)}>
			<div className={classNames(content)}>
				<Typography
					variant="h3"
					className={classes.paddingVertical}
					data-test-id="banner-header"
				>
					<FormattedMessage id="app.banner" />
				</Typography>
				<Typography
					variant="subtitle1"
					className={classes.paddingVertical}
					data-test-id="banner-text"
				>
					<FormattedMessage id="app.welcome-main-4" />
				</Typography>
			</div>
		</div>
	);
};

export default withStyles(styles)(BottomBanner);
