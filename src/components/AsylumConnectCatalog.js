import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class AsylumConnectCatalog extends React.Component { 
  constructor() {
    super();
    this.state = {
      open: false,
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  };

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };


  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <header>
          <nav/>
        </header>
        <div className="content" >
          <RaisedButton label="Dialog" onClick={this.handleOpen} />
          <Dialog
            title="Dialog With Actions"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            The actions in this window were passed in as an array of React objects.
          </Dialog>
        </div>
        <footer />
      </div>
    );
  }
};