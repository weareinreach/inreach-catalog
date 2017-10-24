import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

import OrgSettings from './OrgSettings';

const styles = theme => ({
});

class AccountPage extends React.Component {
  render() {
    return (
      <OrgSettings />
  )}
}

AccountPage.propTypes = {
};

export default AccountPage;
