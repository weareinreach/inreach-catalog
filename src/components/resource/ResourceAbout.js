import React from 'react';

import langs from 'langs';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { Element } from 'react-scroll';

import propertyMap from '../../helpers/OneDegreePropertyMap';
import resourceTypes from '../../helpers/ResourceTypes';
import ACBadge from '../Badge';

let resourceIndex = resourceTypes.getTagIndex();

const Communities = (props) => (
  <Grid container spacing={0}>
    <Grid item xs={12} className={props.classes.sectionSpacing}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography type="subheading" className={props.classes.boldFont+' '+props.classes.bottomSpacing} >
            Who this resource serves
          </Typography>
        </Grid>
        <Grid item xs={12}>
        {props.list && props.list.length ? 
          <Typography type="body2" className={props.classes.bottomSpacing} > 
            { props.list.map((item) => {
                  if(typeof propertyMap['community'][item.slug] !== 'undefined') {
                    return propertyMap['community'][item.slug];
                  }
                })
                .join(', ')
            }
          </Typography>
        : null }
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)

const Languages = (props) => (
  <Grid item xs={12} className={props.classes.sectionSpacing}>
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Typography type="subheading" className={props.classes.boldFont+' '+props.classes.bottomSpacing} >
          Non-English Services
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {(props.list && props.list ?
          props.list.map((item) => {
            if(typeof propertyMap['language'][item.slug] !== "undefined") {
              let property = propertyMap['language'][item.slug], text;
              if(typeof property.name !== "undefined") {
                text = property.name;
              } else {
                text = langs.where('1', property.code).name;
              }
              return (
                <Typography key={text} type="body2" className={props.classes.bottomSpacing} >
                  {text}
                </Typography>
              )
            } else {
              return null;
            }
          })
        : null)}
      </Grid>
    </Grid>
  </Grid>
)

const Services = (props) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} className={props.classes.sectionSpacing}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography type="subheading" className={props.classes.boldFont+' '+props.classes.bottomSpacing} >
              Services
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {(props.list && props.list ?
              props.list.map((item) => {
                return (
                  <Typography key={item.id} type="body2" style={{position:'relative'}} >
                    {item.tags && item.tags.length ?
                      (() => {
                        let badge = 'misc';

                        item.tags.forEach((tag) => {
                          if(typeof resourceIndex[tag] !== 'undefined') {
                            badge = resourceIndex[tag].type
                          }
                        })
                        return (
                          <ACBadge extraClasses={{icon: props.classes.serviceBadge,tooltip:props.classes.serviceTooltip}} key='misc' type={badge} width='45px' height='45px' />
                        );
                      })()
                    : <ACBadge extraClasses={{icon: props.classes.serviceBadge,tooltip:props.classes.serviceTooltip}} key='misc' type='misc' width='45px' height='45px' />}
                    <p className={props.classes.serviceText}>{item.title}</p>
                  </Typography>
                )
              })
            : null)}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}


const About = (props) => (
  <Grid container spacing={0}>
    <Grid item xs={12} className={props.classes.contentSpacing}>
      <Grid container spacing={0}>
        <Typography type="body2" className={props.classes.bottomSpacing+' '+props.classes.lineSpacing}>
          {props.resource.description}
        </Typography>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Divider className={props.classes.dividerSpacing} /><Element name="about"></Element>
    </Grid>
    <Grid item xs={12}>
      {props.communities && props.communities.length ? <Communities list={props.communities} classes={props.classes} /> : null}
      {props.resource.opportunities && props.resource.opportunities.length ? <Services list={props.resource.opportunities} classes={props.classes} /> : null}
      {props.languages && props.languages.length ? <Languages list={props.languages} classes={props.classes} /> : null}
    </Grid>
    {/*<Grid item xs={12}>
      <Typography type="subheading" className={props.classes.boldFont+' '+props.classes.bottomSpacing} >
        Additional Information
      </Typography>
    </Grid>*/}
  </Grid>
);

export default About;