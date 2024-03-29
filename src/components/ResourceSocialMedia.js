import React from 'react';
import PropTypes from 'prop-types';
import {
	FacebookIcon,
	TwitterIcon,
	InstagramIcon,
	SocialMediaMiscIcon
} from './icons';
import IconLink from './IconLink';
import YouTube from '@material-ui/icons/YouTube';
import LinkedIn from '@material-ui/icons/LinkedIn';

import {compose, prop, propOr, sortBy, toLower} from 'ramda';

const mapping = {
	facebook: FacebookIcon,
	twitter: TwitterIcon,
	instagram: InstagramIcon,
	youtube: YouTube,
	linkedin: LinkedIn,
	zmisc: SocialMediaMiscIcon
};

const sortByPlatformName = sortBy(compose(toLower, propOr('zname', 'name')));

const getSocialMediaLinks = ({
	socialMedia,
	iconWidth,
	style,
	className,
	isMobile = false
}) => {
	return sortByPlatformName(socialMedia).map(({name, url}) =>
		name ? (
			<SocialMedia
				iconWidth={iconWidth}
				name={name}
				url={url}
				style={style}
				className={className}
				isMobile={isMobile}
			/>
		) : (
			<SocialMedia
				iconWidth={iconWidth}
				name={'zmisc'}
				url={url}
				style={style}
				className={className}
				isMobile={isMobile}
			/>
		)
	);
};

const renderIcon = (iconWidth, name) => {
	const iconStyle = {
		verticalAlign: 'middle'
	};
	if (!(name in mapping)) return;
	const Icon = mapping[name];
	return <Icon style={iconStyle} width={iconWidth} />;
};

const SocialMedia = ({
	iconWidth,
	name,
	url,
	style,
	className,
	isMobile = false
}) => {
	const Icon = renderIcon(iconWidth, name);
	if (!Icon) return;
	return (
		<IconLink
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			style={style}
			className={className}
			label={isMobile ? name : null}
		>
			{Icon}
		</IconLink>
	);
};

SocialMedia.propTypes = {
	iconWidth: PropTypes.string,
	name: PropTypes.string,
	url: PropTypes.string,
	className: PropTypes.string
};

export {SocialMedia, getSocialMediaLinks};
