export {default as AccountIcon} from './AccountIcon';
export {default as AirplaneIcon} from './AirplaneIcon';
export {default as CollapseIcon} from './CollapseIcon';
export {default as CommunitySupportIcon} from './CommunitySupportIcon';
export {default as ComputersIcon} from './ComputersIcon';
export {default as EducationEmploymentIcon} from './EducationEmploymentIcon';
export {default as FavoritesIcon} from './FavoritesIcon';
export {default as FoodIcon} from './FoodIcon';
export {default as FiltersIcon} from './FiltersIcon';
export {default as FlagIcon} from './FlagIcon';
export {default as HousingIcon} from './HousingIcon';
export {default as ClothingIcon} from './ClothingIcon';
export {default as LanguageIcon} from './LanguageIcon';
export {default as LegalIcon} from './LegalIcon';
export {default as MailIcon} from './MailIcon';
export {default as MedicalIcon} from './MedicalIcon';
export {default as MentalHealthIcon} from './MentalHealthIcon';
export {default as MiscIcon} from './MiscIcon';
export {default as PinpointIcon} from './PinpointIcon';
export {default as PrivacyIcon} from './PrivacyIcon';
export {default as RecommendedStarIcon} from './RecommendedStarIcon';
export {default as RedHeartIcon} from './RedHeartIcon';
export {default as SearchIcon} from './SearchIcon';
export {default as ShareIcon} from './ShareIcon';
export {default as SpeechBubblesIcon} from './SpeechBubblesIcon';
export {default as SportsEntertainmentIcon} from './SportsEntertainmentIcon';
export {default as TransportationIcon} from './TransportationIcon';
export {default as TravelIcon} from './TravelIcon';

import React from 'react';
import AccountIcon from './AccountIcon';
import AirplaneIcon from './AirplaneIcon';
import CollapseIcon from './CollapseIcon';
import CommunitySupportIcon from './CommunitySupportIcon';
import ComputersIcon from './ComputersIcon';
import EducationEmploymentIcon from './EducationEmploymentIcon';
import FavoritesIcon from './FavoritesIcon';
import FoodIcon from './FoodIcon';
import FiltersIcon from './FiltersIcon';
import FlagIcon from './FlagIcon';
import HousingIcon from './HousingIcon';
import ClothingIcon from './ClothingIcon';
import LanguageIcon from './LanguageIcon';
import LegalIcon from './LegalIcon';
import MailIcon from './MailIcon';
import MedicalIcon from './MedicalIcon';
import MentalHealthIcon from './MentalHealthIcon';
import MiscIcon from './MiscIcon';
import PinpointIcon from './PinpointIcon';
import PrivacyIcon from './PrivacyIcon';
import RecommendedStarIcon from './RecommendedStarIcon';
import RedHeartIcon from './RedHeartIcon';
import SearchIcon from './SearchIcon';
import ShareIcon from './ShareIcon';
import SpeechBubblesIcon from './SpeechBubblesIcon';
import SportsEntertainmentIcon from './SportsEntertainmentIcon';
import TransportationIcon from './TransportationIcon';
import TravelIcon from './TravelIcon';

const StandaloneIcon = function(props) {
  const {
    name,
    height,
    width,
    fillColor,
    strokeColor,
    className,
    expanded
  } = props;
  const typeMapping = {
    account: <AccountIcon />,
    airplane: (
      <AirplaneIcon
        fillColor={fillColor || undefined}
        strokeColor={strokeColor || undefined}
      />
    ),
    collapse: (
      <CollapseIcon
        color={fillColor || undefined}
        expanded={expanded || undefined}
      />
    ),
    communitySupport: (
      <CommunitySupportIcon fillColor={fillColor || undefined} />
    ),
    computers: <ComputersIcon fillColor={fillColor || undefined} />,
    educationEmployment: (
      <EducationEmploymentIcon fillColor={fillColor || undefined} />
    ),
    favorites: <FavoritesIcon fillColor={fillColor || undefined} />,
    filters: <FiltersIcon fillColor={fillColor || undefined} />,
    flag: <FlagIcon fillColor={fillColor || undefined} />,
    food: <FoodIcon fillColor={fillColor || undefined} />,
    housing: (
      <HousingIcon
        fillColor={fillColor || undefined}
        strokeColor={strokeColor || undefined}
      />
    ),
    clothing: <ClothingIcon fillColor={fillColor || undefined} />,
    language: <LanguageIcon fillColor={fillColor || undefined} />,
    legal: <LegalIcon fillColor={fillColor || undefined} />,
    mail: <MailIcon fillColor={fillColor || undefined} />,
    medical: <MedicalIcon fillColor={fillColor || undefined} />,
    mentalHealth: <MentalHealthIcon fillColor={fillColor || undefined} />,
    misc: <MiscIcon fillColor={fillColor || undefined} />,
    pinpoint: <PinpointIcon fillColor={fillColor || undefined} />,
    privacy: <PrivacyIcon fillColor={fillColor || undefined} />,
    search: <SearchIcon fillColor={fillColor || undefined} />,
    speechBubble: (
      <SpeechBubblesIcon
        fillColor={fillColor || undefined}
        strokeColor={strokeColor || undefined}
      />
    ),
    star: <RecommendedStarIcon fillColor={fillColor || undefined} />,
    sportsEntertainment: (
      <SportsEntertainmentIcon fillColor={fillColor || undefined} />
    ),
    suitcase: (
      <TravelIcon
        fillColor={fillColor || undefined}
        strokeColor={strokeColor || undefined}
      />
    ),
    transportation: <TransportationIcon fillColor={fillColor || undefined} />
  };

  if (typeof typeMapping[props.name] !== 'undefined') {
    const iconWidth = width ? width : '75px';
    const iconHeight = height ? height : '75px';
    return (
      <div style={{width: iconWidth, height: iconHeight}} className={className}>
        {typeMapping[props.name]}
      </div>
    );
  } else return null;
};

export {StandaloneIcon};
