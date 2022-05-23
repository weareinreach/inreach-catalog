import React from 'react';
import {FormattedMessage} from 'react-intl';

import {withStyles} from '@material-ui/core/styles';

import AsylumConnectSelector from './AsylumConnectSelector';
import SearchFilters from './SearchFilters';
import {selectInput} from '../theme';

const styles = (theme) => ({
	selectInput: Object.assign(selectInput(theme), {
		cursor: 'pointer',
		position: 'relative',
		boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		marginBottom: '0',
		// width: '110px',
		height: '48px',
		padding: '13px',
		color: theme.palette.signUp[600]
	}),
	filterList: {
		padding: '2rem',
		left: '0',
		maxHeight: '420px',
		minWidth: '420px'
	},
	rootClass: {
		display: 'block'
	}
});

class SearchFilterSelector extends React.Component {
	render() {
		const {selectInput, filterList, rootClass} = this.props.classes;
		const {onChange, selectedFilters} = this.props;

		return (
			<AsylumConnectSelector
				label={<FormattedMessage id="search.filter-additional-filters" />}
				selected={selectedFilters}
				rootClass={rootClass}
				containerClass={selectInput}
				listContainerClass={filterList}
			>
				<SearchFilters
					selectedFilters={selectedFilters}
					onChange={this.props.onChange}
				/>
			</AsylumConnectSelector>
		);
	}
}

export default withStyles(styles)(SearchFilterSelector);
