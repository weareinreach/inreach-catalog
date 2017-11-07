import React from 'react';
import PropTypes from 'prop-types';

import {
  Link
} from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

import { withStyles } from 'material-ui/styles';
import FavoritesLink from './FavoritesLink';
import RatingControl from './RatingControl';
import ReviewCount from './ReviewCount';
import Badge from './Badge';

const styles = (theme) => ({
  rightSide: {
    textAlign: 'right'
  },
  contentSpacing: {
    margin: "1.5rem 0"
  },
  lineSpacing: {
    lineHeight: "1.4rem"
  },
  ratingSpacing: {
    marginRight: "1rem"
  },
  dividerSpacing: {
    marginBottom: "2rem"
  },
  orgName: {
    fontSize: "21px"
  },
  moreInfo: {
    fontWeight: "600",
    color: theme.palette.primary[500]
  }
});

const resourceFieldsByFormat = {
  'search': [
    {fieldName: 'description', label: 'About'}
  ]
}

class ResourceListItem extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { format, resource, classes } = this.props;
    const { rightSide, ratingSpacing, contentSpacing, lineSpacing, dividerSpacing, moreInfo, orgName }  = classes;
    //this.props.fetchSearchResults();
    return (
      <div>
        <Divider className={dividerSpacing} />
        <Grid container spacing={0}>
          <Grid item xs={12} >
            <Grid container alignItems="center" justify="space-between" spacing={0}>
              <Grid item xs md lg xl >
                <Link to={'/resource/'+resource.slug}><Typography type="subheading" className={orgName}>{resource.name}</Typography></Link>
              </Grid>
              {format === 'search' ? 
              <Grid item xs={3} >
                <FavoritesLink>save to favorites</FavoritesLink> 
              </Grid> 
              : null }
            </Grid>
          </Grid>
          {format == 'search' ? 
          <Grid item xs={12} >
            <Link to={'/resource/'+resource.slug}>
              <Typography type="body1" className={moreInfo} >
                See more information
              </Typography>
            </Link> 
          </Grid>
          : null}
          <Grid item xs={12} className={contentSpacing}>
            <Grid container spacing={0}>
            {resourceFieldsByFormat[format].map((item, index) => {
              var Content;
              switch(format) {
                case 'search':
                  Content = () => (<Typography type="body2" className={lineSpacing}>
                    {resource[item.fieldName]}
                  </Typography>);
                break;
                default:
                  Content = () => (<Typography type="body2" className={lineSpacing}>
                    <strong>{item.label}:</strong> {resource[item.fieldName]}
                  </Typography>);
                break;
              }
              return (
                <Grid item xs={12} key={index} >
                  <Content key={index} />
                </Grid>);
            })}
            </Grid>
          </Grid>
          <Grid item xs={12} >
            <Grid container alignItems="center" spacing={0} justify="space-between">
              <Grid item xs={6}>
                <Badge type='mail' width='45px' height='45px' />
              </Grid>
              <Grid item xs={6} className={rightSide}>
                <RatingControl rating={resource.rating} className={ratingSpacing} />
                <ReviewCount total={resource.opportunity_comments.length} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
    
}

ResourceListItem.propTypes = {
  format: PropTypes.string,
  resource: PropTypes.object.isRequired
};

ResourceListItem.defaultProps = {
  format: 'search',
  /*resource: {"id":13007,"title":"Enroll in a family cooking class","description":"Richmond District Neighborhood Center offers a free family cooking series, in partnership with Cooking Matters. Classes are for parents with youth (elementary - high school age students) and teaches families how to prepare fast, delicious and healthy meals on a budget. In each class students cook and eat a healthy meal and go home with a bag of fresh produce and new recipes to make at home.  ","slug":"enroll-in-a-family-cooking-class-richmond-district-neighborhood-san-francisco-ca","is_appointment":false,"available_on":null,"expires_on":null,"organization":{"id":79,"name":"Richmond District Neighborhood Center","slug":"richmond-district-neighborhood-center","opportunity_count":10,"resource_type":"Organization", "description": "Develops and provides youth, adult and family programs to meet important community needs.", rating: 0},"resource_type":"Opportunity","tags":["Food","Nutrition"],"categories":[],"areas":[],"schedule":{"monday_start":"","monday_end":"","tuesday_start":"","tuesday_end":"","wednesday_start":"","wednesday_end":"","thursday_start":"","thursday_end":"","friday_start":"","friday_end":"","saturday_start":"","saturday_end":"","sunday_start":"","sunday_end":"","notes":"","translations":{}},"properties":{"action-signup-url":"http://rdnc.org/neighborhood-services/family-activities/","translations":{},"community-parents":"true"},"locations":[{"id":142,"name":"Neighborhood Center","address":"741 30th Avenue","unit":"","city":"San Francisco","state":"CA","zip_code":"94121","lat":37.7753,"long":-122.49,"is_primary":true,"phones":[{"id":307,"digits":"415-751-6600","phone_type":"Office","is_primary":true}],"schedule":{"monday_start":"","monday_end":"","tuesday_start":"","tuesday_end":"","wednesday_start":"","wednesday_end":"","thursday_start":"","thursday_end":"","friday_start":"","friday_end":"","saturday_start":"","saturday_end":"","sunday_start":"","sunday_end":"","notes":"","translations":{}}}],"phones":[{"id":30598,"digits":"415-750-8554","phone_type":null,"is_primary":false}],"emails":[],"attachments":[],"images":[],"access_instructions":[{"id":24523,"access_value":"Visit the link below for more information.","access_type":"other","instructions":null,"enable_direct_access":false,"locations":[],"emails":[]}],"rating":0,"has_pending_submission":false,"translations":{}}*/
};


export default withStyles(styles)(ResourceListItem);