import React from 'react';

import {
  Link
} from 'react-router-dom';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import resourceTypes from '../../helpers/ResourceTypes';
import ACBadge from '../Badge';

const ServiceType = (props) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} className={props.classes.sectionSpacing}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            {(props.list && props.list ?
              props.list.map((item, index) => {
                return (
                  <Typography key={index} variant="body2" style={{position:'relative'}} >
                    {(() => {
                        let badge = resourceTypes.getBadge([item]);

                        return (
                          <ACBadge extraClasses={{icon: props.classes.serviceBadge,tooltip:props.classes.serviceTooltip}} key='misc' type={badge} width='48px' height='48px' />
                        );
                      })()
                    }
                    <p className={props.classes.serviceText}>{item}</p>
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

export default ServiceType