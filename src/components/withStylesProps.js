import React from 'react';
import { withStyles } from 'material-ui/styles';

const withStylesProps = (stylesWithProps) =>
  Component =>
    props => {
      const Comp = withStyles(theme => stylesWithProps(theme, props))(Component);
      return <Comp {...props} />;
    };

export default withStylesProps;