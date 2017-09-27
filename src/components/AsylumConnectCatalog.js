import React from 'react';
import Dialog, { DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
require('./AsylumConnectCatalog.scss');

import Footer from './Footer';
import AsylumConnectButton from './AsylumConnectButton.js';

export default class AsylumConnectCatalog extends React.Component { 
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <div>
        <header>
          <nav/>
        </header>
        <div className="content" >
          <AsylumConnectButton variant="primary" onClick={() => this.setState({ open: true })}>
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
        </div>
        <Footer />
      </div>
    );
  }
};