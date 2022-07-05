import React from 'react';
import {FormattedMessage} from 'react-intl';

import trim from 'trim';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fa from 'react-fontawesome';

import {ScheduleParser, AddressParser} from './Parser';
import Phone from './ResourcePhone';
import {boldFont, bodyLink, listLink} from '../theme';

const styles = (theme) => ({
	boldFont: boldFont(theme),
	bodyLink: bodyLink(theme),
	listLink: listLink(theme),
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
	instructions: {},
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
	}
});
//TODO: Update each of these to utilize components where the code is shared with ResourceVisit.js

const DetailAccessInstructions = (props) => {
	const {classes, email, list, location, phone, rawSchedule, website} = props;
	let schedule;

	return (
		<Grid container spacing={0}>
			<Grid item xs={12}>
				{list?.length
					? list.map((item, index) => {
							switch (item.access_type) {
								case 'phone':
									let phoneValue = item.access_value
										? item.access_value.replace(/[^0-9\(\)\-\.\s]/g, '')
												.length === item.access_value.length
											? {digits: item.access_value}
											: item.access_value
										: phone;
									if (
										phoneValue &&
										(phoneValue.digits || phoneValue.length > 0)
									) {
										return (
											<Typography
												key={index}
												variant="body2"
												className={classes.lineSpacing}
											>
												<strong
													className={
														classes.boldFont + ' ' + classes.mobileHide
													}
												>
													<FormattedMessage
														id="resource.phone-numbers"
														defaultMessage="Phone Numbers"
														description="phone numbers section label"
													/>
													:{' '}
												</strong>
												{typeof phoneValue.digits !== 'undefined' ? (
													<Phone
														phone={phoneValue}
														classes={classes}
														includeType={true}
													/>
												) : (
													phoneValue
												)}
												{item.instructions ? (
													<span className={classes.instructions}>
														<br />
														{item.instructions}
													</span>
												) : null}
												<Fa name="phone" className={classes.mobileIcon} />
											</Typography>
										);
									} else {
										return null;
									}
								case 'email':
									const emailValue = item.access_value
										? {email: item.access_value}
										: email;

									return (
										<Typography
											key={index}
											variant="body2"
											className={classes.lineSpacing}
										>
											<strong
												className={classes.boldFont + ' ' + classes.mobileHide}
											>
												<FormattedMessage
													id="resource.email-label"
													defaultMessage="Email"
													description="email section label"
												/>
												:{' '}
											</strong>
											{[emailValue].map((email) => {
												if (!email) {
													return null;
												}

												let name = trim(
													(email?.title ? email?.title : '') +
														' ' +
														(email?.first_name ? email?.first_name : '') +
														' ' +
														(email?.last_name ? email?.last_name : '')
												);
												return (
													<a
														href={'mailto:' + email.email}
														key={email.id}
														className={
															classes.bodyLink + ' ' + classes.listLink
														}
													>
														{email.email}
														{name ? '(' + name + ')' : ''}
													</a>
												);
											})}
											{item.instructions ? (
												<span className={classes.instructions}>
													<br />
													{item.instructions}
												</span>
											) : null}
											<Fa name="envelope" className={classes.mobileIcon} />
										</Typography>
									);
								case 'location':
									const locationValue = item?.access_value || location;

									if (locationValue) {
										return (
											<div key={index}>
												<Typography
													variant="body2"
													className={classes.lineSpacing}
												>
													<strong className={classes.boldFont}>
														<FormattedMessage
															id="resource.location-label"
															defaultMessage="Location"
															description="Locations section label"
														/>
														:{' '}
													</strong>
													{item?.access_value ||
														AddressParser({address: location})}
													<Fa
														name="map-marker"
														className={classes.mobileIcon}
													/>
												</Typography>
												<Typography
													variant="body2"
													className={classes.lineSpacing}
												>
													{rawSchedule &&
													Object.keys(rawSchedule).length > 1 &&
													(schedule = ScheduleParser({schedule: rawSchedule}))
														.length ? (
														<span>
															<strong
																className={
																	classes.boldFont + ' ' + classes.mobileHide
																}
															>
																<FormattedMessage
																	id="form.schedule"
																	defaultMessage="Schedule"
																	description="Schedule section"
																/>
																:{' '}
															</strong>
															{schedule
																.map((sch) => {
																	return sch.days + ' ' + sch.time;
																})
																.join(', ')}
															<Fa
																name="clock-o"
																className={classes.mobileIcon}
															/>
														</span>
													) : null}
													{item.instructions ? (
														<span className={classes.instructions}>
															<br />
															{item.instructions}
														</span>
													) : null}
												</Typography>
											</div>
										);
									} else {
										return null;
									}
								case 'link':
									const linkValue = item.access_value || website;

									return (
										<Typography
											key={index}
											variant="body2"
											className={classes.lineSpacing}
										>
											<strong
												className={classes.boldFont + ' ' + classes.mobileHide}
											>
												<FormattedMessage
													id="resource.website-label"
													defaultMessage="website"
													description="website details"
												/>
												:{' '}
											</strong>
											<a
												href={linkValue}
												target="_blank"
												rel="noopener noreferrer"
												className={classes.bodyLink + ' ' + classes.listLink}
											>
												{linkValue}
											</a>
											{item.instructions ? (
												<span className={classes.instructions}>
													<br />
													{item.instructions}
												</span>
											) : null}
											<Fa name="link" className={classes.mobileIcon} />
										</Typography>
									);
								case 'file':
									break;
								case 'other':
								default:
									return (
										<Typography
											key={index}
											variant="body2"
											className={classes.lineSpacing}
										>
											<strong className={classes.boldFont}>
												{item.access_value}:{' '}
											</strong>{' '}
											{item.instructions}
										</Typography>
									);
							}

							return null;
					  })
					: null}
			</Grid>
		</Grid>
	);
};

export default withStyles(styles)(DetailAccessInstructions);

/*locations && locations.length ?
        locations.map((location) => {
          let schedule;
          return (
          <div key={location.id} className={locations.length > 1 ? classes.locationSpacing : null}>
            <Typography variant="body2" className={classes.lineSpacing} >
              <strong className={classes.boldFont}>{location.name ? location.name : 'Location'}: </strong>
              {addressParser({address: location})}
            </Typography>
            {location.schedule && Object.keys(location.schedule).length > 1 && (schedule = scheduleParser({schedule: location.schedule})).length
            ?
              <Typography variant="body2" className={classes.lineSpacing} >
                <strong className={classes.boldFont}>Hours: </strong>
                {schedule.map((sch) => {
                  return sch.days+' '+sch.time;
                }).join(', ')}
              </Typography>
            : null}
            {location.schedule
              && Object.keys(location.schedule).length > 1
              && location.schedule.notes
              && trim(location.schedule.notes).length
            ?
              <Typography variant="body2" className={classes.lineSpacing} >
                <strong className={classes.boldFont}>Additional Information: </strong>
                {location.schedule.notes}
              </Typography>
            : null}
          </div>
        )
      })
      : null*/
