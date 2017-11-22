import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

import {boldFont, dividerSpacing} from '../../theme/sharedClasses';
import Loading from '../Loading';
import AsylumConnectSwitch from '../AsylumConnectSwitch';
import config from '../../config/config';

const clientId = config[process.env.OD_API_ENV].client_id;

const styles = (theme) => ({
  bottomSpacing: {
    marginBottom: "0.9rem"
  },
  boldFont: boldFont(theme),
  dividerSpacing: dividerSpacing(theme),
  switchInputRoot: {
    flexDirection: 'row-reverse',
    width: '100%',
    maxWidth: '400px',
    justifyContent: 'space-between',
    marginRight: '0px'
  },
  switchRoot: {
    height: 'auto'
  },
  reviewBadge: {
    display: 'inline-block',
    fontSize: '0.6rem',
    borderRadius: '4px',
    padding: '0px 6px',
    width: '120px',
    textAlign: 'center',
    marginBottom: '0.3rem'
  },
  reviewOD: {
    backgroundColor: '#30BCD5',
    color: theme.palette.common.darkBlack 
  },
  reviewAC: {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.common.white
  }
});

const ReviewType = ({classes, type}) => (
  <Typography type="body2" className={classes.reviewBadge + ' ' + classes['review'+type]}>
    {type == 'OD' ? 'One Degree user' : 'AsylumConnect user' }
  </Typography>
);

const ReviewList = ({title, classes, list, acOnly}) => (
  <div>
    <Typography type="subheading" className={classes.boldFont+' '+classes.bottomSpacing} >
      {title}
    </Typography>
    {list.filter(({client_id})=>(!acOnly || client_id==clientId)).length ? 
      list.filter(({client_id})=>(!acOnly || client_id==clientId)).map((review) => (
        <Grid key={review.id} container spacing={0} className={classes.bottomSpacing}>
          <Grid item xs={12}>
            <ReviewType type={review.client_id == clientId ? 'AC' : 'OD' } classes={classes} />
          </Grid>
          <Grid item xs={12}>
            <Typography type="body2">
              "{review.content}"
            </Typography>
          </Grid>
        </Grid>
      ))
    :
      <Typography type="body2" className={classes.boldFont}>
        No Reviews
      </Typography>
    }
  </div>
  
);

const Reviews = ({classes, orgReviews, oppReviews, acFilter, handleFilterChange }) => (
  <Grid container spacing={0} >
    <Grid item xs={12} md={3}>
      <Typography type="subheading" className={classes.boldFont+' '+classes.bottomSpacing} >
        Reviews
      </Typography>
    </Grid>
    <Grid item xs={12} sm md lg xl className="pull-right">
      <AsylumConnectSwitch label="Only view reviews written by/for LGBTQ asylum seekers" value="ac-only" onChange={handleFilterChange}checked={acFilter} additionalClasses={{
          checkboxDefault: classes.switchRoot,
          root: classes.switchInputRoot
        }} />
    </Grid>
    <Grid item xs={12} >
      <Grid container spacing={0} justify="space-between">
        <Grid item xs={12} md={6}>
        {orgReviews === false ? <Loading />
        :
          <ReviewList title='Organizational Reviews' list={orgReviews} classes={classes} acOnly={acFilter} />
        }
        </Grid>
        <Grid item xs={12} md={6}>
        {oppReviews === false ? <Loading />
        :
          <ReviewList title='Service Reviews' list={oppReviews} classes={classes} acOnly={acFilter} />
        }
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default withStyles(styles)(Reviews);