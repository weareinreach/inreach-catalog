import config from '../config/config.js';
import 'whatwg-fetch';

export default (payload, session) => {
  const apiDomain = config[process.env.OD_API_ENV].odas;
  const url = `${apiDomain}api/collections`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: session,
      'Content-Type': 'application/json',
      OneDegreeSource: 'asylumconnect',
    },
    body: JSON.stringify(
      Object.assign({}, payload, {
        region: 'USA',
        shared_status: 'private',
      }),
    ),
  };
  return fetch(url, options);
};
