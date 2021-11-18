import React from 'react';

import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = (theme) => ({
	title: {paddingBottom: theme.spacing(2), textAlign: 'center'},
	wordWrap: 'break-word',
	primary: {
		marginTop: '32px'
	}
});

const DialogTitle = ({children, classes, variant, className}) => (
	<Typography
		className={classNames(
			classes.title,
			{
				[classes.primary]: variant === 'primary'
			},
			className
		)}
		variant="h3"
		data-test-id="dialog-container-title"
		classes={classes}
	>
		{children}
	</Typography>
);

export default withStyles(styles)(DialogTitle);
