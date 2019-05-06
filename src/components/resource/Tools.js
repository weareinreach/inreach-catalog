import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import AsylumConnectBackButton from '../AsylumConnectBackButton';
import SaveToFavoritesButton from '../SaveToFavoritesButton';
import DetailHeaderTabs from './DetailHeaderTabs';
import IconButton from 'material-ui/IconButton';
import ShareIcon from '../icons/ShareIcon';


const Tools = (props) => (
  <Grid container spacing={0} alignItems={props.tabs ? 'flex-end' : 'center'} justify='center' className={(props.tabs ? props.classes.header : '')+' '+props.classes.dividerSpacing}>
    <Grid item xs={12} sm={12} md={5} lg={5}>
      {props.tabs ?
        <DetailHeaderTabs tabs={props.tabs} tab={props.tab} handleTabClick={props.handleTabClick} classes={props.classes} />
      : 
        <AsylumConnectBackButton text={props.backText} onClick={props.handleBackButtonClick} />
      }
    </Grid>
    <Grid item xs={12} sm={12} md={7} className={"pull-right "+props.classes.cushion}>
      <div className="center-align">
        <SaveToFavoritesButton
          handleListAddFavorite={props.handleListAddFavorite}
          handleListRemoveFavorite={props.handleListRemoveFavorite}
          handleListNew={props.handleListNew}
          handleLogOut={props.handleLogOut}
          handleMessageNew={props.handleMessageNew}
          handleRequestOpen={props.handleRequestOpen}
          lists={props.lists}
          resourceId={props.resource.id}
          session={props.session}
          user={props.user}
        />
      </div>
      <div className={props.classes.separator + " center-align"} ></div>
      <IconButton className="center-align" onClick={() => (
          props.session 
          ? props.handleRequestOpen('share/'+props.sharePath) 
          : props.handleMessageNew('You must be logged in to share resources') )}>
        <ShareIcon />
      </IconButton>
    </Grid>
  </Grid>
);

Tools.propTypes = {
  sharePath: PropTypes.string.isRequired,
  resource: PropTypes.object
}

export default Tools;