import React from 'react';
import trim from 'trim';
import 'whatwg-fetch';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import {withStyles} from 'material-ui/styles';

import withWidth from '../withWidth';
import breakpoints from '../../theme/breakpoints';
import AsylumConnectButton from '../AsylumConnectButton';
import RatingControl from './RatingControl';

import {
  boldFont,
  bodyLink,
  italicFont,
  dividerSpacing
} from '../../theme/sharedClasses';

import config from '../../config/config';

const clientId = config[process.env.OD_API_ENV].client_id;

const styles = theme => ({
  bottomSpacing: {
    marginBottom: '0.9rem'
  },
  dividerSpacing: dividerSpacing(theme),
  ratingSpacing: {
    marginRight: '1rem'
  },
  reviewField: {
    width: '100%',
    padding: '1rem',
    fontSize: '0.9rem',
    height: '20%',
    border: '1px solid ' + theme.palette.common.darkGrey,
    [theme.breakpoints.down('xs')]: {
      height: '15%'
    }
  },
  boldFont: boldFont(theme),
  bodyLink: bodyLink(theme),
  italicFont: italicFont(theme)
});

class ReviewForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      rating: 0,
      comment: false,
      complete: false
    };

    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  handleStarClick(rating) {
    this.setState({
      rating: rating
    });
  }

  handleCommentChange(event) {
    const comment = trim(event.target.value).length
      ? trim(event.target.value)
      : false;
    this.setState({
      comment: comment
    });
  }

  handleFormSubmission() {
    if (this.props.resource && this.props.resource.id) {
      if (this.state.rating) {
        let payload = {
          client_user_id: this.props.user,
          name: 'Overall',
          value: this.state.rating.toString()
        };
        this.fetch({
          url: '/api/organizations/' + this.props.resource.id + '/ratings',
          payload
        });
      }
      if (this.state.comment) {
        let payload = {
          client_user_id: this.props.user,
          content: this.state.comment
        };
        this.fetch({
          url: '/api/organizations/' + this.props.resource.id + '/comments',
          payload,
          callback: data => {
            //console.log(data);
            this.props.onSubmit({
              type: 'comment',
              data: Object.assign(payload, {
                id: data.id,
                client_id: clientId
              })
            });
          }
        });
      }
    }
    this.setState({
      complete: true
    });
  }

  fetch({url, payload, callback = data => {}} = {}) {
    fetch(window.location.origin + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(payload)
    })
      .then(results => results.json())
      .then(callback);
  }

  render() {
    const {classes} = this.props;
    const isMobile = this.props.width < breakpoints['sm'];
    return (
      <Grid container spacing={0}>
        {!this.state.complete ? (
          <div>
            <Grid item xs={12}>
              <RatingControl
                mode="interactive"
                rating={this.state.rating}
                onClick={this.handleStarClick}
                className={classes.bottomSpacing + ' ' + classes.ratingSpacing}
              />
              <Typography
                variant="body2"
                className={'center-align ' + classes.bottomSpacing}
              >
                <span className={classes.boldFont}>Rate this resource </span>{' '}
                {isMobile
                  ? null
                  : '(your rating will not be recorded until you hit "submit" below)'}
              </Typography>
            </Grid>
            {isMobile ? null : (
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  className={classes.italicFont + ' ' + classes.bottomSpacing}
                >
                  Is this resource LGBTQ-friendly? Is this resource friendly to
                  asylum seekers? AsylumConnect will update our resource catalog
                  based on your review.
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <textarea
                className={classes.reviewField + ' ' + classes.bottomSpacing}
                onChange={this.handleCommentChange}
                placeholder="Start typing your review..."
                name="comment"
              />
            </Grid>
            <Grid item xs={12} className={classes.dividerSpacing}>
              <AsylumConnectButton
                variant="secondary"
                onClick={this.handleFormSubmission}
              >
                Submit
              </AsylumConnectButton>
            </Grid>
          </div>
        ) : (
          <Grid item xs={12}>
            <Typography
              variant="body2"
              className={classes.boldFont + ' ' + classes.bottomSpacing}
            >
              Thank you for your comment! Questions? Please email{' '}
              <a
                href="mailto:catalog@asylumconnect.org"
                className={classes.bodyLink}
              >
                catalog@asylumconnect.org
              </a>
            </Typography>
          </Grid>
        )}
      </Grid>
    );
  }
}

export default withWidth(withStyles(styles)(ReviewForm));
