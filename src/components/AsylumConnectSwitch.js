import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import {FormControlLabel} from 'material-ui/Form';
import Switch from 'material-ui/Switch';

const styles = theme => ({
  root: {
    marginLeft: '0',
    color: theme.palette.common.lightBlack, //fix this for non-resource-type checkboxes
    '&:hover': {
      color: theme.palette.secondary[500]
    }
  },
  switchRoot: {},
  checkboxDefault: {},
  bar: {},
  checkboxChecked: {
    color: theme.palette.secondary[500],
    '& + $bar': {
      backgroundColor: theme.palette.secondary[500]
    }
  }
});

const AsylumConnectSwitch = props => {
  const classes = Object.assign(props.classes, props.overrideClasses);

  const rootClass = classNames(
    classes.root,
    props.additionalClasses ? props.additionalClasses.root : null
  );
  const checkboxDefault = classNames(
    classes.checkboxDefault,
    props.additionalClasses ? props.additionalClasses.checkboxDefault : null
  );
  const checkboxChecked = classNames(
    classes.checkboxChecked,
    props.additionalClasses ? props.additionalClasses.checkboxChecked : null
  );

  const checkboxBar = classNames(
    classes.bar,
    props.additionalClasses ? props.additionalClasses.checkboxBar : null
  );

  const labelClass = classNames(
    classes.label,
    props.additionalClasses ? props.additionalClasses.label : null
  );

  return (
    <FormControlLabel
      control={
        <Switch
          value={props.value}
          checked={props.checked}
          classes={{
            default: checkboxDefault,
            checked: checkboxChecked,
            bar: checkboxBar
          }}
          onChange={props.onChange}
        />
      }
      label={props.label}
      classes={{
        root: rootClass,
        label: labelClass
      }}
    />
  );
};

AsylumConnectSwitch.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default withStyles(styles)(AsylumConnectSwitch);
