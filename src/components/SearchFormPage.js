import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import AsylumConnectBackButton from './AsylumConnectBackButton';
import Disclaimer from './Disclaimer';
import LocaleForm from './LocaleForm';
import SearchForm from './SearchForm';
import SubAnnouncement from './SubAnnouncement';
import withWidth from './withWidth';
import {getLocale, isLocaleSet} from '../utils/locale';
import {breakpoints, mobilePadding} from '../theme';

const styles = (theme) => ({
  title: {
    marginBottom: theme.spacing(1),
  },
  subheading: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.h2.fontSize,
      lineHeight: '1.5',
    },
  },
  container: {
    minHeight: '500px',
    paddingTop: theme.spacing(8),
    [theme.breakpoints.down('xs')]: {
      paddingTop: 0,
    },
  },
  subAnnouncement: {
    backgroundColor: '#e9e9e9',
    marginLeft: '-34px',
    paddingLeft: '34px',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    [theme.breakpoints.down('xs')]: Object.assign(mobilePadding(theme), {
      position: 'static',
      paddingTop: '80px',
      marginLeft: '0',
    }),
  },
  containerSearchForm: {
    paddingTop: theme.spacing(8),
  },
  infographicSpacing: {},
  [theme.breakpoints.down('xs')]: {
    title: {
      color: theme.palette.common.white,
    },
    subheading: {
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
    },
    container: {
      height: '100%',
      backgroundColor: theme.palette.secondary[500],
    },
    containerSearchForm: Object.assign(mobilePadding(theme), {
      alignContent: 'flex-start',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(8),
      backgroundColor: theme.palette.secondary[500],
    }),
    infographicSpacing: {
      marginTop: '1rem',
    },
  },
  changeCountryButton: {
    marginLeft: theme.spacing(-1),
  },
  backButton: {
    position: 'fixed',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.darkBlack,
    top: '0',
    left: '0',
    right: '0',
    height: '60px',
    width: '100%',
    zIndex: '200',
    '&:hover, &:active': {
      backgroundColor: theme.palette.common.white,
    },
  },
  backButtonLabel: {
    textTransform: 'none',
    fontWeight: '600',
    justifyContent: 'left',
    fontFamily: theme.typography.h2.fontFamily,
  },
  iconButton: {
    display: 'inline',
    height: '60px',
    width: 'auto',
  },
  logoFitHeight: {
    maxWidth: '65px',
    paddingLeft: '20px',
    //height: '100%',
  },
});

class SearchFormContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      locale: isLocaleSet() ? getLocale() : false,
    };

    this.handleLocaleSelect = this.handleLocaleSelect.bind(this);
    this.handleLocaleReset = this.handleLocaleReset.bind(this);
  }

  componentWillMount() {
    if (isLocaleSet()) {
      this.handleLocaleSelect(getLocale());
    }
  }

  // First called when selecting a different country
  handleLocaleSelect(locale, language, hasLanguageChanged) {
    let redirect = false;
    switch (locale) {
      case 'en_MX':
        redirect = `/${locale}/page/Mexico/`;
        break;
      case 'intl':
        redirect = '/intl/page/outside-US-and-Canada';
        break;
      default:
        this.setState({
          locale: locale,
        });
        if (this.state.locale !== locale) {
          window.location.reload();
        }
        break;
    }

    if (redirect) {
      if (hasLanguageChanged) {
        window.location = redirect + '#googtrans(' + language + ')';
      } else {
        this.props.history.push(redirect);
      }
    } else if (hasLanguageChanged) {
      window.location.reload();
    }
  }

  handleLocaleReset() {
    this.setState({
      locale: false,
    });
  }

  render() {
    const {classes, logo, width} = this.props;
    const {locale} = this.state;
    const {
      container,
      iconButton,
      logoFitHeight,
      title,
      subheading,
      changeCountryButton,
      containerSearchForm,
      subAnnouncement,
    } = classes;
    const isMobile = width < breakpoints['sm'];
    let disclaimerProps = {};

    if (locale === 'en_US') {
      disclaimerProps.children = (
        <span>
          <strong>United States Borders Close Due to Coronavirus:</strong> On
          March 20, 2020, the United States announced the borders with Mexico
          and Canada will be closed. Asylum seekers will be turned back from all
          borders.
        </span>
      );
    } else if (locale === 'en_CA') {
      disclaimerProps.children = (
        <span>
          <strong>
            United States-Canada Border Closes Due to Coronavirus:
          </strong>{' '}
          On March 20, 2020, the US announced that travel across the border with
          Canada will be stopped. Canada will turn back asylum seekers who cross
          the US border. For more information on how COVID-19 is impacting
          refugee claims in Canada, see{' '}
          <a
            href="https://asylumconnect.org/information-on-how-covid-19-is-impacting-refugee-claims-in-canada"
            target="_blank"
            rel="noopener noreferrer"
          >
            this blog post
          </a>
          .
        </span>
      );
    }

    return (
      <div style={{position: 'relative'}}>
        {!isMobile ? (
          <div
            className={subAnnouncement}
            style={{
              marginLeft: '-' + (width - 1300) / 2 + 'px',
              paddingLeft: (width - 1300) / 2 + 'px',
            }}
          >
            <Grid
              container
              alignItems="center"
              justify={width >= breakpoints['xl'] ? 'flex-start' : 'center'}
              spacing={0}
            >
              <Grid item xs={12} sm={11} md={10} lg={10} xl={11}>
                <SubAnnouncement />
              </Grid>
            </Grid>
          </div>
        ) : null}
        <Grid
          container
          alignItems="flex-start"
          justify={width >= breakpoints['xl'] ? 'flex-start' : 'center'}
          spacing={0}
          className={container}
        >
          <Grid item xs={12} sm={11} md={10} lg={10} xl={11}>
            {!isMobile && locale ? (
              <Grid item xs={12}>
                <AsylumConnectBackButton
                  className={changeCountryButton}
                  color="default"
                  text="Choose a different country"
                  onClick={this.handleLocaleReset}
                />
              </Grid>
            ) : null}
            {isMobile ? (
              <Grid item xs={12}>
                <a href="https://www.asylumconnect.org">
                  <IconButton className={iconButton}>
                    <img
                      src={logo}
                      alt="asylumconnect logo"
                      className={logoFitHeight}
                    />
                  </IconButton>
                </a>
              </Grid>
            ) : null}
            <Grid container spacing={0} className={containerSearchForm}>
              {locale && disclaimerProps.children && <Disclaimer {...disclaimerProps} />}
              {!isMobile ? (
                <Grid item xs={12}>
                  <Typography variant="h2" className={title}>
                    {this.state.locale
                      ? this.props.t(
                          'Welcome to the United States AsylumConnect Catalog!'
                        )
                      : this.props.t('Welcome to the AsylumConnect Catalog!')}
                  </Typography>
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <Typography variant="subtitle2" className={subheading}>
                  Search for verified LGBTQ- and immigrant-friendly services
                  near you
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {locale ? (
                  <SearchForm
                    {...this.props}
                    classes={null}
                    onLocaleReset={this.handleLocaleReset}
                    onLocaleSelect={this.handleLocaleSelect}
                  />
                ) : (
                  <LocaleForm
                    {...this.props}
                    classes={null}
                    onLocaleSelect={this.handleLocaleSelect}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(withWidth(SearchFormContainer));
