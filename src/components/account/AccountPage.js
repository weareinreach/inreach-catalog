import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import OrgSettings from './OrgSettings';
import GeneralSettings from './GeneralSettings';

import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

import {fetchUser} from '../../helpers/odasRequests';
import breakpoints from '../../theme/breakpoints';
import withWidth from '../withWidth';

const styles = theme => ({
  root: {
    padding: '5% 0 5% 0',
    marginBottom: '70px',
    display: 'flex',
    flexDirection: 'column',
  },
  [`@media (max-width: ${breakpoints['sm']}px)`]:{
    root: {
      padding: '5% 10%',
    },
    marginBottom: {
      marginBottom: '5%'
    }
  },
  formRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline'
  },
  textAlignCenter: {
    textAlign: 'center'
  }
});

function TabContainer(props) {
  return <div style={{ marginTop: 50 }}>{props.children}</div>;
}

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isAuthenticated: false,
      user: null
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount(){
    const {handleMessageNew, handleLogOut, session} = this.props;
    if (!session) {
      this.props.history.push('/');
      handleMessageNew('You need to log in to view your account.')
    } else {
      fetchUser(session)
        .then(data => {
          this.setState({ isAuthenticated: true, user: data.user });
        })
        .catch(error => {
          handleLogOut();
          this.props.history.push('/');
          handleMessageNew('Oops! Something went wrong. Error:' + error);
        });
    }
  }
  handleChange(event, value){
    this.setState({ value });
  };
  render() {
    const {
      classes,
      handleLogOut,
      handleMessageNew,
      handleRequestOpen,
      session
    } = this.props;
    const { isAuthenticated, user, value } = this.state;
    const isMobile = this.props.width < breakpoints['sm'];
    let settings;
    if (isAuthenticated && user.affiliation) {
      console.log(user.affiliation)
      settings = isMobile ? (
        <div>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange} indicatorColor="primary"
              fullWidth>
              <Tab label="Your Account" />
              <Tab label="Your Org" />
            </Tabs>
          </AppBar>
          {value === 0 &&
            <TabContainer>
              <GeneralSettings
                handleLogOut={handleLogOut}
                handleMessageNew={handleMessageNew}
                handleRequestOpen={handleRequestOpen}
                session={session}
                user={user}
              />
            </TabContainer>
          }
          {value === 1 && <TabContainer><OrgSettings handleMessageNew={handleMessageNew} user={user}/></TabContainer>}
        </div>
      ):(
        <div>
          <Typography type="display2" className={classes.textAlignCenter}>Organization</Typography>
          <div className={classes.formRow}>
            <OrgSettings handleMessageNew={handleMessageNew} user={user}/>
            <GeneralSettings
              handleLogOut={handleLogOut}
              handleMessageNew={handleMessageNew}
              handleRequestOpen={handleRequestOpen}
              session={session}
              user={user}
            />
          </div>
        </div>
      )
    } else if (isAuthenticated && !user.affiliation){
      settings = (
        isMobile ? (
          <div>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange} indicatorColor="primary"
                fullWidth>
                <Tab label="Your Account" />
                <Tab label="Your Org" disabled />
              </Tabs>
            </AppBar>
          {value === 0 &&
            <TabContainer>
              <GeneralSettings
                handleLogOut={handleLogOut}
                handleMessageNew={handleMessageNew}
                handleRequestOpen={handleRequestOpen}
                history={this.props.history}
                session={session}
                user={user}
              />
            </TabContainer>
          }
          </div>
        ):(
        <div>
          <div className={classes.formRow}>
            <GeneralSettings
              handleLogOut={handleLogOut}
              handleMessageNew={handleMessageNew}
              handleRequestOpen={handleRequestOpen}
              session={session}
              user={user}
            />
          </div>
        </div>
        )
      )
    } else {
      settings = ('')
    }
    return (
      <div className={classes.root}>
        <Typography type="display1" className={[classes.marginBottom, classes.textAlignCenter].join(' ')}>Your Account</Typography>
        {settings}
      </div>
  )}
}

AccountPage.propTypes = {
  handleLogOut: PropTypes.func.isRequired,
  handleMessageNew: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  session: PropTypes.string.isRequired,
};

export default withStyles(styles)(withWidth(AccountPage));
