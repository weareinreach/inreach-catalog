import React from 'react';
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
} from './account';
import {
  DisclaimerDialog,
  PrivacyDialog,
  PrivacyMobile
} from './privacy';
import AsylumConnectButton from './AsylumConnectButton.js';
import withWidth from './withWidth';

import breakpoints from '../theme/breakpoints';

class AsylumConnectCatalog extends React.Component { 
  constructor(props, context) {
    super(props, context);

    this.state = { dialog: 'none' };

    this.handleRequestOpen = this.handleRequestOpen.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleRequestOpen(dialog) {
    this.setState({ dialog });
  }

  handleRequestClose() {
    this.setState({ dialog: 'none' });
  }

  render() {
    const { dialog } = this.state;
    const isMobile = this.props.width < breakpoints['sm'];
    const { handleRequestClose, handleRequestOpen } = this;
    return (
      <div>
        <Header handleRequestOpen={handleRequestOpen}/>
        { isMobile ? (
            <div> {
                ['disclaimer', 'privacy'].includes(dialog) &&
                <PrivacyMobile
                  tab={dialog === 'privacy' ? 0 : 1}
                  handleRequestOpen={handleRequestOpen}
                /> }{
                ['login', 'signup'].includes(dialog) &&
                  <AccountMobile
                    tab={dialog ==='login' ? 0 : 1}
                    handleRequestOpen={handleRequestOpen}
                  /> }
            </div>
          ) : (
            <div>
              <Announcement
                handleRequestOpen={handleRequestOpen}
              />
              <AsylumConnectDialog
                dialog={dialog}
                handleRequestClose={handleRequestClose}
              />
            </div>
          )
        }
        <Router>
          <div className="content" >
            <Switch>
              <Route exact path="/" component={MapContainer}/>
              <Route path="/resource/:id" component={MapContainer}/>
              <Route path="/search/:near/:for/:filter/:sort" component={MapContainer}/>
              <RedirectWithParams from={"/search/:near/:for/:filter"} to={"/search/:near/:for/:filter/default"} />
              <RedirectWithParams from={"/search/:near/:for"} to={"/search/:near/:for/all/default"} />
              <Redirect from="/search" to="/"/>
              <Redirect from="/resource" to="/"/>
              <Route component={PageContainer} />
            </Switch>
          </div>
        </Router>
          {/*<AsylumConnectButton variant="primary" onClick={() => this.setState({ open: true })}>
            button button
          </AsylumConnectButton>
          <AsylumConnectButton variant="secondary" onClick={() => this.setState({ open: true })}>
            button
          </AsylumConnectButton>
          <Button raised color="primary" onClick={() => this.setState({ open: true })}>Open alert dialog</Button>
          <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
            <DialogTitle>Dialog With Actions</DialogTitle>
            <DialogContent>
              <DialogContentText>
                The actions in this window were passed in as an array of React objects.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleRequestClose} color="primary">
                Disagree
              </Button>
              <Button onClick={this.handleRequestClose} color="primary">
                Agree
              </Button>
            </DialogActions>
          </Dialog>
<<<<<<< HEAD
        </div>*/ }
        { isMobile ? null : <Footer /> }
      </div>
    );
  }
};

export default withWidth(AsylumConnectCatalog);
