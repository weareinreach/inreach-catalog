import React from 'react';

import { withStyles } from 'material-ui/styles';
import Menu from 'material-ui/Menu';

const styles = theme => ({
  arrow: {
    width: '20px', 
    height: '20px',
    color: theme.palette.common.lightBlack,
    float: "right",
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }

});


class AsylumConnectPopUp extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { 
      arrow
    } = this.props.classes;

    let properties = Object.assign({}, this.props);
    properties.classes = null;
    properties.children = null;
    console.log(properties);
    return ( 
      <Menu {...properties} >
        {this.props.children}
      </Menu>
    );
  }
};

export default withStyles(styles)(AsylumConnectPopUp);