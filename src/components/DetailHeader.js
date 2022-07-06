import React, {Fragment} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {Link} from 'react-router-dom';
import url from 'url';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';
import RatingAndReviews from './ResourceRatingAndReviews';
import Phone from './ResourcePhone';
import Disclaimer from './Disclaimer';
import VerifiedIcon from './icons/VerifiedIcon';
import {getSocialMediaLinks} from './ResourceSocialMedia';

const DetailHeader = ({
	alertMessage,
	classes,
	name,
	website,
	rating,
	totalRatings,
	phones,
	isMobile,
	isService,
	orgName,
	orgLink,
	verified,
	owners,
	isEditing,
	renderEditButton,
	socialMedia
}) => {
	const intl = useIntl();

	return (
		<Fragment>
			<Grid container spacing={0} alignItems="center">
				{alertMessage && <Disclaimer text={alertMessage} />}
				<Grid item xs={12} className={classes.bottomSpacing}>
					<Grid
						container
						alignItems="center"
						justify="space-between"
						spacing={0}
					>
						<Grid item xs md lg xl>
							<Grid container alignItems="center" direction="row">
								<Typography
									variant="h2"
									data-test-id="details-header"
									className={classes.orgName}
								>
									{name}
									{owners && owners.length ? (
										<>
											<VerifiedIcon
												data-test-id="details-header-verified-icon"
												extraClasses={classes.headerBadge}
												fillColor="#00C419"
												width="12px"
											/>
											<span className={classes.verifiedHeaderText}>
												<FormattedMessage
													id="resource.claimed"
													defaultMessage="Claimed"
													description="badge that specifies that this organization has been claimed"
												/>
											</span>
										</>
									) : null}
								</Typography>
								{isEditing && renderEditButton && renderEditButton()}
							</Grid>
						</Grid>
						{isService && isMobile ? (
							<Grid item xs={12} className={classes.serviceOrgContainer}>
								<Typography variant="h6" className={classes.serviceOrg}>
									<FormattedMessage
										id="resource.service-from"
										defaultMessage="Service from"
										description="title for the who provides the service section"
									/>{' '}
									<Link to={orgLink}>{orgName}</Link>
								</Typography>
							</Grid>
						) : null}
						{((totalRatings || rating) && isMobile) || !isMobile ? (
							<Grid
								item
								xs={12}
								md={3}
								className={
									isMobile ? classes.mobileRatingSummary : 'pull-right'
								}
							>
								<RatingAndReviews total={totalRatings} rating={rating} />
							</Grid>
						) : null}
					</Grid>
				</Grid>
				{isMobile ? (
					website && (
						<Grid item xs={12}>
							<Typography
								variant="body1"
								className={classes.moreInfo + ' ' + classes.bottomSpacing}
							>
								<a
									data-test-id="details-header-website"
									href={website}
									target="_blank"
									rel="noopener noreferrer"
									className={classes.bodyLink}
								>
									{url.parse(website)?.hostname || website}
								</a>
							</Typography>
						</Grid>
					)
				) : (
					<Grid item xs={12}>
						<Typography
							variant="body1"
							className={classNames(classes.moreInfo, classes.bottomSpacing)}
						>
							{website && (
								<a
									data-test-id="details-header-website"
									href={website}
									target="_blank"
									rel="noopener noreferrer"
									className={classes.bodyLink}
								>
									{url.parse(website)?.hostname || website}
								</a>
							)}
							{phones && phones.length ? '| ' : null}
							{phones && phones.length ? (
								<Phone phone={phones[0]} classes={classes} />
							) : null}
							{phones && phones.length ? '| ' : null}
							{socialMedia && socialMedia.length
								? getSocialMediaLinks({
										socialMedia: socialMedia,
										iconWidth: '16px',
										className: classNames(classes.contactInfo, classes.iconLink)
								  })
								: null}
							{socialMedia && socialMedia.length ? '| ' : null}
							{verified ? (
								<Tooltip
									classes={{tooltipPlacementTop: 'badge-tooltipTop'}}
									title={
										<a style={{color: '#e9e9e9'}}>
											<FormattedMessage
												id="resource.last-updated"
												defaultMessage={verified.toDateString()}
												description="date this resource data was last updated"
											/>{' '}
											{verified.toDateString()}.{' '}
											<FormattedMessage
												id="resource.accuracy-disclaimer"
												defaultMessage="InReach prioritizes accuracy and user safety, and updates all information at least once every 6 months. For more information on our vetting process."
												description="text that explain when and how the resource data is verified"
												values={{
													b: (chunks) => (
														<strong style={{color: 'black'}}>{chunks}</strong>
													),
													clickHere: (
														<a
															href="https://inreach.org/vetting-process/"
															target="_blank"
															rel="noopener noreferrer"
															className="hide--on-print"
															style={{color: 'black'}}
														>
															<FormattedMessage
																id="resource.click-here"
																defaultMessage="Click Here"
																description="link that takes user to full vetting process details"
															/>
														</a>
													)
												}}
											/>
										</a>
									}
									arrow
									placement="bottom"
									interactive
								>
									<Badge>
										<VerifiedIcon
											extraClasses={classes.headerBadge}
											width="12px"
										/>
										<Typography
											color="secondary"
											data-test-id="details-header-verified-text"
										>
											<FormattedMessage
												id="resource.verified-information"
												defaultMessage="Verified Information"
												description="badge with a tooltip that provides information on the accuracy of the resource data"
											/>
										</Typography>
									</Badge>
								</Tooltip>
							) : null}
						</Typography>
					</Grid>
				)}
				{isMobile && phones && phones.length ? (
					<Grid item xs={12}>
						<Typography
							variant="body1"
							className={classNames(classes.moreInfo, classes.bottomSpacing)}
						>
							<Phone phone={phones[0]} classes={classes} />
						</Typography>
					</Grid>
				) : null}
				{isMobile && verified ? (
					<Grid item xs={12}>
						<Badge
							className={classNames(
								classes.bottomSpacing,
								classes.bottomVerifiedBadge
							)}
						>
							<VerifiedIcon
								extraClasses={classNames(
									classes.headerBadge,
									classes.bottomHeaderBadge
								)}
								width="12px"
							/>
							<Tooltip
								classes={{tooltipPlacementTop: 'badge-tooltipTop'}}
								title={
									<a style={{color: '#e9e9e9'}}>
										<FormattedMessage
											id="resource.last-updated"
											defaultMessage={verified.toDateString()}
											description="date this resource data was last updated"
										/>{' '}
										{verified.toDateString()}.{' '}
										<FormattedMessage
											id="resource.accuracy-disclaimer"
											values={{
												b: (chunks) => (
													<strong style={{color: 'black'}}>{chunks}</strong>
												),
												clickHere: (
													<a
														href="https://inreach.org/vetting-process/"
														target="_blank"
														rel="noopener noreferrer"
														className="hide--on-print"
														style={{color: 'black'}}
													>
														<FormattedMessage
															id="resource.click-here"
															defaultMessage="Click Here"
															description="link that takes user to full vetting process details"
														/>
													</a>
												)
											}}
										/>
									</a>
								}
								arrow
								placement="bottom"
								enterTouchDelay={0}
								interactive
							>
								<Typography
									color="secondary"
									variant="body1"
									data-test-id="details-header-verified-text"
								>
									<FormattedMessage
										id="resource.verified-information"
										defaultMessage="Verified Information"
										description="badge with a tooltip that provides information on the accuracy of the resource data"
									/>
								</Typography>
							</Tooltip>
						</Badge>
					</Grid>
				) : null}
			</Grid>
		</Fragment>
	);
};

export default DetailHeader;
