import React from 'react';
import PropTypes from 'prop-types';
import langs from 'langs';
import ValidLanguageList from '../../helpers/ValidLanguageList';
import List, {ListItem, ListItemText, ListSubheader} from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import AsylumConnectBackButton from '../AsylumConnectBackButton';

import ChevronIcon from '../icons/ChevronIcon';
import withWidth from '../withWidth';
import breakpoints from '../../theme/breakpoints';
import {mobilePadding} from '../../theme/sharedClasses';

const styles = theme => ({
  root: {
    display: 'block'
  },
  languageList: {
    position: 'absolute',
    zIndex: 3,
    paddingTop: 0,
    background: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: 300,
    borderRadius: '2px',
    boxShadow: theme.shadows[9],
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: mobilePadding(theme)
  },
  topPadding: {
    [theme.breakpoints.down('sm')]: {
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
      <ListItem button onClick={this.handleSelectLang}>
        <ListItemText primary={this.props.langName} />
      </ListItem>
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
    }
  }

  render() {
    const {classes, history, handleRequestOpen} = this.props;
    const {open, selectedLang, initialLangsList} = this.state;
    const isMobile = this.props.width < breakpoints['sm'];

    return (
      <div className={classes.root + ' hide--on-print' }>
        {!isMobile ?
        <div className={classes.languageLink} onClick={this.handleClick}>
          <Typography
            aria-owns={this.state.open ? 'simple-menu' : null}
            aria-haspopup="true"
            type="body1"
            className={[classes.centerTextAlign,'skiptranslate'].join(' ')}>
          {selectedLang}
          <ChevronIcon width={'18px'} direction={this.state.open ? 'up' : 'down'}/>
          </Typography>
        </div>
        : 
        <div className={classes.mobilePadding+' '+classes.topPadding}>
          <AsylumConnectBackButton color="default" onClick={() => {handleRequestOpen('none'); history.push('/');}} />
          <Typography className={classes.textCenter} type="display1">
            Select Language
          </Typography>
        </div>}
        {(open || isMobile) &&
          <List className={[classes.languageList, 'skiptranslate', classes.mobilePadding].join(' ')}>
            <ListSubheader className={classes.poweredByGoogle}>
              <span>Powered By</span>
              <a className={classes.gooLogoLink} href="https://translate.google.com" target="_blank">
                <img src="https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_42x16dp.png" width="37px" height="14px" className={classes.gooLogoImg} alt="Google Translate" />
                <span className={classes.blackTranslateColor}>Translate</span>
              </a>
            </ListSubheader>
            { initialLangsList.map((lang,index) =>  
              <LangMenuItem key={index} langName={lang.local} langCode={lang['1']} handleSelectLang={this.handleRequestCloseAfterSelect} />
            )}
          </List>
        }
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
