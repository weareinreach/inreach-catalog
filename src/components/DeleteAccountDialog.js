import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import AsylumConnectButton from './AsylumConnectButton';
import DialogTitle from './DialogTitle';
import {deleteUser, catalogPost, catalogGet, checkUser} from '../utils/api';

const styles = (theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center'
	},
	marginTop: {
		marginTop: theme.spacing(1)
	}
});

class DeleteAccountDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			password: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.confirmDelete = this.confirmDelete.bind(this);
	}

	handleChange(e) {
		const {name, value} = e.target;
		this.setState({
			[name]: value
		});
	}

	confirmDelete(e) {
		e.preventDefault();
		const {handleMessageNew, handleLogOut} = this.props;
		const password = this.state.password;
		const email = this.props.userData.email;

		//confirm user enters password, then confirm the password, then delete account
		if (!this.state.password) {
			handleMessageNew(
				<FormattedMessage id="error.incorrect-email-password" />
			);
		} else {
			//verify entered password
			catalogPost('/auth', {email, password})
				.then((response) => {
					if (response.status === 200) {
						//delete account here
						deleteUser(this.props.userData)
							.then(() => {
								this.props.handleRequestClose();
								this.setState({password: ''});
								handleLogOut();
								handleMessageNew(
									<FormattedMessage id="action.account-deleted-successfully" />
								);
							})
							.catch(() => {
								handleMessageNew(<FormattedMessage id="error.unspecified" />);
							});
					} else {
						this.setState({password: ''});
						handleMessageNew(
							<FormattedMessage id="error.incorrect-email-password"></FormattedMessage>
						);
					}
				})
				.catch((error) => {
					this.setState({password: ''});
					handleMessageNew(<FormattedMessage id="error.unspecified" />);
				});
		}
	}

	render() {
		const {classes, handleRequestClose} = this.props;
		const {password} = this.state;
		return (
			<div className={classes.container}>
				<DialogTitle data-test-id="delete-account-title">
					<FormattedMessage id="action.delete-account" />
				</DialogTitle>
				<Typography type="body1" data-test-id="delete-account-body-1">
					<FormattedMessage id="action.confirm-account-deletion" />
				</Typography>
				<form className={classes.container}>
					<Typography variant="body1" data-test-id="delete-account-body-2">
						<FormattedMessage id="form.re-enter-password" />
					</Typography>
					<TextField
						data-test-id="delete-account-password"
						label={<FormattedMessage id="form.password" />}
						margin="normal"
						name="password"
						onChange={this.handleChange}
						required
						type="password"
						value={password}
					/>
					<AsylumConnectButton
						// disabled={!password}
						variant="primary"
						onClick={this.confirmDelete}
						className={classes.marginTop}
						testIdName="delete-account-delete-button"
					>
						<FormattedMessage id="action.delete-account" />
					</AsylumConnectButton>
				</form>

				<AsylumConnectButton
					variant="secondary"
					testIdName="delete-account-cancel-button"
					onClick={handleRequestClose}
				>
					<FormattedMessage id="action.cancel" />
				</AsylumConnectButton>
			</div>
		);
	}
}

DeleteAccountDialog.propTypes = {
	handleDeleteAccount: PropTypes.func.isRequired,
	handleRequestClose: PropTypes.func.isRequired
};

export default withStyles(styles)(DeleteAccountDialog);
