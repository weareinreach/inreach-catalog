import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import MobileStepper from 'material-ui/MobileStepper';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

import config from '../../config/config.js';
import AsylumConnectButton from '../AsylumConnectButton';

import OrganizationAutocomplete from './OrganizationAutocomplete';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  flex: {display: 'flex'},
  link: {
    color: theme.palette.secondary[500],
    cursor: 'pointer',
  },
  paddingVertical: {padding: '2.5rem 0'},
  marginBottom: {marginBottom: '2rem'},
  marginBottomLg: {marginBottom: '3rem'},
  marginTop: {marginTop: '2rem'},
  marginVertical: {margin: '2rem 0'},
  spacingTop: {marginTop: '1rem'},
  backgroundTransparent: {backgroundColor: 'transparent'}
});

const SignupForm = ({
  activeStep,
  classes,
  email,
  handleBlurOrganizations,
  handleChange,
  handleCreateAffiliation,
  handleMessageNew,
  handleOrganizationSearchChange,
  handleOrganizationSelect,
  handleOrganizationsFetchRequested,
  handleOrganizationsClearRequested,
  handleRequestClose,
  handleRequestOpen,
  handleSelect,
  handleSignUp,
  handleStepNext,
  handleStepBack,
  isLoadingOrganizations,
  locale,
  organizations,
  organizationSearch,
  organizationSelection,
  password,
  passwordConfirmation,
  selection,
}) => (
  <div className={classes.container}>
    {activeStep === 0 && (
      <div className={classes.container}>
        <Typography className={classes.marginBottomLg} variant="display3">
          Which are you?
        </Typography>
        <AsylumConnectButton
          className={classes.marginBottom}
          onClick={() => handleSelect('seeker')}
          variant="primary">
          I am an asylum seeker
        </AsylumConnectButton>
        <AsylumConnectButton
          className={classes.marginBottomLg}
          onClick={() => handleSelect('provider')}
          variant="primary">
          I am a service provider
        </AsylumConnectButton>
        <div onClick={() => handleRequestOpen('login')}>
          <Typography variant="body1">
            <span className={classes.link}>Already have an account?</span>
          </Typography>
        </div>
      </div>
    )}
    {activeStep === 1 && (
      <form className={classes.container} onSubmit={handleSignUp}>
        <TextField
          id="email"
          label={selection === 'seeker' ? 'Email' : 'Organization Email'}
          margin="normal"
          name="email"
          onChange={handleChange}
          required
          type="email"
          value={email}
        />
        <TextField
          error={password.length > 0 && password.length < 8}
          helperText={password.length > 0 && password.length < 8 ? 'Password must be at least 8 characters.' : null}
          id="password"
          label="Password"
          margin="normal"
          name="password"
          onChange={handleChange}
          required
          type="password"
          value={password}
        />
        <TextField
          id="passwordConfirmation"
          label="Confirm Password"
          margin="normal"
          name="passwordConfirmation"
          onChange={handleChange}
          required
          type="password"
          value={passwordConfirmation}
        />
        <Typography variant="body1" className={classes.paddingVertical}>
          By clicking "Sign Up," you agree to One Degree's{` `}
          <a href="https://www.1degree.org/privacy" target="_blank">
            Privacy Policy
          </a>
          {` `}and{` `}
          <a href="https://www.1degree.org/terms-of-use" target="_blank">
            Terms of Use
          </a>
          .
        </Typography>
        <AsylumConnectButton variant="primary">Sign Up</AsylumConnectButton>
      </form>
    )}
    {activeStep === 2 && (
      <form onSubmit={handleCreateAffiliation}>
        <Typography variant="display4">
          Connect to Your Organization
        </Typography>
        <OrganizationAutocomplete
          handleBlurOrganizations={handleBlurOrganizations}
          handleMessageNew={handleMessageNew}
          handleOrganizationSearchChange={handleOrganizationSearchChange}
          handleOrganizationSelect={handleOrganizationSelect}
          handleOrganizationsFetchRequested={
            handleOrganizationsFetchRequested
          }
          handleOrganizationsClearRequested={
            handleOrganizationsClearRequested
          }
          handleRequestClose={handleRequestClose}
          isLoadingOrganizations={isLoadingOrganizations}
          locale={locale}
          organizationSearch={organizationSearch}
          organizationSelection={organizationSelection}
          organizations={organizations}
        />
        <div className={classes.marginVertical}>
          <AsylumConnectButton variant="primary">
            Join Organization
          </AsylumConnectButton>
        </div>
        <Typography variant="body1">
          You may also join your organization later in account settings.
        </Typography>
      </form>
    )}
    <MobileStepper
      className={classes.spacingTop+' '+classes.backgroundTransparent}
      type="dots"
      steps={selection === 'provider' ? 3 : 2}
      position="static"
      activeStep={activeStep}
      nextButton={<div />}
      backButton={<div />}
    />
    {activeStep === 1 && (
      <div className={classes.flex}>
        <Button dense onClick={handleStepBack}>
          <KeyboardArrowLeft />
          Back
        </Button>
      </div>
    )}
  </div>
);

SignupForm.defaultProps = {
  organizationSelection: null,
};

SignupForm.propTypes = {
  activeStep: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  handleBlurOrganizations: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCreateAffiliation: PropTypes.func.isRequired,
  handleOrganizationSearchChange: PropTypes.func.isRequired,
  handleOrganizationSelect: PropTypes.func.isRequired,
  handleOrganizationsFetchRequested: PropTypes.func.isRequired,
  handleOrganizationsClearRequested: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
  handleStepBack: PropTypes.func.isRequired,
  handleStepNext: PropTypes.func.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
  organizationSearch: PropTypes.string.isRequired,
  organizationSelection: PropTypes.object,
  password: PropTypes.string.isRequired,
  passwordConfirmation: PropTypes.string.isRequired,
  selection: PropTypes.string.isRequired,
};

export default withStyles(styles)(SignupForm);
