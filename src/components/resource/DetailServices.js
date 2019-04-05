import React from 'react';

import {
  Link
} from 'react-router-dom';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import resourceTypes from '../../helpers/ResourceTypes';
import ACBadge from '../Badge';

const Services = (props) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} className={props.classes.sectionSpacing}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            {(props.list && props.list ?
              props.list.map((item) => {
                return (
                  <Typography key={item.id} variant="body2" style={{position:'relative'}} >
                    {item.tags && item.tags.length ?
                      (() => {
                        let badge = resourceTypes.getBadge(
                          item.tags.concat(
                            item.categories && item.categories.length ? item.categories : [],
                            item.areas && item.areas.length ? item.areas : []
                          )
                        );

                        return (
                          <ACBadge extraClasses={{icon: props.classes.serviceBadge,tooltip:props.classes.serviceTooltip}} key='misc' type={badge} width='48px' height='48px' />
                        );
                      })()
                    : <ACBadge extraClasses={{icon: props.classes.serviceBadge,tooltip:props.classes.serviceTooltip}} key='misc' type='misc' width='45px' height='45px' />}
                    <Link to={'/resource/'+props.resource.slug+'/service/'+item.slug} className={props.classes.serviceText}>{item.title}</Link>
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

export default Services