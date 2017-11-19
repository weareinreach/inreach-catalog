import React from 'react';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

import AsylumConnectSelector from '../AsylumConnectSelector';
import AsylumConnectCheckbox from '../AsylumConnectCheckbox';
import { selectInput } from '../../theme/sharedClasses';

const styles = theme => ({
  selectInput: Object.assign(selectInput(theme), {
    cursor: 'pointer',
    position: 'relative'
  }),
  sectionHeader: {
    color: theme.palette.common.darkBlack
  },
  sectionTitle: {
    fontWeight: '600',
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  strong: {
    color: theme.palette.primary[500]
  },
  dividerSpacing: {
    marginTop: '1rem', 
    marginBottom: '1rem'
  },
  filterList: {
    padding: '2rem',
    left: '0',
    maxHeight: '420px',
    minWidth: '420px'
  },
  rootClass: {
    display: 'inline-block'
  }

});

const filterCollection = [
  [
    {label: 'Has a confidentiality policy', name: 'has-confidentiality-policy'},
    {label: 'Has free services', name: 'cost-free'},
    //{label: 'Has service in my language', name: 'lang-'},
  ],
  [
    {label: 'Photo ID', name: 'photo-id-not-required'},
    {label: 'Proof of income', name: 'proof-of-income-not-required'},
    {label: 'Proof of age', name: 'proof-of-age-not-required'},
    {label: 'Medical insurance', name: 'medical-insurance-not-required'},
    {label: 'Proof of residence', name: 'proof-of-residence-not-required'},
    {label: 'A referral', name: 'referral-not-required'}
  ],
  [
    {label: 'Exclude resources that are "at capacity (i.e. currently unable to take new clients)"' , name: 'at-capacity'}
  ]
];

const Filters = (props) => (
  <div>
    <Grid container spacing={0} className={props.classes.subfilterSpacing} >
      <Grid item xs={12}> 
        <Typography type="body2" className={props.classes.sectionHeader} >
          <span className={props.classes.sectionTitle}>
            Filter resources by...
          </span>
          <br/>
          (Select all that apply)
        </Typography>
      </Grid>
      {filterCollection[0].map((filter) => (
        <Grid item xs={12} key={filter.name} >
          <AsylumConnectCheckbox label={filter.label} value={filter.name} onChange={props.onChange} checked={(props.selectedFilters.indexOf(filter.name) >= 0)} />
        </Grid>
      ))}
      <Grid item xs={12}> 
        <Divider className={props.classes.dividerSpacing} />
      </Grid>
      <Grid item xs={12}> 
        <Typography type="body2" className={props.classes.sectionHeader} >
          <span className={props.classes.sectionTitle}>
            Do <span className={props.classes.strong}>not</span> show me resources that require...
          </span>
          <br/>
          (Select all that apply)
        </Typography>
      </Grid>
      {filterCollection[1].map((filter) => (
        <Grid item xs={12} md={6} key={filter.name} >
          <AsylumConnectCheckbox label={filter.label} value={filter.name} onChange={props.onChange} checked={(props.selectedFilters.indexOf(filter.name) >= 0)} />
        </Grid>
      ))}
      <Grid item xs={12}> 
        <Divider className={props.classes.dividerSpacing} />
      </Grid>
      {filterCollection[2].map((filter) => (
        <Grid item xs={12} key={filter.name} >
          <AsylumConnectCheckbox label={filter.label} value={filter.name} onChange={props.onChange} checked={(props.selectedFilters.indexOf(filter.name) >= 0)} />
        </Grid>
      ))}
    </Grid>
  </div>
);

class SearchFilterSelector extends React.Component {
  render() {
    const { 
      strong,
      selectInput, 
      filterList, 
      sectionHeader, 
      sectionTitle, 
      subfilterSpacing, 
      dividerSpacing,
      rootClass
    } = this.props.classes;
    const { onChange, selectedFilters }= this.props;
    const containerWidth = "auto";

    return (
      <AsylumConnectSelector label="Additional Filters" selected={selectedFilters} rootClass={rootClass} containerWidth={containerWidth} containerClass={selectInput} listContainerClass={filterList} >
        <Filters classes={{strong, sectionHeader, sectionTitle, subfilterSpacing, dividerSpacing}} onChange={onChange} selectedFilters={selectedFilters} />
      </AsylumConnectSelector>
      
    );
  }
};

export default withStyles(styles)(SearchFilterSelector);