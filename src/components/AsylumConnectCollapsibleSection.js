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
    paddingBottom: theme.spacing.unit * 5,
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2
    }
  },
  borderTop: {
    borderTop: '1px solid '+theme.palette.common.separator
  },
  borderBottom: {
    paddingBottom: '1px solid '+theme.palette.common.separator
  },
  detailsRootClass: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: 0
  },
  summaryRootClass: {
    minHeight: "0!important",
  },
  summaryExpandedClass: {
    minHeight: "0!important",
    margin: "0!important"
  },
  summaryContentClass: {
    margin: "0!important"
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

  handleToggle(event, expanded) {
    this.setState({
      expanded: expanded
    })
  }

  render() {
    const { content, title, summary, borderTop, borderBottom, className } = this.props;
    const { expanded } = this.state;
    const { iconClass, containerClass, rootClass, summaryRootClass, summaryExpandedClass, summaryContentClass, detailsRootClass } = this.props.classes;
    const containerClasses = (borderTop ? this.props.classes.borderTop : '') + ' ' + (borderBottom ? this.props.classes.borderBottom : '') + ' ' + containerClass + ' ' + (className ? className : '');
    /*const listContainerClasses = (this.props.listContainerClass ? this.props.listContainerClass + ' ' : '') + selectList;*/
    //const rootClass = (this.props.rootClass ? this.props.rootClass + ' ' : '');

    return (

      <div className={containerClasses}>
        <ExpansionPanel className={rootClass} expanded={expanded} onChange={this.handleToggle}>
          <ExpansionPanelSummary classes={{
            root: summaryRootClass,
            content: summaryContentClass,
            expanded: summaryExpandedClass,
            expandIcon: iconClass
          }}  expandIcon={<CollapseIcon expanded={expanded} />}>
            <Typography variant="title">{title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails classes = {{
            root: detailsRootClass
          }}>
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