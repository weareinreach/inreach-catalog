module.exports = function(app) {
  var localAPI = require('./router'),
    bodyParser = require('body-parser');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Comment Routes

  // Submission Routes
  app.route('/api/submissions')
    .post(localAPI.handler);

  // Comments Routes
  app.route('/api/organizations/:organization_id/comments')
    .post(localAPI.handler);

  // Rating Routes
  app.route('/api/organizations/:organization_id/ratings')
    .post(localAPI.handler)
  app.route('/api/organizations/:organization_id/ratings/:id')
    .put(localAPI.handler)

  // Share Resource
  app.route('/api/share')
  	.post(localAPI.share)
};
