import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import breakpoints from '../../theme/breakpoints';
import withWidth from '../withWidth';

import Section from './Section';

const styles = theme => ({
  root: {
    marginBottom: '70px',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    margin: '5% 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontStyle: 'italic',
    marginTop: theme.spacing.unit * 4
  },
  section: {
    padding: '5% 20%',
  },
  [`@media (max-width: ${breakpoints['sm']}px)`]: {
    section: {
      padding: 0
    },
    marginBottom: {
      marginBottom: '5%',
    },
  },
  textAlignCenter: {
    textAlign: 'center',
  },
});

const Static = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.header}>
      <Typography type='title'>Information for LGBTQ People Outside of the U.S and Canada</Typography>
      <Typography type='caption' className={classes.subtitle}>Are you outside of the U.S. and Canada? See below for a list of international LGBTQ-friendly resources.</Typography>
      <div className={classes.cta}>
        {/* 4 Icons */}
      </div>
    </div>
    <div className={classes.section}>
      <Section color={data.color} icon={data.icon}
        type={data.type}
        title={data.title}
        description={data.description}
        resources={data.resources}
      />
    </div>
  </div>
);

const data = Object.freeze({
  color: '#E58C52',
  icon: 'www.google.com',
  type: 'online support',
  title: 'Looking for LGBTQ chat rooms and support online?',
  description: 'Sample organization who offer LGBTQ people emotional and psychological support online',
  resources: [
    {
      name: 'The Trevor Project\'s TrevorSpace',
      link: 'www.TrevorSpace.org',
      description: 'The Trevor Project is the leading U.S. organization providing crisis intervention and suicide prevention services to lesbian, gay, bisezual, transgender, queer and questioning youth.',
      who: 'LGBTQ young people ages 13 to 24',
      how: 'Note: Please know that visiting TrevorSpace may leave a record on your computer or browser'
    },
  ]
})

// Static.propTypes = {

// };

export default withStyles(styles)(withWidth(Static));
