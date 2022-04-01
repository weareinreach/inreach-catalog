import React from 'react';
import {FormattedMessage} from 'react-intl';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// TODO: move to utils and test
const replaceValue = (target, value) => {
	return target.replace(/\[value\]/, value);
};

const styles = (theme) => ({
	listRoot: {
		margin: '0',
		paddingLeft: theme.spacing(3)
	}
});

const DetailPropertyList = (props) => {
	const {list, classes} = props;

	function returnProperty(slug, value) {
		return (
			<FormattedMessage
				id={slug}
				values={{
					value: value
				}}
			/>
		);
	}

	return (
		<Grid container spacing={0}>
			<Grid item xs={12}>
				<Grid container spacing={0}>
					{list.length ? (
						<ul className={classes.listRoot} data-test-id="resource-list">
							{list.map((item, index) => {
								return (
									<li key={index} data-test-id="resource-list-item">
										<Typography
											variant="body2"
											data-test-id="resource-list-item-body"
										>
											{returnProperty(
												replaceValue(item.text, item.value),
												item.value
											)}
										</Typography>
									</li>
								);
							})}
						</ul>
					) : null}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default withStyles(styles)(DetailPropertyList);
