const config = {
  development: {
    mailgun:{
      apiKey: process.env.MAILGUN_API_KEY,
      domain: "email.asylumconnectcatalog.org",
      defaultSubject: "This is a test message from AsylumConnect"
    },
  },
  production: {
    mailgun: {
      apiKey: process.env.MAILGUN_API_KEY,
      domain: "email.asylumconnectcatalog.org",
      defaultSubject: "Someone shared something with you on the AsylumConnect Catalog"
    }
  }
};

//use ES5 for this because it is being imported into the local API scripts that aren't being transpiled
module.exports = config;