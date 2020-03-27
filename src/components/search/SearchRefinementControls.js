import React from 'react';

import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import Typography from 'material-ui/Typography';
import Badge from 'material-ui/Badge';

import AsylumConnectBackButton from '../AsylumConnectBackButton';
import SearchFilterSelector from './SearchFilterSelector';
import SearchFilters from './SearchFilters';
import FiltersIcon from '../icons/FiltersIcon';
import SearchSortSelector from './SearchSortSelector';
import SearchSorts from './SearchSorts';

import withWidth from '../withWidth';
import breakpoints from '../../theme/breakpoints';

const styles = theme => ({
  fixedFab: {
    position: 'fixed',
    bottom: '79px',
    right: '20px',
    zIndex: '49',
    backgroundColor: theme.palette.common.white
  },
  fixedFilters: {
    backgroundColor: theme.palette.common.white, //secondary[500],
    //position: 'fixed',
    //bottom: '59px',
    //top: '0',
    //left: '0',
    //right: '0',
    //zIndex: '50',
    padding: theme.spacing.unit * 4,
    overflowY: 'auto'
  },
  placement: {
    top: theme.spacing.unit * -2,
    right: theme.spacing.unit * -2,
    backgroundColor: theme.palette.secondary[500]
  },
  fabContent: {
    fontSize: '.5rem',
    fontFamily: theme.typography.title.fontFamily
  },
  dividerSpacing: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
  toolbarRoot: {
    justifyContent: 'space-between'
  },
  toolbarGutters: {
    padding: '0'
  },
  badgeColorAccent: {
    color: theme.palette.common.white
  },
  refinementTitle: {
    fontSize: '1.5em',
    color: theme.palette.common.white,
    fontFamily: theme.typography.title.fontFamily
  }
});

class SearchRefinementControls extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false
    };

    this.handleFilterOpen = this.handleFilterOpen.bind(this);
  }

  handleFilterOpen() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const {
      fixedFab,
      fixedFilters,
      fabContent,
      dividerSpacing,
      toolbarRoot,
      toolbarGutters,
      buttonRoot,
      badgeColorAccent,
      refinementTitle,
      placement,
      secondaryColor
    } = this.props.classes;
    const isMobile = this.props.width < breakpoints['sm'];
    return (
      <div className="hide--on-print">
        {isMobile ? (
          <div>
            <Paper className={fixedFilters}>
              {/*<AsylumConnectBackButton color="contrast" onClick={this.handleFilterOpen} />
                <Toolbar classes={{ root: toolbarRoot, gutters: toolbarGutters }}>
                  <h2 className={refinementTitle}>Filters</h2>
                  <Button color="contrast" classes={{root: buttonRoot}} onClick={this.props.clearSearchFilters}>Clear Filters</Button>
                </Toolbar>*/}
              <SearchFilters
                onChange={this.props.handleFilterSelect}
                selectedFilters={this.props.selectedFilters}
              />
              {/*<Grid container spacing={0}>
                  <Grid item xs={12}>
                    <Divider className={dividerSpacing} />
                    <h2 className={refinementTitle}>Sort</h2>
                  </Grid>
                </Grid>
                <SearchSorts onChange={this.props.handleSortSelect} selectedSort={this.props.selectedSort} />*/}
            </Paper>
          </div>
        ) : (
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <SearchFilterSelector
                onChange={this.props.handleFilterSelect}
                containerWidth="100%"
                selectedFilters={this.props.selectedFilters}
              />
              {/*<SearchSortSelector onChange={this.props.handleSortSelect} selectedSort={this.props.selectedSort} />*/}
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default withWidth(withStyles(styles)(SearchRefinementControls));
