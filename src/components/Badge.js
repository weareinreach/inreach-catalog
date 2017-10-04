import React from 'react';
import PropTypes from 'prop-types';

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

const Badge = ({ type }) => (
  <div>
    { type === 'communitySupport' && <CommunitySupportIcon />}
    { type === 'computers' && <ComputersIcon />}
    { type === 'educationEmployment' && <EducationEmploymentIcon />}
    { type === 'food' && <FoodIcon />}
    { type === 'housing' && <HousingIcon />}
    { type === 'hygiene' && <HygieneIcon />}
    { type === 'legal' && <LegalIcon />}
    { type === 'medical' && <MedicalIcon />}
    { type === 'mentalHealth' && <MentalHealthIcon />}
    { type === 'sportsEntertainment' && <SportsEntertainmentIcon />}
  </div>
);

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
