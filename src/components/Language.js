import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import ValidLanguageList from '../utils/validLanguageList';
import language from '../utils/language';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/List';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import AsylumConnectBackButton from './AsylumConnectBackButton';
import AsylumConnectDropdownListItem from './AsylumConnectDropdownListItem';
import AsylumConnectSelector from './AsylumConnectSelector';
import LanguageButtonImage from '../images/language-button.svg';

import Filter from './Filter';

import withWidth from './withWidth';
import {
  breakpoints,
  mobilePadding,
  searchInput,
  searchInputMobile,
} from '../theme';

const styles = (theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  languageImage: {
    marginRight: '10px'
  },
  languageListContainer: {
    width: 'auto',
  },
  languageSelector: {
    color: '#5073B3',
    width: '100%',
    '& .MuiSvgIcon-root': {
      color: '#5073B3 !important'
    }
  },
  bodySelector: Object.assign(searchInput(theme), {
    borderLeft: '2px solid ' + theme.palette.common.lightGrey,
    cursor: 'pointer',
    position: 'relative',
    boxShadow:
      '-10px 0px 0px 0px rgba(255,255,255,1), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.down('md')]: {
      boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
      borderLeft: 'none',
    },
    [theme.breakpoints.down('xs')]: searchInputMobile(theme),
  }),
  languageList: {
    background: theme.palette.background.paper,
    paddingTop: 0,
    overflow: 'auto',
    maxHeight: 300,
    [theme.breakpoints.down('xs')]: {
      position: 'static',
      width: '100%',
      maxHeight: 'none',
      height: 'auto',
      boxShadow: 'none',
      border: 'none',
      borderRadius: '0px',
      marginBottom: '91px',
    },
  },
  poweredByGoogle: {
    display: 'flex',
    fontFamily: 'arial',
    fontSize: '11px',
    color: '#666',
    whiteSpace: 'nowrap',
    padding: theme.spacing(2),
  },
  gooLogoLink: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  gooLogoImg: {
    paddingRight: '4px',
    paddingLeft: '4px',
    width: 'auto',
  },
  filterInput: {
    width: '100%',
  },
  filterInputBar: {
    padding: `5px ${theme.spacing(2)}px 0px`,
    [theme.breakpoints.down('xs')]: {
      padding: '0px 15px',
    },
  },
  blackTranslateColor: {
    display: 'inline',
    fontSize: '12px',
    color: '#444',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  languageLink: {
    textTransform: 'capitalize',
  },
  centerTextAlign: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5 5 5',
    cursor: 'pointer',
  },
  textCenter: {
    textAlign: 'center',
  },
  mobilePadding: {
    [theme.breakpoints.down('xs')]: mobilePadding(theme),
  },
  topPadding: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: '8px',
    },
  },
});

class LangMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectLang = this.handleSelectLang.bind(this);
  }

  handleSelectLang() {
    this.props.handleSelectLang(this.props.langCode, this.props.langName);
  }
  render() {
    return (
      <AsylumConnectDropdownListItem button onClick={this.handleSelectLang}>
        {this.props.langName}
      </AsylumConnectDropdownListItem>
    );
  }
}

class Language extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      langsList: ValidLanguageList.all(),
      selectedLang: 'English',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleReload = this.handleReload.bind(this);
    this.handleRequestCloseAfterSelect = this.handleRequestCloseAfterSelect.bind(
      this
    );
    this.generateLanguageList = this.generateLanguageList.bind(this);
    this.generateLanguageList = this.generateLanguageList.bind(this);
    this.handleOnFilterChange = this.handleOnFilterChange.bind(this);
    this.handleOnFilterBarClick = this.handleOnFilterBarClick.bind(this);
  }

  generateLanguageItems() {
    return (
      <Fragment>
        {this.state.langsList.map((lang, index) => (
          <LangMenuItem
            key={index}
            langName={lang.local}
            langCode={lang['1']}
            handleSelectLang={this.handleRequestCloseAfterSelect}
          />
        ))}
      </Fragment>
    );
  }

  generateLanguageList() {
    return (
      <List
        className={[
          this.props.classes.languageList,
          'skiptranslate',
          this.props.classes.mobilePadding,
        ].join(' ')}
        spacing={3}
      >
        <div className={this.props.classes.filterInputBar}>
          <Filter
            className={this.props.classes.filterInput}
            handleOnChange={this.handleOnFilterChange}
            handleOnClick={this.handleOnFilterBarClick}
          />
        </div>
        <ListSubheader className={this.props.classes.poweredByGoogle}>
          <span>Powered By</span>
          <a
            className={this.props.classes.gooLogoLink}
            href="https://translate.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_42x16dp.png"
              width="37px"
              height="14px"
              className={this.props.classes.gooLogoImg}
              alt="Google Translate"
            />
            <span className={this.props.classes.blackTranslateColor}>
              Translate
            </span>
          </a>
        </ListSubheader>
        {this.generateLanguageItems()}
      </List>
    );
  }
  handleClick(event) {
    this.setState({open: !this.state.open});
  }

  handleSelect(langCode, langName) {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(langCode, langName);
    }
  }

  handleOnFilterChange(e) {
    const filteredList = ValidLanguageList.filteredLanguageList(e.target.value);
    this.setState({
      langsList: filteredList,
    });
  }
  handleOnFilterBarClick(e) {
    e.stopPropagation();
  }

  handleRequestCloseAfterSelect(langCode, langName) {
    this.setState({open: false, selectedLang: langName});
    window.location.hash = '#googtrans(' + langCode + ')';
    language.setLanguage(langName);
    //window.localStorage.setItem('lang', langName);
    this.handleSelect(langCode, langName);
    if (this.props.autoReload) {
      window.location.reload();
    }
  }

  handleReload() {
    window.location.reload();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.triggerReload) {
      this.handleReload();
    }
  }

  componentWillMount() {
    var currentLang = language.getLanguage(); //window.localStorage.getItem('lang') ? window.localStorage.getItem('lang') : 'English';
    if (window.location.hash.length !== 0) {
      let langCode = window.location.hash
        .substring(window.location.hash.indexOf('(') + 1)
        .slice(0, -1)
        .toLowerCase();
      currentLang = ValidLanguageList.byCode(langCode);
    }
    this.setState({selectedLang: currentLang});
    this.handleSelect(ValidLanguageList.codeByName(currentLang), currentLang);
    if (currentLang === 'English') {
      document.cookie =
        'googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

      //Google Translate started adding root domain translation cookies - this will clear those
      var hostComponents = window.location.host.split('.');
      var domain =
        hostComponents.length >= 2
          ? hostComponents[hostComponents.length - 2] +
            '.' +
            hostComponents[hostComponents.length - 1]
          : window.location.host;
      document.cookie =
        'googtrans=;domain=' +
        domain +
        ';path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }

  render() {
    const {
      classes,
      history,
      handleRequestOpen,
      useMobile,
      inputClass,
      label,
      triggerReload,
    } = this.props;
    const {selectedLang} = this.state;
    const isMobile = this.props.width < breakpoints['sm'] && useMobile;
    if (triggerReload === true) {
      this.handleReload();
    }
    return (
      <div className={classes.root + ' hide--on-print'}>
        {!isMobile ? (
            <AsylumConnectSelector
              label={label || selectedLang}
              icon={<img src={LanguageButtonImage} className={classes.languageImage} />}
              containerClass={inputClass}
              selected={[]}
              rootClass={classes.languageSelector}
              closeOnClick={true}
              listContainerClass={classNames([
                classes.languageListContainer,
                this.props.listContainerClass,
              ])}
            >
              {this.generateLanguageList()}
            </AsylumConnectSelector>
        ) : (
          <div className={classes.mobilePadding + ' ' + classes.topPadding}>
            <AsylumConnectBackButton
              color="default"
              onClick={() => {
                handleRequestOpen('none');
                history.push('/');
              }}
            />
            <Typography className={classes.textCenter} variant="h3">
              Select Language
            </Typography>
            {this.generateLanguageList()}
          </div>
        )}
      </div>
    );
  }
}

Language.defaultProps = {
  useMobile: true,
  autoReload: true,
};

Language.propTypes = {
  classes: PropTypes.object.isRequired,
  useMobile: PropTypes.bool,
  autoReload: PropTypes.bool,
};

LangMenuItem.propTypes = {
  langName: PropTypes.string.isRequired,
  langCode: PropTypes.string.isRequired,
};

export default withStyles(styles)(withWidth(Language));
