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
import { searchInput } from '../../theme/sharedClasses';

const resourceTypes = [
  {category: 'Medical', type: 'medical', children: [
    {title: 'Medical clinics', value: 'Health'}, //confirm
    {title: 'Women\'s health', value: 'Pregnancy'}, //refine
    {title: 'Sexual health', value: 'Sexual health'},
    {title: 'Trans health', value: 'Trans health'},
    {title: 'Dental care', value: 'Dental'}
  ]},
  {category: 'Legal', type: 'legal', children: [
    {title: 'Legal aid', value: 'Legal assistance'}, //refine
    {title: 'Documentation', value: 'Documentation'} //MISSING
  ]},
  {category: 'Housing', type: 'housing', value: 'Housing'}, //refine
  {category: 'Food', type: 'food', value: 'Food'},
  {category: 'Hygiene and Clothing', type: 'hygiene', value: 'Homeless support'}, //refine
  {category: 'Computers and Internet', type: 'computers', value: 'Computer labs'},
  {category: 'Education and Employment', type: 'educationEmployment', children: [
    {title: 'English classes', value: 'Language resources'}, //refine
    {title: 'Career counseling', value: 'Job training & preparation'}, //refine
    {title: 'Libraries', value: 'Libraries'},
    {title: 'Scholarships', value: 'Scholarships'},
  ]},
  {category: 'Community support', type: 'communitySupport', children: [
    {title: 'Community centers', value: 'Community centers'},
    {title: 'LGBTQ centers', value: 'LGBTQ centers'},
    {title: 'Cultural centers', value: 'Cultural centers'},
  ]},
  {category: 'Mental health', type: 'mentalHealth', children: [
    {title: 'Support Groups', value: 'Support groups'}, //refine
    {title: 'Private Counseling', value: 'Counseling & therapy'},
    {title: 'Psychiatry', value: 'Psychiatry'},
  ]},
  {category: 'Mail services', type: 'mail', value: 'Mail'},
  {category: 'Sports and Entertainment', type: 'sportsEntertainment', value: 'Recreational activities'},
];

const styles = theme => ({
  searchInput: Object.assign(searchInput(theme), {
    borderLeft: "1px solid "+theme.palette.common.lightGrey,
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
  dividerSpacing: {
    marginTop: '1rem', 
    marginBottom: '1rem'
  },
  subfilterSpacing: {
    marginTop: '1rem'
  },
  toggledResource: {
    backgroundColor: theme.palette.common.darkGrey
  },
  resourceList: {
    width: '100%',
    padding: '2rem',
    top: '100%',
    right: '0',
    position: 'absolute',
    zIndex: '50',
    maxHeight: '420px',
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

const FilterCollection = (props) => (
  <div>
    <Typography type="body2" className={props.classes.sectionHeader}>
      <ACBadge type={props.type} width='45px' height='45px' /> 
      <span className={props.classes.sectionTitle}>
        {props.category}
      </span>
      {typeof props.value !== 'undefined' ? 
      <span className={props.classes.sectionTitle}>
        <AsylumConnectCheckbox label='' value={props.value} onChange={props.onChange} checked={(props.selectedResources.indexOf(props.value) >= 0)} />
      </span>
      : null}
    </Typography>
    {typeof props.children !== 'undefined' && props.children.length 
    ? 
      <Grid container spacing={0} className={props.classes.subfilterSpacing} >
      {props.children.map((filter, i) => (
        <Grid item key={i} xs={4}>
          <AsylumConnectCheckbox label={filter.title} value={filter.value} onChange={props.onChange} checked={(props.selectedResources.indexOf(filter.value) >= 0)} />
        </Grid>
      ))}
      </Grid>
    : null
    }
    {props.index+1 !== resourceTypes.length ? <Divider className={props.classes.dividerSpacing} /> : null}
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
      searchInput, 
      toggledResource, 
      resourceList, 
      sectionHeader, 
      sectionTitle, 
      subfilterSpacing, 
      dividerSpacing,
      relative
    } = this.props.classes;
    const { onChange, selectedResources }= this.props;
    const containerClasses = (this.state.open ? toggledResource + ' ' : '') + searchInput;

    return (
      <div className={relative}>
        <div className={containerClasses+" container--resource-type-selector"} onClick={this.handleToggleRequest} >
          <div>
            <span>
              Resource Type
            </span>
            {this.props.selectedResources && this.props.selectedResources.length ? 
              <AsylumConnectIndicator>{this.props.selectedResources.length}</AsylumConnectIndicator> : null}
            {this.state.open ? <KeyboardArrowUpIcon className={arrow} /> : <KeyboardArrowDownIcon className={arrow} />}
          </div>
        </div>
        {this.state.open ? 
          <Paper className={resourceList+" resource-type-selector"} style={{width: this.props.containerWidth+'px'}}>
            {resourceTypes.map((filter, i) => (
                <FilterCollection key={i} index={i} classes={{sectionHeader, sectionTitle, subfilterSpacing, dividerSpacing}} onChange={onChange} selectedResources={selectedResources} {...filter} />
              )
            )}
          </Paper>
        : null }
      </div>
    );
  }
};

export default withStyles(styles)(ResourceTypeSelector);