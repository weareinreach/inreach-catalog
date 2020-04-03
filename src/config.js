// Dev/Staging config is the base
const base = {
  apiDomain: 'https://asylum-connect-api-staging.herokuapp.com',
  apiBasePath: '/v1',
  googleAnalyticsKey: 'UA-76058112-1'
};

const local = {
  apiDomain: 'http://localhost:8080'
};

const prod = {
  apiDomain: 'https://asylum-connect-api.herokuapp.com'
};

const env = process.env.REACT_APP_APP_ENV;

export default {
  ...base,
  ...(env === 'local' ? local : {}),
  ...(env === 'prod' ? prod : {})
};
