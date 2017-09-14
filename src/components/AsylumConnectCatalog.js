import React from 'react';
import Dialog, { DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Header from './Header'
require('./AsylumConnectCatalog.scss');

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
        <Header />
        <div className="content" >
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
        <footer />
      </div>
    );
  }
};