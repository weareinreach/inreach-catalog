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
    const { fixedFab, fixedFilters, fabContent, dividerSpacing, toolbarRoot, toolbarGutters, buttonRoot } = this.props.classes;
    const isMobile = this.props.width < breakpoints['sm'];
    return (
      <div>
        {isMobile ?
          <div>
            <Button fab aria-label="filters" onClick={this.handleFilterOpen} className={fixedFab}>
              <div className={fabContent}>
                <FiltersIcon height="30px" width="30px" />
                Filters
              </div>
            </Button>
            {this.state.open ?
              <Paper className={fixedFilters}>
                <Toolbar classes={{ root: toolbarRoot, gutters: toolbarGutters }}>
                  <Button color="contrast" classes={{root: buttonRoot}} >
                    <ArrowBackIcon />
                  </Button>
                  <Button color="contrast" classes={{root: buttonRoot}}>Clear Filters</Button>
                </Toolbar>
                <SearchFilters onChange={this.props.handleFilterSelect} selectedFilters={this.props.selectedFilters} />
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <Divider className={dividerSpacing} />
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