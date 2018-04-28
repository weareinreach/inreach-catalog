import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';

import SearchIcon from '../icons/SearchIcon'
import FavoritesIcon from '../icons/FavoritesIcon'
import LanguageIcon from '../icons/LanguageIcon'
import AccountIcon from '../icons/AccountIcon'
import PrivacyIcon from '../icons/PrivacyIcon'

const styles = theme => ({
  root: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'row',
    justify: 'space-between',
    height: 'auto'
  },
  BottomNavBar: {
    position:'fixed',
    bottom:'0',
    zIndex: '100',
    borderTop: "1px solid "+theme.palette.common.faintBlack 
  },
  NavButton: {
    minWidth: '20%',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    paddingTop: '8px',
    '&:hover': {
      color: theme.palette.secondary[500]
    }
  },
});

const buttonStyles = {
  label: "nav-bottom-label",
  selectedLabel: "nav-bottom-selectedLabel"
}

class NavMobile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.location) {
      let value = this.state.value;
      switch(nextProps.location.pathname) {
        case '/':
        case /^\/search/:
        case /^\/resource/:
          value = 0;
        break;
        case /^\/favorites/:
          value = 1;
        break;
        case /^\/account/:
          value = 4;
        break;
      }
      if(value !== this.state.value) {
        this.setState({
          value
        });
      }
    }
  }

  handleChange(event, value) {
    const { handleRequestOpen, session, history } = this.props;
    switch(value) {
      case 0:
        history.push('/');
        handleRequestOpen('none');
      break;
      case 1:
        history.push('/favorites');
        handleRequestOpen('none');
      break;
      case 2:
        handleRequestOpen('language');
      break;
      case 3:
        if(session) {
          handleRequestOpen('none');
        } else {
          handleRequestOpen('login');
        }
        history.push('/account');
      break;
      case 4:
        handleRequestOpen('privacy');
      break;
    }
    this.setState({ value });
  };
  iconColor(position){
    if (position === null) {
      return '#000'
    }
    
    if (this.state.value === position) {
      return '#f26f6f'
    } else {
      return '#000'
    }
  }
  render() {
    const classes = this.props.classes;
    const { value } = this.state;
    return (
      <div className={classes.BottomNavBar}>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className={classes.root}
        >
          <BottomNavigationButton className={classes.NavButton} classes={buttonStyles} label="search" icon={<SearchIcon width="60px" color={this.iconColor(0)}/>} />
          <BottomNavigationButton className={classes.NavButton} classes={buttonStyles} label="favorites" icon={<FavoritesIcon width="60px" color={this.iconColor(1)}/>} />
          <BottomNavigationButton className={classes.NavButton} classes={buttonStyles} label="language" icon={<LanguageIcon width="60px" color={this.iconColor(2)} />} />
          <BottomNavigationButton className={classes.NavButton} classes={buttonStyles} label="account" icon={<AccountIcon width="60px" color={this.iconColor(3)} />} />
          <BottomNavigationButton className={classes.NavButton} classes={buttonStyles} label="privacy" icon={<PrivacyIcon width="60px" color={this.iconColor(4)}/>} />
        </BottomNavigation>
      </div>
    )
  }
}

NavMobile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavMobile);
