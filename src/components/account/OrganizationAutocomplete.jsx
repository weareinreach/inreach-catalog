import React from 'react';
import {Link} from 'react-router-dom';
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
        onBlur={inputProps.onBlurOrganizations}
        value={value}
        ref={ref}
        {...Object.assign({}, inputProps, {classes: null})}
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
  const styles = {
    container: {
      marginTop: '8px',
      marginBottom: '24px',
      left: 0,
      position: 'absolute',
      right: 0,
    },
    spinner: {
      display: 'flex',
      height: '40px',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
  return (
    <Paper {...containerProps} style={styles.container} square>
      {children}
      <div style={styles.spinner}>
        <Fa name="spinner" spin />
      </div>
    </Paper>
  );
}

function renderSuggestionsContainer(options) {
  const {containerProps, children, query} = options;
  const {history, handleMessageNew} = this;
  const styles = {
    container: {
      marginTop: '8px',
      marginBottom: '24px',
      left: 0,
      position: 'absolute',
      right: 0,
    },
  };
  return (
    <Paper {...containerProps} style={styles.container} square>
      {children}
      {query.length > 0 && (
        <Link to="/suggestions/new" onMouseDown={(e) => { //prevent onBlur from hiding link before the click is registered
          history.push('/suggestions/new')
          handleMessageNew('Once you\'ve completed signing up, use the suggest a resource form to add your organization to our system')
        }}>
          <MenuItem component="div">
            <span style={{fontWeight: 200}}>
              Can't find it? Add a new organization here...
            </span>
          </MenuItem>
        </Link>
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
});

const OrganizationAutocomplete = ({
  classes,
  handleBlurOrganizations,
  handleMessageNew,
  handleOrganizationSearchChange,
  handleOrganizationSelect,
  handleOrganizationsFetchRequested,
  handleOrganizationsClearRequested,
  history,
  isLoadingOrganizations,
  organizations,
  organizationSearch,
  organizationSelection,
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
        : !organizationSelection ? renderSuggestionsContainer.bind({history, handleMessageNew}) : () => true
    }
    getSuggestionValue={getSuggestionValue}
    renderInputComponent={renderInput}
    renderSuggestion={renderSuggestion}
    focusInputOnSuggestionClick={false}
    inputProps={{
      classes,
      placeholder: 'Start typing...',
      value:
        organizationSearch ||
        (organizationSelection && organizationSelection.name
          ? organizationSelection.name
          : ''),
      onBlur: handleBlurOrganizations,
      onChange: handleOrganizationSearchChange,
    }}
  />
);

OrganizationAutocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
  handleBlurOrganizations: PropTypes.func.isRequired,
  handleOrganizationSearchChange: PropTypes.func.isRequired,
  handleOrganizationSelect: PropTypes.func.isRequired,
  handleOrganizationsFetchRequested: PropTypes.func.isRequired,
  handleOrganizationsClearRequested: PropTypes.func.isRequired,
  isLoadingOrganizations: PropTypes.bool.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
  organizationSearch: PropTypes.string.isRequired,
};

export default withStyles(styles)(OrganizationAutocomplete);
