import React from 'react';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';

import AsylumConnectSelector from '../AsylumConnectSelector';
import AsylumConnectRadio from '../AsylumConnectRadio';
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

const sortCollection = [
  [
    {label: 'Sort by relevance (default)', name: 'best'},
  ],
  [
    {label: 'Sort by distance', name: 'distance'},
    {label: 'Sort by popularity', name: 'popularity'},
    {label: 'Sory by newest', name: 'newest'},
 ]
];

const Sort = (props) => ( 
  <div>
    <Grid container spacing={0} className={props.classes.subfilterSpacing} >
      {sortCollection[0].map((sort) => (
        <Grid item xs={12} key={sort.name} >
          <AsylumConnectRadio name="sort" label={sort.label} value={sort.name} onChange={props.onChange} checked={sort.name === props.selectedSort}/>
        </Grid>
      ))}
      <Grid item xs={12}> 
        <Divider className={props.classes.dividerSpacing} />
      </Grid>
      {sortCollection[1].map((sort) => (
        <Grid item xs={12} key={sort.name} >
          <AsylumConnectRadio name="sort" label={sort.label} value={sort.name} onChange={props.onChange} checked={sort.name === props.selectedSort} />
        </Grid>
      ))}
    </Grid>
  </div>
);

class SearchOrderSelector extends React.Component {
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
    const { onChange, selectedSort }= this.props;
    const containerWidth = "auto";

    return (
      <AsylumConnectSelector label="Sort by" selected={[]} containerWidth={containerWidth} rootClass={rootClass} containerClass={selectInput} listContainerClass={filterList} >
        <Sort classes={{strong, sectionHeader, sectionTitle, subfilterSpacing, dividerSpacing}} onChange={onChange} selectedSort={selectedSort} />
      </AsylumConnectSelector>
      
    );
  }
};

export default withStyles(styles)(SearchOrderSelector);