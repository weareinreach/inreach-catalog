import React from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
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

const styles = (theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		width: 'auto',
		marginTop: '25px'
	},
	tableContainer: {
		width: '80%',
		marginLeft: '10%',
		marginRight: '10%'
	}
});

const ReviewsListContainer = (props) => {
	const {classes, handleChange, handleUpdateUser, comments} = props;
	const windowSize = window.innerWidth;
	const isMobile = windowSize < breakpoints['sm'];
	const intl = useIntl();

	return (
		<>
			<Typography
				className={classes.marginTop}
				variant="h1"
				align="center"
				data-test-id="reviews-page-title-text"
			>
				<FormattedMessage
					id="reviews.title"
					defaultMessage="Your Reviews"
					description="Reviews page title"
				/>
			</Typography>
			<TableContainer component={Paper} className={classes.tableContainer}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">Organization</TableCell>
							<TableCell align="center">Service</TableCell>
							<TableCell align="center">Comment</TableCell>
							<TableCell align="center">Submitted</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{comments.map((comment) => (
							<TableRow
								key={comment.comments._id}
								sx={{'&:last-child td, &:last-child th': {border: 0}}}
							>
								<TableCell component="th" scope="row" align="center">
									{comment.organizationId}
								</TableCell>
								<TableCell align="center">{comment.serviceId}</TableCell>
								<TableCell align="center">{comment.comments.comment}</TableCell>
								<TableCell align="center">
									{comment.comments.created_at}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default withStyles(styles)(ReviewsListContainer);
