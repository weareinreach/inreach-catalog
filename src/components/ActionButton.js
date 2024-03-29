import PropTypes from 'prop-types';
import React from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

// Define a custom style for button
const styles = (theme) => ({
	button: {
		position: 'absolute',
		top: '10px',
		right: '10px',
		fontSize: '2em',
		fontWeight: 'bold',
		background: 'none',
		border: 'none'
	},
	primary: {
		fontSize: '3rem',
		color: '#00D56C',
		fontWeight: 'unset',
		top: 'unset',
		right: '27px'
	}
});

// Custom Button component with variant property
function ActionButton(props) {
	const {children, classes, onClick, testIdName, variant, className} = props;

	return (
		<Button
			className={classNames(
				classes.button,
				{
					[classes.primary]: variant === 'primary'
				},
				className
			)}
			onClick={onClick}
			data-test-id={testIdName}
			classes={classes}
		>
			{children}
		</Button>
	);
}

ActionButton.propTypes = {
	children: PropTypes.node.isRequired,
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	variant: PropTypes.oneOf(['primary'])
};

// Inject style to Custom Button component
export default withStyles(styles)(ActionButton);
