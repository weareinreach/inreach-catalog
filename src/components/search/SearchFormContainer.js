import React from 'react';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';

import SearchForm from './SearchForm';
import LocaleForm from '../locale/LocaleForm';
import AsylumConnectBackButton from "../AsylumConnectBackButton";
import AsylumConnectInfographicButton from "../AsylumConnectInfographicButton";
import withWidth from '../withWidth';
import locale from '../../helpers/Locale';
import breakpoints from '../../theme/breakpoints';
import {mobilePadding} from '../../theme/sharedClasses';
import SubAnnouncement from '../SubAnnouncement';

const styles = theme => ({
  title: {
    marginBottom: theme.spacing.unit
  },
  subheading: {
    marginBottom: theme.spacing.unit * 4
  },
  container: {
    minHeight: '500px',
    paddingTop: theme.spacing.unit * 8,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 0
    }
  },
  subAnnouncement: {
    backgroundColor: '#e9e9e9',
    marginLeft: '-34px',
    paddingLeft: '34px',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    position: 'absolute',
    top: '0',
    left:'0',
    right: '0',
    [theme.breakpoints.down('xs')]: Object.assign(mobilePadding(theme), {
      position: 'static',
      paddingTop: "80px",
      marginLeft: '0'
    }),
  },
  containerSearchForm: {
    paddingTop: theme.spacing.unit * 8
  },
  infographicSpacing: {},
  [theme.breakpoints.down('xs')]: {
    title: {
      color: theme.palette.common.white
    },
    subheading: {
      color: theme.palette.common.white,
      marginBottom: theme.spacing.unit * 4
    },
    container: {
      height: "100%",
      backgroundColor: theme.palette.secondary[500]
    },
    containerSearchForm: Object.assign(mobilePadding(theme), {
      paddingTop: theme.spacing.unit * 4,
      paddingBottom: theme.spacing.unit * 8,
      height: "75vh",
      backgroundColor: theme.palette.secondary[500]
    }),
    infographicSpacing: {
      marginTop: '1rem'
    }
  },
  changeCountryButton: {
    marginLeft: theme.spacing.unit * -1
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
      backgroundColor: theme.palette.common.white
    }
  },
  backButtonLabel: {
    textTransform: "none",
    fontWeight: "600",
    justifyContent: "left",
    fontFamily: theme.typography.title.fontFamily
  }
});

class SearchFormContainer extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      locale: (locale.isLocaleSet() ? locale.getLocale() : false)
    }

    this.handleLocaleSelect = this.handleLocaleSelect.bind(this);
    this.handleLocaleReset = this.handleLocaleReset.bind(this);
  }

  componentWillMount() {
    if(locale.isLocaleSet()) {
      this.handleLocaleSelect(locale.getLocale());
    }
  }

  handleLocaleSelect(locale, language, hasLanguageChanged) {
    let redirect = false;
    switch(locale) {
      case 'es_MX':
        redirect = "/"+locale+"/page/Mexico/";
      break;
      case 'intl':
        redirect = "/intl/page/outside-US-and-Canada";
      break;
      default: 
      this.setState({
        locale: locale
      });
      break;
    }

    if(redirect) {
      if(hasLanguageChanged) {
        window.location=redirect+'#googtrans('+language+')';
      } else {
        this.props.history.push(redirect)
      }
    } else if(hasLanguageChanged) {
      location.reload()
    }
    
  }

  handleLocaleReset() {
    this.setState({
      locale: false
    });
  }

  render() {
    const { 
      container, 
      title, 
      subheading, 
      backButton, 
      backButtonLabel, 
      changeCountryButton,
      containerSearchForm, 
      infographicSpacing, 
      subAnnouncement} = this.props.classes; //console.log(this.props.width, breakpoints['sm']);
    const isMobile = this.props.width < breakpoints['sm'];
    return (
      <div style={{position: 'relative'}}>
        {! isMobile ? <div className={subAnnouncement} style={{marginLeft: '-'+(this.props.width - 1300)/2 + 'px', paddingLeft: (this.props.width - 1300)/2 + 'px'}}>
          <Grid container alignItems='center' justify={this.props.width >= breakpoints['xl'] ? 'flex-start' : 'center'} spacing={0}>
            <Grid item xs={12} sm={11} md={10} lg={10} xl={11}>
              <SubAnnouncement />
            </Grid>
          </Grid>
        </div> 
        : null}
        {isMobile && !this.state.locale ? 
          <Button href="http://asylumconnect.org" classes={{root: backButton, label: backButtonLabel }}>
            <ArrowBackIcon />&nbsp;Back to AsylumConnect Home Site
          </Button>
        : null}
        {isMobile && this.state.locale ? 
          <Button onClick={this.handleLocaleReset} classes={{root: backButton, label: backButtonLabel }}>
            <ArrowBackIcon />&nbsp;Choose a different country
          </Button>
        : null}
        <Grid container alignItems='flex-start' justify={this.props.width >= breakpoints['xl'] ? 'flex-start' : 'center'} spacing={0} className={container}>
          <Grid item xs={12} sm={11} md={10} lg={10} xl={11}>
            {isMobile ? 
              <Grid item xs={12} className={subAnnouncement} >
                <SubAnnouncement />
              </Grid>
            : null}
            {!isMobile && this.state.locale ?
              <Grid item xs={12}>
                <AsylumConnectBackButton className={changeCountryButton} color='default' text="Choose a different country" onClick={this.handleLocaleReset} />
              </Grid>
            : null}
            <Grid container spacing={0} className={containerSearchForm} >
              <Grid item xs={12}>
                {this.state.locale ?
                  <Typography variant="title" className={title}>
                    {this.props.t('Welcome to the United States AsylumConnect catalog!')}
                  </Typography>
                :
                  <Typography variant="title" className={title}>
                    {this.props.t('Welcome to the AsylumConnect catalog!')}
                  </Typography>
                }
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subheading" className={subheading}>
                  Search for verified LGBTQ- and immigrant-friendly services near you
                </Typography>
              </Grid>
              <Grid item xs={12}>
              {this.state.locale ?
                <SearchForm {...this.props} classes={null} onLocaleReset={this.handleLocaleReset} />
              :
                <LocaleForm {...this.props} classes={null} onLocaleSelect={this.handleLocaleSelect} /> 
              }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default withWidth(withStyles(styles)(SearchFormContainer));
