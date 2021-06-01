import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import Fa from 'react-fontawesome';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';

function renderInput(inputProps) {
	const {classes, value, ref} = inputProps;
	return (
		<FormControl className={classes.textField}>
			<InputLabel htmlFor="organization">Organization Name</InputLabel>
			<Input
				id="organization"
				data-test-id="sign-up-form-find-organization"
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
						<span
							key={index}
							style={{fontWeight: 300}}
							data-test-id={'sign-up-form-searched-organization'}
						>
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
			right: 0
		},
		spinner: {
			display: 'flex',
			height: '40px',
			alignItems: 'center',
			justifyContent: 'center'
		}
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
	const {history, handleRequestClose, locale} = this;
	const styles = {
		container: {
			marginTop: '8px',
			marginBottom: '24px',
			left: 0,
			position: 'absolute',
			right: 0
		}
	};
	return (
		<Paper {...containerProps} style={styles.container} square>
			{children}
			{query.length > 0 && (
				<Link
					to={'/' + locale + '/suggestions/new'}
					onMouseDown={(e) => {
						history.push('/' + locale + '/suggestions/new');
						handleRequestClose();
					}}
				>
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

const styles = (theme) => ({
	container: {
		flexGrow: 1,
		position: 'relative',
		zIndex: 1
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(3),
		left: 0,
		right: 0
	},
	suggestion: {
		display: 'block'
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none'
	},
	textField: {
		width: '100%'
	}
});

const OrganizationAutocomplete = ({
	classes,
	handleBlurOrganizations,
	handleMessageNew,
	handleOrganizationSearchChange,
	handleOrganizationSelect,
	handleOrganizationsFetchRequested,
	handleOrganizationsClearRequested,
	handleRequestClose,
	history,
	isLoadingOrganizations,
	locale,
	organizations,
	organizationSearch,
	organizationSelection
}) => (
	<Autosuggest
		theme={{
			container: classes.container,
			suggestionsContainerOpen: classes.suggestionsContainerOpen,
			suggestionsList: classes.suggestionsList,
			suggestion: classes.suggestion
		}}
		suggestions={organizations}
		onSuggestionsFetchRequested={handleOrganizationsFetchRequested}
		onSuggestionsClearRequested={handleOrganizationsClearRequested}
		onSuggestionSelected={handleOrganizationSelect}
		renderSuggestionsContainer={
			isLoadingOrganizations
				? renderLoadingContainer
				: !organizationSelection
				? renderSuggestionsContainer.bind({
						history,
						handleMessageNew,
						handleRequestClose,
						locale
				  })
				: () => true
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
			onChange: handleOrganizationSearchChange
		}}
	/>
);

OrganizationAutocomplete.defaultProps = {
	handleRequestClose: () => true
};

OrganizationAutocomplete.propTypes = {
	classes: PropTypes.object.isRequired,
	handleBlurOrganizations: PropTypes.func.isRequired,
	handleOrganizationSearchChange: PropTypes.func.isRequired,
	handleOrganizationSelect: PropTypes.func.isRequired,
	handleOrganizationsFetchRequested: PropTypes.func.isRequired,
	handleOrganizationsClearRequested: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func,
	isLoadingOrganizations: PropTypes.bool.isRequired,
	organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
	organizationSearch: PropTypes.string.isRequired
};

export default withRouter(withStyles(styles)(OrganizationAutocomplete));
