import React from 'react';

import {FormControl} from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';

function Filter(props) {
  return (
    <FormControl className={null}>
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
