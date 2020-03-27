import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';

import breakpoints from '../../theme/breakpoints';
import withWidth from '../withWidth';

import Section from './Section';

import Loading from '../Loading';
import 'whatwg-fetch';
import ContentMarkdown from '../../helpers/ContentMarkdown';
import {StandaloneIcon} from '../icons';
import url from 'url';
import queryString from 'query-string';
import SubAnnouncement from '../SubAnnouncement';
import {mobilePadding} from '../../theme/sharedClasses';
import LocaleSelector from '../locale/LocaleSelector';
import locale from '../../helpers/Locale';

const styles = theme => ({
  root: {
    marginBottom: '70px',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    margin: '5% 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 10%'
  },
  headline: {
    textAlign: 'center'
  },
  subtitle: {
    /*fontStyle: 'italic',*/
    marginTop: theme.spacing.unit * 4,
    textAlign: 'center'
  },
  section: {
    padding: '6% 30% 8%'
  },
  inlineBlock: {
    display: 'inline-block'
  },
  iconPadding: {
    padding: theme.spacing.unit
  },
  navigation: {
    marginTop: theme.spacing.unit * 10
  },
  localeHeader: {
    [theme.breakpoints.down('xs')]: {
      backgroundColor: theme.palette.secondary[500]
    }
  },
  subAnnouncement: {
    backgroundColor: '#e9e9e9',
    /*marginLeft: '-34px',
    paddingLeft: '34px',*/
    paddingTop: '1rem',
    paddingBottom: '1rem',
    textAlign: 'center',
    paddingLeft: '5%',
    paddingRight: '5%'
    /*position: 'absolute',
    top: '0',
    left:'0',
    right: '0'*/
  },
  [`@media (max-width: ${breakpoints['md']}px)`]: {
    section: {
      padding: '5% 5% 7%'
    },
    header: {
      padding: '0 5%'
    },
    hr: {
      margin: theme.spacing.unit + ' 5%'
    }
  },
  [`@media (max-width: ${breakpoints['sm']}px)`]: {
    marginBottom: {
      marginBottom: '5%'
    },
    navigation: {
      marginTop: theme.spacing.unit * 2
    }
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  textBold: {
    fontWeight: theme.typography.fontWeightHeavy
  },
  iconButton: {
    display: 'inline',
    height: '60px',
    width: 'auto'
  },
  logoFitHeight: {
    maxWidth: '65px',
    paddingLeft: '20px'
    //height: '100%',
  },
  subheading: {
    marginBottom: theme.spacing.unit * 4,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.title.fontSize,
      lineHeight: '1.5'
    }
  },
  [theme.breakpoints.down('xs')]: {
    subheading: {
      color: theme.palette.common.white,
      marginBottom: theme.spacing.unit * 4
    },
    containerSearchForm: Object.assign(mobilePadding(theme), {
      alignContent: 'flex-start',
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      backgroundColor: theme.palette.secondary[500]
    })
  }
});

class Static extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      locale: props.match.params.locale
    };
    this.fetchPage = this.fetchPage.bind(this);
    this.handlePageRequest = this.handlePageRequest.bind(this);
    this.handleLocaleSelect = this.handleLocaleSelect.bind(this);
  }

  componentWillMount() {
    window.scroll(0, 0);
    this.fetchPage(this.props.match.params.pageName);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.pageName !== this.props.match.params.pageName) {
      this.fetchPage(nextProps.match.params.pageName);
    }
  }

  useFreshRequest(search) {
    var query = queryString.parse(search);
    return query && query.fresh && query.fresh === 'true';
  }

  fetchPage(name) {
    fetch(
      window.location.origin +
        '/api/page/' +
        name +
        (this.useFreshRequest(window.location.search) ? '?cachebust=true' : ''),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }
    )
      .then(results => results.json())
      .then(this.handlePageRequest);
  }

  handleLocaleSelect(locale, language) {
    let redirect = false;
    switch (locale) {
      case 'es_MX':
        redirect = '/' + locale + '/page/Mexico/';
        break;
      case 'intl':
        redirect = '/intl/page/outside-US-and-Canada';
        break;
      default:
        redirect = '/';
        break;
    }

    this.setState({
      locale
    });

    if (redirect) {
      this.props.history.push(redirect);
    }
  }

  handlePageRequest(response) {
    if (response && response.status == 'success') {
      this.setState({
        loading: false,
        data: response.data
      });
    } else {
      this.props.history.push('/');
      this.props.handleMessageNew('Page not found.');
    }
  }

  render() {
    const classes = this.props.classes;
    const lastSection = this.state.data ? this.state.data.length : 0;
    const isMobile = this.props.width < breakpoints['sm'];
    const localeLabel = 'Select country';
    return (
      <div>
        {isMobile ? (
          <Grid
            container
            alignItems="center"
            justify="center"
            spacing={0}
            className={classes.localeHeader}
          >
            <Grid item xs={12}>
              <a href="https://www.asylumconnect.org">
                <IconButton className={classes.iconButton}>
                  <img
                    src={this.props.logo}
                    className={classes.logoFitHeight}
                  />
                </IconButton>
              </a>
            </Grid>
            <Grid container spacing={0} className={classes.containerSearchForm}>
              <Grid item xs={12}>
                <Typography variant="subheading" className={classes.subheading}>
                  Search for verified LGBTQ- and immigrant-friendly services
                  near you
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <LocaleSelector
                  label={localeLabel}
                  setOnChange={true}
                  locale={this.props.match.params.locale}
                  handleSelectLocale={this.handleLocaleSelect}
                  changeLocale={this.props.changeLocale}
                />
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            alignItems="center"
            justify="center"
            spacing={0}
            className={classes.localeHeader}
          >
            <Grid item xs={12} className={classes.subAnnouncement}>
              <SubAnnouncement />
            </Grid>
          </Grid>
        )}
        <div className="static--page-container">
          {this.state.loading ? (
            <Loading />
          ) : (
            <div className={classes.root}>
              <div>
                {this.state.data &&
                this.state.data.length &&
                this.state.data[0].heading &&
                this.state.data[0].heading == 'Intro' ? (
                  <div className={classes.header}>
                    <Typography variant="headline" className={classes.headline}>
                      <ContentMarkdown source={this.state.data[0].title} />
                    </Typography>
                    <Typography
                      variant="subheading"
                      className={classes.subtitle}
                    >
                      <ContentMarkdown source={this.state.data[0].caption} />
                    </Typography>
                    <Grid
                      container
                      spacing={0}
                      alignItems="flex-start"
                      justify="space-between"
                      className={classes.navigation}
                    >
                      {this.state.data.map((section, index) => {
                        return section.icon ? (
                          <Grid
                            key={index}
                            item
                            xs={3}
                            sm={2}
                            className={classes.textAlignCenter}
                          >
                            <a
                              href={'#' + section.heading.replace(/ /g, '-')}
                              className={classes.inlineBlock}
                            >
                              <StandaloneIcon
                                name={section.icon}
                                fillColor={section.color}
                                strokeColor="#000"
                                className={classes.iconPadding}
                              />
                            </a>
                            <Typography
                              variant="display4"
                              className={classes.textBold}
                            >
                              {section.heading}
                            </Typography>
                          </Grid>
                        ) : null;
                      })}
                    </Grid>
                  </div>
                ) : null}
              </div>
              <div>
                {this.state.data.map((section, index) => {
                  if (section.heading == 'Intro') return null;
                  return (
                    <div key={index}>
                      <div
                        className={classes.section}
                        id={section.heading.replace(/ /g, '-')}
                      >
                        <Section
                          color={section.color}
                          icon={section.icon}
                          type={section.heading}
                          title={section.title}
                          description={section.description}
                          resources={
                            section.resources && section.resources.length
                              ? section.resources
                              : []
                          }
                          dropdown={section.dropdown ? section.dropdown : null}
                        />
                      </div>
                      {index + 1 < lastSection ? (
                        <Grid
                          container
                          spacing={0}
                          alignItems="flex-start"
                          justify="center"
                        >
                          <Grid item xs={12} md={8}>
                            <hr className={classes.hr} />
                          </Grid>
                        </Grid>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const data = Object.freeze({
  color: '#E58C52',
  icon: 'www.google.com',
  type: 'online support',
  title: 'Looking for LGBTQ chat rooms and support online?',
  description:
    'Sample organization who offer LGBTQ people emotional and psychological support online',
  resources: [
    {
      name: "The Trevor Project's TrevorSpace",
      link: 'www.TrevorSpace.org',
      description:
        'The Trevor Project is the leading U.S. organization providing crisis intervention and suicide prevention services to lesbian, gay, bisezual, transgender, queer and questioning youth.',
      who: 'LGBTQ young people ages 13 to 24',
      how:
        'Note: Please know that visiting TrevorSpace may leave a record on your computer or browser'
    }
  ]
});

// Static.propTypes = {

// };

export default withStyles(styles)(withWidth(Static));
