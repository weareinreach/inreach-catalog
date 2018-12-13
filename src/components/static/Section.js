import React from 'react';
import PropTypes from 'prop-types';
import withStylesProps from '../withStylesProps';

import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import Resource from './Resource';
import ContentMarkdown from '../../helpers/ContentMarkdown';
import {StandaloneIcon} from '../icons';

import Dropdown from './Dropdown';

import breakpoints from '../../theme/breakpoints';

const styles = (theme, props) => ({
  textAlignCenter: {
    textAlign: 'center',
  },
  textBold: {
    fontWeight: theme.typography.fontWeightHeavy
  },
  titleMargin: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit
  },
  italic: {
    fontStyle: 'italic',
    lineHeight: '1.2rem'
  },
  applyColor: {
    color: props.color
  },
  inlineBlock: {
    display: 'inline-block'
  },
  dropdown: {
    width: '50%',
    margin: theme.spacing.unit * 5 + ' auto'
  },
  [`@media (max-width: ${breakpoints['sm']}px)`]: {
    dropdown: {
      width: '100%'
    }
  }
})


class Section extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.state = {
      dropdownSelection: !(this.props.dropdown && Object.keys(this.props.dropdown).length > 0)
    };
    this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
    /*this.fetchPage = this.fetchPage.bind(this);
    this.handlePageRequest = this.handlePageRequest.bind(this);*/
  }

  handleDropdownSelect(item) {
    this.setState({
      dropdownSelection:item
    });
  }

  render() {
  var {classes,
  color,
  icon,
  type,
  title,
  description,
  resources,
  dropdown} = this.props;
  const containerWidth = "auto";
  const dropdownKeys = dropdown && Object.keys(dropdown).length ? Object.keys(dropdown) : false;
  return (
    <div>
      <div className={classes.textAlignCenter}>
        <div className={classes.inlineBlock}>
          <StandaloneIcon name={icon} />
        </div>
      </div>
      <Typography type='display4' className={classes.textAlignCenter+' '+classes.textBold}>{type}</Typography>
      <Typography type='title' className={[classes.applyColor, classes.titleMargin].join(' ')}>{title}</Typography>
      <Typography type='caption' className={classes.italic}>
        <ContentMarkdown
          renderers={{
            link: (props) => (<a href={props.href} target={props.target} className={classes.applyColor}>{props.children}</a>)
          }} 
          source={description} 
        />
      </Typography>
      {dropdownKeys ? <Dropdown label={dropdown.label} keys={dropdownKeys} dropdown={dropdown} color={color} selected={this.state.dropdownSelection} onSelect={this.handleDropdownSelect} dropdownClassName={classes.dropdown} /> : null}
      {this.state.dropdownSelection ? resources.map((resource, index) => <Resource key={index} color={color} {...resource} />) : null}
    </div>
  )}
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
