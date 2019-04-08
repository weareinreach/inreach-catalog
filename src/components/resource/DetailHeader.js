import React from 'react';
import url from 'url';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import RatingAndReviews from './RatingAndReviews';
import Phone from './Phone';

const DetailHeader = ({classes, name, website, rating, totalRatings, phones, isMobile}) => (
  <Grid container spacing={0} alignItems='center'>
    <Grid item xs={12} >
      <Grid container alignItems="flex-start" justify="space-between" spacing={0}>
        <Grid item xs md lg xl >
          <Typography variant="subheading" className={classes.orgName + ' ' + classes.boldFont}>{name}</Typography>
        </Grid>
        {isMobile ? null :
        <Grid item xs={5} className="pull-right">
          <RatingAndReviews total={totalRatings} rating={rating} />
        </Grid>}
      </Grid>
    </Grid>
    <Grid item xs={12} >
      <Typography variant="body1" className={classes.moreInfo+' '+classes.bottomSpacing} >
        <a href={website} className={classes.bodyLink}>{isMobile ? url.parse(website).hostname : website}</a> {phones && phones.length ? '| ' : null}{phones && phones.length ? <Phone phone={phones[0]} classes={classes} /> : null}
      </Typography>
    </Grid>
  </Grid>
);

export default DetailHeader;