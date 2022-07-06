import React from 'react';
import {FormattedMessage} from 'react-intl';
import {InfoWindow} from 'react-google-maps';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AsylumConnectMapPolygon from './AsylumConnectMapPolygon';
import {generalizedCrime} from '../data/mexicoCrimeData.js';

const styles = (theme) => ({
	infoWindow: {
		lineHeight: '1.4rem',
		cursor: 'pointer',
		width: '240px',
		height: '80px',
		borderRadius: '2px'
	}
});
const AsylumConnectMexicoCrimeMap = ({classes}) => {
	const opacity = '0.8';
	const strokeWeight = '0.5';
	const strokeColor = '#F2D0D0';
	const getColor = (value) => {
		if (value <= 15) {
			return '#F4C0C6';
		} else if (value >= 16 && value < 31) {
			return '#DB2C40';
		} else {
			return '#831A26';
		}
	};
	return generalizedCrime.map(({name, data, lat, lng, coordinates}) => {
		let color = getColor(data);
		let center = new window.google.maps.LatLng({
			lat: lat,
			lng: lng
		});
		return (
			<>
				<AsylumConnectMapPolygon
					key={name}
					paths={coordinates}
					visible={true}
					fillColor={color}
					fillOpacity={opacity}
					strokeColor={strokeColor}
					strokeOpacity={opacity}
					strokeWeight={strokeWeight}
				>
					<InfoWindow position={center} className={classes.infoWindow}>
						<Typography variant="body1">
							<span
								style={{
									fontSize: '16px',
									fontWeight: '600',
									display: 'inline-block',
									marginLeft: 'auto',
									marginRight: 'auto'
								}}
							>
								{name}
							</span>
							<br />
							<span style={{display: 'inline-block', color: '#E1001C'}}>
								<FormattedMessage
									id="app.mexico-crime-map-generalised-murder-heading"
									defaultMessage="Generalised Murder Rate:"
									description="Heading for the murder rate data"
									values={{data: data}}
								/>
							</span>
						</Typography>
					</InfoWindow>
				</AsylumConnectMapPolygon>
			</>
		);
	});
};
export default withStyles(styles)(AsylumConnectMexicoCrimeMap);
