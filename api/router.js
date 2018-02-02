//get config
require('dotenv').load();
const crypto = require('crypto');
const fetch = require('node-fetch');
const config = require('../src/config/config');
const mailer = require("./mailer.js");

let getNotificationType = function(path) {
  switch(path) {
    case 'submissions':
      return 'submission.new';
    break;
  }
}

module.exports = {
  handler: function(req, res) {
    
    //build signature
    const secret = process.env.OD_SECRET;
    const body = JSON.stringify(Object.assign({}, req.body, {api_key: config[process.env.OD_API_ENV].odApiKey}));
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
    fetch(config[process.env.OD_API_ENV].odrs+req.path.replace(/^\/api\//i, ''), 
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
        if(data.status === "OK") {
          mailer.notify(req, res, getNotificationType(req.path.replace(/^\/api\//i, '')));
        }
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
  },

  /**
   * [share description]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   *
   * @apiParam {string} senderName       name of the sender
   * @apiParam {string} senderEmail      email address of the sender
   * @apiParam {string} recipients       email address of the recipient
   * @apiParam {string} subject          subject line of the email. If not set, check for a defaultSender property in the config
   * @apiParam {string} message          plaintext message
   */
  share: function(req, res) {    
    mailer.confirmLogin(req.body.jwt)
      .then(userData => {
        let templateData = {
          request: req.body,
          user: userData,
          first_name: (userData.first_name ? userData.first_name : 'Someone'),
          org: (userData.affiliation && userData.affiliation.organization_name ? userData.affiliation.organization_name : ''),
          grammar: {
            thisOrThese: (req.body.shareType == 'collection' ? 'These' : 'This'),
            listOf: (req.body.shareType == 'collection' ? 'list of ' : ''),
            resource: (req.body.shareType == 'collection' ? 'resources' : 'resource'),
            from: (userData.affiliation && userData.affiliation.organization_name ? 'from ' : '')
          }
        }
        let components = {
          template: "asylum-connect-stationary.ejs",
          subject: req.body.subject,
          recipients: req.body.recipients.split(","),
          sender: mailer.buildSender(userData),
          data: templateData
        }

        return mailer.makeEmail(req, res, components);
      })
      .then(email => mailer.send(email))
      .then(msg => {
        msg.status = "success";
        res.json(msg);
      })
      .catch(err => {
        res.json({
          status: "error",
          statusCode: err.status,
          message: err.message
        })
      })
  }
}
