//LA, NYC, Philadelphia, San Francisco, Seattle, and Washington DC
const infographics = [
  {
    center: {
      lat: 34.056537,
      lng: -118.284006
    },
    distance: 34, //miles
    name: "Los Angeles",
    url: "https://www.asylumconnect.org/infographic/los-angeles"
  },
  {
    center: {
      lat: 40.673687,
      lng: -73.989177
    },
    distance: 20, //miles
    name: "New York City",
    url: "https://www.asylumconnect.org/infographic/new-york-city"
  },
  {
    center: {
      lat: 40.002223,
      lng: -75.124199
    },
    distance: 12, //miles
    name: "Philadelphia",
    url: "https://www.asylumconnect.org/infographic/philadelphia"
  },
  {
    center: {
      lat: 37.689474,
      lng: -122.284278
    },
    distance: 16, //miles
    name: "San Francisco",
    url: "https://www.asylumconnect.org/infographic/san-francisco"
  },
  {
    center: {
      lat: 47.606210,
      lng: -122.332071
    },
    distance: 9, //miles
    name: "Seattle",
    url: "https://www.asylumconnect.org/infographic/seattle"
  },
  {
    center: {
      lat: 38.897293,
      lng: -77.037268
    },
    distance: 8, //miles
    name: "Washington, DC",
    url: "https://www.asylumconnect.org/infographic/washington-dc"
  }
];

const defaultInfographic = {
  center: {
      lat: 39.810492, 
      lng: -98.556061
    },
    distance: 2680,
    name: "the U.S.",
    url: ""
};

const milesToMeters = function(miles) {
  return miles * 1609.34;
}

//fetch nearest infographic
//  nearest = defaultInfographic;
//  confirm google, google.maps, ... exists
//  
export default {
  fetchNearestInfographic: function(lat, lng) {
    if(typeof google === 'undefined' || !google.maps || !google.maps.geometry) {
      return false;
    }
    let referencePoint = new google.maps.LatLng(lat, lng);
    let nearestInfographic = false;
    infographics.some((infographic, index) => {
      if(google.maps.geometry.spherical
          .computeDistanceBetween(
            referencePoint, 
            new google.maps.LatLng(infographic.center.lat, infographic.center.lng)
          ) <= milesToMeters(infographic.distance)
      ) {
        nearestInfographic = infographic;
        return true;
      }
    });
    return nearestInfographic;
  },
  getDefaultInfographic: function() {
    return defaultInfographic;
  }
};