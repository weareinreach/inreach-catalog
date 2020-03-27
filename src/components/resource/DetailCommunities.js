import React from 'react';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import propertyMap from '../../helpers/oneDegreePropertyMap';

const Communities = props => (
  <Grid container spacing={0}>
    <Grid item xs={12} className={props.classes.sectionSpacing}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          {props.list && props.list.length ? (
            <Typography variant="body2">
              {props.list
                .map(item => {
                  if (
                    typeof propertyMap['community'][item.slug] !== 'undefined'
                  ) {
                    return propertyMap['community'][item.slug];
                  }

                  return '';
                })
                .join(', ')}
            </Typography>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default Communities;
