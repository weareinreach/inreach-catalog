import React, {useState, useEffect} from 'react';
import {FormattedMessage, useIntl, FormattedDate} from 'react-intl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {breakpoints} from '../theme';
import Loading from './Loading';
import AsylumConnectButton from './AsylumConnectButton';
import AsylumConnectBackButton from './AsylumConnectBackButton';
import classNames from 'classnames';
import AsylumConnectCollapsibleSection from './AsylumConnectCollapsibleSection';
import {getCommentsByUser} from '../utils/api.js';

const styles = (theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		width: 'auto'
	},
	tableContainer: {
		width: '80%',
		marginLeft: '10%',
		marginRight: '10%',
		marginBottom: '1.5rem'
	},
	minHeight: {
		height: '300px'
	},
	marginTitle: {
		marginTop: '1.5rem',
		marginBottom: '1.5rem'
	},

	//mobile settings
	containerMobile: {
		marginTop: '1rem',
		width: '100%',
		paddingLeft: '20px',
		paddingRight: '20px'
	},
	backButton: {
		paddingBottom: '0.83em'
	},
	textCenter: {textAlign: 'center'},
	reviewsList: {
		listStyle: 'none',
		display: 'flex',
		flexDirection: 'column',
		padding: 0
	},
	listItem: {
		textTransform: 'capitalize',
		'&:hover': {
			color: theme.palette.common.blue
		},
		textAlign: 'left'
	},
	listItemBottom: {
		marginTop: '10px'
	}
});

const ReviewsListContainer = (props) => {
	const {classes, handleRequestOpen, session, locale} = props;
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);

	const [selectedComment, setSelectedComment] = useState(false);

	const windowSize = window.innerWidth;
	const isMobile = windowSize < breakpoints['sm'];
	const intl = useIntl();

	useEffect(() => {
		getCommentsByUser(props.user).then((data) => {
			setComments(data.comments);
		});
	}, []);

	const createTitle = (comment) => {
		return (
			<>
				<Typography
					data-test-id="review-organization-name"
					variant="h4"
					className={classes.listItem}
				>
					{comment.organizationName}
				</Typography>
				<Typography
					data-test-id="review-created-at"
					variant="h5"
					className={classes.listItem}
				>
					<FormattedDate
						value={new Date(comment.comments.created_at)}
						year="numeric"
						month="short"
						day="numeric"
					/>
				</Typography>
			</>
		);
	};

	const createContent = (comment) => {
		return (
			<Grid item xs={12}>
				<Typography
					data-test-id="review-service-name-label"
					variant="h5"
					className={classes.listItem}
				>
					<FormattedMessage
						id="review.service-label"
						defaultMessage="Service"
						description="label for Service name field"
					/>
					:
				</Typography>
				<Typography
					data-test-id="review-service-name"
					variant="h4"
					className={classes.listItem}
				>
					{comment.serviceName}
				</Typography>
				<Typography
					data-test-id="review-comment-label"
					variant="h5"
					className={classes.listItemBottom}
				>
					<FormattedMessage
						id="review.comment-label"
						defaultMessage="Comment"
						description="label for Comment field"
					/>
					:
				</Typography>
				<Typography
					data-test-id="review-comment"
					variant="h4"
					className={classes.listItem}
				>
					{comment.comments.comment}
				</Typography>
				<Typography
					data-test-id="review-rating-label"
					variant="h5"
					className={classes.listItemBottom}
				>
					<FormattedMessage
						id="review.rating-label"
						defaultMessage="Rating"
						description="label for Rating field"
					/>
					:
				</Typography>
				<Typography
					data-test-id="review-rating"
					variant="h4"
					className={classes.listItem}
				>
					{comment.comments.rating ? comment.comments.rating : 'N/A'}
				</Typography>
			</Grid>
		);
	};

	return (
		<>
			{!isMobile && (
				<Typography
					className={classes.marginTitle}
					variant="h1"
					align="center"
					data-test-id="reviews-page-title-text"
				>
					<FormattedMessage
						id="review.review-title"
						defaultMessage="Reviews"
						description="Reviews page title"
					/>
				</Typography>
			)}
			{!session && !isMobile && (
				<Typography
					className={classes.minHeight}
					variant="body1"
					align="center"
					data-test-id="reviews-page-header-text"
				>
					<FormattedMessage
						id="review.sign-in-to-view"
						defaultMessage="You must be signed in to see your reviews."
						description="Reviews page header for not signed in"
					/>
				</Typography>
			)}

			{session && !isMobile && comments.length > 0 && (
				<TableContainer
					data-test-id="review-table-container"
					component={Paper}
					className={classes.tableContainer}
				>
					<Table data-test-id="review-table" aria-label="simple table">
						<TableHead>
							<TableRow data-test-id="review-table-header">
								<TableCell
									data-test-id="review-table-header-cell-organization"
									align="left"
								>
									<Typography variant="h4">
										<FormattedMessage
											id="review.organization-label"
											defaultMessage="Organization"
											description="Organization Name column"
										/>
									</Typography>
								</TableCell>
								<TableCell
									data-test-id="review-table-header-cell-service"
									align="left"
								>
									<Typography variant="h4">
										<FormattedMessage
											id="review.service-label"
											defaultMessage="Service"
											description="Service Name column"
										/>
									</Typography>
								</TableCell>
								<TableCell
									data-test-id="review-table-header-cell-comment"
									align="left"
								>
									<Typography variant="h4">
										<FormattedMessage
											id="review.comment-label"
											defaultMessage="Comment"
											description="Comment column"
										/>
									</Typography>
								</TableCell>
								<TableCell
									data-test-id="review-table-header-cell-rating"
									align="left"
								>
									<Typography variant="h4">
										<FormattedMessage
											id="review.rating-label"
											defaultMessage="Rating"
											description="Rating column"
										/>
									</Typography>
								</TableCell>
								<TableCell
									data-test-id="review-table-header-cell-submitted"
									align="left"
								>
									<Typography variant="h4">
										<FormattedMessage
											id="review.submitted-label"
											defaultMessage="Submitted"
											description="Submitted column"
										/>
									</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody data-test-id="review-table-body">
							{comments.map((comment) => (
								<TableRow
									key={comment.comments._id}
									sx={{'&:last-child td, &:last-child th': {border: 0}}}
								>
									<TableCell
										data-test-id="review-table-body-cell-organization"
										align="left"
									>
										<Typography variant="body1">
											{comment.organizationName}
										</Typography>
									</TableCell>
									<TableCell
										data-test-id="review-table-body-cell-service"
										align="left"
									>
										<Typography variant="body1">
											{comment.serviceName}
										</Typography>
									</TableCell>
									<TableCell
										data-test-id="review-table-body-cell-comment"
										align="left"
									>
										<Typography variant="body1">
											{comment.comments.comment}
										</Typography>
									</TableCell>
									<TableCell
										data-test-id="review-table-body-cell-rating"
										align="left"
									>
										<Typography variant="body1">
											{comment.comments.rating
												? comment.comments.rating
												: 'N/A'}
										</Typography>
									</TableCell>
									<TableCell
										data-test-id="review-table-body-cell-date"
										align="left"
									>
										<Typography variant="body1">
											<FormattedDate
												value={new Date(comment.comments.created_at)}
												year="numeric"
												month="short"
												day="numeric"
											/>
										</Typography>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}

			{session && !isMobile && !comments.length && (
				<Typography
					variant="body1"
					className={classes.spacingTop}
					align="center"
					data-test-id="reviews-page-body-text"
				>
					<FormattedMessage
						id="review.no-lists"
						defaultMessage="You have not yet submitted a review."
						description="Message that there are no reviews "
					/>
				</Typography>
			)}

			{isMobile && (
				<Grid container className={classes.containerMobile} direction="column">
					<Typography
						className={classes.textCenter}
						variant="h3"
						data-test-id="reviews-page-title-text"
					>
						<FormattedMessage
							id="review.review-title"
							defaultMessage="Reviews"
							description="Reviews page title"
						/>
					</Typography>
					<Grid item xs={12}>
						{!session && (
							<Grid container className={classes.container} direction="column">
								<Typography
									className={classNames(
										classes.spacingBottom,
										classes.textCenter
									)}
									variant="body1"
									data-test-id="reviews-page-header-text"
								>
									<FormattedMessage
										id="review.sign-in-to-view"
										defaultMessage="You must be signed in to see your reviews."
										description="Reviews page header for not signed in"
									/>
									<br />
									<br />
									<AsylumConnectButton
										variant="primary"
										className={classes.spacingTop}
										onClick={(ev) => {
											handleRequestOpen('login');
										}}
										testIdName="reviews-page-login-button"
									>
										<FormattedMessage
											id="account.sign-in"
											defaultMessage="Sign In"
											description="Button to sign in to your account"
										/>
									</AsylumConnectButton>
									<AsylumConnectButton
										variant="secondary"
										className={classes.spacingTop}
										onClick={(ev) => {
											handleRequestOpen('signup');
										}}
										testIdName="reviews-page-signup-button"
									>
										<FormattedMessage
											id="account.sign-up"
											defaultMessage="Sign Up"
											description="Button to sign up for an account"
										/>
									</AsylumConnectButton>
								</Typography>
							</Grid>
						)}
						{session && (
							<>
								{comments.length > 0 ? (
									<Typography
										className={classes.spacingTop}
										variant="body1"
										align="center"
									>
										<FormattedMessage
											id="review.select-details"
											defaultMessage="Select a review to see more details."
											description="Message to select a review"
										/>
									</Typography>
								) : null}
								<Grid item xs={12}>
									{comments.length > 0 ? (
										<ul
											className={classes.reviewsList}
											data-test-id="reviews-page-list"
										>
											{comments.map((comment) => (
												<li
													key={comment.comments._id}
													data-test-id="reviews-page-list-item"
												>
													<AsylumConnectCollapsibleSection
														className={classes.mobilePadding}
														expanded={false}
														title={createTitle(comment)}
														content={createContent(comment)}
													></AsylumConnectCollapsibleSection>
												</li>
											))}
										</ul>
									) : (
										<Typography
											variant="body1"
											className={classes.spacingTop}
											align="center"
											data-test-id="reviews-page-body-text"
										>
											<FormattedMessage
												id="review.no-lists"
												defaultMessage="You have not yet submitted a review."
												description="Message that there are no reviews "
											/>
										</Typography>
									)}
								</Grid>
							</>
						)}
					</Grid>
				</Grid>
			)}
		</>
	);
};

export default withStyles(styles)(ReviewsListContainer);
