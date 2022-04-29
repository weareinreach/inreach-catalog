import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {withStyles} from '@material-ui/core/styles';
import {Card, CardContent, Paper, Typography} from '@material-ui/core/';
import classNames from 'classnames';
import AsylumConnectDropdownListItem from './AsylumConnectDropdownListItem';
import AsylumConnectMexicoCrimeMap from './AsylumConnectMexicoCrimeMap';

const styles = (theme) => ({
	buttonContainer: {
		height: 'auto',
		right: '10px',
		position: 'absolute',
		top: '10px',
		zIndex: '1000',
		marginLeft: '1em',
		[theme.breakpoints.down('xs')]: {
			position: 'static',
			width: '100%',
			textAlign: 'center',
			top: 'auto',
			right: 'auto',
			zIndex: '1',
			marginTop: '1rem',
			marginRight: '0'
		}
	},
	legendContainer: {
		height: 'auto',
		maxWidth: '250px',
		left: '10px',
		position: 'absolute',
		bottom: '60px',
		zIndex: '1000',
		[theme.breakpoints.down('xs')]: {
			position: 'static',
			width: '100%',
			textAlign: 'center',
			top: 'auto',
			right: 'auto',
			zIndex: '1',
			marginTop: '1rem',
			marginRight: '0'
		}
	},
	legend: {
		display: 'flex',
		marginTop: '20px',
		width: '100%'
	},
	legendItem: {
		flex: 1,
		minHeight: '10px',
		marginBottom: '5px'
	},
	legendKey: {
		textAlign: 'center'
	},
	low: {
		backgroundColor: '#F4C0C6'
	},
	medium: {
		backgroundColor: '#DB2C40'
	},
	high: {
		backgroundColor: '#831A26'
	},
	listItem: {
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.75rem',
			lineHeight: '1rem',
			paddingTop: '5px',
			paddingBottom: '5px',
			height: 'auto'
		}
	}
});
const AsylumConnectMexicoMapContainer = ({classes}) => {
	const [displayMap, setDisplayMap] = useState(true);
	const menuId = 'mexico-map-container-menu--' + Date.now().toString();
	const legendId = 'mexico-map-container-legend--' + Date.now().toString();

	return (
		<>
			<div className={classes.buttonContainer}>
				<Paper id={menuId}>
					<AsylumConnectDropdownListItem
						button={true}
						additionalClass={classes.listItem}
						onClick={() => setDisplayMap(!displayMap)}
					>
						<FormattedMessage id="app.mexico-crime-map-generalised-murder" />
					</AsylumConnectDropdownListItem>
				</Paper>
			</div>
			{displayMap && (
				<>
					<AsylumConnectMexicoCrimeMap />
					<Card className={classes.legendContainer} id={legendId}>
						<CardContent>
							<Typography variant="h5">
								<FormattedMessage id="app.mexico-crime-map-header" />
							</Typography>
							<Typography variant="caption">
								<FormattedMessage id="app.mexico-crime-map-rate-calculation" />
							</Typography>
							<div className={classes.legend}>
								<div className={classes.legendItem}>
									<div
										className={classNames(classes.legendItem, classes.low)}
									></div>
									<Typography className={classes.legendKey}>1-15</Typography>
								</div>
								<div className={classes.legendItem}>
									<div
										className={classNames(classes.legendItem, classes.medium)}
									></div>
									<Typography className={classes.legendKey}>16-30</Typography>
								</div>
								<div className={classes.legendItem}>
									<div
										className={classNames(classes.legendItem, classes.high)}
									></div>
									<Typography className={classes.legendKey}> &gt;30</Typography>
								</div>
							</div>
							<Typography variant="caption">
								<Link
									to={{pathname: 'https://elcri.men/en/state-crime/'}}
									target="_blank"
									className="hide--on-print"
								>
									<FormattedMessage id="app.mexico-crime-map-source-data-link" />
								</Link>
							</Typography>
						</CardContent>
					</Card>
				</>
			)}
		</>
	);
};

export default withStyles(styles)(AsylumConnectMexicoMapContainer);
