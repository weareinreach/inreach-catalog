import React from 'react';
import PropTypes from 'prop-types';
import {FacebookIcon, TwitterIcon, InstagramIcon} from './icons';

const RenderIcon = (iconWidth, name) => {
	const iconStyle = {
		verticalAlign: 'middle'
	};

	switch (name) {
		case 'facebook':
			return <FacebookIcon style={iconStyle} width={iconWidth} />;
			break;
		case 'twitter':
			return <TwitterIcon style={iconStyle} width={iconWidth} />;
			break;
		case 'instagram':
			return <InstagramIcon style={iconStyle} width={iconWidth} />;
			break;
		default:
			return null;
			break;
	}
};

const RenderLink =
	(iconWidth) =>
	({name, url}) => {
		return (
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				style={{padding: '0 4px'}}
			>
				{RenderIcon(iconWidth, name)}
			</a>
		);
	};

const SocialMedia = ({iconWidth, isMobile, socialMedia}) => {
	return socialMedia.map(RenderLink(iconWidth));
};

SocialMedia.propTypes = {
	iconWidth: PropTypes.string,
	isMobile: PropTypes.bool,
	socialMedia: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			url: PropTypes.string
		})
	)
};

export default SocialMedia;
