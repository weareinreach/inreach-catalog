import React from 'react';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
	bgLightGrey: {backgroundColor: theme.palette.common.lightGrey},
	textCenter: {textAlign: 'center'},
	content: {
		padding: '64px 0',
		margin: '0 10%',
		'@media(max-width:1280px)': {
			margin: '0 2%'
		}
	},
	paddingBottom: {
		'padding-bottom': '16px',
		'line-height': '22px'
	},
	banner1: {
		color: theme.palette.primary[200]
	},
	line: {
		display: 'inline-block',
		width: '30px',
		height: '3px',
		backgroundColor: 'black',
		marginBottom: '4px'
	}
});

const BottomBanner = ({classes}) => {
	const {bgLightGrey, textCenter, content} = classes;

	return (
		<div className={classNames(textCenter, bgLightGrey)}>
			<div className={classNames(content)}>
				<Typography
					variant="h3"
					className={classes.paddingBottom}
					data-test-id="banner-header"
				>
					<FormattedMessage
						id="app.banner"
						defaultMessage="Who does InReach serve?"
						description="question - who InReach serves"
					/>
				</Typography>
				<Typography
					variant="subtitle1"
					data-test-id="banner-text-1"
					className={classes.banner1}
				>
					<FormattedMessage
						id="app.banner-1"
						defaultMessage="InReach is for the entire diverse LGBTQ+ community"
						description="describes who the app serves"
					/>{' '}
					<span className={classes.line}></span>
				</Typography>
				<Typography variant="subtitle1" data-test-id="banner-text-2">
					<FormattedMessage
						id="app.banner-2"
						defaultMessage="including asylum seekers and refugees, undocumented and other immigrants, young people experiencing homelessness, those facing family or community rejection due to their identity, and other transgender and non-binary people in need of safe resources."
						description="describes who the app serves"
					/>
				</Typography>
			</div>
		</div>
	);
};

export default withStyles(styles)(BottomBanner);
