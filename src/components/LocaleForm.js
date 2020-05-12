import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import AsylumConnectButton from './AsylumConnectButton';
import Language from './Language';
import LocaleSelector from './LocaleSelector';
import withWidth from './withWidth';
import {getLocale} from '../utils/locale';
import {searchInput, searchInputMobile} from '../theme';

const styles = (theme) => ({
  inputClass: Object.assign(searchInput(theme), {
    cursor: 'pointer',
    position: 'relative',
    boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
    marginBottom: '0',
    //boxShadow: '-10px 0px 0px 0px rgba(255,255,255,1), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.down('md')]: {
      boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
      borderLeft: 'none',
    },
    [theme.breakpoints.down('xs')]: searchInputMobile(theme),
  }),
  listContainerClass: {
    width: '100%!important',
  },
  labelRow: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      color: theme.palette.common.white,
      fontSize: theme.typography.h2.fontSize,
    },
  },
  formRow: {
    marginBottom: theme.spacing(3),
  },
  callout: {
    color: theme.palette.primary[500],
  },
  underline: {
    textDecoration: 'underline',
    '&:hover': {
      color: theme.palette.primary[900],
    },
  },
  [theme.breakpoints.down('xs')]: {
    searchButton: {
      textAlign: 'center',
    },
    body2: {
      color: theme.palette.common.white,
    },
    link: {
      color: theme.palette.common.white,
      textDecoration: 'underline',
    },
    formContainer: {
      paddingBottom: theme.spacing(8),
      //backgroundColor: theme.palette.common.white,
      marginTop: theme.spacing(1),
    },
  },
});

class LocaleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: false,
      selectedLanguage: false,
      selectedLanguageName: false,
      /*selectedLocale: false,
      selectedLocaleName: false,*/
      startingLang: this.getStartingLanguage(),
    };

    this.getStartingLanguage = this.getStartingLanguage.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleSelectLanguage = this.handleSelectLanguage.bind(this);
    this.handleSelectLocale = this.handleSelectLocale.bind(this);
  }

  getStartingLanguage() {
    return window.localStorage.getItem('lang')
      ? window.localStorage.getItem('lang')
      : 'English';
  }

  handleSelectLanguage(languageCode, languageName) {
    if (languageName !== 'English') {
      this.setState({
        selectedLanguage: languageCode,
        selectedLanguageName: languageName,
      });
    }
  }

  handleNextClick(ev) {
    if (typeof this.props.onLocaleSelect === 'function') {
      this.props.onLocaleSelect(
        this.state.selectedLocale,
        this.state.selectedLanguage,
        this.state.selectedLanguageName !== this.state.startingLang
      );
    }
    // do not reload if selectedLocaleName is undefined or country is mexico or intel
    if (
      !(
        this.state.selectedLocale === 'es_MX' ||
        this.state.selectedLocale === 'intl' ||
        this.state.selectedLocaleName === undefined
      )
    ) {
      window.location.reload(false);
    }

    /*if(this.state.selectedLanguageName !== this.state.startingLang && allowRedirect) {
      this.setState({
        reload: true
      });
    } */
  }

  handleSelectLocale(localeCode, localeName) {
    if (localeCode !== 'es_MX' || localeCode !== 'intl') {
      this.setState({
        selectedLocale: localeCode,
        selectedLocaleName: localeName,
      });
    }
  }

  componentWillMount() {
    this.setState({
      startingLang: this.getStartingLanguage(),
      selectedLocale: getLocale(),
    });
  }

  render() {
    const {newLocale} = this.props;
    const {
      labelRow,
      searchButton,
      inputClass,
      listContainerClass,
      formContainer,
    } = this.props.classes;
    const variant = 'primary';
    const localeLabel = 'Select country';
    return (
      <Grid
        container
        justify="flex-start"
        spacing={6}
        className={formContainer}
      >
        <Grid item xs={12} md={6}>
          <Typography variant="caption" className={labelRow} component="p">
            What is your preferred language?
          </Typography>
          <Language
            useMobile={false}
            inputClass={inputClass}
            autoReload={false}
            listContainerClass={listContainerClass}
            onSelect={this.handleSelectLanguage}
            triggerReload={this.state.reload}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="caption" className={labelRow} component="p">
            Where are you looking for help?
          </Typography>
          <LocaleSelector
            label={localeLabel}
            handleSelectLocale={this.handleSelectLocale}
            setNewLocale={newLocale}
          />
        </Grid>
        <Grid item xs={12} className={searchButton}>
          <AsylumConnectButton variant={variant} onClick={this.handleNextClick}>
            Next
          </AsylumConnectButton>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(withWidth(LocaleForm));
