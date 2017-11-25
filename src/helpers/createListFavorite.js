import 'whatwg-fetch';

import config from '../config/config.js';

export default (listId, resourceId, session) => {
  const apiDomain = config[process.env.OD_API_ENV].odas;
  const url = `${apiDomain}api/collections/${listId}/items`;
  const payload = JSON.stringify({
    fetchable_id: resourceId,
    fetchable_type: 'Opportunity',
  });
  const options = {
    method: 'POST',
    headers: {
      Authorization: session,
      'Content-Type': 'application/json',
      OneDegreeSource: 'asylumconnect',
    },
    body: payload,
  };
  return fetch(url, options)
};
