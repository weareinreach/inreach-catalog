import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';
import config from '../config/config.js';
import ResourceTypes from './ResourceTypes';

class OneDegreeResourceQuery {
  

  constructor() {
    this.resetFilters();
    this.baseURL = config[process.env.OD_API_ENV].odrs;
    //this.allResultsReturned = false;
    this.removeAtCapacity = false;
    this.pagingData = {};
    this.requiredFilters = {
      'opportunities': {
        query: {
          properties: {
            'community-asylum-seeker': 'true',
            'community-lgbt': 'true'
            //'approval-asylumconnect': 'true'
          },
          match: 'properties'
        }
      },
      'organizations': {
        extended: 'true'
      }
    };
  }

  /**
   * [addTags description]
   * @param {[Array]} tags an array of tags
   */
  addTags(tags) {
    ResourceTypes.types.forEach((tag) => {
      if((tag.title && tags.indexOf(tag.title) >= 0) || tags.indexOf(tag.category) >= 0) {
        this.filters.query.tags.push(tag.odTag)
      }
    });
    /*tags.forEach((tag) => {
      this.filters.query.tags = this.filters.query.tags.concat(tag.split(','));
    });*/
    return this;
  }

  areAllResultsReturned() {
    return this.pagingData.current_page == this.pagingData.total_pages;
  }

  setIds(ids) {
    this.filters.query.ids = ids.join(',');
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

  setFilters(filters) {
    if(filters.indexOf('at-capacity') !== -1) {
      filters.splice(filters.indexOf('at-capacity'), 1);
      this.removeAtCapacity = true;
    }
    var properties = {}
    filters.forEach((filter) => {
      properties[filter] = 'true';
    });
    this.filters.query.properties = properties;
    return this;
  }

  setOrder(order) {
    this.filters.query.order = order;
    return this;
  }

  setPerPage(perPage) {
    this.filters.per_page = perPage;
    return this;
  }

  setPerPageToAllResults() {
    return this.setPerPage(this.pagingData.total_count);
  }

  nextPage() {
    this.filters.page++;
    return this;
  }

  filterAtCapacity(resources) {
    if(resources.length) {
      return resources.filter((resource) => (
        typeof resource.properties == 'undefined' 
        || typeof resource.properties['at-capacity'] == 'undefined'
        || resource.properties['at-capacity'] !== 'true'
      ));
    } else {
      return resources;
    }
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
    if(!this.removeAtCapacity) {
      this.filters.query.titles_only = 'true';
    }
    return [this.serialize(this.requiredFilters[type]), this.serialize(this.filters)].filter((item) => item!=='').join("&");
  }

  resetFilters() {
    this.filters = {
      api_key: config[process.env.OD_API_ENV].odApiKey,
      query: {
        properties: {},
        tags: []
      },
      page: 1,
      per_page: 10
    }
    this.removeAtCapacity = false;
    this.pagingData = {};
    return this;
  }

  fetchOrganizations({ callback = (data) => { } } = {}) {
    var self = this;
    this.fetch({
      callback: (data) => {
        let ids = [], filtered;

        filtered = this.removeAtCapacity ? self.filterAtCapacity(data.opportunities) : data.opportunities;

        filtered.forEach((opportunity, index) => {
          if(ids.indexOf(opportunity.organization.id) === -1) {
            ids.push(opportunity.organization.id);
          }
        });
        if(ids.length === 0) {
          ids.push(0);
        }
        self.pagingData = data.paging;

        var orgsSearch = new OneDegreeResourceQuery();
        orgsSearch
          .setIds(ids)
          .setPerPage(ids.length);
        if(self.filters && self.filters.query && self.filters.query.order) {
          orgsSearch.setOrder(self.filters.query.order);
        }
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
