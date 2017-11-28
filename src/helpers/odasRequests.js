import config from '../config/config.js';
import 'whatwg-fetch';

// One Degree Application Server

// IMPORTANT NOTE:
// All requests using session authorization must check for response status 403,
// which indicates that the session token must be reconfirmed with
// the confirmSession function through the PasswordForm component

const {basicAuth, odas} = config[process.env.OD_API_ENV];

const headers = session =>
  Object.assign(
    {
      'Content-Type': 'application/json',
      OneDegreeSource: 'asylumconnect',
    },
    session ? {Authorization: basicAuth ? basicAuth : session} : null,
    basicAuth ? {'Demo-Authorization': session} : null,
  );

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.headers.get('content-type') &&
    response.headers.get('content-type').includes('application/json')
    ? response.json()
    : null;
}

function handleFetch(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(error => {
      throw error;
    });
}

export const confirmSession = (password, session) => {
  const url = `${odas}api/session/confirm`;
  const payload = {session: {password}};
  const options = {
    method: 'POST',
    headers: headers(session),
    body: JSON.stringify(payload),
  };
  return handleFetch(url, options);
};

export const fetchUser = session => {
  const url = `${odas}api/user`;
  const options = {headers: headers(session)};
  return handleFetch(url, options);
};

export const fetchUserLists = session => {
  const url = `${odas}api/account/collections/all`;
  const options = {headers: headers(session)};
  return handleFetch(url, options);
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
  return handleFetch(url, options);
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
  return handleFetch(url, options);
};

export const deleteListFavorite = (listId, resourceId, session) => {
  const url = `${odas}api/collections/${listId}/items/${resourceId}?fetchable_type=Opportunity`;
  const options = {
    method: 'DELETE',
    headers: headers(session),
  };
  return handleFetch(url, options);
};

export const deleteUser = (pw, session) => {
  const url = `${odas}api/user`;
  const payload = {
    password: pw
  };
  const options = {
    method: 'DELETE',
    headers: headers(session),
    body: JSON.stringify(payload)
  };
  return handleFetch(url, options);
};

export const resetPassword = (payload) => {
  const url = `${odas}api/passwords`;
  const options = {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(payload),
  };
  return handleFetch(url, options);
}

export const updateUserEmail = (payload, session) => {
  const url = `${odas}api/user`;
  const options = {
    method: 'PUT',
    headers: headers(session),
    body: JSON.stringify(payload),
  };
  return handleFetch(url, options);
};

export const updateUserPassword = (payload, session) => {
  const url = `${odas}api/passwords/change_password`;
  const options = {
    method: 'PUT',
    headers: headers(session),
    body: JSON.stringify(payload),
  };
  return handleFetch(url, options);
};
