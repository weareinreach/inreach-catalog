import config from '../config/config.js';
import fetch from 'node-fetch';

export default session => {
  const apiDomain = config[process.env.OD_API_ENV].odas;
  const url = `${apiDomain}api/account/collections/all`;
  const options = {
    headers: {
      Authorization: session,
      'Content-Type': 'application/json',
      OneDegreeSource: 'asylumconnect',
    },
  };
  return fetch(url, options);
}
