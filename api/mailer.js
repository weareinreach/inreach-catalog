const config = require('../src/config');
const serverConfig = require('../config/config');
const fetch = require('node-fetch');
const striptags = require('striptags');
const mailgun = require('mailgun.js');

/**
 * Create sender from user data
 * @param  {[Object]} userData User object from One Degree
 * @return {[string]}
 */
let buildSender = function(userData) {
  let sender = [];
  if (userData.first_name) {
    sender.push(userData.first_name);
  }
  if (userData.last_name) {
    sender.push(userData.last_name);
  }
  if (userData.email) {
    sender.push('<' + userData.email + '>');
  }
  return sender.join(' ');
};

/**
 * Makes a request to 1Degree to confirm that the authToken belongs to a logged-in user.
 * Returns a promise which is resolved if the token belongs to a logged-in user, rejected otherwise
 * @param  {[type]} authToken [description]
 * @return {[type]}           [description]
 */
let confirmLogin = function(authToken) {
  return new Promise((resolve, reject) => {
    let url = config[process.env.OD_API_ENV].odas + 'api/user';

    var options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        onedegreesource: 'asylumconnect'
      }
    };

    if (typeof config[process.env.OD_API_ENV].basicAuth !== 'undefined') {
      options.headers.authorization = config[process.env.OD_API_ENV].basicAuth;
      options.headers['demo-authorization'] = 'Bearer ' + authToken;
    } else {
      options.headers.authorization = 'Bearer ' + authToken;
    }

    fetch(url, options)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          var error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .then(response => response.json())
      .then(response => {
        if (typeof response.message !== 'undefined') {
          reject({message: 'Authorization error: ' + response.message});
        } else if (typeof response.user !== 'object') {
          reject({message: 'No user given'}); //this will probably never fire, but left as a catch
        } else if (response.user.active) {
          resolve(response.user);
        } else {
          reject({message: 'Unknown error'});
        }
      })
      .catch(error => {
        reject({
          message: 'Authentication failed',
          status: error.response.status
        });
      });
  });
};

/**
 * [makeEmail description]
 * @param  {[type]} req      [description]
 * @param  {[type]} res      [description]
 * @param  {[type]} userData [description]
 * @return {[type]}          [description]
 */
let makeEmail = async function(req, res, components) {
  /*if(!components.recipients
      || !components.recipients.length
      || !components.sender
      || !components.sender.length
      || !components.template
      || !components.template.length
    ) {
    return Promise.reject('Required components not supplied.');
  }*/

  if (!components.subject) {
    let defaultSubject =
      serverConfig[process.env.OD_API_ENV].mailgun.defaultSubject;
    components.subject =
      typeof defaultSubject === 'function'
        ? defaultSubject(req.body)
        : defaultSubject;
  }

  let email = {
    sender: components.sender,
    recipients: components.recipients,
    subject: components.subject
  };

  return new Promise(function(resolve, reject) {
    res.render(components.template, components.data, function(err, html) {
      if (err) {
        reject('Email could not be made');
      } else {
        email.messageHtml = html;
        email.message = striptags(html);
        resolve(email);
      }
    });
  });
};

/**
 * [notify description]
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
notify = function(req, res, event, data) {
  let components = {
    template: 'asylum-connect-notification-stationary.ejs',
    sender: 'Catalog <system@email.asylumconnectcatalog.org>',
    recipients: serverConfig[process.env.OD_API_ENV].notifications[event]
  };
  switch (event) {
    case 'submission.new':
      components.subject =
        'New organization submission for the AsylumConnect Catalog';
      components.data = {
        message:
          'There is a new submission from a user on the AsylumConnect Catalog.  Login to the AsylumConnect portal to review and approve.'
      };
      break;
    case 'submission.update':
      break;
    default:
      return false;
      break;
  }
  makeEmail(req, res, components)
    .then(email => send(email))
    .catch(err => {
      console.log({
        status: 'error',
        statusCode: err.status,
        message: err.message
      });
    });
};

/**
 * Construct an email and pass it to Mailgun
 * @param  {[type]} email [description]
 * @return {[type]}       [description]
 */
let send = function(email) {
  return new Promise((resolve, reject) => {
    var mg = mailgun.client({
      username: 'api',
      key: serverConfig[process.env.OD_API_ENV].mailgun.apiKey
    });
    mg.messages
      .create(serverConfig[process.env.OD_API_ENV].mailgun.domain, {
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
        if (!err) {
          err = 'The email could not be sent';
        }
        reject(err);
      });
  });
};

module.exports = {
  buildSender,
  confirmLogin,
  makeEmail,
  notify,
  send
};
