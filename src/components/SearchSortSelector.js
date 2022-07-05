import React from 'react';
import {FormattedMessage} from 'react-intl';

import {withStyles} from '@material-ui/core/styles';

import AsylumConnectSelector from './AsylumConnectSelector';
import SearchSorts from './SearchSorts';
import {selectInput} from '../theme';

const styles = (theme) => ({
	selectInput: Object.assign(selectInput(theme), {
		cursor: 'pointer',
		position: 'relative'
	}),
	filterList: {
		padding: theme.spacing(4),
		left: '0',
		maxHeight: '420px',
		minWidth: '320px'
	},
	rootClass: {
		display: 'inline-block'
	}
});

class SearchOrderSelector extends React.Component {
	render() {
		const {selectInput, filterList, rootClass} = this.props.classes;
		const {onChange, selectedSort} = this.props;
		const containerWidth = 'auto';

		return (
			<AsylumConnectSelector
				label={
					<FormattedMessage
						id="search.sort-by-label"
						defaultMessage="Sort list"
						description="sort list label"
					/>
				}
				selected={[]}
				containerWidth={containerWidth}
				rootClass={rootClass}
				containerClass={selectInput}
				listContainerClass={filterList}
			>
				<SearchSorts onChange={onChange} selectedSort={selectedSort} />
			</AsylumConnectSelector>
		);
	}
}

export default withStyles(styles)(SearchOrderSelector);
