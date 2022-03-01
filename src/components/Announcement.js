import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
	announcement: {
		backgroundColor: theme.palette.secondary[500],
		padding: '2rem 0',
		textAlign: 'center'
	},
	pointer: {
		cursor: 'pointer',
		display: 'inline-block',
		position: 'relative'
	},
	pointerText: {
		textShadow:
			'2px 0 ' +
			theme.palette.secondary[500] +
			', -2px 0 ' +
			theme.palette.secondary[500]
	},
	underline: {
		position: 'absolute',
		width: '100%',
		display: 'block',
		margin: '0',
		border: 'none',
		height: '1px',
		background: 'white',
		bottom: '.2em'
	},
	textContent: {
		color: theme.palette.common.darkWhite,
		maxWidth: theme.maxColumnWidth,
		margin: '0 auto'
	}
});

const Announcement = ({classes, handleRequestOpen}) => (
	<div className={classes.announcement + ' hide--on-print'}>
		<Typography
			variant="body1"
			className={classes.textContent}
			data-test-id="announcement-header"
		>
			<FormattedMessage id="legal.user-contact-provider-risk" />
			<br />
			<span>
				<FormattedMessage id="legal.read-disclaimer-prompt-pt1" />{' '}
			</span>
			<strong
				className={classes.pointer}
				onClick={() => handleRequestOpen('disclaimer')}
			>
				<i className={classes.underline} />
				<span
					className={classes.pointerText}
					data-test-id="announcement-disclaimer-button"
				>
					{' '}
					<FormattedMessage id="legal.read-disclaimer-prompt-pt2" />{' '}
				</span>
			</strong>
			<span>
				{' '}
				<FormattedMessage id="legal.and" />{' '}
			</span>
			<strong
				className={classes.pointer}
				onClick={() => handleRequestOpen('privacy')}
			>
				<i className={classes.underline} />
				<span
					className={classes.pointerText}
					data-test-id="announcement-privacy-button"
				>
					{' '}
					<FormattedMessage id="legal.read-disclaimer-prompt-pt3" />{' '}
				</span>
			</strong>
			<span>
				{' '}
				<FormattedMessage id="legal.read-disclaimer-prompt-pt4" />
			</span>
		</Typography>
	</div>
);

Announcement.propTypes = {
	classes: PropTypes.object.isRequired,
	handleRequestOpen: PropTypes.func.isRequired
};

export default withStyles(styles)(Announcement);
