import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { CollapseIcon } from './icons';

import Typography from 'material-ui/Typography';
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary } from 'material-ui/ExpansionPanel';


const styles = theme => ({
  rootClass: {
    boxShadow: 'none'
  },
  containerClass: {
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5
  },
  borderTop: {
    borderTop: '1px solid '+theme.palette.common.separator
  },
  borderBottom: {
    paddingBottom: '1px solid '+theme.palette.common.separator
  },
  iconClass: {
    left: '0px',
    right: '',
    width: '18px',
    height: '18px'
  }
});


class AsylumConnectCollapsibleSection extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      expanded: props.expanded,
    }
    
    this.handleToggle = this.handleToggle.bind(this)
    /*this.handleOutsideClick = this.handleOutsideClick.bind(this)
    this.handlePaperClick = this.handlePaperClick.bind(this)*/
  }

  handleOutsideClick(event) {
    var watch = document.querySelectorAll('#'+this.id);
    if(watch.length) {
      if(!watch[0].contains(event.target)) {
        this.handleToggleRequest();
      }
    }
    
  }

  handleToggle(event, expanded) {
    this.setState({
      expanded: expanded
    })
  }

  render() {
    const { content, title, summary, borderTop, borderBottom } = this.props;
    const { expanded } = this.state;
    const { iconClass, containerClass, rootClass } = this.props.classes;
    const containerClasses = (borderTop ? this.props.classes.borderTop : '') + ' ' + (borderBottom ? this.props.classes.borderBottom : '') + ' ' + containerClass;
    /*const listContainerClasses = (this.props.listContainerClass ? this.props.listContainerClass + ' ' : '') + selectList;*/
    //const rootClass = (this.props.rootClass ? this.props.rootClass + ' ' : '');

    return (

      <div className={containerClasses}>
        <ExpansionPanel className={rootClass} expanded={expanded} onChange={this.handleToggle}>
          <ExpansionPanelSummary classes={{expandIcon: iconClass}}  expandIcon={<CollapseIcon expanded={expanded} />}>
            <Typography variant="title">{title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {content}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
};

AsylumConnectCollapsibleSection.defaultProps = { borderTop: true, borderBottom: false, expanded: true }
AsylumConnectCollapsibleSection.propTypes = { borderTop: PropTypes.bool, borderBottom: PropTypes.bool, expanded: PropTypes.bool }

export default withStyles(styles)(AsylumConnectCollapsibleSection);