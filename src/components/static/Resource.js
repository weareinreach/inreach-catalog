import React from 'react';
import PropTypes from 'prop-types';
import withStylesProps from '../withStylesProps';
import Typography from 'material-ui/Typography';

const styles = (theme, props) => ({
  resourceNameMargin: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit,
  },
  infoItem: {
    fontWeight: theme.typography.fontWeightMedium,
    marginTop: theme.spacing.unit * 2,
  },
  applyColor: {
    color: props.color
  }
})

const Resource = ({
  classes,
  color,
  name,
  link,
  description,
  who,
  how,
  email,
}) => (
    <div>
      <Typography type='display3' className={classes.resourceNameMargin}>{name}</Typography>
      <a href={`${link}`}><Typography type='body1' className={classes.applyColor}>{link}</Typography></a>
      <Typography type='body1'>{description}</Typography>
      <Typography type='body1' className={classes.infoItem}>Who this resource serves:</Typography>
      <Typography type='body1'>{who}</Typography>
      <Typography type='body1' className={classes.infoItem}>How to visit this resource:</Typography>
      <Typography type='body1'>Website: {link}</Typography>
      <Typography type='body1'>Email: {email}</Typography>
      <Typography type='body1'>{how}</Typography>
    </div>
  );

Resource.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  link: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  who: PropTypes.string.isRequired,
  how: PropTypes.string.isRequired,
  email: PropTypes.string,
};

export default withStylesProps(styles)(Resource);
