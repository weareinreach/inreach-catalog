import React from 'react';
import PropTypes from 'prop-types';
import langs from 'langs';
import ValidLanguageList from '../helpers/ValidLanguageList';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

import ChevronIcon from './icons/ChevronIcon';

const styles = theme => ({
  root: {
    display: 'block'
  },
  lowercaseText: {
    textTransform: 'capitalize'
  },
  centerTextAlign: {
    textAlign: 'center',
  },
  AsylumConnectMenu: {
    marginTop: '56px'
  },
  hiddenTranslator: {
    visibility: 'hidden',
    width: '0',
    height: '0'
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
      <MenuItem onClick={this.handleSelectLang} children={this.props.langName}></MenuItem>
    )
  }
}

class Language extends React.Component { 
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      open: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleRequestCloseAfterSelect = this.handleRequestCloseAfterSelect.bind(this)
  }
  handleClick(event) {
    this.setState({ open: true, anchorEl: event.currentTarget });
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
        <Menu 
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          className={classes.AsylumConnectMenu}>
            {
              langsList.map(function(lang, index) {
                return (
                  <LangMenuItem key={index} langName={lang.name} langCode={lang['1']} handleSelectLang={this.handleRequestCloseAfterSelect} />
                )
              }, this)
            }
        </Menu>
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
