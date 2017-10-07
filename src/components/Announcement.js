import React from 'react';

import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import {
  DisclaimerDialog,
  PrivacyDialog,
} from './privacy';

const styles = (theme) => ({
  announcement: {
    backgroundColor: theme.palette.common.blue,
    padding: '2rem 0',
    textAlign: 'center',
  },
  pointer: { cursor: 'pointer' },
  textWhite: { color: theme.palette.common.darkWhite },
});

class Announcement extends React.Component {
  constructor(props) {
    super(props)
    this.state = { dialog: 'none' };

    this.handleOpenDisclaimer = this.handleOpenDisclaimer.bind(this);
    this.handleOpenPrivacy = this.handleOpenPrivacy.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleOpenDisclaimer() {
    this.setState({ dialog: 'disclaimer' });
  };

  handleOpenPrivacy() {
    this.setState({ dialog: 'privacy' });
  }

  handleRequestClose() {
    this.setState({ dialog: 'none' });
  };

  render() {
    const { dialog } = this.state;
    const { classes } = this.props
    const { announcement, textWhite } = classes;

    const DisclaimerButton = () => (
      <strong
        className={classes.pointer}
        onClick={this.handleOpenDisclaimer}
      >
        Disclaimer
      </strong>
    );

    const PrivacyButton = () => (
      <strong
        className={classes.pointer}
        onClick={this.handleOpenPrivacy}
      >
        User Privacy Statement
      </strong>
    );

    return (
      <div className={announcement}>
        <Typography type="body1" className={textWhite}>
          Asylum seekers contact service providers at their own risk.
          <br />
          Please read our complete <DisclaimerButton /> and <PrivacyButton /> before using our catalog.
        </Typography>

        <DisclaimerDialog
          handleRequestClose={this.handleRequestClose}
          isOpen={dialog === 'disclaimer'}
        />
        <PrivacyDialog
          handleRequestClose={this.handleRequestClose}
          isOpen={dialog === 'privacy'}
        />
      </div>
    );
  }
};

export default withStyles(styles)(Announcement);
