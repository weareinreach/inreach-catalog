import React from 'react';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import langs from 'langs';

import propertyMap from '../../helpers/oneDegreePropertyMap';

const Languages = props => (
  <Grid item xs={12} className={props.classes.sectionSpacing}>
    <Grid container spacing={0}>
      <Grid item xs={12}>
        {props.list && props.list
          ? props.list.map(item => {
              if (typeof propertyMap['language'][item.slug] !== 'undefined') {
                let property = propertyMap['language'][item.slug],
                  text;
                if (typeof property.name !== 'undefined') {
                  text = property.name;
                } else {
                  text = langs.where('1', property.code).name;
                }
                return (
                  <Typography key={text} variant="body2">
                    {text}
                  </Typography>
                );
              } else {
                return null;
              }
            })
          : null}
      </Grid>
    </Grid>
  </Grid>
);

export default Languages;
