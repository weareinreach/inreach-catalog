import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';
import config from '../config/config.js';
import ResourceTypes from './ResourceTypes';
import locale from './Locale';

const serviceProperties = {
  en_CA: [
    'service-state-alberta',
    'service-state-british-columbia',
    'service-state-manitoba',
    'service-state-new-brunswick',
    'service-state-newfoundland-and-labrador',
    'service-state-northwest-territories',
    'service-state-nova-scotia',
    'service-state-nunavut',
    'service-state-ontario',
    'service-state-prince-edward-island',
    'service-state-quebec',
    'service-state-saskatchewan',
    'service-state-yukon'
  ]
};

class OneDegreeResourceQuery {
  constructor() {
    this.resetFilters();
    this.baseURL = config[process.env.OD_API_ENV].odrs;
    //this.allResultsReturned = false;
    this.removeAtCapacity = false;
    this.pagingData = {};
    this.requiredFilters = {
      opportunities: {
        query: {
          properties: {
            'community-asylum-seeker': 'true',
            'community-lgbt': 'true'
            //'approval-asylumconnect': 'true'
          },
          match: 'properties'
        }
      },
      organizations: {
        extended: 'true'
      }
    };

    this.filterResults = this.filterResults.bind(this);
  }

  /**
   * [addTags description]
   * @param {[Array]} tags an array of tags
   */
  addTags(tags) {
    ResourceTypes.types.forEach(tag => {
      if (
        ((tag.title && tags.indexOf(tag.title) >= 0) ||
          tags.indexOf(tag.category) >= 0) &&
        (typeof tag.iconOnly == 'undefined' || tag.iconOnly == false) &&
        this.filters.query.tags.indexOf(tag.odTag) < 0
      ) {
        this.filters.query.tags.push(tag.odTag);
      }
    });
    /*if(this.filters.query.tags.length && this.filters.query.tags.indexOf('Case management') < 0) {
      this.filters.query.tags.push('Case management');
    }*/
    /*tags.forEach((tag) => {
      this.filters.query.tags = this.filters.query.tags.concat(tag.split(','));
    });*/
    return this;
  }

  areAllResultsReturned() {
    return this.pagingData.current_page == this.pagingData.total_pages;
  }

  filterAtCapacity(resources) {
    if (resources.length) {
      return resources.filter(
        resource =>
          typeof resource.properties == 'undefined' ||
          typeof resource.properties['at-capacity'] == 'undefined' ||
          resource.properties['at-capacity'] !== 'true'
      );
    } else {
      return resources;
    }
  }

  filterResults(resources) {
    let filter = item => true;
    if (resources.length) {
      switch (locale.getLocale()) {
        case 'en_CA':
          filter = resource => {
            return (
              typeof resource.properties !== 'undefined' &&
              typeof serviceProperties.en_CA !== 'undefined' &&
              this.hasServiceProperty(
                serviceProperties.en_CA,
                Object.keys(resource.properties).filter(
                  key => key.indexOf('service-state') == 0
                )
              ) &&
              (!this.removeAtCapacity ||
                (this.removeAtCapacity &&
                  resource.properties['at-capacity'] !== 'true'))
            );
          };
          break;
        case 'en_US':
        default:
          filter = resource => {
            return (
              typeof resource.properties !== 'undefined' &&
              typeof serviceProperties.en_CA !== 'undefined' &&
              !this.hasServiceProperty(
                serviceProperties.en_CA,
                Object.keys(resource.properties).filter(
                  key => key.indexOf('service-state') == 0
                )
              ) &&
              (!this.removeAtCapacity ||
                (this.removeAtCapacity &&
                  resource.properties['at-capacity'] !== 'true'))
            );
          };
          break;
      }
      return resources.filter(filter);
    } else {
      return resources;
    }

    /*if(resources.length) {
      return resources.filter((resource) => (
        typeof resource.properties == 'undefined' 
        || typeof resource.properties['at-capacity'] == 'undefined'
        || resource.properties['at-capacity'] !== 'true'
      ));
    } else {
      return resources;
    }*/
  }

  hasServiceProperty(list, resourceProperties) {
    return (
      resourceProperties.filter(value => -1 !== list.indexOf(value)).length > 0
    );
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
    if (filters.indexOf('at-capacity') !== -1) {
      filters.splice(filters.indexOf('at-capacity'), 1);
      this.removeAtCapacity = true;
    }
    var properties = {};
    filters.forEach(filter => {
      properties[filter] = 'true';
    });
    this.filters.query.properties = properties;
    return this;
  }

  setOrder(order) {
    this.filters.query.order = order;
    return this;
  }

  setState(state) {
    this.filters.query.state = state;
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
    if (this.filters.page < this.pagingData.total_pages) {
      this.filters.page++;
      return true;
    } else {
      return false;
    }
  }

  serialize(obj, prefix) {
    var str = [],
      p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix
            ? prefix +
              '[' +
              (Number.isInteger(parseInt(p)) && parseInt(p).toString() === p
                ? ''
                : p) +
              ']'
            : p,
          v = obj[p];
        str.push(
          v !== null && typeof v === 'object'
            ? this.serialize(v, k)
            : encodeURIComponent(k) + '=' + encodeURIComponent(v)
        );
      }
    }
    return str.filter(item => item !== '').join('&');
  }

  buildFilters(type = 'opportunities') {
    if (!this.removeAtCapacity) {
      this.filters.query.titles_only = 'true';
    }
    return [
      this.serialize(this.requiredFilters[type]),
      this.serialize(this.filters)
    ]
      .filter(item => item !== '')
      .join('&');
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
    };
    this.removeAtCapacity = false;
    this.pagingData = {};
    return this;
  }

  fetchOrganizations({callback = data => {}} = {}) {
    var self = this;
    this.fetch({
      callback: data => {
        let ids = [],
          filtered;

        filtered = self.filterResults(data.opportunities); //this.removeAtCapacity ? self.filterAtCapacity(data.opportunities) : data.opportunities;

        filtered.forEach((opportunity, index) => {
          if (ids.indexOf(opportunity.organization.id) === -1) {
            ids.push(opportunity.organization.id);
          }
        });
        if (ids.length === 0) {
          ids.push(0);
        }
        self.pagingData = data.paging;

        var orgsSearch = new OneDegreeResourceQuery();
        orgsSearch
          .setIds(ids)
          .setLocation({
            lat: self.filters.query.lat,
            lng: self.filters.query.long
          })
          .setOrder(self.filters.query.order)
          .setState(self.filters.query.state)
          .setPerPage(ids.length);
        if (self.filters && self.filters.query && self.filters.query.order) {
          orgsSearch.setOrder(self.filters.query.order);
        }
        orgsSearch.fetch({
          type: 'organizations',
          callback: callback
        });
      }
    });
  }

  fetch({type = 'opportunities', callback = data => {}} = {}) {
    if (type == 'both') {
      let aggregateList = [];
      fetchJsonp(
        this.baseURL +
          'organizations.jsonp?' +
          this.buildFilters('organizations')
      )
        .then(function(res) {
          return res.json();
        })
        .then(organizations => {
          aggregateList = aggregateList.concat(organizations.organizations);
          return fetchJsonp(
            this.baseURL +
              'opportunities.jsonp?' +
              this.buildFilters('opportunities')
          );
        })
        .then(function(res) {
          return res.json();
        })
        .then(opportunities => {
          return aggregateList.concat(opportunities.opportunities);
        })
        .then(callback);
      return this;
    } else {
      fetchJsonp(this.baseURL + type + '.jsonp?' + this.buildFilters(type))
        .then(function(res) {
          return res.json();
        })
        .then(callback);
      return this;
    }
  }
}

export default OneDegreeResourceQuery;
