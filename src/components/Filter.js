import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

function Filter(props) {
  const {
    className,
    inputClassName,
    filteredLanguageValue,
    handleOnChange,
    handleOnClick,
  } = props;
  return (
    <FormControl className={className}>
      <Input
        disableUnderline={true}
        id="languageInput"
        value={filteredLanguageValue}
        onChange={handleOnChange}
        onClick={handleOnClick}
        className={inputClassName}
        placeholder="Start typing to filter"
      />
    </FormControl>
  );
}

export default Filter;
