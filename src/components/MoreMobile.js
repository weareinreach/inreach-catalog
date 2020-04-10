import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Fa from 'react-fontawesome';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AsylumConnectCollapsibleSection from './AsylumConnectCollapsibleSection';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: '2.5em',
    marginRight: '2.5em',
    borderBottom: '1px solid ' + theme.palette.common.faintBlack,
    boxShadow: 'none',
  },
  textCenter: {textAlign: 'center'},
  title: {
    padding: '20px',
  },
  linkStyles: {
    display: 'block',
    margin: theme.spacing(2, 0),
    fontWeight: theme.typography.fontWeightMedium,
  },
  mobilePadding: {
    paddingLeft: '20px',
    paddingRight: '20px',
  },
});

const LinkList = ({classes, list, onLinkClick}) => {
  return (
    <div>
      {list.map((item, index) => {
        if (item.url.indexOf('http') === 0) {
          return (
            <a
              key={index}
              className={classes.linkStyles}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label} <Fa name="link" />
            </a>
          );
        } else {
          return (
            <Link
              key={index}
              to={item.url}
              className={classes.linkStyles}
              onClick={onLinkClick}
            >
              {item.label} <Fa name="link" />
            </Link>
          );
        }
      })}
    </div>
  );
};

const MoreMobile = ({classes, handleRequestClose, handleRequestOpen}) => (
  <div>
    <Typography variant="h1" className={classes.title}>
      More
    </Typography>
    <AsylumConnectCollapsibleSection
      className={classes.mobilePadding}
      expanded={false}
      title={'Help for Myself'}
      content={
        <LinkList
          list={[
            {label: 'Find Resources', url: '/'},
            {label: 'Learn More', url: 'https://asylumconnect.org'},
            {
              label: 'Rate This App',
              url:
                'https://survey.az1.qualtrics.com/jfe/form/SV_4JylCyjAklvKGVL',
            },
          ]}
          classes={classes}
          onLinkClick={handleRequestClose}
        />
      }
    />
    <AsylumConnectCollapsibleSection
      className={classes.mobilePadding}
      expanded={false}
      title={'Help for a Client/Someone Else'}
      content={
        <LinkList
          list={[
            {label: 'Find Resource Referrals', url: '/'},
            {
              label: 'Learn More',
              url:
                'https://asylumconnect.org/how-to-find-resources-for-clients/',
            },
            {
              label: 'Rate This App',
              url:
                'https://survey.az1.qualtrics.com/jfe/form/SV_4JylCyjAklvKGVL',
            },
          ]}
          classes={classes}
          onLinkClick={handleRequestClose}
        />
      }
    />
    <AsylumConnectCollapsibleSection
      className={classes.mobilePadding}
      expanded={false}
      title={'General Supporter Information'}
      content={
        <LinkList
          list={[
            {
              label: 'Donate',
              url: 'https://secure.actblue.com/donate/asylumconnect',
            },
            {label: 'Learn More', url: 'https://asylumconnect.org'},
          ]}
          classes={classes}
          onLinkClick={handleRequestClose}
        />
      }
    />
    <AsylumConnectCollapsibleSection
      className={classes.mobilePadding}
      expanded={false}
      title={'Suggest New Resource'}
      content={
        <LinkList
          list={[
            {label: 'Suggest New U.S. Resource', url: '/en_US/suggestions/new'},
            {
              label: 'Suggest New Canada Resource',
              url: '/en_CA/suggestions/new',
            },
          ]}
          classes={classes}
          onLinkClick={handleRequestClose}
        />
      }
    />
    <AsylumConnectCollapsibleSection
      className={classes.mobilePadding}
      expanded={false}
      title={'Privacy Information'}
      content={
        <LinkList
          list={[{label: 'Privacy Statement & Disclaimer', url: '/'}]}
          classes={classes}
          onLinkClick={() => {
            handleRequestOpen('privacy');
          }}
        />
      }
    />
  </div>
);

MoreMobile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MoreMobile);
