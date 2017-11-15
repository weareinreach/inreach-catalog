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
    zIndex: '100'
  },
  NavButton: {
    minWidth: '20%',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    '&:hover': {
      color: theme.palette.secondary[500]
    }
  },
});

class NavMobile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event, value) {
    const { handleRequestOpen } = this.props;
    this.setState({ value });
    switch(value) {
      case 0:
        this.props.history.push('/');
        this.props.handleRequestOpen('none');
      break;
      case 1:
        this.props.handleRequestOpen('none');
      break;
      case 2:

      break;
      case 3:
        handleRequestOpen('login');
      break;
      case 4:
        handleRequestOpen('privacy');
      break;
    }
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
          <BottomNavigationButton className={classes.NavButton} label="search" icon={<SearchIcon width="60px" color={this.iconColor(0)}/>} />
          <BottomNavigationButton className={classes.NavButton} label="favorites" icon={<FavoritesIcon width="60px" color={this.iconColor(1)}/>} />
          <BottomNavigationButton className={classes.NavButton} label="language" icon={<LanguageIcon width="60px" color={this.iconColor(2)} />} />
          <BottomNavigationButton className={classes.NavButton} label="account" icon={<AccountIcon width="60px" color={this.iconColor(3)} />} />
          <BottomNavigationButton className={classes.NavButton} label="privacy" icon={<PrivacyIcon width="60px" color={this.iconColor(4)}/>} />
        </BottomNavigation>
      </div>
    )
  }
}

NavMobile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavMobile);
