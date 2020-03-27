import React from 'react';

import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

import AsylumConnectSelector from '../AsylumConnectSelector';
import SearchFilters from './SearchFilters';
import {selectInput} from '../../theme/sharedClasses';

const styles = theme => ({
  selectInput: Object.assign(selectInput(theme), {
    cursor: 'pointer',
    position: 'relative'
  }),
  filterList: {
    padding: '2rem',
    left: '0',
    maxHeight: '420px',
    minWidth: '420px'
  },
  rootClass: {
    display: 'block'
  }
});

class SearchFilterSelector extends React.Component {
  render() {
    const {selectInput, filterList, rootClass} = this.props.classes;
    const {onChange, selectedFilters} = this.props;
    const containerWidth = 'auto';

    return (
      <AsylumConnectSelector
        label="Additional Filters"
        selected={selectedFilters}
        rootClass={rootClass}
        containerClass={selectInput}
        listContainerClass={filterList}
      >
        <SearchFilters selectedFilters={selectedFilters} onChange={onChange} />
      </AsylumConnectSelector>
    );
  }
}

export default withStyles(styles)(SearchFilterSelector);
