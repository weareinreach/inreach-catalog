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

  render() {
    const { classes, width } = this.props
    const { announcement, textWhite } = classes;
    return (
      <div className={announcement}>
        <Typography type="body1" className={textWhite}>
          Asylum seekers contact service providers at their own risk. { width > 600 ? <br /> : null } Please read our complete <strong> Disclaimer</strong> and <strong>User Privacy Statement</strong> before using our catalog.
        </Typography>
        <Disclaimer />
      </div>
    );
  }
};

export default withStyles(styles)(withWidth(Announcement));
