import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import withWidth from './withWidth';

const styles = (theme) => ({
  announcement: {
    backgroundColor: theme.palette.common.blue,
    padding: '2rem 0',
    textAlign: 'center',
  },
  textWhite: { color: theme.palette.common.darkWhite },
});

const Announcement = ({classes, width}) => {
  const { announcement, textWhite } = classes;
  return (
    <div className={announcement}>
      <Typography type="body1" className={textWhite}>
        Asylum seekers contact service providers at their own risk. { width > 600 ? <br /> : null } Please read our complete <strong> Disclaimer</strong> and <strong>User Privacy Statement</strong> before using our catalog.
      </Typography>
    </div>
  );
};

export default withStyles(styles)(withWidth(Announcement));
