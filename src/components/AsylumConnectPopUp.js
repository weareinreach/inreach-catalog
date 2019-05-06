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

    //this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  /*handleOutsideClick(event) {
    var watch = document.querySelectorAll('#'+this.id);
    if(watch.length) {
      if(!watch[0].contains(event.target)) {
        this.props.handleToggleRequest();
      }
    }
    
  }

  handleToggleRequest() {
    if(!this.props.open) {
      document.addEventListener('click', this.handleOutsideClick);
    } else {
      document.removeEventListener('click', this.handleOutsideClick);
    }
  }*/

  render() {
    const { 
      arrow
    } = this.props.classes;

    let properties = Object.assign({}, this.props);
    properties.classes = null;
    properties.children = null;
    return ( 
      <Menu {...properties} >
        {this.props.children}
      </Menu>
    );
  }
};

export default withStyles(styles)(AsylumConnectPopUp);