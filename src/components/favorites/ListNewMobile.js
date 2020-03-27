import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';

import AsylumConnectBackButton from '../AsylumConnectBackButton';
import ListNewFormContainer from './ListNewFormContainer';
import {DialogTitle} from '../dialog';

import {breakpoints} from '../../theme';
import theWidth from '../theWidth';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginLeft: '2.5em',
    marginRight: '2.5em',
    borderBottom: '1px solid ' + theme.palette.common.faintBlack,
    boxShadow: 'none'
  },
  textCenter: {textAlign: 'center'},
  toolbarRoot: {
    justifyContent: 'space-between'
  },
  toolbarGutters: {
    paddingLeft: '0',
    paddingRight: '0'
  }
});

const ListNewMobile = ({
  classes,
  dialog,
  handleListAddFavorite,
  handleListNew,
  handleLogOut,
  handleMessageNew,
  handleRequestClose,
  locale,
  session,
  user
}) => (
  <div>
    <Paper className={classes.root}>
      <Toolbar
        classes={{root: classes.toolbarRoot, gutters: classes.toolbarGutters}}
      >
        <AsylumConnectBackButton
          onClick={() => {
            handleRequestClose();
          }}
        />
      </Toolbar>
      <DialogTitle>Create a New Favorites List</DialogTitle>
      <ListNewFormContainer
        handleListAddFavorite={handleListAddFavorite}
        handleListNew={handleListNew}
        handleLogOut={handleLogOut}
        handleMessageNew={handleMessageNew}
        handleRequestClose={handleRequestClose}
        locale={locale}
        origin={dialog.split('/')[1]}
        originList={dialog.split('/')[2]}
        session={session}
        user={user}
      />
    </Paper>
  </div>
);

ListNewMobile.defaultProps = {
  session: null
};

ListNewMobile.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogIn: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  session: PropTypes.string
};

export default withStyles(styles)(ListNewMobile);
