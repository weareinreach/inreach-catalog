import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {withStyles} from '@material-ui/core/styles';
import { NoEncryption } from '@material-ui/icons';

const styles = (theme) => ({
  inputLabel: {
    position: 'relative',
    top: '-8px',
    left: '12px',
    color: 'rgba(29, 31, 35, 0.7)',
  },
  input: {
    'label + &': {
      margin: '0px',
    },
    '&::before': {
      display: 'none',
    },
  },
});

function Filter(props) {
  return (
    <FormControl className={props.className}>
      <InputLabel className={props.classes.inputLabel} htmlFor="languageInput">Start typing to filter</InputLabel>
      <Input
        id="languageInput"
        className={props.classes.input}
        value={props.filteredLanguageValue}
        onChange={props.handleOnChange}
        onClick={props.handleOnClick}
      />
    </FormControl>
  );
}

export default withStyles(styles)(Filter);
