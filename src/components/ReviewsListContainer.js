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
		marginRight: '10%'
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
				<Typography variant="h4" className={classes.listItem}>
					{comment.organizationName}
				</Typography>
				<Typography variant="h5" className={classes.listItem}>
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
				<Typography variant="h5" className={classes.listItem}>
					<FormattedMessage
						id="reviews.service-name-label"
						defaultMessage="Service Name: "
					/>
				</Typography>
				<Typography variant="h4" className={classes.listItem}>
					{comment.serviceName}
				</Typography>
				<Typography variant="h5" className={classes.listItemBottom}>
					<FormattedMessage
						id="reviews.comment-label"
						defaultMessage="Comments: "
					/>
				</Typography>
				<Typography variant="h4" className={classes.listItem}>
					{comment.comments.comment}
				</Typography>
				<Typography variant="h4" className={classes.listItem}></Typography>
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
						id="reviews.title"
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
						id="reviews.sign-in-to-view"
						defaultMessage="You must be signed in to see your reviews."
						description="Reviews page header for not signed in"
					/>
				</Typography>
			)}

			{session && !isMobile && comments.length > 0 && (
				<TableContainer component={Paper} className={classes.tableContainer}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="left">Organization</TableCell>
								<TableCell align="left">Service</TableCell>
								<TableCell align="left">Comment</TableCell>
								<TableCell align="left">Submitted</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{comments.map((comment) => (
								<TableRow
									key={comment.comments._id}
									sx={{'&:last-child td, &:last-child th': {border: 0}}}
								>
									<TableCell align="left">{comment.organizationName}</TableCell>
									<TableCell align="left">{comment.serviceName}</TableCell>

									<TableCell align="left">{comment.comments.comment}</TableCell>
									<TableCell align="left">
										<FormattedDate
											value={new Date(comment.comments.created_at)}
											year="numeric"
											month="short"
											day="numeric"
											weekday="short"
										/>
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
						id="reviews.no-lists"
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
							id="reviews.title"
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
										id="reviews.sign-in-help"
										defaultMessage="You must be logged in to see your reviews."
										description="Message to sign in to see reviews"
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
								<Typography
									className={classes.spacingTop}
									variant="body1"
									align="center"
								>
									<FormattedMessage
										id="reviews.action"
										defaultMessage="Select a review to see more details"
										description="Message to select a review"
									/>
								</Typography>
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
												id="reviews.no-lists"
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
