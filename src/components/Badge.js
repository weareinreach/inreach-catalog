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
  MiscIcon,
  SpeechBubblesIcon,
  SportsEntertainmentIcon,
  TransportationIcon
} from './icons';

const styles = theme => ({
  tooltip: { fontFamily: 'sans-serif' },
  icon: { display: 'inline-block', verticalAlign: 'middle' },
});

const Badge = ({ classes, type, height, width, extraClasses }) => {
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
    misc: {
      label: 'Other Services',
      icon: <MiscIcon />,
    },
    speechBubble: {
      label: 'Translation and interpretation',
      icon: <SpeechBubblesIcon fillColor="#5073b3" strokeColor="#FFFFFF" />
    },
    sportsEntertainment: {
      label: 'Sports / Entertainment',
      icon: <SportsEntertainmentIcon />,
    },
    transportation: {
      label: 'Transportation',
      icon: <TransportationIcon />,
    },
  };

  const iconWidth = (width ? width : '75px');
  const iconHeight = (height ? height : '75px');

  let iconClassList = [classes.icon];
  let tooltipClassList = [classes.tooltip];
  if(extraClasses){
    iconClassList.push(extraClasses.icon);
    tooltipClassList.push(extraClasses.tooltip);
  }

  return (
    <Tooltip
      className={classes.tooltip}
      classes={{tooltipTop:"badge-tooltipTop"}}
      title={typeMapping[type].label}
      placement="top"
    >
      <div className={iconClassList.join(" ")} style={ {width: iconWidth, height: iconHeight} }>
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
    'misc',
    'speechBubble',
    'sportsEntertainment',
    'transportation'
  ]).isRequired
};

export default withStyles(styles)(Badge);
