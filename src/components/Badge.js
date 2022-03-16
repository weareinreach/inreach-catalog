import React from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {breakpoints} from '../theme';

import Tooltip from '@material-ui/core/Tooltip';
import {withStyles} from '@material-ui/core/styles';

import {
	CommunitySupportIcon,
	ComputersIcon,
	EducationEmploymentIcon,
	FoodIcon,
	HousingIcon,
	ClothingIcon,
	LegalIcon,
	MailIcon,
	MedicalIcon,
	MentalHealthIcon,
	MiscIcon,
	SpeechBubblesIcon,
	SportsEntertainmentIcon,
	TransportationIcon
} from './icons';

const styles = (theme) => ({
	tooltip: {fontFamily: 'sans-serif'},
	icon: {
		display: 'inline-block',
		verticalAlign: 'middle',
		padding: theme.spacing(1)
	},
	flair: {
		display: 'inline-block',
		backgroundColor: theme.palette.secondary[100],
		color: theme.palette.secondary[500],
		marginRight: theme.spacing(1),
		marginBottom: theme.spacing(1),
		fontSize: theme.typography.h4.fontSize,
		padding: theme.spacing(1),
		borderRadius: '2px'
	}
});

const Badge = ({
	classes,
	type,
	height,
	width,
	extraClasses,
	useIcon,
	mobileLabel
}) => {
	const typeMapping = {
		communitySupport: {
			label: 'service-type.community-support',
			icon: <CommunitySupportIcon />
		},
		computers: {
			label: 'service-type.computers-internet',
			icon: <ComputersIcon />
		},
		educationEmployment: {
			label: 'service-type.education-employment',
			icon: <EducationEmploymentIcon />
		},
		food: {
			label: 'service-type.food',
			icon: <FoodIcon />
		},
		housing: {
			label: 'service-type.housing',
			icon: <HousingIcon />
		},
		hygiene: {
			label: 'service-type.hygiene-clothing',
			icon: <ClothingIcon />
		},
		legal: {
			label: 'service-type.legal',
			icon: <LegalIcon />
		},
		mail: {
			label: 'service-type.mail',
			icon: <MailIcon />
		},
		medical: {
			label: 'service-type.medical',
			icon: <MedicalIcon />
		},
		mentalHealth: {
			label: 'service-type.mental-health',
			icon: <MentalHealthIcon />
		},
		misc: {
			label: 'service-type.other-services',
			icon: <MiscIcon />
		},
		speechBubble: {
			label: 'service-type.translation-interpretation',
			icon: <SpeechBubblesIcon fillColor="#5073b3" strokeColor="#FFFFFF" />
		},
		sportsEntertainment: {
			label: 'service-type.sports-entertainment',
			icon: <SportsEntertainmentIcon />
		},
		transportation: {
			label: 'service-type.transportation',
			icon: <TransportationIcon />
		}
	};

	const iconWidth = width ? width : '75px';
	const iconHeight = height ? height : '75px';

	let iconClassList = [classes.icon];
	let tooltipClassList = [classes.tooltip];
	if (extraClasses) {
		iconClassList.push(extraClasses.icon);
		tooltipClassList.push(extraClasses.tooltip);
	}

	const isMobile = window.innerWidth < breakpoints['sm'];

	const intl = useIntl();

	if (isMobile && (typeof useIcon === 'undefined' || useIcon === false)) {
		return (
			<div className={classes.flair} data-test-id="badge">
				{mobileLabel ? mobileLabel : typeMapping[type].label}
			</div>
		);
	} else {
		return (
			<Tooltip
				data-test-id="badge-tooltip"
				className={classes.tooltip}
				classes={{tooltipPlacementTop: 'badge-tooltipTop'}}
				title={intl.formatMessage({id: typeMapping[type].label})}
				placement="top"
			>
				<div
					data-test-id="badge"
					className={iconClassList.join(' ')}
					style={{width: iconWidth, height: iconHeight}}
				>
					{typeMapping[type].icon}
				</div>
			</Tooltip>
		);
	}
};

Badge.propTypes = {
	type: PropTypes.oneOf([
		'communitySupport',
		'computers',
		'educationEmployment',
		'food',
		'housing',
		'hygiene',
		'legal',
		'mail',
		'medical',
		'mentalHealth',
		'misc',
		'speechBubble',
		'sportsEntertainment',
		'transportation'
	]).isRequired
};

export default withStyles(styles)(Badge);
