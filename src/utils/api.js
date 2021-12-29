import {delete as httpDelete, get, patch, post} from 'axios';
import qs from 'query-string';
import config from '../config';

import {localeTagMap} from './locale';

export const CATALOG_API_URL = `${config.apiDomain}${config.apiBasePath}`;
// /* Local deloy */ export const CATALOG_API_URL = `http://localhost:8080/v1`;

const jwt = localStorage.getItem('jwt');
const handleErr = (err) => {
	return {error: true, status: err.response};
};

export const catalogDelete = (path, body, options) => {
	const url = `${CATALOG_API_URL}${path}`;

	return httpDelete(url, {headers: {'x-json-web-token': jwt}}, options)
		.then(({data, status}) => {
			return {status, ...data};
		})
		.catch(handleErr);
};

export const catalogGet = (path, options) => {
	const url = `${CATALOG_API_URL}${path}`;

	return get(url, options)
		.then(({data, status}) => {
			return {status, ...data};
		})
		.catch(handleErr);
};

export const catalogPatch = (path, body, options) => {
	const url = `${CATALOG_API_URL}${path}`;

	// console.log('PATCH', url);

	return patch(url, body, {headers: {'x-json-web-token': jwt}}, options)
		.then(({data, status}) => {
			return {status, ...data};
		})
		.catch(handleErr);
};

export const catalogPost = (path, body, options) => {
	const url = `${CATALOG_API_URL}${path}`;

	return post(url, body, {headers: {'x-json-web-token': jwt}}, options)
		.then(({data, status}) => {
			return {status, ...data};
		})
		.catch(handleErr);
};

const getAreaId = (location) => location.toLowerCase().split(' ').join('-');

export const fetchOrganizations = (params) => {
	const {
		city,
		ids,
		locale,
		name,
		owner,
		page,
		selectedFilters,
		selectedResourceTypes,
		state,
		isNational,
		county,
		nearLatLng
	} = params || {};
	const tagLocale = localeTagMap[locale] || '';
	const query = {};

	if (ids) {
		query.ids = ids;
	}

	if (name) {
		query.name = name;
	}

	if (owner) {
		query.owner = owner;
	}

	if (page) {
		query.page = page;
	}

	// START: formatting properties

	query.properties = [];

	let serviceArea = '';

	if (locale && isNational) {
		const countryProperty =
			locale === 'en_US'
				? 'service-national-united-states'
				: locale === 'en_CA'
				? 'service-national-canada'
				: locale === 'en_MX'
				? 'service-national-mexico'
				: '';

		serviceArea += countryProperty;
	}

	if (state) {
		const stateProperty = `service-state-${getAreaId(state)}`;

		serviceArea += `${serviceArea ? ',' : ''}${stateProperty}`;
	}
	if (county) {
		const countyProperty = `service-county-${getAreaId(state)}-${getAreaId(
			county
		)}`;

		serviceArea += `${serviceArea ? ',' : ''}${countyProperty}`;
	}
	if (city) {
		const cityProperty = `service-city-${getAreaId(state)}-${getAreaId(city)}`;

		serviceArea += `${serviceArea ? ',' : ''}${cityProperty}`;
	}

	if (serviceArea) {
		query.serviceArea = serviceArea;
	}

	if (selectedFilters) {
		const filterProps = selectedFilters.map((property) => {
			if (property === 'at-capacity') {
				return `${property}=$existsFalse`;
			} else {
				return `${property}=true`;
			}
		});

		query.properties = query.properties.concat(filterProps);
	}

	// END: formatting properties

	if (tagLocale && selectedResourceTypes?.length > 0) {
		query.tagLocale = tagLocale;
		query.tags = selectedResourceTypes;
	}
	if (nearLatLng?.lng && nearLatLng?.lat) {
		query.long = nearLatLng?.lng;
		query.lat = nearLatLng?.lat;
	}

	const queryString = qs.stringify(query, {arrayFormat: 'comma'});

	return catalogGet(`/organizations?${queryString}`);
};

export const getStaticPage = (name) => {
	const path = {
		'outside-US-and-Canada': 'international'
	}[name];

	if (!path) {
		return new Promise((resolve) => resolve({}));
	}

	return catalogGet(`/static/${path}`)
		.then((data) => data)
		.catch(() => ({error: true}));
};

export const getOrgsByName = (name) => {
	return catalogGet(`/organizations/name/${name}`);
};

export const getOrganizationBySlug = (slug) => {
	return catalogGet(`/slug/organizations/${slug}`);
};

export const getServiceBySlug = (orgSlug, slug) => {
	return catalogGet(`/slug/organizations/${orgSlug}/services/${slug}`);
};

export const getCommentsAndReview = (org, service) => {
	let entityPath = `/organizations/${org._id}`;

	if (service?._id) {
		entityPath += `/services/${service._id}`;
	}

	return Promise.all([
		catalogGet(`${entityPath}/comments`),
		catalogGet(`${entityPath}/ratings`)
	]).then((results) => {
		const [{comments}, {average_rating, ratings}] = results;

		return {average_rating, comments, ratings};
	});
};

export const createComment = (data) => {
	const {orgId, serviceId, ...body} = data;
	let url = `/organizations/${orgId}`;

	if (serviceId) {
		url += `/services/${serviceId}`;
	}

	url += '/comments';

	return catalogPatch(url, body);
};

export const createRating = (data) => {
	const {orgId, serviceId, ...body} = data;
	let url = `/organizations/${orgId}`;

	if (serviceId) {
		url += `/services/${serviceId}`;
	}

	url += '/ratings';

	return catalogPatch(url, body);
};

export const createUser = (orgSlug, slug) => {
	return catalogGet(`/slug/organizations/${orgSlug}/services/${slug}`);
};

export const fetchUser = (session) => {
	const body = {token: session};

	return catalogPost('/auth/check', body)
		.then((authData) => {
			return catalogGet(`/users/${authData._id}`)
				.then((userData) => userData)
				.catch(handleErr);
		})
		.catch(handleErr);
};

export const updateUser = (user, update) => {
	return catalogPatch(`/users/${user._id}`, update)
		.then(() => {
			return {...user, ...update};
		})
		.catch((err) => err);
};

export const updateUserPassword = (user, password) => {
	return catalogPatch(`/users/${user._id}/password`, {password})
		.then(() => ({}))
		.catch((err) => err);
};

export const deleteUser = (user, update) => {
	return catalogDelete(`/users/${user._id}`)
		.then(() => ({}))
		.catch((err) => err);
};

export const createList = ({name, userId}) => {
	return catalogPost(`/users/${userId}/lists`, {name})
		.then((result) => {
			return result;
		})
		.catch((err) => err);
};

export const deleteList = (listId, user) => {
	return catalogDelete(`/users/${user}/lists/${listId}`)
		.then((result) => {
			return result;
		})
		.catch((err) => {
			return err;
		});
};

export const createListFavorite = ({listId, itemId, orgId, userId}) => {
	return catalogPost(`/users/${userId}/lists/${listId}/items`, {itemId, orgId})
		.then((result) => {
			return result;
		})
		.catch((err) => err);
};

export const deleteListFavorite = ({listId, itemId, userId}) => {
	return catalogDelete(`/users/${userId}/lists/${listId}/items/${itemId}`)
		.then(() => ({}))
		.catch((err) => err);
};

export const createOrgOwner = ({email, orgId, userId}) => {
	return catalogPost(`/organizations/${orgId}/owners`, {
		email,
		userId
	})
		.then(() => ({}))
		.catch((err) => err);
};

export const deleteOrgOwner = ({orgId, userId}) => {
	return catalogDelete(`/organizations/${orgId}/owners/${userId}`)
		.then(() => ({}))
		.catch((err) => err);
};

export const createSuggestion = (suggestions) => {
	return catalogPost(`/suggestions`, {suggestions})
		.then((res) => res)
		.catch((err) => err);
};

export const shareResource = ({
	email,
	shareType,
	shareUrl,
	resource,
	userId
}) => {
	if (
		(shareType === 'collection' && !userId) ||
		!resource ||
		!email ||
		!shareType ||
		!shareUrl
	) {
		handleErr('Bad request');
	}
	if (shareType === 'collection') {
		return catalogPost(`/users/${userId}/lists/${resource}/share`, {
			email: email,
			list: resource,
			shareUrl: shareUrl,
			shareType: shareType
		})
			.then((res) => res)
			.catch((err) => err);
	} else {
		return catalogPost(`/organizations/${resource}/share`, {
			email: email,
			organization: resource,
			shareUrl: shareUrl,
			shareType: shareType
		})
			.then((res) => res)
			.catch((err) => err);
	}
};

export const fetchList = (listId = null) => {
	if (!listId) {
		handleErr('Bad request');
	}
	return catalogGet(`/users/lists/${listId}`)
		.then(({list}) => list)
		.catch((err) => err);
};
