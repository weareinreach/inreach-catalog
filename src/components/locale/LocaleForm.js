import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Language from '../navigation/Language';

import Fa from 'react-fontawesome';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';

import { Link } from 'react-router-dom';

import AsylumConnectSelector from '../AsylumConnectSelector';
import AsylumConnectDropdownListItem from '../AsylumConnectDropdownListItem';
import AsylumConnectButton from '../AsylumConnectButton';
import withWidth from '../withWidth';
import locale from '../../helpers/Locale';

import breakpoints from '../../theme/breakpoints';
import {searchInput, searchInputMobile, mobilePadding} from '../../theme/sharedClasses';

const styles = theme => ({
  inputClass: Object.assign(searchInput(theme), {
    cursor: 'pointer',
    position: 'relative',
    boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
    marginBottom: '0',
    //boxShadow: '-10px 0px 0px 0px rgba(255,255,255,1), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.down('md')]: {
      boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
      borderLeft: "none"
    },
    [theme.breakpoints.down('xs')]: searchInputMobile(theme)
  }),
  listContainerClass: {
    width: '100%!important'
  },
  labelRow: {
    marginBottom: theme.spacing.unit
  },
  formRow: {
    marginBottom: theme.spacing.unit * 3
  },
  callout: {
    color: theme.palette.primary[500]
  },
  underline: {
    textDecoration: 'underline',
    '&:hover': {
      color: theme.palette.primary[900]
    }
  },
  [theme.breakpoints.down('xs')]: {
    searchButton: {
      textAlign: "center"
    },
    body2: {
      color: theme.palette.common.white
    },
    link: {
      color: theme.palette.common.white,
      textDecoration: 'underline'
    },
    formContainer: {
      paddingBottom: theme.spacing.unit * 8,
      backgroundColor: theme.palette.common.white,
      marginTop: theme.spacing.unit
    }
  }
});

const supportedLocales = [
  {name: "🇨🇦 Canada", code: "en_CA"},
  {name: "🇲🇽 Mexico", code: "es_MX"},
  {name: "🇺🇸 United States", code: "en_US"},
  {name: "🌎 Other", code: "intl"}
]

class LocaleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: false,
      selectedLanguage: false,
      selectedLanguageName: false,
      selectedLocale: false,
      selectedLocaleName: false,
      startingLang: this.getStartingLanguage()
    }

    this.getStartingLanguage = this.getStartingLanguage.bind(this)
    this.getLocaleNameFromCode = this.getLocaleNameFromCode.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handleSelectLocale = this.handleSelectLocale.bind(this)
    this.handleSelectLanguage = this.handleSelectLanguage.bind(this)
  }

  getStartingLanguage() {
    return window.localStorage.getItem('lang') ? window.localStorage.getItem('lang') : 'English';
  }

  handleSelectLanguage(languageCode, languageName) {
    this.setState({
      selectedLanguage: languageCode,
      selectedLanguageName: languageName
    });
  }

  handleSelectLocale(localeCode, localeName) {
    this.setState({
      selectedLocale: localeCode,
      selectedLocaleName: localeName
    });
  }

  handleNextClick(ev) {
    if(this.state.selectedLocale) {
      //console.log('changing locale from form');
      this.props.changeLocale(this.state.selectedLocale);
    }
    if(typeof this.props.onLocaleSelect === 'function') {
      this.props.onLocaleSelect(this.state.selectedLocale, this.state.selectedLanguage, (this.state.selectedLanguageName !== this.state.startingLang));
    }
    /*if(this.state.selectedLanguageName !== this.state.startingLang && allowRedirect) {
      this.setState({
        reload: true
      });
    } */

  }

  getLocaleNameFromCode(code) {
    let selectedLocale = supportedLocales.filter((item) => (item.code === code));
    if(selectedLocale.length) {
      return selectedLocale[0].name;
    } else {
      return false;
    }
  }

  componentWillMount() {
    this.setState({
      startingLang: this.getStartingLanguage(),
      selectedLocale: locale.getLocale(),
      selectedLocaleName: this.getLocaleNameFromCode(locale.getLocale())
    });
  }

  render() {
    const { formRow, labelRow, searchButton, body2, link, callout, underline, inputClass, listContainerClass, formContainer } = this.props.classes;
    const variant = this.props.width < breakpoints['sm'] ?  "secondary" : "primary";
    const localeLabel = 'Select country';
    const languageLabel = 'Select language';
    return (
      <Grid container justify='flex-start' spacing={40} className={formContainer}>
        <Grid item xs={12} md={6}>
          <Typography variant="caption" className={labelRow}>
            1. What is your preferred language?
          </Typography>
          <Language useMobile={false} inputClass={inputClass} autoReload={false} listContainerClass={listContainerClass} onSelect={this.handleSelectLanguage} triggerReload={this.state.reload}  />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="caption" className={labelRow}>
            2. Where are you looking for help?
          </Typography>
          <AsylumConnectSelector label={this.state.selectedLocaleName ? this.state.selectedLocaleName : localeLabel} selected={[]} containerClass={inputClass} closeOnClick={true}>
            <List>
              {supportedLocales.map((item, index) => <AsylumConnectDropdownListItem button key={index} selected={this.state.selectedLocale === item.name} onClick={event => this.handleSelectLocale(item.code, item.name)}>{item.name}</AsylumConnectDropdownListItem>)}
            </List>
          </AsylumConnectSelector>
        </Grid>
        <Grid item xs={12} sm={12} md={12} className={searchButton}>
            <AsylumConnectButton variant={variant} onClick={this.handleNextClick}>
              Next
            </AsylumConnectButton>
          </Grid>
      </Grid>
    );
  }
};

export default withWidth(withStyles(styles)(LocaleForm));
