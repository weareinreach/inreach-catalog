import React from 'react';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';

import withWidth from '../withWidth';
import breakpoints from '../../theme/breakpoints';
import AsylumConnectButton from '../AsylumConnectButton';
import RatingControl from './RatingControl';

import {bodyLink, boldFont, italicFont, dividerSpacing, mobilePadding} from '../../theme/sharedClasses';

const styles = (theme) => ({
  bottomSpacing: {
    marginBottom: "0.9rem"
  },
  dividerSpacing: dividerSpacing(theme),
  ratingSpacing: {
    marginRight: "1rem"
  },
  reviewField: {
    width: "100%",
    padding: "1rem",
    fontSize: "0.9rem",
    height: "20%",
    border: "1px solid "+theme.palette.common.darkGrey
  },
  boldFont: boldFont(theme),
  [theme.breakpoints.down('sm')]: {
    reviewField: {
      height: "15%"
    }
  }
});

class ReviewForm extends React.Component {
  render() {
    const {classes} = this.props;
    const isMobile = this.props.width < breakpoints['sm'];
    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography type="subheading" className={classes.boldFont+' '+classes.bottomSpacing} >
            Leave a review
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <RatingControl mode="interactive" rating={0} className={classes.bottomSpacing+' '+classes.ratingSpacing}/>
          <Typography type="body2" className={"center-align "+classes.bottomSpacing}>
            <span className={classes.boldFont}>Rate this resource </span> {isMobile ? null : '(your rating will not be recorded until you hit "submit" below)'}
          </Typography>
        </Grid>
        {isMobile ? null : 
        <Grid item xs={12}>
          <Typography type="body2" className={classes.italicFont+' '+classes.bottomSpacing}>
            Is this resource LGBTQ-friendly? Is this resource friendly to asylum seekers? AsylumConnect will update our resource catalog based on your review.
          </Typography>
        </Grid>
        }
        <Grid item xs={12}>
          <textarea className={classes.reviewField+' '+classes.bottomSpacing} placeholder="Start typing your review..." name="comment" />
        </Grid>
        <Grid item xs={12} className={classes.dividerSpacing}>
          <AsylumConnectButton variant="primary" onClick={() => {}} >
            Submit
          </AsylumConnectButton>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.dividerSpacing} />
        </Grid>
      </Grid>
    )
  }
}

export default withWidth(withStyles(styles)(ReviewForm));