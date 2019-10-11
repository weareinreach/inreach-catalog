import React from 'react';
import url from 'url';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import RatingAndReviews from './RatingAndReviews';
import Phone from './Phone';
import {
  Link
} from 'react-router-dom';

const DetailHeader = ({classes, name, website, rating, totalRatings, phones, isMobile, isService, orgName, orgLink}) => (
  <Grid container spacing={0} alignItems='center'>
    <Grid item xs={12} className={classes.bottomSpacing}>
      <Grid container alignItems="flex-start" justify="space-between" spacing={0}>
        <Grid item xs md lg xl >
          <Typography variant="title" className={classes.orgName + ' ' + classes.boldFont}>{name}</Typography>
        </Grid>
        {isService && isMobile ?
        <Grid item xs={12} className={classes.serviceOrgContainer}>
          <Typography variant="display4" className={classes.serviceOrg}>
            Service from <Link to={orgLink}>{orgName}</Link>
          </Typography>
        </Grid>
        : null }
        {((totalRatings || rating) && isMobile) || !isMobile ?
        <Grid item xs={12} md={5} className={isMobile ? classes.mobileRatingSummary : 'pull-right'}>
          <RatingAndReviews total={totalRatings} rating={rating} />
        </Grid>
        : null}
      </Grid>
    </Grid>
    {isMobile ? 
    <Grid item xs={12} >
      <Typography variant="body1" className={classes.moreInfo+' '+classes.bottomSpacing} >
        <a href={website} className={classes.bodyLink}>{isMobile ? url.parse(website).hostname : website}</a>
      </Typography>
    </Grid>
    : <Grid item xs={12} >
      <Typography variant="body1" className={classes.moreInfo+' '+classes.bottomSpacing} >
        <a href={website} className={classes.bodyLink}>{isMobile ? url.parse(website).hostname : website}</a> {phones && phones.length ? '| ' : null}{phones && phones.length ? <Phone phone={phones[0]} classes={classes} /> : null}
      </Typography>
    </Grid>}
    {isMobile && phones && phones.length ? 
    <Grid item xs={12} >
      <Typography variant="body1" className={classes.moreInfo+' '+classes.bottomSpacing} >
        <Phone phone={phones[0]} classes={classes} />
      </Typography>
    </Grid>
    : null }
  </Grid>
);

export default DetailHeader;