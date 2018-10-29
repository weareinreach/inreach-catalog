import React from 'react';
import PropTypes from 'prop-types';
import withStylesProps from '../withStylesProps';

import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import Resource from './Resource';

const styles = (theme, props) => ({
  textAlignCenter: {
    textAlign: 'center',
  },
  titleMargin: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit
  },
  italic: {
    fontStyle: 'italic',
  },
  applyColor: {
    color: props.color
  }
})

const Section = ({
  classes,
  color,
  icon,
  type,
  title,
  description,
  resources
}) => {
  const Icon = icon;
  return (
    <div>
      {/* <Icon /> */}
      <Typography type='display4' className={classes.textAlignCenter}>{type}</Typography>
      <Typography type='title' className={[classes.applyColor, classes.titleMargin].join(' ')}>{title}</Typography>
      <Typography type='caption' className={classes.italic}>{description}</Typography>
      {resources.map(resource => <Resource key={type} color={color} {...resource} />)}
    </div >
  )
};

Section.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  resources: PropTypes.array.isRequired,
};

export default withStylesProps(styles)(Section);
