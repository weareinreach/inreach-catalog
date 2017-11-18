//get config
require('dotenv').load();
const crypto = require('crypto');
const fetch = require('node-fetch');
const config = require('../src/config/config');
const mailgun = require("mailgun.js");


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
   * @apiParam {string} subject          subject line of the email
   * @apiParam {string} message          plaintext message
   */
  share: function(req, res) {

    let email = {
      sender: req.body.senderName + "<" + req.body.senderEmail + ">",
      recipients: req.body.recipients.split(","),
      subject: req.body.subject,
      message: req.body.message,
    }
    email.messageHtml = "<h1>"+email.message+"</h1>";
    let data = {};

    confirmLogin(req.body.jwt)
      .then(response => {
        send(email)
          .then(msg => {
            msg.status = "success";
            res.json(msg);
          })
          .catch(msg => {
            msg.status = "error";
            res.json(msg);
          })

      })
      .catch(err => {
        res.json({
          status: "error",
          message: err
        })
      })



  }
}

/**
 * Makes a request to 1Degree to confirm that the authToken belongs to a logged-in user.
 * Returns a promise which is resolved if the token belongs to a logged-in user, rejected otherwise
 * @param  {[type]} authToken [description]
 * @return {[type]}           [description]
 */
function confirmLogin(authToken){
  return new Promise((resolve, reject) => {
    let url = config[process.env.NODE_ENV].odas+"api/user";

    var options = { 
      method: 'GET',
      headers: 
        { 
        'content-type': 'application/json',
        'onedegreesource': 'asylumconnect',
        } 
      };

    if(typeof config[process.env.NODE_ENV].basicAuth !== "undefined"){
      options.headers.authorization = config[process.env.NODE_ENV].basicAuth;
      options.headers['demo-authorization'] = 'Bearer '+authToken;
    }
    else{
      options.headers.authorization = 'Bearer '+authToken;
    }

    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if(typeof response.message !== "undefined"){
          reject(response.message);
        }
        else if(typeof response.user !== "object"){
          reject("No user given"); //this will probably never fire, but left as a catch
        }
        else if(response.user.active){
          resolve();
        }
        else{
          reject("Unknown error")
        }
      })
      .catch((response) => {
        reject("User not found");
      })

  })

}

/**
 * Construct an email and pass it to Mailgun
 * @param  {[type]} email [description]
 * @return {[type]}       [description]
 */
function send(email){
  return new Promise((resolve, reject) => {
    var mg = mailgun.client({username: 'api', key: config[process.env.NODE_ENV].mailgun.apiKey});
    mg.messages.create(config[process.env.NODE_ENV].mailgun.domain, {
        from: email.sender,
        to: email.recipients,
        subject: email.subject,
        text: email.message,
        html: email.messageHtml
      })
      .then(msg => {
        resolve(msg);
      })
      .catch(err => {
        data.error = err
        reject(msg);
      })        
  })

}