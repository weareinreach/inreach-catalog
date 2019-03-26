import React from 'react';
import PropTypes from 'prop-types';
import langs from 'langs';
import url from 'url';
import ValidLanguageList from '../../helpers/ValidLanguageList';
import List, {ListItem, ListItemText, ListSubheader} from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import AsylumConnectBackButton from '../AsylumConnectBackButton';
import AsylumConnectDropdownListItem from '../AsylumConnectDropdownListItem';
import AsylumConnectSelector from '../AsylumConnectSelector';

import ChevronIcon from '../icons/ChevronIcon';
import withWidth from '../withWidth';
import breakpoints from '../../theme/breakpoints';
import {mobilePadding} from '../../theme/sharedClasses';

const styles = theme => ({
  root: {
    display: 'block'
  },
  languageListContainer: {
    width: 'auto'
  },
  languageList: {
    /*position: 'absolute',
    zIndex: 3,
    paddingTop: 0,*/
    background: theme.palette.background.paper,
    paddingTop: 0,
    overflow: 'auto',
    maxHeight: 300,
    /*borderRadius: '2px',
    boxShadow: theme.shadows[9],*/
    [theme.breakpoints.down('xs')]: {
      position: 'static',
      width: '100%',
      maxHeight: 'none',
      height: 'auto',
      boxShadow: 'none',
      border: 'none',
      borderRadius: '0px',
      marginBottom: '91px' 
    }
  },
  poweredByGoogle: {
    display: 'flex',
    fontFamily: 'arial',
    fontSize: '11px',
    color: '#666',
    whiteSpace: 'nowrap',
  },
  gooLogoLink: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  gooLogoImg: {
    paddingRight: '4px',
    paddingLeft: '4px',
    width: 'auto'
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
    cursor: 'pointer'
  },
  textCenter: {
    textAlign: 'center'
  },
  mobilePadding: {
    [theme.breakpoints.down('xs')]: mobilePadding(theme)
  },
  topPadding: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: '8px'
    }
  }
});

class LangMenuItem extends React.Component { 
  constructor(props) {
    super(props);
    this.handleSelectLang = this.handleSelectLang.bind(this)
  }
  
  handleSelectLang() {
    this.props.handleSelectLang(this.props.langCode, this.props.langName);
  }
  render() {
    return (
      <AsylumConnectDropdownListItem button onClick={this.handleSelectLang}>
        {this.props.langName}
      </AsylumConnectDropdownListItem>
    )
  }
}

class Language extends React.Component { 
  constructor() {
    super();
    this.state = {
      open: false,
      initialLangsList: ValidLanguageList.all(),
      selectedLang: 'English'
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleRequestCloseAfterSelect = this.handleRequestCloseAfterSelect.bind(this)
    this.generateLanguageList = this.generateLanguageList.bind(this)
  }

  generateLanguageList() {
    return (
        <List className={[this.props.classes.languageList, 'skiptranslate', this.props.classes.mobilePadding].join(' ')}>
          <ListSubheader className={this.props.classes.poweredByGoogle}>
            <span>Powered By</span>
            <a className={this.props.classes.gooLogoLink} href="https://translate.google.com" target="_blank">
              <img src="https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_42x16dp.png" width="37px" height="14px" className={this.props.classes.gooLogoImg} alt="Google Translate" />
              <span className={this.props.classes.blackTranslateColor}>Translate</span>
            </a>
          </ListSubheader>
          { this.state.initialLangsList.map((lang,index) =>  
            <LangMenuItem key={index} langName={lang.local} langCode={lang['1']} handleSelectLang={this.handleRequestCloseAfterSelect} />
          )}
      </List>
    )
  }

  handleClick(event) {
    this.setState({ open: !this.state.open });
  };
  
  handleRequestCloseAfterSelect(langCode, langName) {
    this.setState({ open: false, selectedLang: langName });
    window.location.hash = "#googtrans("+langCode+")";
    window.localStorage.setItem('lang', langName)
    location.reload();
  };

  componentWillMount(){
    var currentLang = window.localStorage.getItem('lang') ? window.localStorage.getItem('lang') : 'English';
    if(window.location.hash.length !== 0) {
      let langCode = window.location.hash.substring(window.location.hash.indexOf("(") + 1).slice(0, -1).toLowerCase()
      currentLang = ValidLanguageList.byCode(langCode)
    }
    this.setState({selectedLang: currentLang})
    if(currentLang === "English") {
      document.cookie = "googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      
      //Google Translate started adding root domain translation cookies - this will clear those
      var hostComponents = window.location.host.split('.');
      var domain = hostComponents.length >= 2 ? hostComponents[hostComponents.length-2] + '.' + hostComponents[hostComponents.length-1] : window.location.host;
      document.cookie = "googtrans=;domain="+domain+";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
  }

  render() {
    const {classes, history, handleRequestOpen} = this.props;
    const {open, selectedLang, initialLangsList} = this.state;
    const isMobile = this.props.width < breakpoints['sm'];

    return (
      <div className={classes.root + ' hide--on-print' }>
        {!isMobile ?
          <AsylumConnectSelector label={selectedLang} selected={[]} listContainerClass={classes.languageListContainer}>
            {this.generateLanguageList()}
          </AsylumConnectSelector>
        : 
        <div className={classes.mobilePadding+' '+classes.topPadding}>
          <AsylumConnectBackButton color="default" onClick={() => {handleRequestOpen('none'); history.push('/');}} />
          <Typography className={classes.textCenter} variant="display1">
            Select Language
          </Typography>
          {this.generateLanguageList()}
        </div>}
      </div>
    );
  }
};

Language.propTypes = {
  classes: PropTypes.object.isRequired,
};

LangMenuItem.propTypes = {
  langName: PropTypes.string.isRequired,
  langCode: PropTypes.string.isRequired
};

export default withWidth(withStyles(styles)(Language));
