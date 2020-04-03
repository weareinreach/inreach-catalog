import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import SearchFilterSelector from './SearchFilterSelector';
import SearchFilters from './SearchFilters';

import withWidth from './withWidth';
import {breakpoints} from '../theme';

const styles = (theme) => ({
  fixedFab: {
    position: 'fixed',
    bottom: '79px',
    right: '20px',
    zIndex: '49',
    backgroundColor: theme.palette.common.white,
  },
  fixedFilters: {
    backgroundColor: theme.palette.common.white, //secondary[500],
    //position: 'fixed',
    //bottom: '59px',
    //top: '0',
    //left: '0',
    //right: '0',
    //zIndex: '50',
    padding: theme.spacing(4),
    overflowY: 'auto',
  },
  placement: {
    top: theme.spacing(-2),
    right: theme.spacing(-2),
    backgroundColor: theme.palette.secondary[500],
  },
  fabContent: {
    fontSize: '.5rem',
    fontFamily: theme.typography.h2.fontFamily,
  },
  dividerSpacing: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  toolbarRoot: {
    justifyContent: 'space-between',
  },
  toolbarGutters: {
    padding: '0',
  },
  badgeColorAccent: {
    color: theme.palette.common.white,
  },
  refinementTitle: {
    fontSize: '1.5em',
    color: theme.palette.common.white,
    fontFamily: theme.typography.h2.fontFamily,
  },
});

class SearchRefinementControls extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };

    this.handleFilterOpen = this.handleFilterOpen.bind(this);
  }

  handleFilterOpen() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    const {fixedFilters} = this.props.classes;
    const isMobile = this.props.width < breakpoints['sm'];
    return (
      <div className="hide--on-print">
        {isMobile ? (
          <div>
            <Paper className={fixedFilters}>
              <SearchFilters
                onChange={this.props.handleFilterSelect}
                selectedFilters={this.props.selectedFilters}
              />
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
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(withWidth(SearchRefinementControls));
