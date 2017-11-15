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
import { searchInput, searchInputMobile } from '../../theme/sharedClasses';
import ResourceTypes from '../../helpers/ResourceTypes';
import withWidth from '../withWidth';
import breakpoints from '../../theme/breakpoints';

const resourceTypes = ResourceTypes.groupResourceTypes()

const styles = theme => ({
  searchInput: Object.assign(searchInput(theme), {
    borderLeft: "1px solid "+theme.palette.common.lightGrey,
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
        <AsylumConnectCheckbox label='' value={props.value} onChange={props.onChange} checked={(props.selectedResourceTypes.indexOf(props.value) >= 0)} />
      </span>
      : null}
    </Typography>
    {typeof props.children !== 'undefined' && props.children.length 
    ? 
      <Grid container spacing={0} className={props.classes.subfilterSpacing} >
      {props.children.map((filter, i) => (
        <Grid item key={i} xs={12} sm={6} md={4}>
          <AsylumConnectCheckbox label={filter.title} value={filter.value} onChange={props.onChange} checked={(props.selectedResourceTypes.indexOf(filter.value) >= 0)} />
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
    const { onChange, selectedResourceTypes }= this.props;
    const containerClasses = (this.state.open ? toggledResource + ' ' : '') + searchInput;
    const isMobile = this.props.width < breakpoints['sm'];
    const containerWidth = (isMobile ? '100%' : this.props.containerWidth+'px');

    return (
      <div className={relative}>
        <div className={containerClasses+" container--resource-type-selector"} onClick={this.handleToggleRequest} >
          <div>
            <span>
              Resource Type
            </span>
            {this.props.selectedResourceTypes && this.props.selectedResourceTypes.length ? 
              <AsylumConnectIndicator>{this.props.selectedResourceTypes.length}</AsylumConnectIndicator> : null}
            {this.state.open ? <KeyboardArrowUpIcon className={arrow} /> : <KeyboardArrowDownIcon className={arrow} />}
          </div>
        </div>
        {this.state.open ? 
          <Paper className={resourceList+" resource-type-selector"} style={{width: containerWidth}}>
            {resourceTypes.map((filter, i) => (
                <FilterCollection key={i} index={i} classes={{sectionHeader, sectionTitle, subfilterSpacing, dividerSpacing}} onChange={onChange} selectedResourceTypes={selectedResourceTypes} {...filter} />
              )
            )}
          </Paper>
        : null }
      </div>
    );
  }
};

export default withWidth(withStyles(styles)(ResourceTypeSelector));