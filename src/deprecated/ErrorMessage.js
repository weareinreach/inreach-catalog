import React from 'react';

import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';

class ErrorMessage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentWillMount() {
    this.setState({open: true});
  }

  handleRequestClose() {
    this.setState({open: false});
  }

  render() {
    const id = Date.now();
    return (
      <Snackbar
        open={this.state.open}
        onRequestClose={this.handleRequestClose}
        autoHideDuration={3000}
        transition={<Slide direction={'up'} />}
        SnackbarContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{this.props.message}</span>}
      />
    );
  }
}

export default ErrorMessage;
