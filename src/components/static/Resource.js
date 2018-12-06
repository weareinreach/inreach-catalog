import React from 'react';
import PropTypes from 'prop-types';
import withStylesProps from '../withStylesProps';
import Typography from 'material-ui/Typography';

import ContentMarkdown from '../../helpers/ContentMarkdown';

require('./Resource.scss');

const styles = (theme, props) => ({
  resourceMargin: {
    marginTop: theme.spacing.unit * 4,
  },
  resourceNameMargin: {
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
    <div className={"resource--with-markdown "+classes.resourceMargin}>
      {name && <Typography type='display3' className={classes.resourceNameMargin}>{name}</Typography>}
      {link && <a href={`${link}`} target="_blank"><Typography type='body1' className={classes.applyColor}>{link}</Typography></a>}
      {description && <Typography type='body1'>
        <ContentMarkdown 
          renderers={{
            link: (props) => (<a href={props.href} target={props.target} className={classes.applyColor}>{props.children}</a>)
          }} 
          source={description} />
      </Typography>}
      {who && <Typography type='body1' className={classes.infoItem}>Who this resource serves:</Typography>}
      {who && <Typography type='body1'>
        <ContentMarkdown 
          renderers={{
            link: (props) => (<a href={props.href} target={props.target} className={classes.applyColor}>{props.children}</a>)
          }} 
          source={who} />
      </Typography>}
      {how && <Typography type='body1' className={classes.infoItem}>How to visit this resource:</Typography>}
      {how && <Typography type='body1'>
        <ContentMarkdown 
          renderers={{
            link: (props) => (<a href={props.href} target={props.target} className={classes.applyColor}>{props.children}</a>)
          }} 
          source={how} />
      </Typography>}
    </div>
  );

Resource.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  link: PropTypes.string,
  description: PropTypes.string,
  who: PropTypes.string,
  how: PropTypes.string,
  email: PropTypes.string,
};

export default withStylesProps(styles)(Resource);
