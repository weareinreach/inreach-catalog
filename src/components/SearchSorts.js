import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import AsylumConnectRadio from './AsylumConnectRadio';

import withWidth from './withWidth';
import {breakpoints} from '../theme';

const styles = (theme) => ({
  sectionHeader: {
    color: theme.palette.common.darkBlack,
  },
  sectionTitle: {
    fontWeight: '600',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  dividerSpacing: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  radioLabel: {},
  radioRoot: {},
  radioCheckbox: {},
  [theme.breakpoints.down('xs')]: {
    radioLabel: {
      color: theme.palette.common.white,
    },
    radioRoot: {
      color: theme.palette.common.white,
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      width: '100%',
      maxWidth: '400px',
    },
    radioCheckbox: {
      color: theme.palette.common.white,
    },
  },
});

const sortCollection = [
  [{label: 'Sort by relevance (default)', name: 'best'}],
  [
    {label: 'Sort by distance', name: 'distance'},
    {label: 'Sort by popularity', name: 'popularity'},
    {label: 'Sort by newest', name: 'newest'},
  ],
];

class SearchSorts extends React.Component {
  render() {
    const {props} = this;
    const isMobile = this.props.width < breakpoints['sm'];
    return (
      <div>
        <Grid container spacing={0} className={props.classes.subfilterSpacing}>
          {sortCollection[0].map((sort) => (
            <Grid item xs={12} key={sort.name}>
              <AsylumConnectRadio
                name="sort"
                label={sort.label}
                value={sort.name}
                onChange={props.onChange}
                checked={sort.name === props.selectedSort}
                additionalClasses={{
                  root: props.classes.radioRoot,
                  label: props.classes.radioLabel,
                  checkboxDefault: props.classes.radioCheckbox,
                  checkboxChecked: props.classes.radioCheckbox,
                }}
              />
            </Grid>
          ))}
          {isMobile ? null : (
            <Grid item xs={12}>
              <Divider className={props.classes.dividerSpacing} />
            </Grid>
          )}
          {sortCollection[1].map((sort) => (
            <Grid item xs={12} key={sort.name}>
              <AsylumConnectRadio
                name="sort"
                label={sort.label}
                value={sort.name}
                onChange={props.onChange}
                checked={sort.name === props.selectedSort}
                additionalClasses={{
                  root: props.classes.radioRoot,
                  label: props.classes.radioLabel,
                  checkboxDefault: props.classes.radioCheckbox,
                  checkboxChecked: props.classes.radioCheckbox,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(withWidth(SearchSorts));
