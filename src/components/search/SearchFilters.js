import React from 'react';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import KeyboardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from 'material-ui-icons/KeyboardArrowUp';
import Icon from 'material-ui/Icon';

import AsylumConnectCheckbox from '../AsylumConnectCheckbox';
import AsylumConnectIndicator from '../AsylumConnectIndicator';
import ACBadge from '../Badge';
import { selectInput, searchInputMobile } from '../../theme/sharedClasses';
import ResourceTypes from '../../helpers/ResourceTypes';
import withWidth from '../withWidth';
import breakpoints from '../../theme/breakpoints';

const resourceTypes = ResourceTypes.groupResourceTypes()

const styles = theme => ({
  selectInput: Object.assign(selectInput(theme), {
    cursor: 'pointer',
    position: 'relative'
  }),
  [theme.breakpoints.down('sm')]: {
    searchInput: searchInputMobile(theme)
  },
  sectionHeader: {
    color: theme.palette.common.darkBlack
  },
  sectionTitle: {
    fontWeight: '600',
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  dividerSpacing: {
    marginTop: '1rem', 
    marginBottom: '1rem'
  },
  subfilterSpacing: {
    marginTop: '1rem'
  },
  toggledSelect: {
    backgroundColor: theme.palette.common.darkGrey
  },
  filterList: {
    width: '100%',
    padding: '2rem',
    top: '100%',
    right: '0',
    position: 'absolute',
    zIndex: '50',
    maxHeight: '520px',
    overflowY: 'scroll',
  },
  arrow: {
    width: '18px', 
    height: '18px',
    color: theme.palette.primary[500],
    float: "right"
  },
  relative: {
    position: 'relative'
  },
  resourceListItem: {
    color: theme.palette.common.lightBlack,
    '&:hover': {
      color: theme.palette.primary[500]
    }
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
    </Grid>
    {/*typeof props.children !== 'undefined' && props.children.length 
    ? 
      <Grid container spacing={0} className={props.classes.subfilterSpacing} >
      {props.children.map((filter, i) => (
        <Grid item key={i} xs={12} sm={6} md={4}>
          <AsylumConnectCheckbox label={filter.title} value={filter.value} onChange={props.onChange} checked={(props.selectedResourceTypes.indexOf(filter.value) >= 0)} />
        </Grid>
      ))}
      </Grid>
    : null
    */}
    {/*props.index+1 !== resourceTypes.length ? <Divider className={props.classes.dividerSpacing} /> : null*/}
  </div>
);

class ResourceTypeSelector extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      open: false,
    }

    this.handleToggleRequest = this.handleToggleRequest.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }

  handleOutsideClick(event) {
    var watch = document.querySelectorAll('.resource-type-selector');
    if(watch.length) {
      if(!watch[0].contains(event.target)) {
        this.handleToggleRequest();
      } 
    }
    
  }

  handleToggleRequest() {
    if(!this.state.open) {
      document.addEventListener('click', this.handleOutsideClick);
    } else {
      document.removeEventListener('click', this.handleOutsideClick);
    }

    this.setState({
      open: !this.state.open
    })
    
  }

  render() {
    const { 
      arrow, 
      selectInput, 
      toggledSelect, 
      filterList, 
      sectionHeader, 
      sectionTitle, 
      subfilterSpacing, 
      dividerSpacing,
      relative
    } = this.props.classes;
    const { onChange, selectedFilters }= this.props;
    const containerClasses = (this.state.open ? toggledSelect + ' ' : '' ) + selectInput;
    const isMobile = this.props.width < breakpoints['sm'];
    const containerWidth = (isMobile ? '100%' : this.props.containerWidth+'px');

    return (
      <div className={relative}>
        <div className={containerClasses+" container--search-filter-selector"} onClick={this.handleToggleRequest} >
          <div>
            <span>
              Additional filters
            </span>
            {this.props.selectedFilters && this.props.selectedFilters.length ? 
              <AsylumConnectIndicator>{this.props.selectedFilters.length}</AsylumConnectIndicator> : null}
            {this.state.open ? <KeyboardArrowUpIcon className={arrow} /> : <KeyboardArrowDownIcon className={arrow} />}
          </div>
        </div>
        {this.state.open ? 
          <Paper className={filterList+" search-filter-selector"} style={{width: 'auto'}}>
            <Filters classes={{sectionHeader, sectionTitle, subfilterSpacing, dividerSpacing}} onChange={onChange} selectedFilters={selectedFilters} />
          </Paper>
        : null }
      </div>
    );
  }
};

export default withWidth(withStyles(styles)(ResourceTypeSelector));