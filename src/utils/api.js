import {delete as httpDelete, get, patch, post} from 'axios';
import qs from 'query-string';
import config from '../config';

import {localeTagMap} from './locale';

export const CATALOG_API_URL = `${config.apiDomain}${config.apiBasePath}`;

const handleErr = (err) => {
  return {error: true, status: err.response.status};
};

export const catalogDelete = (path, body, options) => {
  const url = `${CATALOG_API_URL}${path}`;

  // console.log('DELETE', url);

  return httpDelete(url, body, options)
    .then(({data, status}) => {
      return {status, ...data};
    })
    .catch(handleErr);
};

export const catalogGet = (path, options) => {
  const url = `${CATALOG_API_URL}${path}`;

  // console.log('GET', url);

  return get(url, options)
    .then(({data, status}) => {
      return {status, ...data};
    })
    .catch(handleErr);
};

export const catalogPatch = (path, body, options) => {
  const url = `${CATALOG_API_URL}${path}`;

  // console.log('PATCH', url);

  return patch(url, body, options)
    .then(({data, status}) => {
      return {status, ...data};
    })
    .catch(handleErr);
};

export const catalogPost = (path, body, options) => {
  const url = `${CATALOG_API_URL}${path}`;

  // console.log('POST', url);

  return post(url, body, options)
    .then(({data, status}) => {
      return {status, ...data};
    })
    .catch(handleErr);
};

export const fetchOrganizations = (params) => {
  const {
    city,
    ids,
    locale,
    page,
    selectedFilters,
    selectedResourceTypes,
    state,
  } = params || {};
  const tagLocale = localeTagMap[locale] || '';
  const query = {};

  if (ids) {
    query.ids = ids;
  }

  if (page) {
    query.page = page;
  }

  query.properties = [];

  // TODO: restore nationwide
  // if (locale === 'en_US') {
  //   query.properties.push('service-national-united-states=true');
  // } else if (locale === 'en_CA') {
  //   query.properties.push('service-national-canada=true');
  // }

  if (state) {
    const getServceAreaId = (location) =>
      location.toLowerCase().split(' ').join('-');

    query.properties.push(`service-state-${getServceAreaId(state)}=true`);

    if (city && state !== 'District of Columbia') {
      query.properties.push(
        `service-county-${getServceAreaId(state)}-${getServceAreaId(city)}=true`
      );
    }
  }

  if (selectedFilters) {
    const filterProps = selectedFilters.map((property) => `${property}=true`);

    query.properties = query.properties.concat(filterProps);
  }

  if (tagLocale && selectedResourceTypes?.length > 0) {
    query.tagLocale = tagLocale;
    query.tags = selectedResourceTypes;
  }

  const queryString = qs.stringify(query, {arrayFormat: 'comma'});

  return catalogGet(`/organizations?${queryString}`);
};

export const getStaticPage = (name) => {
  const path = {
    Mexico: 'mexico',
    'outside-US-and-Canada': 'international',
  }[name];

  if (!path) {
    return new Promise((resolve) => resolve({}));
  }

  return catalogGet(`/static/${path}`)
    .then((data) => data)
    .catch(() => ({error: true}));
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
    catalogGet(`${entityPath}/ratings`),
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
    .then(() => ({}))
    .catch((err) => err);
};

export const createListFavorite = ({listId, itemId, userId}) => {
  return catalogPost(`/users/${userId}/lists/${listId}/items`, {itemId})
    .then(() => ({}))
    .catch((err) => err);
};

export const deleteListFavorite = ({listId, itemId, userId}) => {
  return catalogDelete(`/users/${userId}/lists/${listId}/items/${itemId}`)
    .then(() => ({}))
    .catch((err) => err);
};
