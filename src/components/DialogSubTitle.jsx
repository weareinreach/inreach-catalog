import React from 'react';

import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
	title: {paddingBottom: theme.spacing(2), textAlign: 'center', fontStyle: 'italic'},
	wordWrap: 'break-word'
});

const DialogSubTitle = ({children, classes}) => (
	<Typography
		className={classes.title}
		variant="body2"
		data-test-id="dialog-container-subtitle"
	>
		{children}
	</Typography>
);

export default withStyles(styles)(DialogSubTitle);
