import React from 'react';

import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = (theme) => ({
	title: {paddingBottom: theme.spacing(2), textAlign: 'center', fontStyle: 'italic'},
	wordWrap: 'break-word',
});

const DialogSubTitle = ({children, classes, variant, className}) => (
	<Typography
		className={classNames(
			classes.title,
			{
				[classes.primary]: variant === 'primary'
			},
			className
		)}
		variant="body2"
		data-test-id="dialog-container-subtitle"
		classes={classes}
	>
		{children}
	</Typography>
);

export default withStyles(styles)(DialogSubTitle);
