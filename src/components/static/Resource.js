import React from 'react';
import PropTypes from 'prop-types';
import withStylesProps from '../withStylesProps';
import Typography from 'material-ui/Typography';

import ContentMarkdown from '../ContentMarkdown';

require('./Resource.scss');

const styles = (theme, props) => ({
  resourceMargin: {
    marginTop: theme.spacing.unit * 4
  },
  marginBottom: {
    marginBottom: theme.spacing.unit
  },
  marginTop: {
    marginTop: theme.spacing.unit * 2
  },
  infoItem: {
    fontWeight: theme.typography.fontWeightMedium,
    marginTop: theme.spacing.unit * 2
  },
  applyColor: {
    color: props.color
  },
  linkColor: {
    color: theme.palette.secondary[500],
    '&:hover': {
      color: theme.palette.secondary[900]
    }
  }
});

const Resource = ({
  classes,
  color,
  name,
  link,
  description,
  who,
  how,
  visit,
  email
}) => (
  <div className={'resource--with-markdown ' + classes.resourceMargin}>
    {name && (
      <Typography variant="subheading" className={classes.marginBottom}>
        {name}
      </Typography>
    )}
    {link && (
      <a href={`${link}`} target="_blank" rel="noopener noreferrer">
        <Typography
          variant="body2"
          className={classes.linkColor + ' ' + classes.marginBottom}
        >
          {link}
        </Typography>
      </a>
    )}
    {description && (
      <Typography variant="body2" className={classes.marginTop}>
        <ContentMarkdown
          renderers={{
            link: props => (
              <a href={props.href} target={props.target}>
                {props.children}
              </a>
            )
          }}
          source={description}
        />
      </Typography>
    )}
    {who && (
      <Typography variant="body2" className={classes.infoItem}>
        Who this resource serves:
      </Typography>
    )}
    {who && (
      <Typography variant="body2">
        <ContentMarkdown
          renderers={{
            link: props => (
              <a href={props.href} target={props.target}>
                {props.children}
              </a>
            )
          }}
          source={who}
        />
      </Typography>
    )}
    {how && (
      <Typography variant="body2" className={classes.infoItem}>
        How to use this resource:
      </Typography>
    )}
    {how && (
      <Typography variant="body2">
        <ContentMarkdown
          renderers={{
            link: props => (
              <a href={props.href} target={props.target}>
                {props.children}
              </a>
            )
          }}
          source={how}
        />
      </Typography>
    )}
    {visit && (
      <Typography variant="body2" className={classes.infoItem}>
        How to visit this resource:
      </Typography>
    )}
    {visit && (
      <Typography variant="body2">
        <ContentMarkdown
          renderers={{
            link: props => (
              <a href={props.href} target={props.target}>
                {props.children}
              </a>
            )
          }}
          source={visit}
        />
      </Typography>
    )}
  </div>
);

Resource.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  link: PropTypes.string,
  description: PropTypes.string,
  who: PropTypes.string,
  how: PropTypes.string,
  visit: PropTypes.string,
  email: PropTypes.string
};

export default withStylesProps(styles)(Resource);
