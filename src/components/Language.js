import React from 'react';
import PropTypes from 'prop-types';
import langs from 'langs';
import ValidLanguageList from '../helpers/ValidLanguageList';
import List, {ListItem, ListItemText, ListSubheader} from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import ChevronIcon from './icons/ChevronIcon';

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
    boxShadow: theme.shadows[9]
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
    paddingLeft: '4px'
  },
  blackTranslateColor: {
    display: 'inline',
    fontSize: '12px',
    color: '#444',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  lowercaseText: {
    textTransform: 'capitalize'
  },
  centerTextAlign: {
    textAlign: 'center',
  }
});

class LangMenuItem extends React.Component { 
  constructor(props) {
    super(props);
    this.handleSelectLang = this.handleSelectLang.bind(this)
  }
  
  handleSelectLang() {
    this.props.handleSelectLang(this.props.langCode);
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
      open: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleRequestCloseAfterSelect = this.handleRequestCloseAfterSelect.bind(this)
  }
  handleClick(event) {
    this.setState({ open: !this.state.open });
  };
  
  handleRequestClose() {
    this.setState({ open: false });
  };
  
  handleRequestCloseAfterSelect(langCode) {
    this.setState({ open: false });
    window.location.hash = "#googtrans("+langCode+")";
    location.reload();
  };

  render() {
    const classes = this.props.classes;
    const langsList = ValidLanguageList.all();
    return (
      <div className={classes.root}>
        <Button className={classes.lowercaseText} onClick={this.handleClick}>
          <Typography
            aria-owns={this.state.open ? 'simple-menu' : null}
            aria-haspopup="true"
            type="body1"
            className={classes.centerTextAlign}>
          Language
          </Typography>
          <ChevronIcon width={'20px'}/>
        </Button>
        {this.state.open &&
          <List className={classes.languageList}>
            <ListSubheader className={classes.poweredByGoogle}>
              <span>Powered By</span>
              <a className={classes.gooLogoLink} href="https://translate.google.com" target="_blank">
                <img src="https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_42x16dp.png" width="37px" height="14px" className={classes.gooLogoImg} alt="Google Translate" />
                <span className={classes.blackTranslateColor}>Translate</span>
              </a>
            </ListSubheader>
            { langsList.map((lang,index) =>  
              <LangMenuItem key={index} langName={lang.name} langCode={lang['1']} handleSelectLang={this.handleRequestCloseAfterSelect} />
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

export default withStyles(styles)(Language);
