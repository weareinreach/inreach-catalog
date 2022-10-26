// Dev/Staging config is the base
const base = {
	apiDomain: 'https://inreach-api-staging.herokuapp.com',
	apiBasePath: '/v1',
	googleAnalyticsKey: 'UA-76058112-1'
};

const local = {
	apiDomain: 'http://localhost:8080',
	apiBasePath: '/v1'
};

const prod = {
	apiDomain: 'https://inreach-api.herokuapp.com'
};

const vercelProd = {
	apiDomain: 'https://inreach-api-v1.vercel.app'
};
const vercelPreview = {
	apiDomain: 'https://inreach-api-v1-git-dev-weareinreach.vercel.app'
};

const env = process.env.REACT_APP_APP_ENV;

export const useIntl = process.env.REACT_APP_USE_INTL == 'TRUE' ? true : false;
console.log(
	'process.env.REACT_APP_USE_INTL: ' + process.env.REACT_APP_USE_INTL
);

console.log('useIntl: ' + useIntl);
const urlEnv = {
	...base,
	...(env === 'TEST' ? local : {}),
	...(env === 'production' ? prod : {}),
	...(process.env.REACT_APP_VERCEL_ENV === 'production' ? vercelProd : {}),
	...(process.env.REACT_APP_VERCEL_ENV === 'preview' ? vercelPreview : {})
};
export default urlEnv;
