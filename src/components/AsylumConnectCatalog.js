import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import Dialog, { DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';

import {withStyles} from 'material-ui/styles';

import RedirectWithParams from '../helpers/RedirectWithParams';
import MapContainer from './MapContainer';
import PageContainer from './PageContainer';
require('./AsylumConnectCatalog.scss');
import Announcement from './Announcement';
import { AsylumConnectDialog } from './dialog';
import Header from './Header'
import Footer from './Footer';
import {
  AccountMobile,
  LoginDialog,
  PasswordMobile
} from './account';
import {
  DisclaimerDialog,
  PrivacyDialog,
  PrivacyMobile
} from './privacy';
import ShareMobile from './share/ShareMobile';
import Language from './navigation/Language';
import AsylumConnectButton from './AsylumConnectButton';
import withSession from './withSession';
import withWidth from './withWidth';
import withLocale from './withLocale';
import Message from './Message';

import LogoImg from '../images/logo@2x.png';
import LogoImgMobile from '../images/logo-mobile@3x.png';
import LogoImgCA from '../images/logo-ca@2x.png';

import breakpoints from '../theme/breakpoints';

const styles = (theme) => ({
  container: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize
  },
  [theme.breakpoints.down('xs')]: {
    navPadding: {
      paddingBottom: "76px"
    },
    overflowY: "auto"
  }
});

class AsylumConnectCatalog extends React.Component { 
  constructor(props, context) {
    super(props, context);

    this.state = {
      dialog: 'none',
      message: '',
      messageOpen: false,
      nearAddress: ''
    };

    this.handleRequestOpen = this.handleRequestOpen.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleMessageNew = this.handleMessageNew.bind(this);
    this.handleMessageClose = this.handleMessageClose.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  handleMessageNew(message) {
    this.setState({message, messageOpen: true});
  }

  handleMessageClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({messageOpen: false});
  }

  handleRequestOpen(dialog) {
    this.setState({dialog});
  }

  handleRequestClose() {
    this.setState({dialog: 'none'});
  }

  handleAddressChange(address) {
    this.setState({
      nearAddress: address
    })
  }

  render() {
    const {dialog, message, messageOpen} = this.state;
    const {
      changeLocale,
      country,
      handleListAddFavorite,
      handleListRemoveFavorite,
      handleListNew,
      handleLogIn,
      handleLogOut,
      handleConfirmSession,
      handleUnconfirmSession,
      lists,
      locale,
      session,
      sessionConfirmed,
      t,
      user,
      location,
      history,
      match
    } = this.props;
    const isMobile = this.props.width < breakpoints['sm'];
    let logo;
    switch(locale) {
      case 'en_CA':
        logo = isMobile ? LogoImgMobile : LogoImgCA;
      break;
      default:
        logo = isMobile ? LogoImgMobile : LogoImg;
      break;
    }
    const {handleMessageNew, handleRequestClose, handleRequestOpen, handleAddressChange} = this;
    return (
        <div className={this.props.classes.container}>
          <Header
            handleLogOut={handleLogOut}
            handleRequestOpen={handleRequestOpen}
            session={session}
            location={location}
            history={history}
            match={match}
            locale={locale}
            logo={logo}
          />
        {isMobile ? (
          <div>
            {['disclaimer', 'privacy'].includes(dialog) && (
              <PrivacyMobile
                tab={dialog === 'privacy' ? 0 : 1}
                handleRequestOpen={handleRequestOpen}
              />
            )}
            {['forgot', 'login', 'signup'].includes(dialog) && (
              <AccountMobile
                dialog={dialog}
                tab={dialog === 'signup' ? 1 : 0}
                handleLogIn={handleLogIn}
                handleMessageNew={handleMessageNew}
                handleRequestClose={handleRequestClose}
                handleRequestOpen={handleRequestOpen}
                session={session}
              />
            )}
            {['password'].includes(dialog) && (
              <PasswordMobile
                dialog={dialog}
                handleLogIn={handleLogIn}
                handleMessageNew={handleMessageNew}
                handleRequestClose={handleRequestClose}
                handleRequestOpen={handleRequestOpen}
                handleConfirmSession={handleConfirmSession}
                session={session}
              />
            )}
            {dialog && dialog.indexOf('share') >=0 && (
              <ShareMobile
                dialog={dialog}
                handleLogIn={handleLogIn}
                handleMessageNew={handleMessageNew}
                handleRequestClose={handleRequestClose}
                handleRequestOpen={handleRequestOpen}
                session={session}
              />
            )}
            {['language'].includes(dialog) && (
              <Language
                handleRequestOpen={handleRequestOpen}
                history={history}
              />
            )}
          </div>
        ) : (
          <div>
            <Announcement handleRequestOpen={handleRequestOpen} />
            <AsylumConnectDialog
              locale={locale}
              dialog={dialog}
              handleConfirmSession={handleConfirmSession}
              handleListAddFavorite={handleListAddFavorite}
              handleListNew={handleListNew}
              handleLogIn={handleLogIn}
              handleLogOut={handleLogOut}
              handleMessageNew={handleMessageNew}
              handleRequestClose={handleRequestClose}
              handleRequestOpen={handleRequestOpen}
              history={history}
              session={session}
              user={user}
            />
          </div>
        )}
        { (isMobile && !['disclaimer', 'privacy', 'forgot', 'login', 'signup', 'language', 'password'].includes(dialog) && (!dialog || dialog.indexOf('share') < 0)) || !isMobile ?
          <div id="container--main" className={"content "+this.props.classes.navPadding} >
            <Switch>
              <Route path="/:locale/resource/:id/service/:serviceId" render={(props) => (
                <MapContainer
                  {...props}
                  country={country}
                  handleAddressChange={handleAddressChange}
                  handleListAddFavorite={handleListAddFavorite}
                  handleListRemoveFavorite={handleListRemoveFavorite}
                  handleListNew={handleListNew}
                  handleLogOut={handleLogOut}
                  handleMessageNew={handleMessageNew}
                  handleRequestOpen={handleRequestOpen}
                  lists={lists}
                  locale={locale}
                  nearAddress={this.state.nearAddress}
                  session={session}
                  t={t}
                  user={user}
                />)}
              />
              <Route path="/:locale/resource/:id" render={(props) => (
                <MapContainer
                  {...props}
                  country={country}
                  handleAddressChange={handleAddressChange}
                  handleListAddFavorite={handleListAddFavorite}
                  handleListRemoveFavorite={handleListRemoveFavorite}
                  handleListNew={handleListNew}
                  handleLogOut={handleLogOut}
                  handleMessageNew={handleMessageNew}
                  handleRequestOpen={handleRequestOpen}
                  lists={lists}
                  locale={locale}
                  nearAddress={this.state.nearAddress}
                  session={session}
                  t={t}
                  user={user}
                />)}
              />
              <Route exact path="/" render={(props) => (
                <MapContainer
                  {...props}
                  changeLocale={changeLocale}
                  country={country}
                  handleAddressChange={handleAddressChange}
                  handleListAddFavorite={handleListAddFavorite}
                  handleListRemoveFavorite={handleListRemoveFavorite}
                  handleListNew={handleListNew}
                  handleLogOut={handleLogOut}
                  handleMessageNew={handleMessageNew}
                  handleRequestOpen={handleRequestOpen}
                  lists={lists}
                  locale={locale}
                  logo={logo}
                  nearAddress={this.state.nearAddress}
                  session={session}
                  t={t}
                  user={user}
                />)}
              />
              <Route
                path="/:locale/search/:in/:place/:near/:for/:filter/:sort"
                render={(props) => (
                  <MapContainer
                    {...props}
                    country={country}
                    handleAddressChange={handleAddressChange}
                    handleListAddFavorite={handleListAddFavorite}
                    handleListRemoveFavorite={handleListRemoveFavorite}
                    handleListNew={handleListNew}
                    handleLogOut={handleLogOut}
                    handleMessageNew={handleMessageNew}
                    handleRequestOpen={handleRequestOpen}
                    lists={lists}
                    locale={locale}
                    logo={logo}
                    nearAddress={this.state.nearAddress}
                    session={session}
                    t={t}
                    user={user}
                />)}
              />
              <RedirectWithParams from={"/:locale/search/:in/:place/:near/:for/:filter"} to={"/search/:in/:place/:near/:for/:filter/default"} />
              <RedirectWithParams from={"/:locale/search/:in/:place/:near/:for"} to={"/search/:in/:place/:near/:for/all/default"} />
              <RedirectWithParams from={"/:locale/search/:in/:place/:near/"} to={"/search/:in/:place/:near/any/all/default"} />
              <Redirect from="/:locale/search" to="/"/>
              <Redirect from="/:locale/resource" to="/"/>
              <Redirect from="/:locale/resource/:id/service" to="/"/>
              <Route render={(props) => (
                <PageContainer
                    {...this.state}
                    {...this.props}
                    {...props}
                    session={session}
                    sessionConfirmed={sessionConfirmed}
                    handleMessageNew={handleMessageNew}
                    handleRequestOpen={handleRequestOpen}
                    handleUnconfirmSession={handleUnconfirmSession}
                  />
                )}
              />
            </Switch>
          </div>
        : null }
        { isMobile ? null : <Footer locale={locale} /> }
        <Message
          handleMessageClose={this.handleMessageClose}
          message={message}
          open={messageOpen}
        />
      </div>
    );
  }
};

AsylumConnectDialog.defaultProps = {
  session: null,
  user: null,
};

AsylumConnectCatalog.propTypes = {
  handleLogIn: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleConfirmSession: PropTypes.func.isRequired,
  handleUnconfirmSession: PropTypes.func.isRequired,
  session: PropTypes.string,
  sessionConfirmed: PropTypes.bool.isRequired,
  user: PropTypes.number,
  width: PropTypes.number.isRequired,
};

export default hot(module)(withLocale((withSession(withWidth(withStyles(styles)(AsylumConnectCatalog))))));
