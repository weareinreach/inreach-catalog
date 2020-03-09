import React from 'react';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import {Element} from 'react-scroll';

const About = props => (
  <Grid container spacing={0}>
    <Grid item xs={12} className={props.classes.contentSpacing}>
      <Grid container spacing={0}>
        <Typography
          variant="body2"
          className={
            props.classes.bottomSpacing + ' ' + props.classes.lineSpacing
          }
        >
          {props.resource.description}
        </Typography>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Divider className={props.classes.dividerSpacing} />
      <Element name="about"></Element>
    </Grid>
  </Grid>
);

export default About;
