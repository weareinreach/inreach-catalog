//get config
require('dotenv').load();
const crypto = require('crypto');
const fetch = require('node-fetch');
const config = require('../src/config/config');
const serverConfig = require('../config/config');
const mailgun = require("mailgun.js");
const striptags = require("striptags");


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
    //are we supposed to get the email address through 1D?



    // let message = "";
    // if(typeof req.body.shareType !== "undefined"){
    //   message += req.body.shareType;
    // }
    // if(typeof req.body.shareUrl !== "undefined"){
    //   message += req.body.shareUrl;
    // }

    // let data = {};
    
    confirmLogin(req.body.jwt)
      .then(userData => makeEmail(req, res, userData))
      .then(email => send(email))
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

/**
 * Makes a request to 1Degree to confirm that the authToken belongs to a logged-in user.
 * Returns a promise which is resolved if the token belongs to a logged-in user, rejected otherwise
 * @param  {[type]} authToken [description]
 * @return {[type]}           [description]
 */
function confirmLogin(authToken){
  return new Promise((resolve, reject) => {
    let url = config[process.env.OD_API_ENV].odas+"api/user";

    var options = { 
      method: 'GET',
      headers: 
        { 
        'content-type': 'application/json',
        'onedegreesource': 'asylumconnect',
        } 
      };

    if(typeof config[process.env.OD_API_ENV].basicAuth !== "undefined"){
      options.headers.authorization = config[process.env.OD_API_ENV].basicAuth;
      options.headers['demo-authorization'] = 'Bearer '+authToken;
    }
    else{
      options.headers.authorization = 'Bearer '+authToken;
    }
    
    fetch(url, options)
      .then((response) => { 
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          var error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .then((response) => (response.json()))
      .then((response) => {
        if(typeof response.message !== "undefined"){
          reject({message:"Authorization error: "+ response.message});
        }
        else if(typeof response.user !== "object"){
          reject({message:"No user given"}); //this will probably never fire, but left as a catch
        }
        else if(response.user.active){
          resolve(response.user);
        }
        else{
          reject({message:"Unknown error"})
        }
      })
      .catch((error) => {
        reject({message:"Authentication failed", status: error.response.status});
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
    var mg = mailgun.client({username: 'api', key: serverConfig[process.env.OD_API_ENV].mailgun.apiKey});
    mg.messages.create(serverConfig[process.env.OD_API_ENV].mailgun.domain, {
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
        if(!err){
          err = "The email could not be sent";
        }
        reject(err);
      })        
  })
}

/**
 * [makeEmail description]
 * @param  {[type]} req      [description]
 * @param  {[type]} res      [description]
 * @param  {[type]} userData [description]
 * @return {[type]}          [description]
 */
async function makeEmail(req, res, userData){
  let subject = req.body.subject;
  if(!subject){
    let defaultSubject = serverConfig[process.env.OD_API_ENV].mailgun.defaultSubject;
    subject = typeof defaultSubject === "function" ? defaultSubject(req.body) : defaultSubject;
  }

  let email = {
    // sender: req.body.senderName + "<" + req.body.senderEmail + ">",
    recipients: req.body.recipients.split(","),
    subject: subject,
    // message: message,
  }

  let sender = [];
  if(userData.first_name){
    sender.push(userData.first_name);
  }
  if(userData.last_name){
    sender.push(userData.last_name);
  }
  if(userData.email){
    sender.push("<" + userData.email + ">");
  }

  email.sender = sender.join(" ");
  return new Promise(function(resolve, reject){
    res.render("asylum-connect-stationary.ejs", {
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
    },
    function(err, html){
      if(err){
        reject("Email could not be made");
      }
      else{
        email.messageHtml = html;
        email.message = striptags(html);
        resolve(email);
      }
    });

  })
}
