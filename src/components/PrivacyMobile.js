import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from 'react-intl';

import DisclaimerText from './DisclaimerText';
import PrivacyText from './PrivacyText';

const TabContainer = ({children}) => (
	<div style={{padding: '2.5rem'}}>{children}</div>
);

TabContainer.propTypes = {children: PropTypes.node.isRequired};

const styles = (theme) => ({
	mobilePadding: {
		paddingLeft: '20px',
		paddingRight: '20px'
	},
	underline: {
		paddingBottom: '20px',
		borderBottom: '1px solid ' + theme.palette.common.faintBlack
	},
	title: {
		padding: '20px',
		borderBottom: '1px solid ' + theme.palette.common.faintBlack
	},
	titleSpacing: {
		marginTop: '20px',
		marginBottom: '10px'
	},
	textCenter: {textAlign: 'center'}
});

const PrivacyMobile = ({classes, handleRequestOpen, tab}) => (
	<div>
		<FormattedMessage
			id="legal.privacy-and-disclaimer"
			defaultMessage="Privacy Statement & Disclaimer"
			description="label for the InReach disclaimer title"
		>
			{(legal) => (
				<Typography variant="h1" className={classes.title}>
					{legal}
				</Typography>
			)}
		</FormattedMessage>
		<Grid container spacing={0} className={classes.mobilePadding}>
			<Grid item xs={12} className={classes.underline}>
				<FormattedMessage
					id="legal.privacy-statement"
					defaultMessage="InReach Privacy Statement"
					description="label for the InReach Privacy Statement title"
				>
					{(privacy) => (
						<Typography variant="h2" className={classes.titleSpacing}>
							{privacy}
						</Typography>
					)}
				</FormattedMessage>
				<PrivacyText />
			</Grid>
			<Grid item xs={12}>
				<FormattedMessage
					id="legal.disclaimer"
					defaultMessage="InReach Disclaimer"
					description="label for the InReach disclaimer title"
				>
					{(disclaimer) => (
						<Typography variant="h2" className={classes.titleSpacing}>
							{disclaimer}
						</Typography>
					)}
				</FormattedMessage>
				<DisclaimerText />
			</Grid>
		</Grid>
	</div>
);

PrivacyMobile.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrivacyMobile);
