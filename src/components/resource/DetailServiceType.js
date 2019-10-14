import React from 'react';

import {
  Link
} from 'react-router-dom';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import resourceTypes from '../../helpers/ResourceTypes';
import ACBadge from '../Badge';

//const tags = resourceTypes.resourceIndex;
//http://localhost:8080/en_US/resource/larkin-street-youth-services/service/get-emergency-shelter-for-youth

const ServiceType = (props) => {
  let listedTags = [];
  let tagDetails = [];
  let unfoundTags = [];
  let subcategories = [];
  let categories = [];
  let list = false;
  const tags = resourceTypes.getResourceIndex(props.locale);
  if(props.list && props.list.length) {  //console.log(props.list);
    //find all of the tag objects for all tags
    props.list.map(item => {
      let tag = typeof tags[item] !== "undefined" ? tags[item] : item;
      
      if(tag.title) {
        subcategories.push(tag);
      } else if(tag.category) {
        categories.push(tag);
      } else {
        unfoundTags.push(tag);
      }
      
    });
    //console.log(subcategories, categories, unfoundTags);
    list = subcategories
      .map(subcategory => ({label: subcategory.title, type: subcategory.type}))
      .concat(
        categories.length ? categories.filter(category => {
          return subcategories.filter(subcategory => (subcategory.category === category.category)).length == 0
        })
        .map(category => ({label: category.title, type: category.type})) : [],
        unfoundTags.length ? unfoundTags.map(unfound => ({label: unfound, type: 'misc'})) : []
    );
    //console.log(list);
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} className={props.classes.sectionSpacing}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            {(list ?
              list.map((tag, index) => {
                //let tag = typeof tags[item] !== "undefined" ? (tags[item].title ? tags[item].title : tags[item].category) : item;
                if(listedTags.indexOf(tag.label) < 0 && tag.type !== 'misc') {
                  listedTags.push(tag.label);
                  return (
                    <span key={index} style={{position:'relative'}} >
                      {(() => {
                          //let badge = resourceTypes.getBadge([tag]);

                          return (
                            <ACBadge extraClasses={{icon: props.classes.serviceBadge,tooltip:props.classes.serviceTooltip}} type={tag.type} mobileLabel={tag.label} width='48px' height='48px' />
                          );
                        })()
                      }
                      {props.isMobile ? null : <p className={props.classes.serviceText}>{tag.label}</p>}
                    </span>
                  )
                } else {
                  return null;
                }
                
              })
            : null)}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ServiceType