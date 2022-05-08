import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';

// Define a custom style for button
const styles = (theme) => ({
	button: {
		border: '1.7px solid',
		padding: '0px 40px',
		'border-radius': '50px',
		minHeight: '30px',
		alignSelf: 'center',
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			paddingTop: theme.spacing(1),
			paddingBottom: theme.spacing(1)
		},
		marginBottom: '10px'
	},
	primary: {
		color: theme.palette.common.white,
		backgroundColor: theme.palette.primary[500],
		borderColor: theme.palette.primary[500],
		'&:hover': {
			color: theme.palette.common.white,
			backgroundColor: theme.palette.primary[900],
			borderColor: theme.palette.primary[900]
		}
	},
	secondary: {
		color: theme.palette.secondary[500],
		backgroundColor: theme.palette.common.white,
		borderColor: theme.palette.secondary[500],
		'&:hover': {
			color: theme.palette.common.white,
			backgroundColor: theme.palette.secondary[900],
			borderColor: theme.palette.secondary[900]
		}
	},
	disabledPrimary: {
		backgroundColor: theme.palette.primary[100],
		borderColor: theme.palette.primary[100],
		'&:active': {
			color: theme.palette.common.white,
			backgroundColor: theme.palette.primary[100],
			borderColor: theme.palette.primary[100]
		},
		'&:hover': {
			color: theme.palette.common.white,
			backgroundColor: theme.palette.primary[100],
			borderColor: theme.palette.primary[100]
		},
		'&:disabled': {
			color: theme.palette.common.white
		}
	},
	disabledSecondary: {
		backgroundColor: theme.palette.secondary[100],
		borderColor: theme.palette.secondary[100],
		'&:active': {
			color: theme.palette.common.white,
			backgroundColor: theme.palette.secondary[100],
			borderColor: theme.palette.secondary[100]
		},
		'&:hover': {
			color: theme.palette.common.white,
			backgroundColor: theme.palette.secondary[100],
			borderColor: theme.palette.secondary[100]
		},
		'&:disabled': {
			color: theme.palette.common.white
		}
	},
	signUp: {
		color: theme.palette.common.white,
		backgroundColor: theme.palette.signUp[500],
		borderColor: theme.palette.signUp[500],
		'&:hover': {
			color: theme.palette.common.white,
			backgroundColor: theme.palette.signUp[900],
			borderColor: theme.palette.signUp[900]
		}
	},
	disabledSignUp: {
		color: theme.palette.common.white,
		backgroundColor: theme.palette.signUp[100],
		borderColor: theme.palette.signUp[100],
		'&:hover': {
			color: theme.palette.common.white,
			backgroundColor: theme.palette.signUp[100],
			borderColor: theme.palette.signUp[100]
		},
		'&:disabled': {
			color: theme.palette.common.white
		}
	},
	safety: {
		marginBottom: 'unset',
		color: theme.palette.common.white,
		backgroundColor: theme.palette.safety[500],
		borderColor: theme.palette.safety[500],
		'&:hover': {
			color: theme.palette.common.white,
			backgroundColor: theme.palette.safety[900],
			borderColor: theme.palette.safety[900]
		},
		'@media(max-width:1080px)': {
			padding: '0px 20px'
		}
	},
	disabledSafety: {
		marginBottom: 'unset',
		color: theme.palette.common.white,
		backgroundColor: theme.palette.safety[100],
		borderColor: theme.palette.safety[100],
		'&:hover': {
			color: theme.palette.common.white,
			backgroundColor: theme.palette.safety[100],
			borderColor: theme.palette.safety[100]
		},
		'&:disabled': {
			color: theme.palette.common.white
		}
	}
});

// Custom Button component with variant property
function AsylumConnectButton(props) {
	const {
		children,
		classes,
		className,
		variant,
		onClick,
		disabled,
		testIdName,
		icon
	} = props;
	return (
		<Button
			disabled={disabled}
			className={classNames(
				classes.button,
				{
					[classes.primary]: variant === 'primary',
					[classes.secondary]: variant === 'secondary',
					[classes.signUp]: variant === 'signUp',
					[classes.safety]: variant === 'safety'
				},
				'hide--on-print',
				className
			)}
			onClick={onClick}
			data-test-id={testIdName}
			type="submit"
			classes={{
				disabled:
					variant === 'secondary'
						? classes.disabledSecondary
						: variant === 'signUp'
						? classes.disabledSignUp
						: variant === 'safety'
						? classes.disabledSafety
						: classes.disabledPrimary
			}}
		>
			{icon}
			{children}
		</Button>
	);
}

AsylumConnectButton.propTypes = {
	children: PropTypes.node.isRequired,
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	variant: PropTypes.oneOf(['primary', 'secondary', 'signUp', 'safety'])
};

// Inject style to Custom Button component
export default withStyles(styles)(AsylumConnectButton);
