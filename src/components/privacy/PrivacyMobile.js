import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import DisclaimerText from './DisclaimerText';
import PrivacyText from './PrivacyText';

const TabContainer = ({ children }) => {
  return <div style={{ padding: '2.5rem' }}>{children}</div>;
}

TabContainer.propTypes = { children: PropTypes.node.isRequired };

const styles = theme => ({
  root: { flexGrow: 1 },
  textCenter: { textAlign: 'center' },
});

class Privacy extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tab: 0 };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, tab) {
    this.setState({ tab });
  };

  render() {
    const { classes } = this.props;
    const { tab } = this.state;

    return (
      <div>
        <Paper className={classes.root}>
          <Typography className={classes.textCenter} type="display1">
            {tab === 0 && 'Privacy Statement' }
            {tab === 1 && 'AC Disclaimer' }
          </Typography>
          <Tabs
            value={tab}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="PRIVACY" />
            <Tab label="DISCLAIMER" />
          </Tabs>
        </Paper>
        <TabContainer>
          {tab === 0 && <DisclaimerText /> }
          {tab === 1 && <PrivacyText /> }
        </TabContainer>
      </div>
    );
  }
}

Privacy.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Privacy);
