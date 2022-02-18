import React from 'react';
import {FormattedMessage} from 'react-intl';

import {withStyles} from '@material-ui/core/styles';

import AsylumConnectSelector from './AsylumConnectSelector';
import SearchFilters from './SearchFilters';
import {selectInput} from '../theme';

const styles = (theme) => ({
	selectInput: Object.assign(selectInput(theme), {
		cursor: 'pointer',
		position: 'relative'
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
				<SearchFilters selectedFilters={selectedFilters} onChange={onChange} />
			</AsylumConnectSelector>
		);
	}
}

export default withStyles(styles)(SearchFilterSelector);
