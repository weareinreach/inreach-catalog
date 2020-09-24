import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

function Filter(props) {
  return (
    <FormControl className={props.className}>
      <InputLabel htmlFor="languageInput">Start typing to filter</InputLabel>
      <Input
        id="languageInput"
        value={props.filteredLanguageValue}
        onChange={props.handleOnChange}
        onClick={props.handleOnClick}
      />
    </FormControl>
  );
}

export default Filter;
