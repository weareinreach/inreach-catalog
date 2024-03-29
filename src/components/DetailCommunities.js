import React from 'react';
import {useIntl} from 'react-intl';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import propertyMap from '../utils/propertyMap';

const Communities = (props) => {
	const intl = useIntl();

	function returnCommunity(item, slug) {
		return intl.formatMessage({
			id: item.text,
			defaultMessage: item.defaultMessage,
			description: item.description
		});
	}

	return (
		<Grid container spacing={0}>
			<Grid item xs={12} className={props.classes.sectionSpacing}>
				<Grid container spacing={0}>
					<Grid item xs={12}>
						{props?.list?.length && (
							<Typography variant="body2" data-test-id="details-communities">
								{props.list
									.map(
										(item) =>
											returnCommunity(
												item,
												propertyMap?.['community']?.[item?.slug]
											) || ''
									)
									.join(', ')}
							</Typography>
						)}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Communities;
