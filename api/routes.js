module.exports = function(app) {
  var localAPI = require('./router'),
    bodyParser = require('body-parser');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  if(typeof process.env.OD_API_ENV == "undefined") process.env.OD_API_ENV = process.env.NODE_ENV;

  // Comment Routes

  // Submission Routes
  app.route('/api/submissions')
    .post(localAPI.handler);

  app.route('/api/share')
  	.post(localAPI.share)
};
