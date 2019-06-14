import ValidLanguageList from './ValidLanguageList';

//LA, NYC, Philadelphia, San Francisco, Seattle, and Washington DC
const infographics = [
  {
    center: {
      lat: 34.056537,
      lng: -118.284006
    },
    distance: 34, //miles
    name: "Asylum Seeker's Guide to Los Angeles",
    url: "https://www.asylumconnect.org/s/LA-infographic.pdf"
  },
  {
    center: {
      lat: 40.673687,
      lng: -73.989177
    },
    distance: 20, //miles
    name: "Asylum Seeker's Guide to New York City",
    url: "https://www.asylumconnect.org/s/NYC-infographic.pdf"
  },
  {
    center: {
      lat: 40.002223,
      lng: -75.124199
    },
    distance: 12, //miles
    name: "Asylum Seeker's Guide to Philadelphia",
    url: "https://www.asylumconnect.org/s/philly-infographic.pdf"
  },
  {
    center: {
      lat: 37.689474,
      lng: -122.284278
    },
    distance: 16, //miles
    name: "Asylum Seeker's Guide to San Francisco",
    url: "https://www.asylumconnect.org/s/sf-infographic.pdf"
  },
  {
    center: {
      lat: 47.606210,
      lng: -122.332071
    },
    distance: 9, //miles
    name: "Asylum Seeker's Guide to Seattle",
    url: "https://www.asylumconnect.org/s/seattle-infographic.pdf"
  },
  {
    center: {
      lat: 38.897293,
      lng: -77.037268
    },
    distance: 8, //miles
    name: "Asylum Seeker's Guide to Washington, DC",
    url: "https://www.asylumconnect.org/s/DC-infographic.pdf"
  },
  {
    center: {
      lat: 34.841486, 
      lng: -92.415815
    },
    distance: 100, //miles
    name: "LGBTQ-friendly businesses in Arkansas",
    url: "https://arkansansforequality.org/business-equality-list"
  }
];

const defaultInfographic = {
  'en_CA': {
    center: {
      lat: 60.8545463, 
      lng: -98.556061
    },
    distance: 2680,
    name: "Asylum Seeker's Legal Guides",
    list: {
      default: [
        {name: "Steps to Apply for LGBTQ Asylum in Canada", url: "https://www.asylumconnect.org/s/Steps-to-Apply-for-Asylum-Canada-ENG-99tc.pdf"},
        {name: "Know Your Rights", url:"https://www.asylumconnect.org/s/Know-Your-Rights-Canada-ENG.pdf"},
        {name: "Preliminary Checklist", url:"https://www.asylumconnect.org/s/Preliminary-Checklist-Canada-ENG-4jfe.pdf"},
        
      ],
      /*fr: [
        {name: "Steps to Apply for LGBTQ Asylum in Canada", url: "https://www.asylumconnect.org/s/Steps-to-Apply-for-Asylum-Canada-ENG-99tc.pdf"},
        {name: "Know Your Rights", url:"https://www.asylumconnect.org/s/Know-Your-Rights-Canada-ENG.pdf"},
        {name: "Preliminary Checklist", url:"https://www.asylumconnect.org/s/Preliminary-Checklist-Canada-ENG-4jfe.pdf"}
      ]*/
    }

  },
  'en_US': {
    center: {
      lat: 39.810492, 
      lng: -98.556061
    },
    distance: 2680,
    name: "Asylum Seeker's Legal Guides",
    list: {
      default: [
        {name: "8 Steps to Apply for LGBTQ Asylum in the U.S.", url: "https://www.asylumconnect.org/s/8-Steps-to-Apply-for-LGBTQ-Asylum-in-the-US-English.pdf"},
        {name: "Know Your Rights", url:"https://www.asylumconnect.org/s/Know-Your-Rghts-English.pdf"},
        {name: "Finding Legal Assistance", url:"https://www.asylumconnect.org/s/legal-assistance.pdf"},
        {name: "Preliminary Checklist", url:"https://www.asylumconnect.org/s/Preliminary-Checklist-English.pdf"},
        {name: "Preparing for an LGBTQ Credible Fear Screening or Interview", url:"https://www.asylumconnect.org/s/Preparing-for-a-Credible-Fear-Interview-English.pdf"},
        {name: "Remain in Mexico Policy", url: "https://www.asylumconnect.org/s/remain-in-mexico-linked.pdf"}
      ]
    }
  }
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
  getDefaultInfographic: function(locale) {
    return typeof defaultInfographic[locale] !== 'undefined' ? defaultInfographic[locale] : false;
  }
};