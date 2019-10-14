const config = {
  development: {
    odrs: "http://demo-odrs.1degree.org/v1/",
    odas: "http://demo.1degree.org/",
    odApiKey: "116a982084a50135de470e09a2d30796",
    client_id: 26,
    basicAuth: "Basic ZGVtbzpwZW9wbGVmaXJzdA=="
  },
  /*development: {
    odrs: "https://data.1degree.org/v1/",
    odas: "https://www.1degree.org/",
    odApiKey: "244a9ed0545c013590490614a1d2fcd4",
    client_id: 26
  },*/
  production: {
    odrs: "https://data.1degree.org/v1/",
    odas: "https://www.1degree.org/",
    odApiKey: "244a9ed0545c013590490614a1d2fcd4",
    client_id: 26
  }
};

//use ES5 for this because it is being imported into the local API scripts that aren't being transpiled
module.exports = config;
