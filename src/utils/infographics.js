//LA, NYC, Philadelphia, San Francisco, Seattle, and Washington DC
const infographics = [
  {
    center: {
      lat: 34.056537,
      lng: -118.284006,
    },
    distance: 34, //miles
    name: "Asylum Seeker's Guide to Los Angeles",
    url:
      'http://asylumconnect.org/wp-content/uploads/2019/10/LAinfographic-1_compressed.pdf',
  },
  {
    center: {
      lat: 40.673687,
      lng: -73.989177,
    },
    distance: 20, //miles
    name: "Asylum Seeker's Guide to New York City",
    url:
      'http://asylumconnect.org/wp-content/uploads/2019/10/NYCinfographic-2_compressed.pdf',
  },
  {
    center: {
      lat: 40.002223,
      lng: -75.124199,
    },
    distance: 12, //miles
    name: "Asylum Seeker's Guide to Philadelphia",
    url:
      'http://asylumconnect.org/wp-content/uploads/2019/10/phillyinfographic-1_compressed.pdf',
  },
  {
    center: {
      lat: 37.689474,
      lng: -122.284278,
    },
    distance: 16, //miles
    name: "Asylum Seeker's Guide to San Francisco",
    url:
      'http://asylumconnect.org/wp-content/uploads/2019/10/sfinfographic-1_compressed.pdf',
  },
  {
    center: {
      lat: 47.60621,
      lng: -122.332071,
    },
    distance: 9, //miles
    name: "Asylum Seeker's Guide to Seattle",
    url:
      'http://asylumconnect.org/wp-content/uploads/2019/10/seattleinfographic-1_compressed.pdf',
  },
  {
    center: {
      lat: 38.897293,
      lng: -77.037268,
    },
    distance: 8, //miles
    name: "Asylum Seeker's Guide to Washington, DC",
    url:
      'http://asylumconnect.org/wp-content/uploads/2019/10/DCinfographic-1_compressed.pdf',
  },
  {
    center: {
      lat: 33.5756718,
      lng: -112.0454771,
    },
    distance: 24, //miles
    name: "Asylum Seeker's Guide to Phoenix, AZ",
    url:
      'http://asylumconnect.org/wp-content/uploads/2019/10/PhoenixArizonaCityGuideEnglish_compressed.pdf',
  },
  {
    center: {
      lat: 34.841486,
      lng: -92.415815,
    },
    distance: 100, //miles
    name: 'LGBTQ-friendly businesses in Arkansas',
    url: 'https://arkansansforequality.org/business-equality-list',
  },
];

const defaultInfographic = {
  en_CA: {
    center: {
      lat: 60.8545463,
      lng: -98.556061,
    },
    distance: 2680,
    name: "Asylum Seeker's Legal Guides",
    list: {
      default: [
        {
          name: 'Steps to Make a LGBTQ Refugee Protection Claim in Canada',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/10/canadastepstoasylum-compressed.pdf',
        },
        {
          name: 'Know Your Rights',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/10/knowyourrightscanada_compressed.pdf',
        },
        {
          name: 'Preliminary Document Checklist',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/10/preliminarychecklistcanada_compressed.pdf',
        },
      ],
      fr: [
        {
          name: 'Steps to Make a LGBTQ Refugee Protection Claim in Canada',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/10/E%CC%81tapesa%CC%80suivrepourdemanderlasile-Canada_compressed.pdf',
        },
        {
          name: 'Know Your Rights',
          url:
            'https://asylumconnect.org/wp-content/uploads/2020/02/Know-Your-Rights-Canada-French-compressed.pdf',
        },
        {
          name: 'Preliminary Document Checklist',
          url:
            'https://asylumconnect.org/wp-content/uploads/2020/07/translated-preliminarychecklistcanada_compressed-compressed.pdf',
        },
      ],
    },
  },
  en_US: {
    center: {
      lat: 39.810492,
      lng: -98.556061,
    },
    distance: 2680,
    name: "Asylum Seeker's Legal Guides",
    list: {
      default: [
        {
          name: 'Steps to Apply for LGBTQ Asylum in the U.S.',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/10/8stepslinked-min.pdf',
        },
        {
          name: 'About The U.S. Defensive Asylum Process',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/10/about-the-defensive-asylum-process-in-the-united-states-2_compressed.pdf',
        },
        {
          name: 'Know Your Rights',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/10/knowyourrightsenglish_compressed.pdf',
        },
        {
          name: 'Seeking Legal Assistance',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/10/SeekinglegalassistanceEnglish-_compressed.pdf',
        },
        {
          name: 'Preliminary Document Checklist',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/10/PreliminaryChecklistEnglish-_compressed.pdf',
        },
        {
          name: 'Preparing for an LGBTQ Credible Fear Screening or Interview',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/10/CredibleFearInteviewEnglish_compressed.pdf',
        },
        {
          name: 'Remain in Mexico Policy',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/11/remain-in-mexico-linked-1_compressed.pdf',
        },
      ],
      ar: [
        {
          name: 'Know Your Rights',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/10/knowyourrightsarabic-_compressed.pdf',
        },
        {
          name: 'Seeking Legal Assistance',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/10/legalassistancearabic-_compressed.pdf',
        },
      ],
      ru: [
        {
          name: 'Know Your Rights',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/10/knowyourrightsrussian_compressed-1.pdf',
        },
        {
          name: 'Seeking Legal Assistance',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/10/russianlegalassistance-_compressed.pdf',
        },
      ],
      es: [
        {
          name: 'Steps to Apply for LGBTQ Asylum in the U.S.',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/10/8StepstoApplyforLGBTQAsylumintheU.S.Spanish-min.pdf',
        },
        {
          name: 'About The U.S. Defensive Asylum Process',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/10/U.S.DefensiveAsylumProcessEspanol.pdf',
        },
        {
          name: 'Know Your Rights',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/10/KnowYourRightsSpanish-_compressed.pdf',
        },
        {
          name: 'Seeking Legal Assistance',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/10/legalassistancespanish-_compressed.pdf',
        },
        {
          name: 'Preliminary Document Checklist',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/10/preliminarychecklistspanish-1_compressed.pdf',
        },
        {
          name: 'Remain in Mexico Policy',
          url:
            'http://asylumconnect.org/wp-content/uploads/2019/11/remain-in-mexico-spanish-2_compressed.pdf',
        },
      ],
    },
  },
};

const milesToMeters = function (miles) {
  return miles * 1609.34;
};

//fetch nearest infographic
//  nearest = defaultInfographic;
//  confirm google, window.google.maps, ... exists
//
export default {
  fetchNearestInfographic: function (lat, lng) {
    if (
      typeof google === 'undefined' ||
      !window.google.maps ||
      !window.google.maps.geometry
    ) {
      return false;
    }
    let referencePoint = new window.google.maps.LatLng(lat, lng);
    let nearestInfographic = false;
    infographics.some((infographic, index) => {
      if (
        window.google.maps.geometry.spherical.computeDistanceBetween(
          referencePoint,
          new window.google.maps.LatLng(
            infographic.center.lat,
            infographic.center.lng
          )
        ) <= milesToMeters(infographic.distance)
      ) {
        nearestInfographic = infographic;
        return true;
      }

      return false;
    });
    return nearestInfographic;
  },
  getDefaultInfographic: function (locale) {
    return typeof defaultInfographic[locale] !== 'undefined'
      ? defaultInfographic[locale]
      : false;
  },
};
