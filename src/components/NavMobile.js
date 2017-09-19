import React from 'react';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import SearchIcon from './icons/SearchIcon'
import FavoritesIcon from './icons/FavoritesIcon'
import LanguageIcon from './icons/LanguageIcon'
import AccountIcon from './icons/AccountIcon'
import PrivacyIcon from './icons/PrivacyIcon'

const NavMobile = () => { 
  return (
    <Grid container 
          align='center'
          direction='row'
          justify='space-between'>
      <Grid item xs={2}>
        <SearchIcon />
        <Typography type='display4'>search</Typography>
      </Grid>
      <Grid item xs={2}>
        <FavoritesIcon/>
        <Typography type='display4'>favorites</Typography>
      </Grid>
      <Grid item xs={2}>
        <LanguageIcon />
        <Typography type='display4'>language</Typography>
      </Grid>
      <Grid item xs={2}>
        <AccountIcon />
        <Typography type='display4'>account</Typography>
      </Grid>
      <Grid item xs={2}>
        <PrivacyIcon />
        <Typography type='display4'>privacy</Typography>
      </Grid>
    </Grid>
  )
}

export default NavMobile