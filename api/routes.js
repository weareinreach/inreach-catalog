module.exports = function(app) {
  var localAPI = require('./router'),
    bodyParser = require('body-parser');
  const url = require('url');
  const NodeCache = require('node-cache');
  const memCache = new NodeCache();

  var cache = duration => {
    return (req, res, next) => {
      let key =
        '__express__' +
        url.parse(req.originalUrl || req.url).pathname.toLowerCase();
      let cachedContent = memCache.get(key);
      if (
        cachedContent == undefined ||
        (req.query && req.query.cachebust === 'true')
      ) {
        res.sendResponse = res.send;
        res.send = body => {
          memCache.set(key, body, duration * 1000);
          res.header('x-cache', 'miss');
          res.sendResponse(body);
        };
        next();
      } else {
        res.header('x-cache', 'hit');
        res.send(cachedContent);
        return;
      }
    };
  };

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  if (typeof process.env.OD_API_ENV == 'undefined')
    process.env.OD_API_ENV = process.env.NODE_ENV;

  // Comment Routes

  // Submission Routes
  app.route('/api/submissions').post(localAPI.handler);

  // Comments Routes
  app
    .route('/api/organizations/:organization_id/comments')
    .post(localAPI.handler);

  // Rating Routes
  app
    .route('/api/organizations/:organization_id/ratings')
    .post(localAPI.handler);
  app
    .route('/api/organizations/:organization_id/ratings/:id')
    .put(localAPI.handler);

  // Share Resource
  app.route('/api/share').post(localAPI.share);

  // Static Page
  app.route('/api/page/:page_name').get(cache(12 * 60 * 60), localAPI.page);
};
