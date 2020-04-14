import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import ContentMarkdown from './ContentMarkdown';
import Resource from './StaticResource';
import Dropdown from './StaticDropdown';
import {StandaloneIcon} from './icons';
import {withStyles} from '@material-ui/core/styles';
import {breakpoints} from '../theme';

const styles = (theme) => ({
  textAlignCenter: {
    textAlign: 'center',
  },
  textBold: {
    fontWeight: theme.typography.fontWeightHeavy,
  },
  titleMargin: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(1),
  },
  italic: {
    fontStyle: 'italic',
    lineHeight: '1.2rem',
  },
  applyColor: (props) => ({
    color: props?.color,
  }),
  inlineBlock: {
    display: 'inline-block',
  },
  iconPadding: {
    padding: theme.spacing(1),
  },
  dropdown: {
    width: '50%',
    margin: `${theme.spacing(5)}px auto`,
  },
  [`@media (max-width: ${breakpoints['sm']}px)`]: {
    dropdown: {
      width: '100%',
    },
  },
});

class Section extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dropdownSelection: !(
        this.props.dropdown && Object.keys(this.props.dropdown).length > 0
      ),
    };
    this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
  }

  handleDropdownSelect(item) {
    this.setState({
      dropdownSelection: item,
    });
  }

  render() {
    var {
      classes,
      color,
      icon,
      type,
      title,
      description,
      resources,
      dropdown,
    } = this.props;
    const dropdownKeys =
      dropdown && Object.keys(dropdown).length ? Object.keys(dropdown) : false;
    return (
      <div>
        <div className={classes.textAlignCenter}>
          <div className={classes.inlineBlock}>
            <StandaloneIcon
              className={classes.iconPadding}
              name={icon}
              fillColor={color}
              strokeColor={'#000'}
            />
          </div>
        </div>
        <Typography
          variant="h6"
          className={classes.textAlignCenter + ' ' + classes.textBold}
        >
          {type}
        </Typography>
        <Typography
          variant="h2"
          className={[classes.applyColor, classes.titleMargin].join(' ')}
        >
          {title}
        </Typography>
        <Typography variant="body2">
          <ContentMarkdown
            renderers={{
              link: (props) => (
                <a href={props.href} target={props.target}>
                  {props.children}
                </a>
              ),
            }}
            source={description}
          />
        </Typography>
        {dropdownKeys ? (
          <Dropdown
            label={dropdown.label}
            keys={dropdownKeys}
            dropdown={dropdown}
            color={color}
            selected={this.state.dropdownSelection}
            onSelect={this.handleDropdownSelect}
            dropdownClassName={classes.dropdown}
          />
        ) : null}
        {this.state.dropdownSelection
          ? resources.map((resource, index) => (
              <Resource key={index} color={color} {...resource} />
            ))
          : null}
      </div>
    );
  }
}

Section.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  resources: PropTypes.array.isRequired,
};

export default withStyles(styles)(Section);
