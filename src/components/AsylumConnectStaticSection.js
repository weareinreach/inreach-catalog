import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
  rootClass: {
    boxShadow: 'none',
  },
  containerClass: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  borderTop: {
    borderTop: '1px solid ' + theme.palette.common.separator,
  },
  borderBottom: {
    paddingBottom: '1px solid ' + theme.palette.common.separator,
  },
  detailsRootClass: {
    paddingTop: theme.spacing(2),
    paddingBottom: 0,
  },
  summaryRootClass: {
    marginBottom: theme.spacing(2),
  },
  summaryExpandedClass: {
    minHeight: '0!important',
    margin: '0!important',
  },
  summaryContentClass: {
    margin: '0!important',
  },
  iconClass: {
    left: '0px',
    right: '',
    width: '18px',
    height: '18px',
  },
});

class AsylumConnectStaticSection extends React.Component {
  render() {
    const {content, title, borderTop, borderBottom, className} = this.props;
    const {containerClass, rootClass, summaryRootClass} = this.props.classes;
    const containerClasses =
      (borderTop ? this.props.classes.borderTop : '') +
      ' ' +
      (borderBottom ? this.props.classes.borderBottom : '') +
      ' ' +
      containerClass +
      ' ' +
      (className ? className : '');
    /*const listContainerClasses = (this.props.listContainerClass ? this.props.listContainerClass + ' ' : '') + selectList;*/
    //const rootClass = (this.props.rootClass ? this.props.rootClass + ' ' : '');

    return (
      <div className={containerClasses}>
        <Paper className={rootClass}>
          <Typography variant="h2" className={summaryRootClass}>
            {title}
          </Typography>
          <Typography variant="body1">{content}</Typography>
        </Paper>
      </div>
    );
  }
}

AsylumConnectStaticSection.defaultProps = {
  borderTop: true,
  borderBottom: false,
  expanded: true,
};
AsylumConnectStaticSection.propTypes = {
  borderTop: PropTypes.bool,
  borderBottom: PropTypes.bool,
  expanded: PropTypes.bool,
};

export default withStyles(styles)(AsylumConnectStaticSection);
