import React from 'react';
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
  LanguageIcon,
  LegalIcon,
  MailIcon,
  MedicalIcon,
  MentalHealthIcon,
  MiscIcon,
  SpeechBubblesIcon,
  SportsEntertainmentIcon,
  TransportationIcon,
} from './icons';

const styles = (theme) => ({
  tooltip: {fontFamily: 'sans-serif'},
  icon: {
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: theme.spacing(1),
  },
  flair: {
    display: 'inline-block',
    backgroundColor: theme.palette.secondary[100],
    color: theme.palette.secondary[500],
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontSize: theme.typography.h4.fontSize,
    padding: theme.spacing(1),
    borderRadius: '2px',
  },
});

const Badge = ({
  classes,
  type,
  height,
  width,
  extraClasses,
  useIcon,
  mobileLabel,
}) => {
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
      icon: <ClothingIcon />,
    },
    language: {
      label: 'Language',
      icon: <LanguageIcon />,
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
      icon: <SpeechBubblesIcon fillColor="#5073b3" strokeColor="#FFFFFF" />,
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

  const iconWidth = width ? width : '75px';
  const iconHeight = height ? height : '75px';

  let iconClassList = [classes.icon];
  let tooltipClassList = [classes.tooltip];
  if (extraClasses) {
    iconClassList.push(extraClasses.icon);
    tooltipClassList.push(extraClasses.tooltip);
  }

  const isMobile = window.innerWidth < breakpoints['sm'];

  if (isMobile && (typeof useIcon === 'undefined' || useIcon === false)) {
    return (
      <div className={classes.flair}>
        {mobileLabel ? mobileLabel : typeMapping[type].label}
      </div>
    );
  } else {
    return (
      <Tooltip
        className={classes.tooltip}
        classes={{tooltipPlacementTop: 'badge-tooltipTop'}}
        title={typeMapping[type].label}
        placement="top"
      >
        <div
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
    'language',
    'legal',
    'mail',
    'medical',
    'mentalHealth',
    'misc',
    'speechBubble',
    'sportsEntertainment',
    'transportation',
  ]).isRequired,
};

export default withStyles(styles)(Badge);
