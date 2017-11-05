import fetch from 'node-fetch';
import fetchJsonp from 'fetch-jsonp';
import config from '../config/config.js';

class OneDegreeResourceQuery {
  

  constructor() {
    this.resetFilters();
    this.baseURL = config[process.env.NODE_ENV].odrs;
    this.requiredFilters = {
      'opportunities': {
        query: {
          properties: {
            'approval-asylumconnect': 'true'
          },
          match: 'by_type'
        },
        'titles_only': 'true'
      },
      'organizations': {
      }
    };
  }

  /**
   * [addTags description]
   * @param {[Array]} tags an array of tags
   */
  addTags(tags) {
    tags.forEach((tag) => {
      this.filters.query.tags = this.filters.query.tags.concat(tag.split(','));
    });
    return this;
  }

  setIds(ids) {
    this.filters.query.ids = ids.join(',');
  }

  setLocation(latLng) {
    this.filters.query.lat = latLng.lat;
    this.filters.query.long = latLng.lng;
    return this;
  }

  setDistance(kilometers) {
    this.filters.query.distance = kilometers;
    return this;
  }

  nextPage() {
    this.filters.page++;
    return this;
  }

  serialize(obj, prefix) {
    var str = [], p;
    for(p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + "[" + (Number.isInteger(parseInt(p)) && parseInt(p).toString() === p ? '' : p ) + "]" : p, v = obj[p];
        str.push((v !== null && typeof v === "object") ?
          this.serialize(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.filter((item) => item!=='').join("&");
  }

  buildFilters(type = 'opportunities') {
    return [this.serialize(this.requiredFilters[type]), this.serialize(this.filters)].filter((item) => item!=='').join("&");
  }

  resetFilters() {
    this.filters = {
      api_key: config[process.env.NODE_ENV].odApiKey,
      query: {
        properties: {},
        tags: [],
        page: 1
      },
    }
    return this;
  }

  fetchOrganizations({ callback = (data) => { } } = {}) {
    var self = this;
    this.fetch({
      callback: (data) => {
        let ids = [];

        data.opportunities.forEach((opportunity, index) => {
          if(ids.indexOf(opportunity.organization.id) === -1) {
            ids.push(opportunity.organization.id);
          }
        });
        if(ids.length === 0) {
          ids.push(0);
        }
        var orgsSearch = new OneDegreeResourceQuery();
        orgsSearch.setIds(ids);
        orgsSearch.fetch({
          type: 'organizations',
          callback: callback
        });
        
      }
    });
  }

  fetch( {type = 'opportunities', callback = (data) => { } } = {} ) {
    fetchJsonp(this.baseURL + type + '.jsonp?' + this.buildFilters(type))
      .then(function(res) {
        return res.json();
      }).then(callback);
    return this;
  }
}

export default OneDegreeResourceQuery;