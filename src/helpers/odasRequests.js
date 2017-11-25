import config from '../config/config.js';
import 'whatwg-fetch';

// One Degree Application Server
const odas = config[process.env.OD_API_ENV].odas;

const headers = (session = null) => ({
  Authorization: session ? session : null,
  'Content-Type': 'application/json',
  OneDegreeSource: 'asylumconnect',
});

export const confirmSession = (password, session) => {
  const url = `${odas}api/session/confirm`;
  const payload = {session: {password}};
  const options = {
    method: 'POST',
    headers: headers(session),
    body: JSON.stringify(payload),
  };
  return fetch(url, options);
};

export const fetchUserLists = session => {
  const url = `${odas}api/account/collections/all`;
  const options = {headers: headers(session)};
  return fetch(url, options);
};

export const createList = (payload, session) => {
  const url = `${odas}api/collections`;
  const options = {
    method: 'POST',
    headers: headers(session),
    body: JSON.stringify(
      Object.assign({}, payload, {
        region: 'USA',
        shared_status: 'private',
      }),
    ),
  };
  return fetch(url, options);
};

export const createListFavorite = (listId, resourceId, session) => {
  const url = `${odas}api/collections/${listId}/items`;
  const payload = {
    fetchable_id: resourceId,
    fetchable_type: 'Opportunity',
  };
  const options = {
    method: 'POST',
    headers: headers(session),
    body: JSON.stringify(payload),
  };
  return fetch(url, options);
};

export const deleteListFavorite = (listId, resourceId, session) => {
  const url = `${odas}api/collections/${listId}/items/${resourceId}?fetchable_type=Opportunity`;
  const options = {
    method: 'DELETE',
    headers: headers(session),
  };
  return fetch(url, options);
};
