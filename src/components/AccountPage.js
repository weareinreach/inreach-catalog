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
import {fetchUser} from '../utils/api';

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
    console.log('handleFetchUser');

    return;

    const {
      handleMessageNew,
      handleLogOut,
      handleUnconfirmSession,
      session,
    } = this.props;

    fetchUser(session).then((data) => {
      console.log('data', data);

      if (data.error) {
        if (data.status === 403) {
          handleUnconfirmSession();
          return;
        }
        handleLogOut();
        this.props.history.push('/');
        handleMessageNew('Oops! Something went wrong.');

        return;
      }

      this.setState({isAuthenticated: true, user: data.user});
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
    const {isAuthenticated, user, value} = this.state;
    const isMobile = this.props.width < breakpoints['sm'];
    let settings;
    if (isAuthenticated && user.affiliation) {
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
                handleLogOut={handleLogOut}
                handleMessageNew={handleMessageNew}
                handleRequestOpen={handleRequestOpen}
                handleUserUpdate={handleUserUpdate}
                locale={locale}
                session={session}
                user={user}
              />
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <OrgSettings handleMessageNew={handleMessageNew} user={user} />
            </TabContainer>
          )}
        </div>
      ) : (
        <div>
          <Typography variant="h4" className={classes.textAlignCenter}>
            Organization
          </Typography>
          <div className={classes.formRow}>
            <OrgSettings handleMessageNew={handleMessageNew} user={user} />
            <GeneralSettings
              handleLogOut={handleLogOut}
              handleMessageNew={handleMessageNew}
              handleRequestOpen={handleRequestOpen}
              handleUserUpdate={handleUserUpdate}
              locale={locale}
              session={session}
              user={user}
            />
          </div>
        </div>
      );
    } else if (isAuthenticated && !user.affiliation) {
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
                handleLogOut={handleLogOut}
                handleMessageNew={handleMessageNew}
                handleRequestOpen={handleRequestOpen}
                handleUserUpdate={handleUserUpdate}
                history={this.props.history}
                locale={locale}
                session={session}
                user={user}
              />
            </TabContainer>
          )}
        </div>
      ) : (
        <div>
          <div className={classes.formRow}>
            <GeneralSettings
              handleLogOut={handleLogOut}
              handleMessageNew={handleMessageNew}
              handleRequestOpen={handleRequestOpen}
              handleUserUpdate={handleUserUpdate}
              locale={locale}
              session={session}
              user={user}
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
