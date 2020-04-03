import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import langs from 'langs';

import propertyMap from '../utils/propertyMap';

const Languages = (props) => (
  <Grid item xs={12} className={props.classes.sectionSpacing}>
    <Grid container spacing={0}>
      <Grid item xs={12}>
        {props?.list &&
          props.list?.map((item) => {
            if (propertyMap?.['language']?.[item?.slug]) {
              const property = propertyMap['language'][item?.slug];
              const text =
                property?.name || langs.where('1', property.code).name;

              return (
                <Typography key={text} variant="body2">
                  {text}
                </Typography>
              );
            }

            console.log('nah');

            return null;
          })}
      </Grid>
    </Grid>
  </Grid>
);

export default Languages;
