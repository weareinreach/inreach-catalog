import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import Fa from 'react-fontawesome';
import {FormControl} from 'material-ui/Form';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {withStyles} from 'material-ui/styles';

function renderInput(inputProps) {
  const {classes, autoFocus, value, ref} = inputProps;
  return (
    <FormControl className={classes.textField}>
      <InputLabel htmlFor="organization">Organization Name</InputLabel>
      <Input
        id="organization"
        value={value}
        ref={ref}
        {...Object.assign({}, inputProps, {
          classes: {inputAdorned: classes.inputAdorned},
        })}
      />
    </FormControl>
  );
}

function renderSuggestion(suggestion, {query, isHighlighted}) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={index} style={{fontWeight: 300}}>
              {part.text}
            </span>
          ) : (
            <strong key={index} style={{fontWeight: 500}}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderLoadingContainer(options) {
  const {containerProps, children} = options;
  const style = {
    display: 'flex',
    height: '40px',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (
    <Paper {...containerProps} square>
      {children}
      <div style={style}>
        <Fa name="spinner" spin />
      </div>
    </Paper>
  );
}

function renderSuggestionsContainer(options) {
  const {containerProps, children, query} = options;
  return (
    <Paper {...containerProps} square>
      {children}
      {query.length > 0 &&
        children !== null && (
          <a href="#">
            <MenuItem component="div">
              <span style={{fontWeight: 200}}>
                Can't find it? Add a new organization here...
              </span>
            </MenuItem>
          </a>
        )}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    zIndex: 1,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
    width: '100%',
  },
  inputAdorned: {
    width: '94%',
  },
});

const OrganizationAutocomplete = ({
  classes,
  handleOrganizationSearchChange,
  handleOrganizationSelect,
  handleOrganizationsFetchRequested,
  handleOrganizationsClearRequested,
  isLoadingOrganizations,
  organizations,
  organizationSearch,
}) => (
  <Autosuggest
    theme={{
      container: classes.container,
      suggestionsContainerOpen: classes.suggestionsContainerOpen,
      suggestionsList: classes.suggestionsList,
      suggestion: classes.suggestion,
    }}
    suggestions={organizations}
    onSuggestionsFetchRequested={handleOrganizationsFetchRequested}
    onSuggestionsClearRequested={handleOrganizationsClearRequested}
    onSuggestionSelected={handleOrganizationSelect}
    renderSuggestionsContainer={
      isLoadingOrganizations
        ? renderLoadingContainer
        : renderSuggestionsContainer
    }
    getSuggestionValue={getSuggestionValue}
    renderInputComponent={renderInput}
    renderSuggestion={renderSuggestion}
    focusInputOnSuggestionClick={false}
    inputProps={{
      classes,
      placeholder: 'Start typing...',
      value: organizationSearch,
      onChange: handleOrganizationSearchChange,
    }}
  />
);

OrganizationAutocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
  handleOrganizationSearchChange: PropTypes.func.isRequired,
  handleOrganizationSelect: PropTypes.func.isRequired,
  handleOrganizationsFetchRequested: PropTypes.func.isRequired,
  handleOrganizationsClearRequested: PropTypes.func.isRequired,
  isLoadingOrganizations: PropTypes.bool.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
  organizationSearch: PropTypes.string.isRequired,
};

export default withStyles(styles)(OrganizationAutocomplete);
