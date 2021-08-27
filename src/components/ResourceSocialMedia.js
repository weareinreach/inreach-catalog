import React from 'react';
import PropTypes from 'prop-types';
import {FacebookIcon, TwitterIcon, InstagramIcon} from './icons';
import IconLink from './IconLink';

const findFirstProfile = (socialMedia, name) => {
	return socialMedia?.find((s) => s.name === name);
};

const socialMediaPlatforms = ['facebook', 'twitter', 'instagram'];

const mapping = {
	facebook: FacebookIcon,
	twitter: TwitterIcon,
	instagram: InstagramIcon
};

const getIcon = (name, style, width) => {
	if (!(name in mapping)) return null;
	const Icon = mapping[name];
	return <Icon style={style} width={width} />;
};

const renderIcon = (iconWidth, name) => {
	const iconStyle = {
		verticalAlign: 'middle'
	};

	return getIcon(name, iconStyle, iconWidth);
};

const SocialMedia = ({iconWidth, name, url, style, className}) => {
	const Icon = renderIcon(iconWidth, name);
	if (!Icon) return null;
	return (
		<IconLink
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			style={style}
			className={className}
		>
			{renderIcon(iconWidth, name)}
		</IconLink>
	);
};

const MobileSocialMedia = ({iconWidth, name, url, style, className}) => {
	const Icon = renderIcon(iconWidth, name);
	if (!Icon) return null;
	return (
		<IconLink
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			style={style}
			label={name}
			className={className}
		>
			{renderIcon(iconWidth, name)}
		</IconLink>
	);
};

const getSocialMediaLinks = ({
	socialMedia,
	iconWidth,
	style,
	className,
	isMobile
}) => {
	return socialMediaPlatforms
		.map((platform) => findFirstProfile(socialMedia, platform))
		.filter((profile) => profile)
		.map((profile) =>
			isMobile ? (
				<MobileSocialMedia
					iconWidth={iconWidth}
					name={profile.name}
					url={profile.url}
					style={style}
					className={className}
				/>
			) : (
				<SocialMedia
					iconWidth={iconWidth}
					name={profile.name}
					url={profile.url}
					style={style}
					className={className}
				/>
			)
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

export {SocialMedia, MobileSocialMedia, getSocialMediaLinks};
