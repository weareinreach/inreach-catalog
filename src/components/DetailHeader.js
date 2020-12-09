import React, {Fragment} from 'react';
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
}) => (
  <Fragment>
    <Grid container spacing={0} alignItems="center">
      {alertMessage && <Disclaimer text={alertMessage} />}
      <Grid item xs={12} className={classes.bottomSpacing}>
        <Grid container alignItems="center" justify="space-between" spacing={0}>
          <Grid item xs md lg xl>
            <Typography variant="h2" className={classes.orgName}>
              {name}
              {owners && owners.length ? (
                <>
                  <VerifiedIcon
                    extraClasses={classes.headerBadge}
                    fillColor="#00C419"
                    width="12px"
                  />
                  <span className={classes.verifiedHeaderText}>Claimed</span>
                </>
              ) : null}
            </Typography>
          </Grid>
          {isService && isMobile ? (
            <Grid item xs={12} className={classes.serviceOrgContainer}>
              <Typography variant="h6" className={classes.serviceOrg}>
                Service from <Link to={orgLink}>{orgName}</Link>
              </Typography>
            </Grid>
          ) : null}
          {((totalRatings || rating) && isMobile) || !isMobile ? (
            <Grid
              item
              xs={12}
              md={3}
              className={isMobile ? classes.mobileRatingSummary : 'pull-right'}
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
            {verified ? (
              <Tooltip
                classes={{tooltipPlacementTop: 'badge-tooltipTop'}}
                title={`The information on this page was last updated on ${verified.toDateString()}`}
                arrow
                placement="bottom"
              >
                <Badge>
                  <VerifiedIcon
                    extraClasses={classes.headerBadge}
                    width="12px"
                  />
                  <Typography color="secondary">
                    Verified Information
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
              title={`The information on this page was last updated on ${
                verified.toDateString()}`}
              arrow
              placement="bottom"
            >
              <Typography color="secondary" variant="body1">
                Verified Information
              </Typography>
            </Tooltip>
          </Badge>
        </Grid>
      ) : null}
    </Grid>
  </Fragment>
);

export default DetailHeader;
