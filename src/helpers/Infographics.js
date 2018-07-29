//LA, NYC, Philadelphia, San Francisco, Seattle, and Washington DC
const infographics = [
  {
    center: {
      lat: 34.056537,
      lng: -118.284006
    },
    distance: 34, //miles
    name: "Guide to Los Angeles",
    url: "https://www.asylumconnect.org/s/LA-infographic.pdf"
  },
  {
    center: {
      lat: 40.673687,
      lng: -73.989177
    },
    distance: 20, //miles
    name: "Guide to New York City",
    url: "https://www.asylumconnect.org/s/NYC-infographic.pdf"
  },
  {
    center: {
      lat: 40.002223,
      lng: -75.124199
    },
    distance: 12, //miles
    name: "Guide to Philadelphia",
    url: "https://www.asylumconnect.org/s/philly-infographic.pdf"
  },
  {
    center: {
      lat: 37.689474,
      lng: -122.284278
    },
    distance: 16, //miles
    name: "Guide to San Francisco",
    url: "https://www.asylumconnect.org/s/sf-infographic.pdf"
  },
  {
    center: {
      lat: 47.606210,
      lng: -122.332071
    },
    distance: 9, //miles
    name: "Guide to Seattle",
    url: "https://www.asylumconnect.org/s/seattle-infographic.pdf"
  },
  {
    center: {
      lat: 38.897293,
      lng: -77.037268
    },
    distance: 8, //miles
    name: "Guide to Washington, DC",
    url: "https://www.asylumconnect.org/s/DC-infographic.pdf"
  }
];

const defaultInfographic = {
  center: {
      lat: 39.810492, 
      lng: -98.556061
    },
    distance: 2680,
    name: "Legal Guides",
    list: [
      {name: "Know your rights", url:"https://www.asylumconnect.org/s/know-your-rights.pdf"},
      {name: "Legal assistance", url:"https://www.asylumconnect.org/s/legal-assistance.pdf"},
      {name: "Preliminary checklist", url:"https://www.asylumconnect.org/s/preliminary-checklist.pdf"}
    ]
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