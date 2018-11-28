import React from 'react';
import PropTypes from 'prop-types';
import withStylesProps from '../withStylesProps';

import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import Resource from './Resource';
import ContentMarkdown from '../../helpers/ContentMarkdown';
import {StandaloneIcon} from '../icons';

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
  },
  inlineBlock: {
    display: 'inline-block'
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
  return (
    <div>
      <div className={classes.textAlignCenter}>
        <div className={classes.inlineBlock}>
          <StandaloneIcon name={icon} />
        </div>
      </div>
      <Typography type='display4' className={classes.textAlignCenter}>{type}</Typography>
      <Typography type='title' className={[classes.applyColor, classes.titleMargin].join(' ')}>{title}</Typography>
      <Typography type='caption' className={classes.italic}>
        <ContentMarkdown
          renderers={{
            link: (props) => (<a href={props.href} className={classes.applyColor}>{props.children}</a>)
          }} 
          source={description} 
        />
      </Typography>
      {resources.map((resource, index) => <Resource key={index} color={color} {...resource} />)}
    </div >
  )
};

Section.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  resources: PropTypes.array.isRequired,
};

export default withStylesProps(styles)(Section);
