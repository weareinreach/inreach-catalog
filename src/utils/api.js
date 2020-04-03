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

  console.log('DELETE', url);

  return httpDelete(url, body, options)
    .then(({data, status}) => {
      return {status, ...data};
    })
    .catch(handleErr);
};

export const catalogGet = (path, options) => {
  const url = `${CATALOG_API_URL}${path}`;

  console.log('GET', url);

  return get(url, options)
    .then(({data, status}) => {
      return {status, ...data};
    })
    .catch(handleErr);
};

export const catalogPatch = (path, body, options) => {
  const url = `${CATALOG_API_URL}${path}`;

  console.log('PATCH', url);

  return patch(url, body, options)
    .then(({data, status}) => {
      return {status, ...data};
    })
    .catch(handleErr);
};

export const catalogPost = (path, body, options) => {
  const url = `${CATALOG_API_URL}${path}`;

  console.log('POST', url);

  return post(url, body, options)
    .then(({data, status}) => {
      return {status, ...data};
    })
    .catch(handleErr);
};

export const fetchSearchResults = (params) => {
  const {city, locale, page, selectedFilters, selectedResourceTypes, state} =
    params || {};
  const tagLocale = localeTagMap[locale] || '';
  const query = {};

  console.log('params', params);

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

  console.log('fetchUser', session);

  return catalogPost('/auth/check', body)
    .then((authData) => {
      console.log('authData', authData);

      catalogGet(`/users/${authData._id}`)
        .then((userData) => {
          console.log('userData', userData);

          return userData;
        })
        .catch(handleErr);
    })
    .catch(handleErr);
};

// TODO: API HOOK UP OR DELETE
export const fetchPublicList = (slug) => {
  console.log('fetchPublicList', slug);
  // const url = `${odas}api/collections/${slug}`;
  // const options = {headers: headers()};
  // return handleFetch(url, options);
};

// TODO: API HOOK UP OR DELETE
export const createAffiliation = ({id, name}, session) => {
  console.log('createAffiliation', {id, name}, session);
  // const url = `${odas}api/affiliations`;
  // const payload = {
  //   fetchable_id: id,
  //   organization_name: name
  // };
  // const options = {
  //   method: 'PUT',
  //   headers: headers(session),
  //   body: JSON.stringify(payload)
  // };
  // return handleFetch(url, options);
};

// TODO: API HOOK UP OR DELETE
export const createList = (payload, session) => {
  console.log('createList', payload, session);
  // const url = `${odas}api/collections`;
  // const options = {
  //   method: 'POST',
  //   headers: headers(session),
  //   body: JSON.stringify(
  //     Object.assign({}, payload, {
  //       region: 'USA',
  //       shared_status: 'private'
  //     })
  //   )
  // };
  // return handleFetch(url, options);
};

// TODO: API HOOK UP OR DELETE
export const createListFavorite = (listId, resourceId, session) => {
  console.log('createListFavorite', listId, resourceId, session);
  // const url = `${odas}api/collections/${listId}/items`;
  // const payload = {
  //   fetchable_id: resourceId,
  //   fetchable_type: 'Opportunity'
  // };
  // const options = {
  //   method: 'POST',
  //   headers: headers(session),
  //   body: JSON.stringify(payload)
  // };
  // return handleFetch(url, options);
};

// TODO: API HOOK UP OR DELETE
export const deleteAffiliation = (session) => {
  console.log('deleteAffiliation', session);
  // const url = `${odas}api/affiliations`;
  // const options = {
  //   method: 'DELETE',
  //   headers: headers(session)
  // };
  // return handleFetch(url, options);
};

// TODO: API HOOK UP OR DELETE
export const deleteListFavorite = (listId, resourceId, session) => {
  console.log('deleteListFavorite', listId, resourceId, session);
  // const url = `${odas}api/collections/${listId}/items/${resourceId}?fetchable_type=Opportunity`;
  // const options = {
  //   method: 'DELETE',
  //   headers: headers(session)
  // };
  // return handleFetch(url, options);
};

// TODO: API HOOK UP OR DELETE
export const deleteUser = (pw, session) => {
  console.log('deleteUser', pw, session);
  // const url = `${odas}api/user`;
  // const payload = {
  //   password: pw
  // };
  // const options = {
  //   method: 'DELETE',
  //   headers: headers(session),
  //   body: JSON.stringify(payload)
  // };
  // return handleFetch(url, options);
};

// TODO: API HOOK UP OR DELETE
export const resetPassword = (payload) => {
  console.log('resetPassword', payload);
  // const url = `${odas}api/passwords`;
  // const options = {
  //   method: 'PUT',
  //   headers: headers(),
  //   body: JSON.stringify(payload)
  // };
  // return handleFetch(url, options);
};

// TODO: API HOOK UP OR DELETE
export const updateListPermissions = (listId, newPermissions, session) => {
  console.log('updateListPermissions', listId, newPermissions, session);
  // const url = `${odas}api/collections/${listId}`;
  // const payload = {
  //   list: {
  //     shared_status: newPermissions,
  //     is_searchable: false
  //   }
  // };
  // const options = {
  //   method: 'PUT',
  //   headers: headers(session),
  //   body: JSON.stringify(payload)
  // };
  // return handleFetch(url, options);
};

// TODO: API HOOK UP OR DELETE
export const updateUserEmail = (payload, session) => {
  console.log('updateUserEmail', payload, session);
  // const url = `${odas}api/user`;
  // const options = {
  //   method: 'PUT',
  //   headers: headers(session),
  //   body: JSON.stringify(payload)
  // };
  // return handleFetch(url, options);
};

// TODO: API HOOK UP OR DELETE
export const updateUserPassword = (payload, session) => {
  console.log('updateUserPassword', payload, session);
  // const url = `${odas}api/passwords/change_password`;
  // const options = {
  //   method: 'PUT',
  //   headers: headers(session),
  //   body: JSON.stringify(payload)
  // };
  // return handleFetch(url, options);
};
