export { default as AccountIcon } from './AccountIcon';
export { default as AirplaneIcon } from './AirplaneIcon';
export { default as CommunitySupportIcon } from './CommunitySupportIcon';
export { default as ComputersIcon } from './ComputersIcon';
export { default as EducationEmploymentIcon } from './EducationEmploymentIcon';
export { default as FavoritesIcon } from './FavoritesIcon';
export { default as FoodIcon } from './FoodIcon';
export { default as FiltersIcon } from './FiltersIcon';
export { default as FlagIcon } from './FlagIcon';
export { default as HousingIcon } from './HousingIcon';
export { default as HygieneIcon } from './HygieneIcon';
export { default as LanguageIcon } from './LanguageIcon';
export { default as LegalIcon } from './LegalIcon';
export { default as MailIcon } from './MailIcon';
export { default as MedicalIcon } from './MedicalIcon';
export { default as MentalHealthIcon } from './MentalHealthIcon';
export { default as MiscIcon } from './MiscIcon';
export { default as PinpointIcon } from './PinpointIcon';
export { default as PrivacyIcon } from './PrivacyIcon';
export { default as RecommendedStarIcon } from './RecommendedStarIcon';
export { default as RedHeartIcon } from './RedHeartIcon';
export { default as SearchIcon } from './SearchIcon';
export { default as ShareIcon } from './ShareIcon';
export { default as SpeechBubblesIcon } from './SpeechBubblesIcon';
export { default as SportsEntertainmentIcon } from './SportsEntertainmentIcon';
export { default as TransportationIcon } from './TransportationIcon';

import React from 'react';
import AccountIcon from './AccountIcon';
import AirplaneIcon from './AirplaneIcon';
import CommunitySupportIcon  from './CommunitySupportIcon';
import ComputersIcon  from './ComputersIcon';
import EducationEmploymentIcon  from './EducationEmploymentIcon';
import FavoritesIcon  from './FavoritesIcon';
import FoodIcon  from './FoodIcon';
import FiltersIcon  from './FiltersIcon';
import FlagIcon  from './FlagIcon';
import HousingIcon  from './HousingIcon';
import HygieneIcon  from './HygieneIcon';
import LanguageIcon  from './LanguageIcon';
import LegalIcon  from './LegalIcon';
import MailIcon  from './MailIcon';
import MedicalIcon  from './MedicalIcon';
import MentalHealthIcon  from './MentalHealthIcon';
import MiscIcon  from './MiscIcon';
import PinpointIcon  from './PinpointIcon';
import PrivacyIcon  from './PrivacyIcon';
import RecommendedStarIcon  from './RecommendedStarIcon';
import RedHeartIcon  from './RedHeartIcon';
import SearchIcon  from './SearchIcon';
import ShareIcon  from './ShareIcon';
import SpeechBubblesIcon  from './SpeechBubblesIcon';
import SportsEntertainmentIcon  from './SportsEntertainmentIcon';
import TransportationIcon  from './TransportationIcon';

const StandaloneIcon = function(props) { 
  const { name, height, width } = props;
  const typeMapping = {
    account: <AccountIcon />,
    airplane: <AirplaneIcon />,
    communitySupport:  <CommunitySupportIcon />,
    computers: <ComputersIcon />,
    educationEmployment: <EducationEmploymentIcon />,
    favorites: <FavoritesIcon />,
    filters: <FiltersIcon />,
    flag: <FlagIcon />,
    food: <FoodIcon />,
    housing: <HousingIcon />,
    hygiene: <HygieneIcon />,
    language: <LanguageIcon />,
    legal: <LegalIcon />,
    mail:  <MailIcon />,
    medical: <MedicalIcon />,
    mentalHealth: <MentalHealthIcon />,
    misc: <MiscIcon />,
    pinpoint: <PinpointIcon />,
    privacy: <PrivacyIcon />,
    search: <SearchIcon />,
    speechBubble: <SpeechBubblesIcon />,
    star: <RecommendedStarIcon />,
    sportsEntertainment: <SportsEntertainmentIcon />,
    suitcase: <EducationEmploymentIcon fillColor="#70BC74" />,
    transportation:  <TransportationIcon />,
  };



  if(typeof typeMapping[props.name] !== 'undefined') {
    const iconWidth = (width ? width : '75px');
    const iconHeight = (height ? height : '75px');
    return (
      <div style={ {width: iconWidth, height: iconHeight} }>
        {typeMapping[props.name]}
      </div>
    );
  } else return null;
}

export {StandaloneIcon}
