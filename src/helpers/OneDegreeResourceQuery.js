import fetch from 'node-fetch';
import config from '../config/config.js';

class OneDegreeResourceQuery {
  

  constructor() {
    this.resetFilters();
    this.baseURL = config[process.env.NODE_ENV].odrs;
    this.requiredFilters = {
      api_key: config[process.env.NODE_ENV].odApiKey,
      query: {
        properties: {
          'community-asylum-seeker': 'true',
          'community-lgbt': 'true'
        }
      },
      match: 'by_type'
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

  buildFilters() {
    return [this.serialize(this.requiredFilters), this.serialize(this.filters)].filter((item) => item!=='').join("&");
  }

  resetFilters() {
    this.filters = {
      query: {
        properties: {},
        tags: [],
        page: 1
      },
    }
    return this;
  }

  fetch( {type = 'opportunities', callback = (res) => {} } = {} ) {
    fetch(this.baseURL + type + '?' + this.buildFilters())
      .then(function(res) {
        return res.json();
      }).then(callback);
    return this;
  }
}

export default OneDegreeResourceQuery;