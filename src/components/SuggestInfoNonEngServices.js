import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import {withStyles} from '@material-ui/core/styles';

import propertyMap from '../utils/propertyMap';

const suggestions = Object.keys(propertyMap.language);
for (let s in suggestions) {
  suggestions[s] = suggestions[s].split('-').slice(1).join(' ');
}

function renderInput(inputProps) {
  const {classes, value, ref, placeholder, ...other} = inputProps;

  return (
    <TextField
      className={classes.textField}
      value={value}
      inputRef={ref}
      placeholder={placeholder}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}

class RenderSuggestion extends React.Component {
  render() {
    const {suggestion, query, isHighlighted} = this.props.suggestions;
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);
    return (
      <MenuItem
        selected={isHighlighted}
        component="div"
        onClick={() => this.props.handleClick(suggestion)}
      >
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
}

function renderSuggestionsContainer(options) {
  const {containerProps, children} = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion;
}

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter((suggestion) => {
        const keep =
          count < 5 &&
          suggestion.toLowerCase().slice(0, inputLength) === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

const styles = (theme) => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 50,
    zIndex: 6,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
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
    textTransform: 'capitalize',
  },
  textField: {
    width: '100%',
  },
  chipList: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1) / 2,
    textTransform: 'capitalize',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});

class IntegrationAutosuggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(
      this
    );
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(
      this
    );
    this.handleClick = this.handleClick.bind(this);
  }

  handleSuggestionsFetchRequested({value}) {
    this.setState({
      suggestions: getSuggestions(value),
    });
  }

  handleSuggestionsClearRequested() {
    this.setState({
      value: '',
      suggestions: [],
    });
  }

  handleChange(event, {newValue}) {
    this.setState({
      value: newValue,
    });
  }

  handleClick(service) {
    this.props.handleClick(service);
  }
  handleDelete(service) {
    this.props.handleDelete(service);
  }
  render() {
    const {classes, services} = this.props;
    const {value, suggestions} = this.state;
    return (
      <div>
        <Autosuggest
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderInputComponent={renderInput}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          renderSuggestionsContainer={renderSuggestionsContainer}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={(suggestion, {query, isHighlighted}) => (
            <RenderSuggestion
              suggestions={{suggestion, query, isHighlighted}}
              handleClick={this.handleClick}
            />
          )}
          inputProps={{
            classes,
            placeholder: 'List any non-English service(s) offered',
            value,
            onChange: this.handleChange,
          }}
        />
        <div className={classes.chipList}>
          {services
            ? services.map((service) => {
                return (
                  <Chip
                    label={service}
                    key={service}
                    onRequestDelete={() => this.handleDelete(service)}
                    className={classes.chip}
                  />
                );
              })
            : ''}
        </div>
      </div>
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest);
