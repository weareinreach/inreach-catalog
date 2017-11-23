import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import CheckCircleIcon from 'material-ui-icons/CheckCircle';
import RadioUncheckedIcon from 'material-ui-icons/RadioButtonUnchecked';
import CheckBoxIcon from 'material-ui-icons/CheckBox';
import CheckBoxOutlineBlankIcon from 'material-ui-icons/CheckBoxOutlineBlank';


const relativeSize = 1;

const defaultIconSize = {
  height: relativeSize+'rem',
  width: relativeSize+'rem'
}

const styles = (theme) => ({
  root: {
    marginLeft: '0',
    color: theme.palette.common.lightBlack, //fix this for non-resource-type checkboxes
    '&:hover': {
      color: theme.palette.primary[500]
    }
  },
  checkboxDefault: {
    color: 'inherit',
    width: relativeSize*2+'rem',
    height: relativeSize*2+'rem'
  },
  checkboxChecked: {
    color: theme.palette.primary[500],
    width: relativeSize*2+'rem',
    height: relativeSize*2+'rem'
  }
});

const AsylumConnectCheckbox = (props) => {
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

  const iconSize = Object.assign(defaultIconSize, props.iconSize);

  return (
    <FormControlLabel
      control={
        <Checkbox
          value={props.value}
          icon={<CheckBoxOutlineBlankIcon style={iconSize} />}
          checkedIcon={<CheckBoxIcon style={iconSize}/>}
          checked={props.checked}
          classes={{
            default: checkboxDefault,
            checked: checkboxChecked
          }}
          onChange={props.onChange}
        />
      }
      label={props.label}
      classes={{
        root: rootClass
      }}
    />
  );
}

AsylumConnectCheckbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default withStyles(styles)(AsylumConnectCheckbox);