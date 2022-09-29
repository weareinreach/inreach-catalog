import React from 'react';
import {FormattedMessage, FormattedDate} from 'react-intl';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

import {boldFont, dividerSpacing} from '../theme';
import VerifiedIcon from './icons/VerifiedIcon';

import Loading from './Loading';

const styles = (theme) => ({
	bottomSpacing: {
		marginBottom: '0.9rem'
	},
	boldFont: boldFont(theme),
	dividerSpacing: Object.assign(dividerSpacing(theme), {
		marginTop: dividerSpacing(theme).marginBottom
	}),
	switchInputRoot: {
		flexDirection: 'row-reverse',
		width: '100%',
		maxWidth: '500px',
		marginRight: '0px'
	},
	switchRoot: {
		height: 'auto'
	},
	reviewBadge: {
		display: 'inline-block',
		fontSize: '0.6rem',
		borderRadius: '4px',
		padding: '0px 6px',
		width: '120px',
		textAlign: 'center',
		marginBottom: '0.3rem'
	},
	reviewOD: {
		backgroundColor: '#30BCD5',
		color: theme.palette.common.darkBlack
	},
	reviewAC: {
		backgroundColor: theme.palette.secondary[500],
		color: theme.palette.common.white
	},
	leftMargin: {
		marginLeft: '2%'
	}
});

const ReviewList = ({title, classes, list}) => (
	<div>
		{title ? (
			<Typography
				data-test-id="review-list-title"
				variant="subtitle2"
				className={classes.boldFont + ' ' + classes.bottomSpacing}
			>
				{title}
			</Typography>
		) : null}
		{list.length ? (
			list[0].map((review) =>
				!review.isDeleted ? (
					<Grid
						key={review.userId}
						container
						spacing={0}
						className={classes.bottomSpacing}
					>
						<Grid item xs={12}>
							<Typography data-test-id="review-list-comment" variant="body2">
								"{review.comment}"
							</Typography>
							{review.isVerified && review.source === 'reviewer' ? (
								<>
									<Tooltip
										className={classes.leftMargin}
										classes={{tooltipPlacementTop: 'badge-tooltipTop'}}
										title={
											<a style={{color: '#e9e9e9'}}>
												<FormattedMessage
													id="review.disclaimer"
													defaultMessage="This review was submitted on {reviewDate, date, ::yyyyMMdd}. Reviewers must meet strict standards to be considered an InReach Verified Reviewer, {clickHere} for more details."
													description="text that explain when and how the review data is verified"
													values={{
														b: (chunks) => (
															<strong style={{color: 'black'}}>{chunks}</strong>
														),
														reviewDate: (
															<FormattedDate
																value={new Date(review.created_at)}
																year="numeric"
																month="short"
																day="numeric"
																weekday="short"
															/>
														),
														clickHere: (
															<a
																href="https://inreach.org/become-a-local-community-reviewer/"
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
										placement="top"
										interactive
									>
										<Badge>
											<VerifiedIcon
												extraClasses={classes.headerBadge}
												width="12px"
											/>
											<Typography
												data-test-id="review-list-comment-details"
												variant="body2"
												className={classes.leftMargin}
											>
												<FormattedMessage
													id="review.inreach-verified-user"
													defaultMessage="by an InReach Verified Reviewer from {reviewLocation}"
													description="Text indicating who submitted the review"
													values={{
														reviewLocation: review.userLocation
													}}
												/>
											</Typography>
										</Badge>
									</Tooltip>
								</>
							) : (
								<Typography
									data-test-id="review-list-comment-details"
									variant="body2"
									className={classes.leftMargin}
								>
									<FormattedMessage
										id="review.inreach-user"
										defaultMessage="by an InReach App User on {reviewDate}"
										description="Text indicating who submitted the review"
										values={{
											reviewDate: (
												<FormattedDate
													value={new Date(review.created_at)}
													year="numeric"
													month="short"
													day="numeric"
													weekday="short"
												/>
											)
										}}
									></FormattedMessage>
								</Typography>
							)}
						</Grid>
					</Grid>
				) : null
			)
		) : (
			<Typography
				data-test-id="review-list-comment"
				variant="body2"
				className={classes.boldFont}
			>
				<FormattedMessage
					id="resource.no-reviews"
					defaultMessage="No Reviews"
					description="Text indicating there are no reviews for this resource"
				/>
			</Typography>
		)}
	</div>
);

const Reviews = ({classes, reviews}) => (
	<Grid container spacing={0}>
		<Grid item xs={12}>
			<Grid container spacing={0} justify="space-between">
				<Grid item xs={12} md={12}>
					{reviews === false ? (
						<Loading />
					) : (
						<ReviewList list={reviews} classes={classes} />
					)}
				</Grid>
			</Grid>
		</Grid>
	</Grid>
);

export default withStyles(styles)(Reviews);
