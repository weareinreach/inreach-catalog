import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'material-ui/Tooltip';

import {
  CommunitySupportIcon,
  ComputersIcon,
  EducationEmploymentIcon,
  FoodIcon,
  HousingIcon,
  HygieneIcon,
  LegalIcon,
  MedicalIcon,
  MentalHealthIcon,
  SportsEntertainmentIcon,
} from './icons';
const Badge = ({ type }) => {
  const typeMapping = {
    communitySupport: {
      label: 'Community Support',
      icon: <CommunitySupportIcon />,
    },
    computers: {
      label: 'Computers',
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

  return (
    <Tooltip
      label={typeMapping[type].label}
      placement="top"
    >
      <div style={{ width: '75px', height: '75px' }}>
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
    'medical',
    'mentalHealth',
    'sportsEntertainment',
  ]).isRequired
};

export default Badge;
