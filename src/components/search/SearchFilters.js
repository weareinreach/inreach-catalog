import React from 'react';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

import AsylumConnectCheckbox from '../AsylumConnectCheckbox';
import AsylumConnectSwitch from '../AsylumConnectSwitch';

import withWidth from '../withWidth';
import breakpoints from '../../theme/breakpoints';

const styles = theme => ({
  sectionHeader: {
    color: theme.palette.common.darkBlack
  },
  sectionTitle: {
    fontWeight: '600',
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  strong: {
    color: theme.palette.secondary[500]
  },
  dividerSpacing: {
    marginTop: theme.spacing.unit * 2, 
    marginBottom: theme.spacing.unit * 2
  },
  switchRoot: {},
  switchLabel: {},
  [theme.breakpoints.down('xs')]: {
    strong: {
      color: theme.palette.common.white
    },
    sectionTitle: {
      color: theme.palette.common.white
    },
    sectionHeader: {
      color: theme.palette.common.white
    },
    switchRoot: {
      flexDirection: 'row-reverse',
      width: '100%',
      maxWidth: '400px',
      justifyContent: 'space-between',
    },
    switchLabel: {
      color: theme.palette.common.white,
    },
  }
});

const filterCollection = [
  [
    {label: 'Has a confidentiality policy', name: 'has-confidentiality-policy'},
    {label: 'Has free services', name: 'cost-free'},
    //{label: 'Has service in my language', name: 'lang-'},
  ],
  [
    {label: 'Photo ID', name: 'not-req-photo-id'},
    {label: 'Proof of income', name: 'not-req-proof-of-income'},
    {label: 'Proof of age', name: 'not-req-proof-of-age'},
    {label: 'Medical insurance', name: 'not-req-medical-insurance'},
    {label: 'Proof of residence', name: 'not-req-proof-of-residence'},
    {label: 'A referral', name: 'not-req-referral'}
  ],
  [
    {label: 'Exclude resources that are "at capacity (i.e. currently unable to take new clients)"' , name: 'at-capacity'}
  ]
];

class SearchFilters extends React.Component {
  render() {
    const {props} = this;
    const isMobile = this.props.width < breakpoints['sm'];
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12}> 
            <Typography variant="body2" className={props.classes.sectionHeader} >
              <span className={props.classes.sectionTitle}>
                Filter resources by...
              </span>
              <br/>
              (Select all that apply)
            </Typography>
          </Grid>
          {filterCollection[0].map((filter) => (
            <Grid item xs={12} key={filter.name} >
            {!isMobile ?
              <AsylumConnectCheckbox label={filter.label} value={filter.name} onChange={props.onChange} checked={(props.selectedFilters.indexOf(filter.name) >= 0)} />
            :
              <AsylumConnectSwitch label={filter.label} value={filter.name} onChange={props.onChange} checked={(props.selectedFilters.indexOf(filter.name) >= 0)} additionalClasses={{
                root: props.classes.switchRoot,
                label: props.classes.switchLabel
              }} />
            }
            </Grid>
          ))}
          <Grid item xs={12}> 
            <Divider className={props.classes.dividerSpacing} />
          </Grid>
          <Grid item xs={12}> 
            <Typography variant="body2" className={props.classes.sectionHeader} >
              <span className={props.classes.sectionTitle}>
                Do <span className={props.classes.strong}>not</span> show me resources that require...
              </span>
              <br/>
              (Select all that apply)
            </Typography>
          </Grid>
          {filterCollection[1].map((filter) => (
            <Grid item xs={12} md={6} key={filter.name} >
              {!isMobile ?
                <AsylumConnectCheckbox label={filter.label} value={filter.name} onChange={props.onChange} checked={(props.selectedFilters.indexOf(filter.name) >= 0)} />
              :
                <AsylumConnectSwitch label={filter.label} value={filter.name} onChange={props.onChange} checked={(props.selectedFilters.indexOf(filter.name) >= 0)} additionalClasses={{
                  root: props.classes.switchRoot,
                  label: props.classes.switchLabel
                }} />
              }
            </Grid>
          ))}
          <Grid item xs={12}> 
            <Divider className={props.classes.dividerSpacing} />
          </Grid>
          {filterCollection[2].map((filter) => (
            <Grid item xs={12} key={filter.name} >
              {!isMobile ?
                <AsylumConnectCheckbox label={filter.label} value={filter.name} onChange={props.onChange} checked={(props.selectedFilters.indexOf(filter.name) >= 0)} />
              :
                <AsylumConnectSwitch label={filter.label} value={filter.name} onChange={props.onChange} checked={(props.selectedFilters.indexOf(filter.name) >= 0)} additionalClasses={{
                  root: props.classes.switchRoot,
                  label: props.classes.switchLabel
                }} />
              }
            </Grid>
          ))}
        </Grid>
      </div>
    );
    }
}

export default withWidth(withStyles(styles)(SearchFilters));