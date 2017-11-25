import React from 'react';

import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';

const Loading = (props) => (
  <Grid container spacing={0}>
    <Grid item xs={12} style={{textAlign: "center"}}>
      <CircularProgress />
    </Grid>
  </Grid>
);

export default Loading;