import React from 'react';

import { withStyles } from 'material-ui/styles';
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
    bottom: '101px',
    right: '20px',
    zIndex: '49',
    backgroundColor: theme.palette.common.white
  },
  fixedFilters: {
    backgroundColor: theme.palette.primary[500],
    position: 'fixed',
    bottom: '91px',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '50',
    padding: '2rem',
    overflowY: 'auto'
  },
  fabContent: {
    fontSize: ".5rem", 
    fontFamily: theme.typography.title.fontFamily
  },
  dividerSpacing: {
    marginTop: '1.5rem',
    marginBottom: '1.5rem'
  },
  toolbarRoot: {
    justifyContent: 'space-between'
  },
  toolbarGutters: {
    padding: '0'
  },
  buttonRoot: {
    minWidth: '0',
    padding: '0'
  },
  badgeColorAccent: {
    color: theme.palette.common.white
  },
  refinementTitle: {
    fontSize: "1.5em",
    color: theme.palette.common.white,
    fontFamily: theme.typography.title.fontFamily
  }
})

class SearchRefinementControls extends React.Component {
  constructor(props, context) {
    super(props, context)
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
    const { fixedFab, fixedFilters, fabContent, dividerSpacing, toolbarRoot, toolbarGutters, buttonRoot, badgeColorAccent, refinementTitle } = this.props.classes;
    const isMobile = this.props.width < breakpoints['sm'];
    return (
      <div>
        {isMobile ?
          <div>
            
            <Button fab aria-label="filters" onClick={this.handleFilterOpen} className={fixedFab}>
              <Badge badgeContent={this.props.selectedFilters.length} color={this.props.selectedFilters.length ? "accent" : "primary"}
                classes={{
                  colorAccent: badgeColorAccent
                }}>
                <div className={fabContent}>
                  <FiltersIcon height="30px" width="30px" />
                  Filters
                </div>
              </Badge>
            </Button>
            {this.state.open ?
              <Paper className={fixedFilters}>
                <Button color="contrast" classes={{root: buttonRoot}} onClick={this.handleFilterOpen}>
                  <ArrowBackIcon />
                </Button>
                <Toolbar classes={{ root: toolbarRoot, gutters: toolbarGutters }}>
                  <h2 className={refinementTitle}>Filters</h2>
                  <Button color="contrast" classes={{root: buttonRoot}} onClick={this.props.clearSearchFilters}>Clear Filters</Button>
                </Toolbar>
                <SearchFilters onChange={this.props.handleFilterSelect} selectedFilters={this.props.selectedFilters} />
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <Divider className={dividerSpacing} />
                    <h2 className={refinementTitle}>Sort</h2>
                  </Grid>
                </Grid>
                <SearchSorts onChange={this.props.handleSortSelect} selectedSort={this.props.selectedSort} />
              </Paper>
            : null}
          </div>
        : 
        <Grid container spacing={0} style={{marginBottom: '1.5rem'}}>
          <Grid item xs={12} md={8} >
            <SearchFilterSelector onChange={this.props.handleFilterSelect} selectedFilters={this.props.selectedFilters} />
            <SearchSortSelector onChange={this.props.handleSortSelect} selectedSort={this.props.selectedSort} />
          </Grid>
        </Grid>
      }
      </div>
    )
  }
}

export default withWidth(withStyles(styles)(SearchRefinementControls));