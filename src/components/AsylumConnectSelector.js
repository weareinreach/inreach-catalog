import React from 'react';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import KeyboardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from 'material-ui-icons/KeyboardArrowUp';

import AsylumConnectIndicator from './AsylumConnectIndicator';
import withWidth from './withWidth';

const styles = theme => ({
  toggledSelect: {
    backgroundColor: theme.palette.common.darkGrey+" !important"
  },
  selectList: {
    width: '100%',
    top: '100%',
    position: 'absolute',
    zIndex: '50',
    overflowY: 'auto',
  },
  arrow: {
    width: '18px', 
    height: '18px',
    color: theme.palette.primary[500],
    float: "right"
  },
  relative: {
    position: 'relative'
  }

});


class AsylumConnectSelector extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      open: false,
    }
    this.id = "selector--" + Date.now().toString();

    this.handleToggleRequest = this.handleToggleRequest.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }

  handleOutsideClick(event) {
    var watch = document.querySelectorAll('#'+this.id);
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
      toggledSelect,
      relative,
      selectList
    } = this.props.classes;
    const { selected, label, containerWidth }= this.props;
    const containerClasses = this.props.containerClass + (this.state.open ? ' ' + toggledSelect : '');
    const listContainerClasses = (this.props.listContainerClass ? this.props.listContainerClass + ' ' : '') + selectList;
    const rootClass = (this.props.rootClass ? this.props.rootClass + ' ' : '') + relative;

    return (
      <div className={rootClass}>
        <div className={containerClasses} onClick={this.handleToggleRequest} >
          <div>
            <span>
              {label}
            </span>
            {selected && selected.length ? 
              <AsylumConnectIndicator>{selected.length}</AsylumConnectIndicator> : null}
            {this.state.open ? <KeyboardArrowUpIcon className={arrow} /> : <KeyboardArrowDownIcon className={arrow} />}
          </div>
        </div>
        {this.state.open ? 
          <Paper id={this.id} className={listContainerClasses+" selector--asylum-connect"} style={{width: containerWidth}}>
            {this.props.children}
            {/*resourceTypes.map((filter, i) => (
                <List key={i} index={i} classes={listClasses} onChange={onChange} selected={selected} {...filter} />
              )
            )*/}
          </Paper>
        : null }
      </div>
    );
  }
};

export default withWidth(withStyles(styles)(AsylumConnectSelector));