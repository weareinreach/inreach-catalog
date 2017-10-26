import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'material-ui/Tooltip';
import { withStyles } from 'material-ui/styles';

import {
  CommunitySupportIcon,
  ComputersIcon,
  EducationEmploymentIcon,
  FoodIcon,
  HousingIcon,
  HygieneIcon,
  LegalIcon,
  MailIcon,
  MedicalIcon,
  MentalHealthIcon,
  SportsEntertainmentIcon,
} from './icons';

const styles = theme => ({
  tooltip: { fontFamily: 'sans-serif' },
  icon: { display: 'inline-block', verticalAlign: 'middle' },
});

const Badge = ({ classes, type, height, width }) => {
  const typeMapping = {
    communitySupport: {
      label: 'Community Support',
      icon: <CommunitySupportIcon />,
    },
    computers: {
      label: 'Computers and Internet',
      icon: <ComputersIcon />,
    },
    educationEmployment: {
      label: 'Education / Employment',
      icon: <EducationEmploymentIcon />,
    },
    food: {
      label: 'Food',
      icon: <FoodIcon />,
    },
    housing: {
      label: 'Housing',
      icon: <HousingIcon />,
    },
    hygiene: {
      label: 'Hygiene',
      icon: <HygieneIcon />,
    },
    legal: {
      label: 'Legal',
      icon: <LegalIcon />,
    },
    mail: {
      label: 'Mail Services',
      icon: <MailIcon />,
    },
    medical: {
      label: 'Medical',
      icon: <MedicalIcon />,
    },
    mentalHealth: {
      label: 'Mental Health',
      icon: <MentalHealthIcon />,
    },
    sportsEntertainment: {
      label: 'Sports / Entertainment',
      icon: <SportsEntertainmentIcon />,
    },
  };

  const iconWidth = (width ? width : '75px');
  const iconHeight = (height ? height : '75px');

  return (
    <Tooltip
      className={classes.tooltip}
      title={typeMapping[type].label}
      placement="top"
    >
      <div className={classes.icon} style={ {width: iconWidth, height: iconHeight} }>
        { typeMapping[type].icon }
      </div>
    </Tooltip>
  );
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
    'sportsEntertainment',
  ]).isRequired
};

export default withStyles(styles)(Badge);
