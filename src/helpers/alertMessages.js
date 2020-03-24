/**
 * TODO: This is a temporary fix to aid users
 * affected by COVID-19. Once this is coming from the the api and database
 * we can delete this file
 * @type {Object}
 */

const messageRaices =
  "During the current health crisis with COVID-19, RAICES remains committed to the fight by providing critical legal, social, and advocacy services at this trying time. They do this while balancing the need to protect the people they serve, their staff, and their communities during this pandemic. RAICES is prioritizing the following at this time: Detention legal services and advocacy; Legal services for unaccompanied minors; DACA services; Legal consultation by phone; Refugee resettlement; Bond processing, if the government does not heed their request to release those in detention. Many of RAICES' legal staff work inside detention centers on a daily basis. They've established new protocols for their safety and will continue to serve in socially-distanced ways in those facilities (including through glass-pane stations). For updates check their website: https://www.raicestexas.org/latest";

const messageRusa =
  'In light of the coronavirus outbreak, RUSA LGBT is moving all of their meetings online starting the week of March 16th. All of the events you planned to attend will still happen — just remotely. Make sure to download the web conference app Zoom on your computer or phone so you can join them. Follow the announcements on their Facebook page for detailed information for each event: https://www.facebook.com/RUSA.LGBT';

const alertMessages = {
  // Ali Forney Center
  // url - /en_US/resource/ali-forney-center-new-york-ny
  6289: 'The Ali Forney Center will remain open during COVID-19. For LGBTQ+ youth experiencing the terrors of homelessness, the Center are their first responders.',
  // Attic Youth Center
  // url - /en_US/resource/the-attic-youth-center-philadelphia-pa
  4662: "In response to the COVID-19 pandemic, the Attic Youth Center has decided to close until March 27, in line with Governor Wolf's declaration closing all Pennsylvania schools. They will continue to evaluate the situation and inform the community of any changes. Visit their website for updates: https://www.atticyouthcenter.org",
  // Capital Area Immigrants' Rights (CAIR) Coalition
  // url - /en_US/resource/apital-area-immigrants-rights-cair-coalition-washington-dc
  4712: 'In response to the coronavirus, CAIR has put into effect contingency plans to provide legal services as well as access to their detention hotline to the thousands of adults and children detained in the region while working remotely. Check their social media and website for updates.',
  // Casa Ruby
  // url - /en_US/resource/casa-ruby-washington-dc
  4705: 'Casa Ruby will keep their doors open during the coronavirus (COVID-19). They cannot close as they serve as a home for LGBTQ youth experiencing homelessness and vulnerability. They are taking every step possible to protect their youths and staff to limit exposure.',
  // DC LGBT Center (Center Global)
  // url - /en_US/resource/dc-lgbt-center-center-global-washington-dc
  4656: 'Taking guidance and recommendations about social distancing from the DC government and the CDC, effective March 16th, The DC Center for the LGBT Community’s office will be closed. Staff are still working remotely, and will be checking emails and voicemails multiple times each day. Reach out to supportdesk@thedccenter.org to connect with the DC Center, as they are still able to provide services and support. If you are interested in attending support groups remotely, reach out to your facilitator or supportdesk@thedccenter.org and the Center can provide options for remote meetings using conference lines.',
  // Heartland Alliance's National Immigrant Justice Center (NIJC), LGBTQ Immigrant Rights Initiative
  // url - /en_US/resource/heartland-alliance-s-national-immigrant-justice-center-nijc-lgbtq-immigrant-rights-initiative-chicago-il
  5317: "If you need to call NIJC's hotline on behalf of a detained family member: Instead of using the hotline number at this time, email NIJC for LGBTQ immigrants at: LGBTimmigrants@heartlandalliance.org. Note: NIJC continues to monitor the recommendations of the Centers for Disease Control and Illinois Department of Public Health, and will announce further changes as necessary. Staff who are able to fulfill their duties remotely are working from home, and all are being encouraged to follow the CDC’s health and wellness guidelines. Check their website for updates.",
  // HIAS Pennsylvania
  // url - /en_US/resource/hias-pennsylvania-philadelphia-pa
  4637: 'HIAS Pennsylvania is open for business during the outbreak of COVID-19. While taking appropriate precautions, including working remotely whenever possible, HIAS Pennsylvania staff is still working hard to help their clients. They continue to do intake and provide immigration legal support to all those they can possibly serve. They continue to help immigrants gain the legal status for which they are eligible. HIAS is also working hard as ever to ensure that their clients have employment, housing, and other social support. While HIAS has cancelled all in-person events, some events have moved to virtual platforms. They will be sending e-blasts about these events and posting information on their website and their Facebook page.',
  // Immigration Equality
  // url - /en_US/resource/immigration-equality-new-york-ny
  4740: "Due to the spread of novel coronavirus (COVID-19), Immigration Equality's staff is working remotely, but their phone lines are operating as usual. Hotline for people calling from detention only: 917-654-9696 (open 9:30am-5:30pm Monday through Friday). General requests and other legal help: 212-714-2904 (open 1:00pm-4:00pm Monday and Wednesday; 10:00am –1:00pm Friday). Client meetings will take place over the phone instead of at the office, and according to their existing policy, walk-ins are still not accepted. More detailed information will be posted on their website: https://www.immigrationequality.org",
  // Lambert House
  // url - /en_US/resource/lambert-house-seattle-wa
  4676: 'Lambert House is temporarily closed due to COVID-19 until further notice. Check their website for updates.',
  // Oasis Legal Services
  // url - /en_US/resource/oasis-legal-services-oakland-ca
  5064: 'As concerns mount about the spread of coronavirus (COVID-19), the health and safety of their clients, volunteers, and staff are important to Oasis Legal Services. Oasis staff will not be shaking hands or giving hugs. Please understand that this is a precaution in order to keep their staff and clients safe, and please do not be offended. Their staff has also been advised to wash their hands often and is regularly disinfecting frequently touched surfaces. Hand sanitizer and tissues are available throughout their office. In addition, Oasis asks that their clients and other office visitors assist them in preventing the spread of COVID-19. If you are not feeling well in any way, stay home and contact Oasis to reschedule your appointment or arrange to meet with their staff by phone or email. Oasis is closely monitoring the situation and acting in accordance with the latest medical guidelines. At this time, there are no disruptions to their day-to-day operations. Oasis remains committed to ensuring that their clients are able to access legal assistance. As the situation develops, they will keep the community informed of any changes. Check their website for updates.',
  // Raices de Mexico
  // url - /en_US/resource/raices-de-mexico
  1800: messageRaices,
  // RAICES
  // url - /en_US/resource/raices-san-antonio-texas
  5297: messageRaices,
  // RAICES - Austin
  // url - /en_US/resource/raices-austin-austin-tx
  5305: messageRaices,
  // RAICES - Corpus Christi
  // url - /en_US/resource/raices-corpus-christi-corpus-christi-tx
  5309: messageRaices,
  // RAICES - Dallas
  // url - /en_US/resource/raices-dallas-dallas-tx
  5306: messageRaices,
  // RAICES - Fort Worth
  // url - /en_US/resource/raices-fort-worth-fort-worth-tx
  5308: messageRaices,
  // RAICES - Houston
  // url - /en_US/resource/raices-houston-houston-tx
  5307: messageRaices,
  // RAICES - San Antonio Central
  // url - /en_US/resource/raices-san-antonio-central-san-antonio-tx
  5303: messageRaices,
  // RAICES - San Antonio North
  // url - /en_US/resource/raices-san-antonio-north-san-antonio-tx
  5304: messageRaices,
  // Rainbow Center
  // url - /en_US/resource/rainbow-center-tacoma-wa
  4734: "Because of the current cluster of COVID-19 cases in their area and the increasing call for social distancing, Rainbow Center will be suspending its community hours and RC groups effective immediately through April 24th. They are working on alternative ways to meet the community's needs, such as virtual group meetings and friendly check-in calls. The staff is available by phone and email throughout this time- especially for their advocacy clients. Check their website for details.",
  // RIF Asylum Support
  // url - /en_US/resource/rif-asylum-support-new-york-ny
  4766: 'In response to the current pandemic, RIF Asylum Support is updating their website and social media twice a day with the latest information related to COVID-19. Check their website and social media for updates on changes to their services. For more details, read their COVID-19 resource page (https://www.rifnyc.org/covid19-resources_en). If these resources are confusing, a member of their rapid-response team can help you. Email them at info@rifnyc.org.',
  // RUSA LGBT
  // url - /en_US/resource/rusa-lgbt-new-york-ny
  4765: messageRusa,
  // RUSA LGBT DC
  // url - /en_US/resource/rusa-lgbt-dc-washington-dc
  5672: messageRusa,
  // RUSA LGBT Boston
  // url - /en_US/resource/rusa-lgbt-boston-boston-ma
  5673: messageRusa,
  // SMYAL
  // url - /en_US/resource/smyal-washington-dc
  4711: 'Beginning Monday, March 16th, SMYAL main offices will begin working remotely while continuing to offer vital programs for LGBTQ youth virtually. Check their website for updates: https://smyal.org/virtualprograms/virtual-programming',
  // The LGBT Asylum Project
  // url - /en_US/resource/the-lgbt-asylum-project-san-francisco-ca
  4728: 'The LGBT Asylum Project will continue working remotely with their current clients via email and postal service. They will resume regular operations once public health authorities advise that it is safe to do so. If you have an urgent concern regarding your immigration case, email them at info@lgbtasylumproject.org and they will do their best to assist you. *Note that the San Francisco Asylum Office is currently closed to the public until April 7th. All asylum interviews that have been scheduled between now and April 7th will be cancelled and rescheduled. Applicants will receive interview cancellation notices and new interview notices in the mail within the next few weeks. Also note that the biometrics office is also closed. Applicants will receive new biometrics appointments in the mail for fingerprinting.',
  // The Lesbian, Gay, Bisexual & Transgender Community Center
  // url - /en_US/resource/the-lesbian-gay-bisexual-transgender-community-center-new-york-ny
  4731: "Due to COVID-19, the Center is currently closed but is offering services remotely. The Center's Information & Referral team is now staffing virtual “front desks” from their homes, with the Center's phone lines open at 212.620.7310 from 9 a.m. to 10 p.m., Monday through Saturday, and 9 a.m. to 9 p.m. on Sundays. The team has prepared COVID-19-specific referral guides for existing services and options spanning housing, food, recovery, family support, HIV testing and more. In the next week, the Center will launch a page on their website to share all of these crucial resources and make them more publicly accessible: https://gaycenter.org/coronavirus-update",
  // Trans Lifeline
  // url - /en_US/resource/trans-lifeline-oakland-ca
  5361: "Trans Lifeline's hotline services will stay up and are running normally during COVID-19. Their staff and volunteers work from home, so they're able to follow social distancing.",
  // Trevor Project
  // url - /en_US/resource/the-trevor-project
  1187: "All of the Trevor Project's programs will continue providing services uninterrupted during the COVID-19 pandemic. Lifeline counselors will be taking calls from their homes.",
  // Wanda Alston Foundation
  // url - /en_US/resource/the-wanda-alston-foundation-washington-dc
  4710: 'The Wanda Alston Foundation is still open during COVID-19. Their staff will continue to provide critical and life-saving housing and support to vulnerable LGBTQ youth who are experiencing homelessness. Based on the guidance of the CDC and the Department of Health, they have stocked up on food, water, and critical supplies for hand-washing, for cleaning and for maintaining safety at their facility. They are working especially hard to prevent further transmission of this virus during this pandemic and they are striving to limit its impact on homeless LGBTQ youth.',
  // Whitman-Walker Health
  // url - /en_US/resource/whitman-walker-health-washington-dc
  4655: "Effective Monday, March 23rd through Friday, May 29th: Whitman-Walker will operate in-person respiratory clinics to treat their patients who are affected by COVID-19 at Whitman-Walker at 1525 at 1525 14th Street, NW and at Max Robinson Center at 2301 Martin Luther King Jr. Avenue, SE. They will also have emergency dental care available at 1525 14th Street, NW. Call their main line at 202.745.7000 for more information. The only in-person appointments that they will schedule at this time are those that support the respiratory clinics. To reduce risk of exposure to COVID-19, do NOT arrive more than 15 minutes early for your appointment. Check Whitman-Walker Health's website for updates on any changes to their services due to COVID-19.",
  // William Way LGBT Community Center
  // url - /en_US/resource/william-way-lgbt-community-center-philadelphia-pa
  4639: 'As of 2PM on Saturday, March 14th, the Center has decided to close their limited 12-5PM public hours in the lobby to further limit the spread of COVID-19 (coronavirus) through their communities. They are also closing the Center to keyholders for 12 step meetings. If you are in need of support or connection, they encourage you to reach out to the Center. You can call the Center at 215-732-2220 and leave a message with voice mail, and they will call you back as quickly as possible. You can also email the Center (at info@waygay.org), and your message will be forwarded to the right person. Or you can message the Center on Facebook or Instagram, which they will be checking regularly. The Center will also post updates there as needed.'
};

export const getResourceAlertMessage = resource => {
  if (resource && resource.id && alertMessages[resource.id]) {
    return alertMessages[resource.id];
  }

  return '';
};
