import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';

import trim from 'trim';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import AsylumConnectButton from './AsylumConnectButton';
import RatingControl from './ResourceRatingControl';
import withWidth from './withWidth';
import {
	boldFont,
	bodyLink,
	breakpoints,
	italicFont,
	dividerSpacing
} from '../theme';
import {createComment, createRating} from '../utils/api';

const styles = (theme) => ({
	bottomSpacing: {
		marginBottom: '0.9rem'
	},
	dividerSpacing: dividerSpacing(theme),
	ratingSpacing: {
		marginRight: '1rem'
	},
	reviewField: {
		width: '100%',
		padding: '1rem',
		fontSize: '0.9rem',
		height: '20%',
		border: '1px solid ' + theme.palette.common.darkGrey,
		[theme.breakpoints.down('xs')]: {
			height: '15%'
		}
	},
	boldFont: boldFont(theme),
	bodyLink: bodyLink(theme),
	italicFont: italicFont(theme)
});

class ReviewForm extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			rating: 0,
			comment: false,
			complete: false
		};

		this.handleFormSubmission = this.handleFormSubmission.bind(this);
		this.handleStarClick = this.handleStarClick.bind(this);
		this.handleCommentChange = this.handleCommentChange.bind(this);
	}

	handleStarClick(rating) {
		this.setState({
			rating: rating
		});
	}

	handleCommentChange(event) {
		const comment = trim(event.target.value).length
			? trim(event.target.value)
			: false;
		this.setState({
			comment: comment
		});
	}

	handleFormSubmission() {
		const resource = this.props?.resource;

		if (resource && resource?._id) {
			const body = {source: 'catalog', userId: this.props?.user};

			if (resource?.organization && resource.organization?._id) {
				body.orgId = resource.organization._id;
				body.serviceId = resource?._id;
			} else {
				body.orgId = resource?._id;
			}

			if (this.state.rating) {
				createRating({...body, rating: this.state.rating.toString()});
			}

			if (this.state.comment) {
				createComment({...body, comment: this.state.comment});
			}
		}
		this.setState({
			complete: true
		});
	}

	render() {
		const {classes, intl} = this.props;
		const isMobile = this.props.width < breakpoints['sm'];

		return (
			<Grid container spacing={0}>
				{!this.state.complete ? (
					<div>
						<Grid item xs={12}>
							<RatingControl
								mode="interactive"
								rating={this.state.rating}
								onClick={this.handleStarClick}
								className={classes.bottomSpacing + ' ' + classes.ratingSpacing}
							/>
							<Typography
								data-test-id="details-review-form-header"
								variant="body2"
								className={'center-align ' + classes.bottomSpacing}
							>
								<span className={classes.boldFont}>
									<FormattedMessage
										id="resource-property.rate-this-resource"
										defaultMessage="Rate this resource"
										description="Section for Resource Reviews"
									/>
								</span>{' '}
								{isMobile ? null : (
									<FormattedMessage
										id="resource-property.save-rating"
										defaultMessage="Your rating will not be recorded until you hit Submit"
										description="Info text indicating review details are not saved until they are submitted"
									/>
								)}
							</Typography>
						</Grid>
						{isMobile ? null : (
							<Grid item xs={12}>
								<Typography
									data-test-id="details-review-form-body1"
									variant="body2"
									className={classes.italicFont + ' ' + classes.bottomSpacing}
								>
									<FormattedMessage
										id="resource.lgbtq-friendly-prompt"
										defaultMessage="Is this resource LGBTQ-friendly? Is this resource friendly to asylum seekers? InReach will update our resource app based on your review."
										description="helper text for the review form"
									/>
								</Typography>
							</Grid>
						)}
						<Grid item xs={12}>
							<textarea
								data-test-id="details-review-form-input"
								className={classes.reviewField + ' ' + classes.bottomSpacing}
								onChange={this.handleCommentChange}
								placeholder={intl.formatMessage({
									id: 'resource.review-input-placeholder'
								})}
								name="comment"
							/>
						</Grid>
						<Grid item xs={12} className={classes.dividerSpacing}>
							<AsylumConnectButton
								testIdName="details-review-form-submit-button"
								variant="primary"
								onClick={this.handleFormSubmission}
							>
								<FormattedMessage
									id="action.submit"
									defaultMessage="Submit"
									description="label for the submit review button"
								/>
							</AsylumConnectButton>
						</Grid>
					</div>
				) : (
					<Grid item xs={12}>
						<Typography
							variant="body2"
							data-test-id="details-review-form-post-review"
							className={classes.boldFont + ' ' + classes.bottomSpacing}
						>
							<FormattedMessage
								id="action.comment-submitted-confirmation"
								defaultMessage="hank you for your comment! Questions? Please email"
								description="Thank you text after submitting a review"
							/>{' '}
							<a href="mailto:app@inreach.org" className={classes.bodyLink}>
								app@inreach.org
							</a>
						</Typography>
					</Grid>
				)}
			</Grid>
		);
	}
}

export default withStyles(styles)(withWidth(injectIntl(ReviewForm)));
