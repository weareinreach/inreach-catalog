//get config
require('dotenv').load();
const crypto = require('crypto');
const fetch = require('node-fetch');
const config = require('../src/config/config');


module.exports = {
  handler: function(req, res) {
    
    //build signature
    const secret = process.env.OD_SECRET;
    const body = JSON.stringify(Object.assign({}, req.body, {api_key: config[process.env.NODE_ENV].odApiKey}));
    const today = new Date();

    const signed_params = crypto.createHmac('sha256', secret)
                           .update( body)
                           .digest('hex');
    const signed_date = crypto.createHmac('sha256', signed_params)
                         .update(today.toISOString().split('.')[0]+'Z')
                         .digest('hex');
    const signature = crypto.createHash('sha256')
                        .update(signed_date)
                        .digest('hex');
    
    //build fetch request
    fetch(config[process.env.NODE_ENV].odrs+req.path.replace(/^\/api\//i, ''), 
      {
        method: req.method,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          '1deg-Date': today.toISOString().split('.')[0]+'Z', //ISO 8601-formatted timestamp
          '1deg-Signature': signature
        },
        body: body,
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        res.json(data);
    });

    /*res.json({
      params: req.params,
      method: req.method,
      body: body,
      path: req.path,
      endpoint: config[process.env.NODE_ENV].odrs+req.path.replace(/^\/api\//i, ''),
      signature: {
        secret,
        today,
        signed_params,
        signed_date,
        signature: signature
      }
    });*/
  }
}