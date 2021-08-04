import classNames from 'classnames';
import React from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {BackIcon} from './icons';

const styles = (theme) => ({
	buttonRoot: {
		minWidth: '0',
		padding: '0',
		textTransform: 'none'
	},
	contrast: {
		color: theme.palette.common.white
	},
	default: {
		color: theme.palette.common.darkBlack
	},
	primary: {
		color: theme.palette.primary[500],
		'&:hover': {
			color: theme.palette.primary[900]
		}
	},
	secondary: {
		color: theme.palette.secondary[500],
		'&:hover': {
			color: theme.palette.secondary[900]
		}
	}
});

const AsylumConnectBackButton = ({
	onClick,
	classes,
	className = '',
	width = '24px',
	color = 'secondary',
	text = ''
}) => (
	<Button
		className={classNames([classes[color], className])}
		classes={{root: classes.buttonRoot}}
		onClick={onClick}
		data-test-id="back-button"
	>
		<BackIcon width={width} color={'currentColor'} />
		{text}
	</Button>
);

export default withStyles(styles)(AsylumConnectBackButton);
