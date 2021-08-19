import React from 'react';
import PropTypes from 'prop-types';
import {FacebookIcon, TwitterIcon, InstagramIcon} from './icons';
import IconLink from './IconLink';

const getSocialMediaUrls = (socialMedia) => {
	return {
		facebookUrl: socialMedia?.find((s) => s.name === 'facebook')?.url,
		twitterUrl: socialMedia?.find((s) => s.name === 'twitter')?.url,
		instagramUrl: socialMedia?.find((s) => s.name === 'instagram')?.url
	};
};

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

const SocialMedia = ({iconWidth, name, url, style, className}) => {
	return (
		<IconLink
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			style={style}
			className={className}
		>
			{RenderIcon(iconWidth, name)}
		</IconLink>
	);
};

const MobileSocialMedia = ({iconWidth, name, url, style, className}) => {
	return (
		<IconLink
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			style={style}
			label={name}
			className={className}
		>
			{RenderIcon(iconWidth, name)}
		</IconLink>
	);
};

SocialMedia.propTypes = {
	iconWidth: PropTypes.string,
	name: PropTypes.string,
	url: PropTypes.string,
	className: PropTypes.string
};

MobileSocialMedia.propTypes = {
	iconWidth: PropTypes.string,
	name: PropTypes.string,
	url: PropTypes.string,
	className: PropTypes.string
};

export {SocialMedia, MobileSocialMedia, getSocialMediaUrls};
