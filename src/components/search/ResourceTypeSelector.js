import React from 'react';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

import AsylumConnectSelector from '../AsylumConnectSelector';
import AsylumConnectCheckbox from '../AsylumConnectCheckbox';
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
  resourceList: {
    padding: '2rem',
    right: '0',
    maxHeight: '420px',
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
  render() {
    const {
      searchInput,
      sectionHeader, 
      sectionTitle, 
      subfilterSpacing, 
      dividerSpacing,
      resourceList
    } = this.props.classes;
    const { onChange, selectedResourceTypes }= this.props;
    const isMobile = this.props.width < breakpoints['sm'];
    const containerWidth = (isMobile ? '100%' : this.props.containerWidth+'px');

    return (
      <AsylumConnectSelector label="Resource Type" selected={selectedResourceTypes} containerWidth={containerWidth} containerClass={searchInput} listContainerClass={resourceList} >
        {resourceTypes.map((filter, i) => (
            <FilterCollection key={i} index={i} classes={{sectionHeader, sectionTitle, subfilterSpacing, dividerSpacing}} onChange={onChange} selectedResourceTypes={selectedResourceTypes} {...filter} />
          )
        )}
      </AsylumConnectSelector>
      
    );
  }
};

export default withWidth(withStyles(styles)(ResourceTypeSelector));