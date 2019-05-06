import React from 'react';

import {
  Link
} from 'react-router-dom';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import resourceTypes from '../../helpers/ResourceTypes';
import ACBadge from '../Badge';

//const tags = resourceTypes.resourceIndex;

const ServiceType = (props) => {
  var listedTags = [];
  const tags = resourceTypes.getResourceIndex(props.locale);
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} className={props.classes.sectionSpacing}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            {(props.list && props.list ?
              props.list.map((item, index) => {
                let tag = typeof tags[item] !== "undefined" ? (tags[item].title ? tags[item].title : tags[item].category) : item;
                if(listedTags.indexOf(tag) < 0 && resourceTypes.getBadge([item]) !== 'misc') {
                  listedTags.push(tag);
                  return (
                    <Typography key={index} variant="body2" style={{position:'relative'}} >
                      {(() => {
                          let badge = resourceTypes.getBadge([item]);

                          return (
                            <ACBadge extraClasses={{icon: props.classes.serviceBadge,tooltip:props.classes.serviceTooltip}} key='misc' type={badge} width='48px' height='48px' />
                          );
                        })()
                      }
                      <p className={props.classes.serviceText}>{tag}</p>
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
    </Grid>
  );
}

export default ServiceType