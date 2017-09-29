import React from 'react';

import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import Disclaimer from './Disclaimer';
import withWidth from './withWidth';

const styles = (theme) => ({
  announcement: {
    backgroundColor: theme.palette.common.blue,
    padding: '2rem 0',
    textAlign: 'center',
  },
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
    const { classes, width } = this.props
    const { announcement, textWhite } = classes;

    const DisclaimerButton = () => (
      <strong onClick={this.handleOpenDisclaimer}>
        Disclaimer
      </strong>
    );

    return (
      <div className={announcement}>
        <Typography type="body1" className={textWhite}>
          Asylum seekers contact service providers at their own risk. { width > 600 ? <br /> : null } Please read our complete <DisclaimerButton /> and <strong>User Privacy Statement</strong> before using our catalog.
        </Typography>

        <Disclaimer
          handleRequestClose={this.handleRequestClose}
          isOpen={dialog === 'disclaimer'}
        />
      </div>
    );
  }
};

export default withStyles(styles)(withWidth(Announcement));
