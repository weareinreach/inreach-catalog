import React from 'react';

import { withStyles } from 'material-ui/styles';
import { ListItem } from 'material-ui/List';

import { dropShadow } from '../theme/sharedClasses';

const styles = theme => ({
  rootClass: {
    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.secondary[900]
    }
  }

});


class AsylumConnectDropdownListItem extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    let { 
      rootClass
    } = this.props.classes;
    let properties = Object.assign({}, this.props);
    properties.classes = null;
    properties.children = null;

    if(this.props.additionalClass) {
      rootClass = rootClass + ' ' +this.props.additionalClass; 
    }

    return (
      <ListItem className={rootClass} {...properties}>
        {this.props.children}
      </ListItem>
    );
  }
};

export default withStyles(styles)(AsylumConnectDropdownListItem);