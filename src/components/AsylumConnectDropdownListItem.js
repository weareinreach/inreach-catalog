import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';

const styles = (theme) => ({
	rootClass: {
		'&:hover': {
			color: theme.palette.common.white,
			backgroundColor: theme.palette.secondary[100]
		},
		'&:hover .MuiTypography-h6': {
			color: theme.palette.common.white
		}
	}
});

class AsylumConnectDropdownListItem extends React.Component {
	render() {
		let {rootClass} = this.props.classes;
		let properties = Object.assign({}, this.props);
		properties.classes = null;
		properties.children = null;

		if (this.props.additionalClass) {
			rootClass = rootClass + ' ' + this.props.additionalClass;
		}

		return (
			<ListItem data-test-id="list-item" className={rootClass} {...properties}>
				{this.props.children}
			</ListItem>
		);
	}
}

export default withStyles(styles)(AsylumConnectDropdownListItem);
