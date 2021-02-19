import React, {useState, Fragment} from 'react';
import url from 'url';
import trim from 'trim';
import _ from 'lodash';

import {withStyles} from '@material-ui/core/styles';
import {
	FormControl,
	Grid,
	Select,
	TextField,
	Typography
} from '@material-ui/core';
import Fa from 'react-fontawesome';

import {days, ScheduleParser} from './Parser';
import {TimeZones} from '../utils/convertTime';
import Phone from './ResourcePhone';
import {boldFont, bodyLink, listLink, dividerSpacing} from '../theme';
import AsylumConnectButton from './AsylumConnectButton';
import AsylumConnectCheckbox from './AsylumConnectCheckbox';
import {InformationIcon} from './icons';

const styles = (theme) => ({
	boldFont: boldFont(theme),
	bodyLink: bodyLink(theme),
	listLink: listLink(theme),
	dividerSpacing: dividerSpacing(theme),
	bottomSpacing: {
		marginBottom: theme.spacing(1)
	},
	lineSpacing: {
		lineHeight: '1.4rem',
		marginBottom: theme.spacing(2),
		[theme.breakpoints.down('xs')]: {
			paddingLeft: theme.spacing(4),
			position: 'relative'
		}
	},
	locationSpacing: {
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1)
	},
	mobileIcon: {
		display: 'none',
		[theme.breakpoints.down('xs')]: {
			display: 'block',
			position: 'absolute',
			left: 0,
			top: theme.spacing(1) / 2,
			width: '22px'
		}
	},
	mobileHide: {
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	container: {
		border: `1px solid ${theme.palette.grey[400]}`,
		borderRadius: '4px',
		padding: '25px',
		marginTop: '25px'
	},
	sectionHeader: {
		marginBottom: '20px'
	},
	inputLabel: {
		marginBottom: '3px',
		fontWeight: '600'
	},
	days: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	weekends: {
		display: 'flex',
		justifyContent: 'center'
	},
	weekend: {
		margin: '15px 15px'
	},
	weekday: {
		width: '18%'
	},
	addButton: {
		marginTop: '25px'
	},
	deleteButton: {
		paddingTop: '20px',
		paddingLeft: '10px',
		cursor: 'pointer'
	},
	inputGroup: {
		marginBottom: '45px'
	},
	select: {
		minWidth: '100%'
	},
	divider: {
		borderTop: `1px solid ${theme.palette.grey[400]}`,
		margin: '25px 0'
	},
	checkbox: {
		margin: '0 0'
	},
	scheduleNote: {
		marginTop: '16px'
	}
});

//TODO: Update each of these to utilize components where the code is shared with DetailAccessInstructions.js

const Visit = ({
	website,
	phones,
	emails,
	locations,
	schedules,
	classes,
	isMobile,
	hideTitle,
	className,
	editMode,
	renderSaveButtons
}) => {
	const [websiteEdit, setWebsite] = useState(website || '');
	// const [emailsEdit, setEmails] = useState(emails.length ? emails : [{}]);
	const [emailsEdit, setEmails] = useState(
		emails?.length
			? emails
			: [
					{
						email: 'test@gmail.com',
						title: 'Mx.',
						first_name: 'Test',
						last_name: 'Testerson'
					},
					{email: 'test2@gmail.com', first_name: 'Jeff'},
					{email: 'test3@gmail.com', title: 'Mr.', last_name: 'Esther'}
			  ]
	);
	const [phonesEdit, setPhones] = useState(phones?.length ? phones : [{}]);
	const [locationsEdit, setLocations] = useState(
		locations?.length ? locations : [{}]
	);
	const [schedulesEdit, setSchedules] = useState(
		schedules?.length ? schedules : [{}]
	);

	const renderDelete = (onClick) => {
		return (
			<div className={classes.deleteButton} onClick={onClick}>
				<Typography variant="h5" color="primary">
					(DELETE)
				</Typography>
			</div>
		);
	};

	const renderDivider = () => {
		return <Grid item xs={12} className={classes.divider} />;
	};

	const addEntry = (collection, setCollectionFunc) => {
		const collectionCopy = _.cloneDeep(collection);
		collectionCopy.push({});
		setCollectionFunc(collectionCopy);
	};

	const deleteEntry = (collection, idx, setCollectionFunc) => {
		const collectionCopy = _.cloneDeep(collection);
		collectionCopy.splice(idx, 1);
		setCollectionFunc(collectionCopy);
	};

	if (editMode) {
		const timeZones = _.map(TimeZones, (tz, idx) => {
			return (
				<option key={idx} value={tz.value}>
					{tz.label}
				</option>
			);
		});

		return (
			<Grid container direction="column">
				{/* Web input */}
				<Grid item>
					<Typography variant="body1" className={classes.inputLabel}>
						Website
					</Typography>
					<TextField
						variant="outlined"
						color="secondary"
						value={websiteEdit}
						onChange={({target}) => {
							setWebsite(target.value);
						}}
					/>
				</Grid>

				{/* Emails inputs */}
				<Grid item className={classes.container}>
					<Typography variant="subtitle2" className={classes.sectionHeader}>
						Email(s)
					</Typography>
					<Grid container spacing={3}>
						{_.map(emailsEdit, (email, idx) => {
							return (
								<Fragment key={idx}>
									<Grid item xs={3}>
										<Typography variant="body1" className={classes.inputLabel}>
											Email
										</Typography>
										<TextField
											variant="outlined"
											color="secondary"
											fullWidth
											value={email.email || ''}
										/>
									</Grid>
									<Grid item xs={2}>
										<Typography variant="body1" className={classes.inputLabel}>
											Title
										</Typography>
										<TextField
											variant="outlined"
											color="secondary"
											fullWidth
											value={email.title || ''}
										/>
									</Grid>
									<Grid item xs={2}>
										<Typography variant="body1" className={classes.inputLabel}>
											First Name
										</Typography>
										<TextField
											variant="outlined"
											color="secondary"
											fullWidth
											value={email.first_name || ''}
										/>
									</Grid>
									<Grid item xs={3}>
										<Typography variant="body1" className={classes.inputLabel}>
											Last Name
										</Typography>
										<TextField
											variant="outlined"
											color="secondary"
											fullWidth
											value={email.last_name || ''}
										/>
									</Grid>
									<Grid container item xs={2} alignItems="center">
										{emailsEdit.length > 1 &&
											renderDelete(() => {
												deleteEntry(emailsEdit, idx, setEmails);
											})}
									</Grid>
								</Fragment>
							);
						})}
					</Grid>
					<AsylumConnectButton
						variant="secondary"
						className={classes.addButton}
						onClick={() => {
							addEntry(emailsEdit, setEmails);
						}}
					>
						Add new email
					</AsylumConnectButton>
				</Grid>

				{/* Phones inputs */}
				<Grid item className={classes.container}>
					<Typography variant="subtitle2" className={classes.sectionHeader}>
						Phone number(s)
					</Typography>
					<Grid container spacing={3}>
						{_.map(phonesEdit, (phone, idx) => {
							return (
								<Fragment key={idx}>
									<Grid item xs={5}>
										<Typography variant="body1" className={classes.inputLabel}>
											Phone number
										</Typography>
										<TextField
											variant="outlined"
											color="secondary"
											fullWidth
											value={phone.digits || ''}
										/>
									</Grid>
									<Grid item xs={5}>
										<Typography variant="body1" className={classes.inputLabel}>
											Label
										</Typography>
										<TextField
											variant="outlined"
											color="secondary"
											fullWidth
											value={phone.phone_type || ''}
										/>
									</Grid>
									<Grid container item xs={2} alignItems="center">
										{phonesEdit.length > 1 &&
											renderDelete(() => {
												deleteEntry(phonesEdit, idx, setPhones);
											})}
									</Grid>
								</Fragment>
							);
						})}
					</Grid>
					<AsylumConnectButton
						variant="secondary"
						className={classes.addButton}
						onClick={() => {
							addEntry(phonesEdit, setPhones);
						}}
					>
						Add new phone
					</AsylumConnectButton>
				</Grid>

				{/* Locations inputs */}
				<Grid item className={classes.container}>
					<Typography variant="subtitle2" className={classes.sectionHeader}>
						Location
					</Typography>
					{_.map(locationsEdit, (location, idx) => {
						return (
							<Fragment key={idx}>
								<Grid container>
									<Grid container item spacing={3} xs={10}>
										<Grid item xs={8}>
											<Typography
												variant="body1"
												className={classes.inputLabel}
											>
												Address
											</Typography>
											<TextField
												variant="outlined"
												color="secondary"
												fullWidth
												value={location.address || ''}
											/>
										</Grid>
										<Grid item xs={4}>
											<Typography
												variant="body1"
												className={classes.inputLabel}
											>
												P.O. Box, Apt, Etc
											</Typography>
											<TextField
												variant="outlined"
												color="secondary"
												fullWidth
												value={location.unit || ''}
											/>
										</Grid>
										<Grid item xs={6}>
											<Typography
												variant="body1"
												className={classes.inputLabel}
											>
												City
											</Typography>
											<TextField
												variant="outlined"
												color="secondary"
												fullWidth
												value={location.city || ''}
											/>
										</Grid>
										<Grid item xs={2}>
											<Typography
												variant="body1"
												className={classes.inputLabel}
											>
												State
											</Typography>
											<TextField
												variant="outlined"
												color="secondary"
												fullWidth
												value={location.state || ''}
											/>
										</Grid>
										<Grid item xs={4}>
											<Typography
												variant="body1"
												className={classes.inputLabel}
											>
												Zip Code
											</Typography>
											<TextField
												variant="outlined"
												color="secondary"
												fullWidth
												value={location.zip_code || ''}
											/>
										</Grid>
									</Grid>
									<Grid
										container
										item
										xs={2}
										justify="center"
										alignItems="center"
									>
										{locationsEdit.length > 1 &&
											renderDelete(() => {
												deleteEntry(locationsEdit, idx, setLocations);
											})}
									</Grid>
								</Grid>
								{renderDivider()}
							</Fragment>
						);
					})}
					<AsylumConnectButton
						variant="secondary"
						onClick={() => addEntry(locationsEdit, setLocations)}
					>
						Add new location
					</AsylumConnectButton>
				</Grid>

				{/* Schedules inputs */}
				<Grid container item className={classes.container} justify="center">
					<Typography variant="subtitle2" className={classes.sectionHeader}>
						Schedules
					</Typography>
					{_.map(schedulesEdit, (schedule, idx) => {
						return (
							<Grid container spacing={2} key={idx}>
								<Grid item xs={10}>
									<Typography variant="body1" className={classes.inputLabel}>
										Name
									</Typography>
									<TextField
										variant="outlined"
										color="secondary"
										fullWidth
										value={schedule.name}
									/>
								</Grid>
								<Grid
									container
									item
									xs={2}
									justify="center"
									alignItems="center"
								>
									{schedulesEdit.length > 1 &&
										renderDelete(() => {
											deleteEntry(schedulesEdit, idx, setSchedules);
										})}
								</Grid>

								<Grid item xs={8}>
									<Typography variant="body1" className={classes.inputLabel}>
										Notes (Optional)
									</Typography>
									<TextField
										variant="outlined"
										color="secondary"
										fullWidth
										value={schedule.note}
									/>
								</Grid>
								<Grid item xs={2}>
									<FormControl
										variant="outlined"
										color="secondary"
										className={classes.select}
									>
										<Typography variant="body1" className={classes.inputLabel}>
											Timezone
										</Typography>
										<Select value={schedule.timezone} native>
											{timeZones}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={2} />

								<Grid item xs={2} />
								<Grid container item xs={2} justify="center">
									<Typography variant="body1" className={classes.inputLabel}>
										Closed
									</Typography>
								</Grid>
								<Grid item xs={2}>
									<Typography variant="body1" className={classes.inputLabel}>
										Open Time
									</Typography>
								</Grid>
								<Grid item xs={2}>
									<Typography variant="body1" className={classes.inputLabel}>
										Close Time
									</Typography>
								</Grid>
								<Grid container item xs={2} justify="center">
									<Typography variant="body1" className={classes.inputLabel}>
										Open 24hr
									</Typography>
								</Grid>
								<Grid item xs={2} />

								{_.map(days, (day, dayIdx) => {
									return (
										<Fragment key={dayIdx}>
											<Grid container item xs={2} alignItems="center">
												<Typography variant="body1">{day.name}</Typography>
											</Grid>
											<Grid container item xs={2} justify="center">
												<AsylumConnectCheckbox
													label=""
													iconSize={{width: '1.5rem', height: '1.5rem'}}
													additionalClasses={{root: classes.checkbox}}
												/>
											</Grid>
											<Grid item xs={2}>
												<TextField
													variant="outlined"
													color="secondary"
													fullWidth
													value={schedule[`${day.name.toLowerCase()}_start`]}
												/>
											</Grid>
											<Grid item xs={2}>
												<TextField
													variant="outlined"
													color="secondary"
													fullWidth
													value={schedule[`${day.name.toLowerCase()}_end`]}
												/>
											</Grid>
											<Grid container item xs={2} justify="center">
												<AsylumConnectCheckbox
													label=""
													iconSize={{width: '1.5rem', height: '1.5rem'}}
													additionalClasses={{root: classes.checkbox}}
												/>
											</Grid>
											<Grid item xs={2}></Grid>
										</Fragment>
									);
								})}
								{renderDivider()}
							</Grid>
						);
					})}
					<Grid item xs={12}>
						<AsylumConnectButton
							variant="secondary"
							onClick={() => {
								addEntry(schedulesEdit, setSchedules);
							}}
						>
							Add new schedule
						</AsylumConnectButton>
					</Grid>
					<Grid
						container
						item
						xs={12}
						spacing={1}
						direction="row"
						className={classes.scheduleNote}
					>
						<Grid item>
							<InformationIcon />
						</Grid>
						<Grid item>
							<Typography variant="body2">
								Add another schedule if you have programs or locations operating
								at different hours.
							</Typography>
						</Grid>
					</Grid>
				</Grid>

				{renderSaveButtons && renderSaveButtons()}
			</Grid>
		);
	}

	return (
		<Grid container spacing={0} className={className}>
			<Grid item xs={12}>
				<Typography variant="body2" className={classes.lineSpacing}>
					<strong className={classes.boldFont + ' ' + classes.mobileHide}>
						Website:{' '}
					</strong>
					{website ? (
						<a
							href={website}
							target="_blank"
							className={classes.bodyLink}
							rel="noopener noreferrer"
						>
							{isMobile ? url.parse(website).hostname : website}
						</a>
					) : null}
					<Fa name="link" className={classes.mobileIcon} />
				</Typography>
				{emails && emails.length ? (
					<Typography variant="body2" className={classes.lineSpacing}>
						<strong className={classes.boldFont + ' ' + classes.mobileHide}>
							Email:{' '}
						</strong>
						{emails.map((email) => {
							let name = trim(
								(email.title ? email.title : '') +
									' ' +
									(email.first_name ? email.first_name : '') +
									' ' +
									(email.last_name ? email.last_name : '')
							);
							return (
								<a
									href={'mailto:' + email.email}
									key={email.id}
									className={classes.bodyLink + ' ' + classes.listLink}
								>
									{email.email}
									{name ? '(' + name + ')' : ''}
								</a>
							);
						})}
						<Fa name="envelope" className={classes.mobileIcon} />
					</Typography>
				) : null}
				{phones && phones.length ? (
					<Typography variant="body2" className={classes.lineSpacing}>
						<strong className={classes.boldFont + ' ' + classes.mobileHide}>
							Phone number(s):{' '}
						</strong>
						{phones.map((phone) => (
							<Phone
								key={phone.id}
								phone={phone}
								classes={classes}
								includeType={true}
							/>
						))}
						<Fa name="phone" className={classes.mobileIcon} />
					</Typography>
				) : null}
				{_.map(schedules, (schedule, idx) => {
					let sched;
					return (
						<div
							key={idx}
							className={schedules.length > 1 ? classes.locationSpacing : null}
						>
							<Typography variant="body2" className={classes.lineSpacing}>
								<strong className={classes.boldFont}>
									{schedule.name ? schedule.name : 'Location'}:{' '}
								</strong>
								<Fa name="map-marker" className={classes.mobileIcon} />
							</Typography>
							{schedule && (sched = ScheduleParser({schedule})).length ? (
								<Typography variant="body2" className={classes.lineSpacing}>
									<strong
										className={classes.boldFont + ' ' + classes.mobileHide}
									>
										Hours:{' '}
									</strong>
									{sched
										.map((sch) => {
											return sch.days + ' ' + sch.time;
										})
										.join(', ')}
									<Fa name="clock-o" className={classes.mobileIcon} />
								</Typography>
							) : null}
							{schedule && schedule.note && trim(schedule.note).length ? (
								<Typography variant="body2" className={classes.lineSpacing}>
									<strong className={classes.boldFont}>
										Additional Information:{' '}
									</strong>
									{schedule.note}
									<Fa name="info-circle" className={classes.mobileIcon} />
								</Typography>
							) : null}
						</div>
					);
				})}
			</Grid>
		</Grid>
	);
};

export default withStyles(styles)(Visit);
