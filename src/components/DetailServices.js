import React from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ACBadge from './Badge';
import resourceTypes, {getTags} from '../utils/tags';

// TODO: move to utils and test
const addBadges = (list, locale) => {
	const resourceIndex = resourceTypes.getResourceIndex(locale);
	return (
		list
			?.map((item) => {
				const itemTags = getTags(item, locale);
				const badgeList = [
					...(itemTags?.length ? itemTags : []),
					...(item?.categories?.length ? item.categories : []),
					...(item?.areas?.length ? item.areas : [])
				].sort();

				item.badge = resourceTypes.getBadge(badgeList, locale);
				if (typeof resourceIndex[badgeList[0]] !== 'undefined') {
					item.label = resourceIndex[badgeList[0]].category;
				}
				return item;
			})
			?.sort((first, second) => {
				if (first.badge < second.badge) {
					return -1;
				}

				if (first.badge > second.badge) {
					return 1;
				}

				return 0;
			}) || []
	);
};

const Services = (props) => {
	const {classes, list, isMobile, locale, resource, badge} = props;
	const itemsWithBadges = addBadges(list, locale);
	let lastBadge = false;

	return (
		<Grid container spacing={0}>
			<Grid item xs={12} className={classes.sectionSpacing}>
				<Grid container spacing={0}>
					{itemsWithBadges.map((item) => {
						const {_id, badge, name, slug} = item;
						const itemLink = `/${locale}/resource/${resource.slug}/service/${slug}`;
						if (isMobile) {
							let newType = false;

							if (lastBadge !== badge) {
								newType = true;
								lastBadge = badge;
							}

							return (
								<Grid item xs={12} key={_id}>
									{newType && (
										<ACBadge
											extraClasses={{
												icon: classes.serviceBadge,
												tooltip: classes.serviceTooltip
											}}
											key="misc"
											type={badge}
											width="48px"
											height="48px"
										/>
									)}
									<li data-test-id="details-service-item">
										<Link to={itemLink} className={classes.serviceText}>
											{name}
										</Link>
									</li>
								</Grid>
							);
						}

						return (
							<Grid
								item
								container
								xs={12}
								key={_id}
								alignItems="center"
								alignContent="center"
								className={classes.serviceItemContainer}
							>
								<Grid item xs={12} md={3}>
									{badge ? (
										<>
											<ACBadge
												extraClasses={{
													tooltip: classes.serviceTooltip
												}}
												key="misc"
												type={badge}
												width="48px"
												height="48px"
											/>
											<Typography
												variant="body2"
												component="span"
												className={classes.badge}
											>
												{item.label?.split(' ')[0]}
											</Typography>
										</>
									) : (
										<ACBadge
											extraClasses={{
												tooltip: classes.serviceTooltip
											}}
											key="misc"
											type="misc"
											width="45px"
											height="45px"
										/>
									)}
								</Grid>
								<Grid item xs={12} md={9}>
									<Typography
										key={_id}
										variant="body2"
										data-test-id="details-service-item"
										className={classes.serviceText}
									>
										<Link to={itemLink}>{name}</Link>
									</Typography>
								</Grid>
							</Grid>
						);
					})}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Services;
