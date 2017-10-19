import React from 'react';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import KeyboardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from 'material-ui-icons/KeyboardArrowUp';

import AsylumConnectInput from './AsylumConnectInput';
import { searchInput } from '../theme/sharedClasses';

const styles = theme => ({
  searchInput: Object.assign(searchInput(theme), {
    borderLeft: "1px solid "+theme.palette.common.lightGrey,
    cursor: 'pointer',
    position: 'relative'
  }),
  toggledResource: {
    backgroundColor: theme.palette.common.darkGrey
  },
  resourceList: {
    width: '100%',
    padding: '2rem',
    top: '100%',
    right: '0',
    position: 'absolute',
    zIndex: '50'
  },
  arrow: {
    width: '18px', 
    height: '18px',
    color: theme.palette.primary[500],
    float: "right"
  }

});

class ResourceTypeSelector extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      open: false,
    }

    this.handleToggleRequest = this.handleToggleRequest.bind(this)
  }

  handleToggleRequest() {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const { arrow, searchInput, toggledResource, resourceList } = this.props.classes;
    const containerClasses = (this.state.open ? toggledResource + ' ' : '') + searchInput;

    return (
      <div className={containerClasses+" container--resource-type-selector"} onClick={this.handleToggleRequest}>
        <span>
          Resource Type
        </span>
        {this.props.selectedResources && this.props.selectedResources.length ? null : null}
        {this.state.open ? <KeyboardArrowUpIcon className={arrow} /> : <KeyboardArrowDownIcon className={arrow} />}
        {this.state.open ? 
          <Paper className={resourceList} style={{width: this.props.containerWidth+'px'}}>
            <Typography type="headline" component="h3">
              This is a sheet of paper.
            </Typography>
          </Paper>
        : null }
      </div>
    );
  }
};

export default withStyles(styles)(ResourceTypeSelector);