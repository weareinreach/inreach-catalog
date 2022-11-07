import React from 'react';
import AbortionCareIcon from './AbortionCareIcon';
import AccountIcon from './AccountIcon';
import AirplaneIcon from './AirplaneIcon';
import CollapseIcon from './CollapseIcon';
import CommunitySupportIcon from './CommunitySupportIcon';
import ComputersIcon from './ComputersIcon';
import EditIcon from './EditIcon';
import EducationEmploymentIcon from './EducationEmploymentIcon';
import FacebookIcon from './FacebookIcon';
import FavoritesIcon from './FavoritesIcon';
import FoodIcon from './FoodIcon';
import FiltersIcon from './FiltersIcon';
import FlagIcon from './FlagIcon';
import HousingIcon from './HousingIcon';
import InstagramIcon from './InstagramIcon';
import ClothingIcon from './ClothingIcon';
import LanguageIcon from './LanguageIcon';
import LegalIcon from './LegalIcon';
import MailIcon from './MailIcon';
import MedicalIcon from './MedicalIcon';
import MentalHealthIcon from './MentalHealthIcon';
import MiscIcon from './MiscIcon';
import SocialMediaMiscIcon from './SocialMediaMiscIcon';
import PinpointIcon from './PinpointIcon';
import PrivacyIcon from './PrivacyIcon';
import RecommendedStarIcon from './RecommendedStarIcon';
import ReviewsIcon from './ReviewsIcon';
import SearchIcon from './SearchIcon';
import SpeechBubblesIcon from './SpeechBubblesIcon';
import SportsEntertainmentIcon from './SportsEntertainmentIcon';
import TransportationIcon from './TransportationIcon';
import TravelIcon from './TravelIcon';
import TwitterIcon from './TwitterIcon';

export {default as AbortionCareIcon} from './AbortionCareIcon';
export {default as AccountIcon} from './AccountIcon';
export {default as AirplaneIcon} from './AirplaneIcon';
export {default as BackIcon} from './BackIcon';
export {default as ChevronIcon} from './ChevronIcon';
export {default as ClothingIcon} from './ClothingIcon';
export {default as CollapseIcon} from './CollapseIcon';
export {default as CommunitySupportIcon} from './CommunitySupportIcon';
export {default as ComputersIcon} from './ComputersIcon';
export {default as EditIcon} from './EditIcon';
export {default as EducationEmploymentIcon} from './EducationEmploymentIcon';
export {default as FacebookIcon} from './FacebookIcon';
export {default as FavoritesIcon} from './FavoritesIcon';
export {default as FiltersIcon} from './FiltersIcon';
export {default as FlagIcon} from './FlagIcon';
export {default as FoodIcon} from './FoodIcon';
export {default as HousingIcon} from './HousingIcon';
export {default as InformationIcon} from './InformationIcon';
export {default as InformationIcon24} from './InformationIcon24';
export {default as InstagramIcon} from './InstagramIcon';
export {default as LanguageIcon} from './LanguageIcon';
export {default as LegalIcon} from './LegalIcon';
export {default as MailIcon} from './MailIcon';
export {default as MedicalIcon} from './MedicalIcon';
export {default as MentalHealthIcon} from './MentalHealthIcon';
export {default as MiscIcon} from './MiscIcon';
export {default as SocialMediaMiscIcon} from './SocialMediaMiscIcon';
export {default as MoreIcon} from './MoreIcon';
export {default as PinpointIcon} from './PinpointIcon';
export {default as PrivacyIcon} from './PrivacyIcon';
export {default as RecommendedStarIcon} from './RecommendedStarIcon';
export {default as RedHeartIcon} from './RedHeartIcon';
export {default as ReviewsIcon} from './ReviewsIcon';
export {default as SearchIcon} from './SearchIcon';
export {default as ShareIcon} from './ShareIcon';
export {default as SpeechBubblesIcon} from './SpeechBubblesIcon';
export {default as SportsEntertainmentIcon} from './SportsEntertainmentIcon';
export {default as TransportationIcon} from './TransportationIcon';
export {default as TravelIcon} from './TravelIcon';
export {default as TwitterIcon} from './TwitterIcon';

const typeMap = {
	abortionCare: AbortionCareIcon,
	account: AccountIcon,
	airplane: AirplaneIcon,
	collapse: CollapseIcon,
	communitySupport: CommunitySupportIcon,
	computers: ComputersIcon,
	edit: EditIcon,
	educationEmployment: EducationEmploymentIcon,
	facebook: FacebookIcon,
	favorites: FavoritesIcon,
	filters: FiltersIcon,
	flag: FlagIcon,
	food: FoodIcon,
	housing: HousingIcon,
	instagram: InstagramIcon,
	clothing: ClothingIcon,
	language: LanguageIcon,
	legal: LegalIcon,
	mail: MailIcon,
	medical: MedicalIcon,
	mentalHealth: MentalHealthIcon,
	misc: MiscIcon,
	socialMediaMisc: SocialMediaMiscIcon,
	pinpoint: PinpointIcon,
	privacy: PrivacyIcon,
	reviews: ReviewsIcon,
	search: SearchIcon,
	speechBubble: SpeechBubblesIcon,
	star: RecommendedStarIcon,
	sportsEntertainment: SportsEntertainmentIcon,
	suitcase: TravelIcon,
	transportation: TransportationIcon,
	twitter: TwitterIcon
};

const StandaloneIcon = function (props) {
	const {className, fillColor, height, name, strokeColor, width} = props;
	const Icon = typeMap[name];

	if (Icon) {
		const iconWidth = width || '75px';
		const iconHeight = height || '75px';

		return (
			<div
				style={{width: iconWidth, height: iconHeight}}
				className={className}
				data-test-id="icon"
			>
				<Icon fillColor={fillColor} strokeColor={strokeColor} />
			</div>
		);
	}

	return null;
};

export {StandaloneIcon};
