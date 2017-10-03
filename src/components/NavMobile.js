import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';

import SearchIcon from './icons/SearchIcon'
import FavoritesIcon from './icons/FavoritesIcon'
import LanguageIcon from './icons/LanguageIcon'
import AccountIcon from './icons/AccountIcon'
import PrivacyIcon from './icons/PrivacyIcon'

const styles = {
  root: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'row',
    justify: 'space-between',
  },
  BottomNavBar: {
    position:'fixed',
    bottom:'20'
  },
  NavButton: {
    minWidth: '20%',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  }
};

class NavMobile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event, value) {
    this.setState({ value });
  };
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
          <BottomNavigationButton className={classes.NavButton} label="search" icon={<SearchIcon />} />
          <BottomNavigationButton className={classes.NavButton} label="favorites" icon={<FavoritesIcon />} />
          <BottomNavigationButton className={classes.NavButton} label="language" icon={<LanguageIcon />} />
          <BottomNavigationButton className={classes.NavButton} label="account" icon={<AccountIcon />} />
          <BottomNavigationButton className={classes.NavButton} label="privacy" icon={<PrivacyIcon />} />
        </BottomNavigation>
      </div>
    )
  }
}

NavMobile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavMobile);