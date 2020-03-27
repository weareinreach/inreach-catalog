import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';
import config from '../config/config.js';

class OneDegreeResourceClient {
  constructor() {
    this.baseURL = config[process.env.OD_API_ENV].odrs;
    this.getOpportunities = this.getOpportunities.bind(this);
    this.getOrganization = this.getOrganization.bind(this);
  }

  collectOpportunityProperties(opportunities) {
    let properties = [],
      index = [];
    opportunities.forEach(opportunity => {
      for (let property in opportunity.properties) {
        if (/^(community|lang)\-/.test(property)) {
          if (index.indexOf(property) == -1) {
            index.push(property);
            properties.push({
              slug: property,
              value: opportunity.properties[property]
            });
          }
        }
      }
    });
    return properties;
  }

  getOrganization({id = null, orgOnly = false, callback = data => {}} = {}) {
    if (id == null) {
      console.error('[OneDegreeResourceClient] No resource ID passed');
      return false;
    }
    var self = this;
    this.fetch({
      url: 'organizations/' + id,
      callback: orgData => {
        if ((orgData.status && orgData.status == 'error') || orgOnly) {
          callback(orgData);
        } else {
          self.getOpportunities({
            id: id,
            per_page: orgData.opportunity_count,
            callback: data => {
              if (data.status && data.status == 'error') {
                callback(orgData);
              } else {
                orgData.opportunities = data.opportunities;
                callback(orgData);
              }
            }
          });
        }
      }
    });
  }

  getOpportunities({
    idType = 'organization',
    id = null,
    per_page = 20,
    callback = data => {}
  } = {}) {
    if (id == null) {
      console.error(
        '[OneDegreeResourceClient::getOpportunities] No resource ID passed'
      );
      return false;
    }

    let url = 'opportunities';

    switch (idType) {
      case 'organization':
        url = 'organizations/' + id + '/' + url;
        break;
      default:
        url += '/' + id;
    }

    this.fetch({
      url: url,
      per_page: per_page,
      callback: callback
    });
  }

  getCommentsFromId({
    resourceType = 'organization',
    id = null,
    serviceId = null,
    per_page = 20,
    callback = data => {}
  } = {}) {
    if (id == null) {
      console.error(
        '[OneDegreeResourceClient::getComments] No resource ID passed'
      );
      return false;
    }

    let url = 'organizations/' + id + '/comments';

    switch (resourceType) {
      case 'organization':
        url = url;
        break;
      case 'opportunity':
        url =
          'organizations/' + id + '/opportunities/' + serviceId + '/comments';
        break;
      case 'opportunities':
        url = url + '/' + resourceType;
        break;
    }

    this.fetch({
      url: url,
      per_page: per_page,
      callback: callback
    });
  }

  getOrganizationRatingByUserId({
    resourceType = 'organization',
    id = null,
    user_id = null,
    callback = data => {}
  } = {}) {
    if (id == null || user_id == null) {
      console.error(
        '[OneDegreeResourceClient::getOrganizationRatingByUserId] No resource or user ID passed'
      );
      return false;
    }

    let url = 'organizations/' + id + '/ratings/overall';

    this.fetch({
      url: url,
      user_id: user_id,
      callback: callback
    });
  }

  fetch({url = '', per_page = 20, user_id = '', callback = data => {}} = {}) {
    fetchJsonp(
      this.baseURL +
        url +
        '.jsonp?api_key=' +
        config[process.env.OD_API_ENV].odApiKey +
        '&per_page=' +
        per_page +
        '&client_user_id=' +
        user_id +
        '&extended=true'
    )
      .then(function(res) {
        return res.json();
      })
      .then(callback);
    return this;
  }
}

export default OneDegreeResourceClient;
