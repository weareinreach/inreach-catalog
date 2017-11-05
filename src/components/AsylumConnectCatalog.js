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
import fetch from 'node-fetch';

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
import withSession from './withSession';
import withWidth from './withWidth';
import Message from './Message';

import breakpoints from '../theme/breakpoints';

class AsylumConnectCatalog extends React.Component { 
  constructor(props, context) {
    super(props, context);

    this.state = {
      dialog: 'none',
      message: '',
      messageOpen: false,
    };

    this.handleRequestOpen = this.handleRequestOpen.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleMessageNew = this.handleMessageNew.bind(this);
    this.handleMessageClose = this.handleMessageClose.bind(this);
    /*fetch(window.location.origin+'/api/submissions', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        "submission": {
          "resource_type": "Organizations",
          "client_user_id": 0,
          "content": JSON.stringify({
            organization: {
              "title": "test 1",
              "locations": [{
                "name":"Neighborhood Center","address":"741 30th Avenue","unit":"","city":"San Francisco","state":"CA","zip_code":"94121","lat":37.7753,"long":-122.49,"is_primary":true
              }]
            }
          }),
          "submitter_type": "PublicForm"  // Arbitrary
        }
      })
    })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data);
    });*/
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

  render() {
    const {dialog, message, messageOpen} = this.state;
    const {handleLogIn, handleLogOut, session} = this.props;
    const isMobile = this.props.width < breakpoints['sm'];
    const {handleMessageNew, handleRequestClose, handleRequestOpen} = this;
    return (
      <div>
        <Header
          handleLogOut={handleLogOut}
          handleRequestOpen={handleRequestOpen}
          session={session}
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
              />
            )}
          </div>
        ) : (
          <div>
            <Announcement handleRequestOpen={handleRequestOpen} />
            <AsylumConnectDialog
              dialog={dialog}
              handleLogIn={handleLogIn}
              handleMessageNew={handleMessageNew}
              handleRequestClose={handleRequestClose}
              handleRequestOpen={handleRequestOpen}
            />
          </div>
        )}
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
        { isMobile ? null : <Footer /> }
        <Message
          handleMessageClose={this.handleMessageClose}
          message={message}
          open={messageOpen}
        />
      </div>
    );
  }
};

export default withSession(withWidth(AsylumConnectCatalog));
