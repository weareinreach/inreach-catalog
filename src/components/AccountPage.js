import PropTypes from 'prop-types';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import GeneralSettings from './GeneralSettings';
import OrgSettings from './OrgSettings';
import PromptReconfirm from './PromptReconfirm';
import withWidth from './withWidth';
import {breakpoints} from '../theme';
import {fetchOrganizations, fetchUser} from '../utils/api';

const styles = (theme) => ({
  root: {
    padding: '5% 0 5% 0',
    marginBottom: theme.spacing(9),
    display: 'flex',
    flexDirection: 'column',
  },
  [`@media (max-width: ${breakpoints['sm']}px)`]: {
    root: {
      padding: '5% 20px',
    },
    marginBottom: {
      marginBottom: '5%',
    },
  },
  formRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  textAlignCenter: {
    textAlign: 'center',
  },
});

function TabContainer(props) {
  return <div style={{marginTop: 50}}>{props.children}</div>;
}

class AccountPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      isAuthenticated: false,
      user: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
  }

  componentDidMount() {
    if (!this.props.session) {
      this.handleNullSession();
    } else {
      this.handleFetchUser();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.sessionConfirmed && nextProps.sessionConfirmed) {
      this.handleFetchUser();
    } else if (this.props.session && !nextProps.session) {
      this.handleNullSession();
    }
  }

  handleFetchUser() {
    fetchUser(this.props.session)
      .then((user) => {
        fetchOrganizations({owner: user.email})
          .then(({organizations}) => {
            const affiliation = organizations?.[0] || null;
            const isApproved =
              affiliation?.owners?.some(
                (owner) => owner.userId === user._id && owner.isApproved
              ) || false;

            this.setState({
              affiliation: isApproved ? affiliation : null,
              isAuthenticated: true,
              userData: user,
            });
          })
          .catch((err) => {
            this.props.handleMessageNew('Oops! Something went wrong.');

            return;
          });
      })
      .catch((err) => {
        this.props.handleMessageNew('Oops! Something went wrong.');

        return;
      });
  }

  handleUserUpdate(data) {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        ...data,
      },
    }));
  }

  handleNullSession() {
    this.props.history.push('/');
    this.props.handleMessageNew('You need to log in to view your account.');
  }

  handleChange(event, value) {
    this.setState({value});
  }

  render() {
    const {handleUserUpdate} = this;
    const {
      classes,
      handleLogOut,
      handleMessageNew,
      handleRequestOpen,
      locale,
      session,
    } = this.props;
    const {affiliation, isAuthenticated, userData, value} = this.state;
    const isMobile = this.props.width < breakpoints['sm'];
    let settings;
    if (isAuthenticated && affiliation) {
      settings = isMobile ? (
        <div>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              fullWidth
            >
              <Tab label="Your Account" />
              <Tab label="Your Org" />
            </Tabs>
          </AppBar>
          {value === 0 && (
            <TabContainer>
              <GeneralSettings
                affiliation={affiliation}
                handleLogOut={handleLogOut}
                handleMessageNew={handleMessageNew}
                handleRequestOpen={handleRequestOpen}
                handleUserUpdate={handleUserUpdate}
                locale={locale}
                session={session}
                userData={userData}
              />
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <OrgSettings
                affiliation={affiliation}
                handleMessageNew={handleMessageNew}
                userData={userData}
              />
            </TabContainer>
          )}
        </div>
      ) : (
        <div>
          <Typography variant="h4" className={classes.textAlignCenter}>
            Organization
          </Typography>
          <div className={classes.formRow}>
            <OrgSettings
              affiliation={affiliation}
              handleMessageNew={handleMessageNew}
              userData={userData}
            />
            <GeneralSettings
              affiliation={affiliation}
              handleLogOut={handleLogOut}
              handleMessageNew={handleMessageNew}
              handleRequestOpen={handleRequestOpen}
              handleUserUpdate={handleUserUpdate}
              locale={locale}
              session={session}
              userData={userData}
            />
          </div>
        </div>
      );
    } else if (isAuthenticated && !affiliation) {
      settings = isMobile ? (
        <div>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              fullWidth
            >
              <Tab label="Your Account" />
              <Tab label="Your Org" disabled />
            </Tabs>
          </AppBar>
          {value === 0 && (
            <TabContainer>
              <GeneralSettings
                affiliation={affiliation}
                handleLogOut={handleLogOut}
                handleMessageNew={handleMessageNew}
                handleRequestOpen={handleRequestOpen}
                handleUserUpdate={handleUserUpdate}
                history={this.props.history}
                locale={locale}
                session={session}
                userData={userData}
              />
            </TabContainer>
          )}
        </div>
      ) : (
        <div>
          <div className={classes.formRow}>
            <GeneralSettings
              affiliation={affiliation}
              handleLogOut={handleLogOut}
              handleMessageNew={handleMessageNew}
              handleRequestOpen={handleRequestOpen}
              handleUserUpdate={handleUserUpdate}
              locale={locale}
              session={session}
              userData={userData}
            />
          </div>
        </div>
      );
    } else {
      settings = '';
    }
    return (
      <div className={classes.root}>
        <Typography
          variant="h3"
          className={[classes.marginBottom, classes.textAlignCenter].join(' ')}
        >
          Your Account
        </Typography>
        {this.props.sessionConfirmed ? (
          settings
        ) : (
          <PromptReconfirm handleRequestOpen={this.props.handleRequestOpen} />
        )}
      </div>
    );
  }
}

AccountPage.propTypes = {
  handleLogOut: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  handleUnconfirmSession: PropTypes.func.isRequired,
  session: PropTypes.string.isRequired,
  sessionConfirmed: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withWidth(AccountPage));
